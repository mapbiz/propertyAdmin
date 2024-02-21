
export const swapElements = (array, index1, index2) => {
  array[index1] = array.splice(index2, 1, array[index1])[0];
};