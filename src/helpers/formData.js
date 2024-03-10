/**
 * @type {(object: Object, formName?: string) => FormData}
 * */
export const objectToFormData = (object, formName) => {
  const formData = new FormData();


  for(let prop in object) {
    const currentData = object[prop];

    if(typeof currentData === 'undefined' || currentData === null) continue;

    if(currentData instanceof FileList) {
      // Array.from(currentData).forEach(file => {
      //   console.log({ prop, file });
      //   formData.append(prop, file);
      // });
      for(let file of Array.from(currentData)) {
        formData.append(prop, file);
      };
    };

    if(Array.isArray(currentData)) {
      currentData.forEach(currentDataNestedData => {
        formData.append(prop, currentDataNestedData)
      })
    }

    if(!Array.isArray(currentData) && !(currentData instanceof FileList)) formData.set(prop, currentData);
  }

  //formData.forEach(v, k => console.log({ v, k }));

  return formData;
};