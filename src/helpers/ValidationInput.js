import * as yup from "yup";

const InputTypeText = yup.object({
    title: yup.string()
        .required('Название обязательно к заполнению')
        .min(2, 'Название должно быть минимум 2 символа'),
})

class FabricNotFoundTypeError extends Error {
    constructor(erroredType) {
        super();

        this.message = `Типа ${erroredType} не существует!`;
        this.name = 'FabricNotFoundTypeError';
    };
};

/**
 * 
 * @param {{ name: string, input: 'text' | 'textarea' | 'number' | 'checkbox' | 'file' | 'files', options: { required?: boolean }  }} param0 
 */
export const objectValidationFactory = ({
    name,
    input,
    options = {},
}) => {
    let createSchemaType;

    // Создание первичного типа
    switch(input) {
        case 'number':
            createSchemaType = yup.number();
        break;

        case "textarea":
        case "text":
            createSchemaType = yup.string();
        break;
        case "checkbox":
            createSchemaType = yup.boolean();
        break;
        case "files":
        case "file":
            createSchemaType = yup.mixed()
            .required(input === 'files' ? 'Файлы обзятельны для загрузки': 'Файл обязателен к загрузке');
        default:
            console.error(`Типа ${input} не существует в фабрике!`);
            throw new FabricNotFoundTypeError(input);
        break;
    };
    
    // Определение options
    if(options?.required && (input !== 'files' || input !== 'file')) createSchemaType = createSchemaType.required(
        `${name} обязателен для заполнения!`
    )
    if(!options?.required) createSchemaType = createSchemaType.optional();
    
    return createSchemaType;
};