/**
 * @description Шорт кат, для сравнения обьекта
 * @param {Object} obj 
 * @returns { boolean }
 */
export const objectIsEmpty = obj => JSON.stringify(obj) === '{}';