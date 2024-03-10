import { Button } from "@mui/material";

import { UploadFile } from "@mui/icons-material";

import { useEffect, useState } from "react";

export default function InputFile({
   type='file',
   textUploaded = '',
   label,
   onUpload = files => {},
   ...attrs
}) {
   return (

      <Button
         variant="contained"
         sx={{
            position: 'relative'
         }}
      >  
         <UploadFile sx={{ marginRight: 2, display: textUploaded.length > 0 ? 'none': 'block' }} />
         <span>{ textUploaded.length > 0 ? textUploaded : label}</span>

         <input
            className='w-full opacity-0 absolute top-0 left-0 bottom-0' 
            role="button"
            onChange={e => {
               onUpload(type === 'file' ? e.target.files[0]: e.target.files);
            }}
            multiple={type === 'files'}
            type={type === 'files' ? 'file': type}
         />
      </Button>
   );
};