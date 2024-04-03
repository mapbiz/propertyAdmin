import { InputAdornment, TextField } from "@mui/material";

import { InputTwoTone, UploadFile } from "@mui/icons-material";

import { useEffect, useId, useRef, useState } from "react";
import useCopyFile from "../../helpers/useCopyFile";

export default function InputFile({
   type='file',
   label,
    accept="*",
   isError=false,
   textUploaded = '',
   onUpload = files => {},
   ...attrs
}) {

   return (
      <div
         className="relative w-full"
      >
         <TextField
            {...attrs}
            label={textUploaded}
            sx={{ pointerEvents: 'none' }}
            multiline
            variant="outlined"
            InputProps={{
               endAdornment: <InputAdornment position="end"> <UploadFile color={isError ? 'error': 'primary'} /> </InputAdornment>
            }}
         />

         <input
            className='w-full opacity-0 absolute top-0 left-0 bottom-0'
            role="button"
            accept={accept}
            onChange={e => {
               let {
                  copiedFiles,
                  files,
               } = useCopyFile({
                  files: e.target.files,
               });

               return onUpload(type === 'file' ? files[0]: files);
            }}
            multiple={type === 'files'}
            type="file"
         />
      </div>
      // <Button
      //    variant="contained"
      //    sx={{
      //       position: 'relative'
      //    }}
      // >
      //    <UploadFile sx={{ marginRight: 2, display: textUploaded.length > 0 ? 'none': 'block' }} />
      //    <span>{ textUploaded.length > 0 ? textUploaded : label}</span>

         // <input
         //    className='w-full opacity-0 absolute top-0 left-0 bottom-0'
         //    role="button"
         //    onChange={e => {
         //       onUpload(type === 'file' ? e.target.files[0]: e.target.files);
         //    }}
         //    multiple={type === 'files'}
         //    type={type}
         // />

      // </Button>
   );
};