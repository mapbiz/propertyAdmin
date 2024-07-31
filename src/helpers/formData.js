/**
 * @type {(object: Object, formName?: string) => FormData}
 * */
export const objectToFormData = (object, formName) => {
  const formData = new FormData();


  for(let prop in object) {
    const currentData = object[prop];

    if(typeof currentData === 'undefined' || currentData === null) continue;

    if(currentData instanceof FileList) {
      for(let file of Array.from(currentData)) {
        formData.append(prop, file);
      };
    };

    if(Array.isArray(currentData)) {
      currentData.forEach(currentDataNestedData => {
        formData.append(prop, currentDataNestedData)
      })
    }

    console.log({
      prop,
      currentData,
    });

    if(!Array.isArray(currentData) && !(currentData instanceof FileList)) formData.set(prop, currentData);
  }

  return formData;
};

