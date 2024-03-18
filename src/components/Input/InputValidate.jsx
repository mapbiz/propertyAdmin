import { useState, useEffect, useRef, useId } from "react";

import { TextField, Checkbox, FormControlLabel, InputAdornment } from "@mui/material";


import { UploadFile } from "@mui/icons-material";

import * as yup from "yup";

import useCopyFile from "../../helpers/useCopyFile";
import { useValidation } from "../../helpers/useValidation";


const InputTyped = ({ 
   defaultValue, 
   type,
   setUploadedFiles = () => {},
   handleValidate = () => {},
   handleController = () => {},
   ...superAttrs 
}) => {
   switch(type) {
      case 'number':
      case "textarea":
      case "text":
      return (
         <>
            <TextField
               type={type}
               onBlur={async e => {
                  await handleValidate('blur', e.target.value);

                  errors.length === 0 ? await handleController('blur', e): null;
               }}
               multiline={type === 'textarea'}
               {...superAttrs}
            />
         </>
      );
      case 'checkbox':
      return (
         <>
            <FormControlLabel
               {...superAttrs}
               control={
                  <Checkbox
                     defaultChecked={defaultValue}
                     
                     onClick={e => handleController('checked', e)}
                  />
               }
            />
         </>
      );
      case 'file':
      case 'files':
      return (
         <div className="relative">
            <TextField
               {...superAttrs}
               sx={{ width: "100%", pointerEvents: 'none' }}
               InputProps={{
                  endAdornment: <InputAdornment position="end"> <UploadFile /> </InputAdornment>
               }}
               multiline={type === 'files'}
            />
            <input
               className="w-full opacity-0 absolute top-0 left-0 bottom-0 cursor-pointer"
               type='file'
               onChange={e => {
                  const {
                     copiedFiles,
                     files,
                  } = useCopyFile({ files: e.target.files });

                  setUploadedFiles(
                     copiedFiles.length > 1 ?
                     copiedFiles.map(copiedFile => copiedFile.name).join(", ")
                     :
                     copiedFiles[0].name
                  )

                  return handleController('upload', files);
               }}
               multiple={type === 'files'}
            />
         </div>
      );
   };
};

/**
 * 
 * @param {{ type: 'text' | 'textarea' | 'checkbox' | 'file' | 'files' | 'number', yupSchema: yup.AnySchema, onValidate: (), onError: () => string[], onResult: () => string | number  }} param0 
 * @returns 
 */
export default function InputValidate({
   type = 'text',
   yupSchema,
   onValidate = validation => {},
   onError = errors => {},
   onResult = result => {},
   defaultValue,
   ...attrs
}) { 

   const {
      validation
   } = useValidation({ yupSchema });

   const handleBlur = e => {
      onResult(e);
   },
   handleChange = e => {
      onResult(e);
   },
   handleUpload = files => {
      onResult(files);
   },
   handleCheck = e => {
      onResult(e);
   };


   const [uploadedFiles, setUploadedFiles] = useState(''),
   [cacheValue, setCacheValue] = useState(''),
   [errors, setErrors] = useState([]);

   const inputRef = useRef(),
   inputControl = useRef(),
   inputFileRef = useRef();

   const handleValidate = async (type, value) => {
      const validInfo = await validation(value);

      setCacheValue(value);

      if(validInfo.valid) { 
         return setErrors([]);
      }
      else {
         return setErrors(beforeErrors => {
            return [...new Set([...beforeErrors, validInfo.error])];
         });
      }
   };

   useEffect(() => {
      inputRef.current.value = cacheValue;
      
      if(errors.length > 0) onError(errors);
      else onValidate();
   }, [errors]);

   /**
    * 
    * @param {'blur' | 'change' | 'checked' | 'upload'} type 
    * @param {Event | FileList} event 
    * @returns 
    */
   const handleController = async (type, event) => {
      // После прохода валидации
      switch(type) {
         case "blur":
         return handleBlur(event);
         case 'change':
         return handleChange(event);
         case 'checked':
         return handleCheck(event);
         case 'upload':
         return handleUpload(event);

         default: 
         return console.error(`${type} Такого типя для хенделинга нет!`)
      };
   };




   return (
      // <div ref={inputControl}>
      <InputTyped
         {...attrs}
         type={type}
         error={errors.length > 0}
         inputRef={inputRef}
         setUploadedFiles={setUploadedFiles}
         handleController={handleController}
         handleValidate={handleValidate}
         helperText={errors.length > 0 ? errors.length > 1 ? errors.join(", "): errors.join(): false}
         defaultValue={defaultValue}
      />
      // </div>
   );
};