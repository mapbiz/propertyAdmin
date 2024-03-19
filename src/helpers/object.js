/**
 * @description Шорт кат, для сравнения обьекта
 * @param {Object} obj 
 * @returns { boolean }
 */
export const objectIsEmpty = obj => JSON.stringify(obj) === '{}';

/**
 * @description Шорткат для копиравния обьекта
 * @type {(object: Object) => Object}
 */
export const copyObject = object => JSON.parse(JSON.stringify(object));

/**
 * @description Фильтрация пустых полей обьекта
 * @type {(object: Object) => { [key: string]: unknown }}
 */
export const objectFilterEmpty = object => {
    let copiedObject = copyObject(object);

    for(let prop in copiedObject) {
        const currentData = copiedObject[prop];

        if(typeof currentData === 'undefined' || currentData === null) Reflect.deleteProperty(copiedObject, prop);
        if(currentData.toString().length === 0) Reflect.deleteProperty(copiedObject, prop);
    }

    return copiedObject;
}
