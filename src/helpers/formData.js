/**
 * @type {(object: Object, formName?: string) => FormData}
 * */
export const objectToFormData = (object, formName) => {
  const formData = new FormData();

  console.log(object)

  for(let prop in object) {
    const currentData = object[prop];

    if(!currentData) return

    formData.set(prop, currentData);
  }

  return formData;
};