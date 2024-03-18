
/**
 * @description Хранилище только имен файлов
 * @param {{ files: FileList }} param0 
 */
export default function({ files }) {
   const copiedFiles = Array.from(files).map(file => {
      return new File([file], file.name, {
         type: file.type,
         lastModified: file.lastModified,
      })
   });
   

   return {
      files,
      copiedFiles,
   };
}; 