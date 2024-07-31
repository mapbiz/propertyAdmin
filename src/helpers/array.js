
/**
 * @param {Array<unknown>} array 
 * @param {number} index1 
 * @param {number} index2 
 */
export const swapElements = (array, index1, index2) => {
  // array[index1] = array.splice(index2, 1, array[index1])[0];

  // return array;
  // return array.with(index1, array[index2]).with(index2, array[index1]);
  const itemIndexFirst = array[index1];

  const clonedArray = [...array];

  clonedArray[index1] = clonedArray[index2];
  clonedArray[index2] = itemIndexFirst;

  return clonedArray;
};

export const countDuplicates = arrayWithDuplicates => {
  const map = new Map();

  for(const dup of arrayWithDuplicates) {
    map.set(dup, map.get(dup) + 1 || 1);
  };

  return Object.fromEntries(map);
};

/**
 * @deprecated
 * @param {string} keyField 
 * @param {() => string | number} generateKeyValue 
 * @param {unkown[]} array 
 * @returns 
 */
export const addKeys = (array, keyField = "id", generateKeyValue = () => Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString().substring(1, 10)) => {
  return array.map(item => {
    return {
      ...item,
      [keyField]: generateKeyValue(),
    };
  });
};