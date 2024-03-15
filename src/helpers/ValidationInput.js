import yup from "yup";

const InputTypeText = yup.object({
    title: yup.string()
        .required('Название обязательно к заполнению')
        .min(2, 'Название должно быть минимум 2 символа'),
})