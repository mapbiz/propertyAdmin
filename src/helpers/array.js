
export const swapElements = (array, index1, index2) => {
  array[index1] = array.splice(index2, 1, array[index1])[0];
};

export const countDuplicates = arrayWithDuplicates => {
  const map = new Map();

  for(const dup of arrayWithDuplicates) {
    map.set(dup, map.get(dup) + 1 || 1);
  };

  return Object.fromEntries(map);
};