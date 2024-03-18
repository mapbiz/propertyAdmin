/**
 * 
 * @param {{ yupSchema: yup.AnySchema }} param0 
 * @returns {{
 *   validation: (value: string | number) => Promise<{ valid: true, validationResult: string | number }> | Promise<{valid: false, error: string}>
 * }}
 */
export const useValidation = ({ yupSchema }) => {
   return {
      async validation(value) {
         try {
            const validationResult = await yupSchema.validate(value, {
               abortEarly: false,
               disableStackTrace: true,
            });

            return {
               valid: true,
               validationResult,
            }
         }
         catch(err) {
            if(err.name !== 'ValidationError') return;
            
            return {
               valid: false,
               error: err.message,
            };
         };
      },
   };
};