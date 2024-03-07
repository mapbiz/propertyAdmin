/**
 * @type {(object: Object, formName?: string) => FormData}
 * */
export const objectToFormData = (object, formName) => {
  const formData = new FormData();


  for(let prop in object) {
    const currentData = object[prop];

    if(typeof currentData === 'undefined' || currentData === null) continue;
    if(Array.isArray(currentData)) {
      currentData.forEach(currentDataNestedData => {
        formData.append(prop, currentDataNestedData)
      })
    }
    else formData.set(prop, currentData);
  }

  return formData;
};