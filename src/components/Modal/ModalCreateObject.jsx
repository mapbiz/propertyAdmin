import { useState, useMemo, useEffect } from "react";


import { 
   Dialog, 
   Checkbox,
   DialogContent, 
   DialogTitle, 
   IconButton,
   Stepper,
   StepLabel,
   Step,
   StepContent,
   Box,
   Button,
   Card,
   CardContent,
   TextField,
   FormControlLabel,
   Typography,
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';

import { UploadFile } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';

import { 
   pickObjectType, 
   typesObject, 
   changeObjectField, 
   setErrorsOnField,
   clearErrorsOnField,
   resetObjectField, 
   createObject, 
   stagesObject,
   validateFieldsObject,
   pickObjectStage
} from "../../slices/createObjectSlice";
import { useDispatch, useSelector } from "react-redux";
import InputFile from "../Input/InputFile";
import Textarea from "../Input/Textarea";
import { countDuplicates, addKeys } from "../../helpers/array";

export default function ModalCreateObject({
   onNextStep = step => {},
   onFinishStep = () => {},
   onPrevStep = step => {},

   Activator = ({ toggleOpen }) => {
      return (
         <button onClick={() => {
            toggleOpen();
         }}>
            Активатор не задан
         </button>
      )
   },
}) {
   const [isOpen, setIsOpen] = useState(false);

   const [step, setStep] = useState(0),
   [maxSteps, setMaxSteps] = useState(1),
   [touchedImagesInputs, setTouchedImagesInputs] = useState([]),
   [validate, setValidate] = useState(true),
   [isFinish, setIsFinish] = useState(false);

   const objectCreate = useSelector(state => state.createObject),
   dispatch = useDispatch();

   const sortObjectInputFields = useMemo(
      () => {
         // Пока не выбран тип поля не сортируются
         if(objectCreate.type === null) return [];

         const getOfInputType = Object
         .keys(objectCreate.value).map(fieldValue => {
            return {
               ...objectCreate.fields[fieldValue],
               field: fieldValue,
            }
         }),
         getInputTypes = getOfInputType
         .map(field => field.input);

         const countDuplicatesInputType = countDuplicates(getInputTypes);

         const readyFieldArray = []; 

         Object.keys(countDuplicatesInputType).map(dupField => {
            const objectCreateFieldsArr = getOfInputType
            .map(field => {
               return field.input === dupField ? field: null;
            })
            .filter(field => !!field)
            .map(field => {
               return field;
            });

            readyFieldArray.push(...objectCreateFieldsArr);
         });


         return addKeys(readyFieldArray);
      },
      [objectCreate]
   ),
   getErrorsFields = useMemo(
      () => {
         return Object
         .keys(objectCreate.value)
         .map(fieldValue => {
            return {
               ...objectCreate.fields[fieldValue],
               field: fieldValue,
            }
         })
         .filter(field => !!field?.error);

      },
      [objectCreate.fields, objectCreate.value],
   )

   const enterTentant = async () => {
      dispatch(createObject(objectCreate.value));
   };

   const validateInputs = () => {
      // Фильтрация только на поля нужные к валидовке
      const getRequiredFields = sortObjectInputFields
      .filter(field => !!field?.required)
      .map(field => {
         if(objectCreate.value[field.field].toString().length === 0) {
            return {
               ...field,
               value: objectCreate.value[field.field],
            };
         }
      })
      .filter(requiredField => !!requiredField);


      // required validation
      const validateArray = getRequiredFields.map(requiredField => {
         dispatch(setErrorsOnField({
            errors: ["Поле обязательно для заполнения"],
            field: requiredField.field,
         }));

         return requiredField.field;
      });


      setValidate(validateArray.length === 0);
   };

   const nextStep = async () => {
      if(!validate) return;

      if(objectCreate.type === 'sale-business' && step === 1) {
         await enterTentant();

         return;
      };
      
      setStep(step+1);
   },
   finishStep = () => {
      if(getErrorsFields.length > 0) return;

      dispatch(createObject(objectCreate.value));
   },
   prevStep = () => {
      setStep(step-1);
   };

   const pickType = type => {
      dispatch(pickObjectType({ type }));

      if(type !== null && typesObject[type] !== undefined) nextStep();
      if(type === 'sale-business') setMaxSteps(2);
      else setMaxSteps(1);
   };

   const toggleOpen = () => {
      setIsOpen(!isOpen);
   }; 

   // useEffect(() => {
   //    console.log(objectCreate);

   //    // Фильтрация только на поля нужные к валидовке
   //    const getErroredRequiredFields = sortObjectInputFields
   //    .filter(field => !!field?.required)
   //    .map(field => {
   //       if(objectCreate.value[field.field].toString().length === 0) {
   //          return {
   //             ...field,
   //             value: objectCreate.value[field.field],
   //          };
   //       }
   //    })
   //    .filter(requiredField => !!requiredField);

   //    if(getErroredRequiredFields.length > 0) dispatch(pickObjectStage(stagesObject.error));
   //    else dispatch(pickObjectStage(stagesObject.beforeCreate));
      
   // }, [objectCreate.fields, objectCreate.value]);
   // useEffect(() => {

   //    if(objectCreate.stage === stagesObject.validate) validateInputs();
   // }, [objectCreate.value, objectCreate.stage]);

   return (
      <>
         <Activator toggleOpen={toggleOpen} />
         
         <Dialog
            open={isOpen}
            fullWidth
            maxWidth={'lg'}
         >
            <div className="flex px-[24px]">
               <DialogTitle sx={{ paddingX: 0, flex: '1'  }}> Создание обьекта </DialogTitle>

               <IconButton onClick={() => setIsOpen(false)}>
                  <CloseIcon />
               </IconButton>
            </div>

            <DialogContent>
               <Stepper activeStep={step}>
                  <Step>
                     <StepLabel> Выберите тип обьекта </StepLabel>
                     <StepContent>
                        <Card>
                           <CardContent>
                              {
                                 Object.keys(typesObject)
                                 .map(type => {
                                    return (
                                       <Button onClick={() => {
                                          pickType(type)
                                       }}>
                                          {typesObject[type]}
                                       </Button>
                                    );
                                 })
                              }
                           </CardContent>
                        </Card>
                     </StepContent>
                  </Step>
                  <Step>
                     <StepLabel> Заполните данные об обьекте </StepLabel>
                     <StepContent>
                        <Card>
                           <CardContent>
                              <div className="grid grid-cols-3 gap-5">
                                 {
                                    sortObjectInputFields.length > 0 &&
                                    sortObjectInputFields
                                    .map(createField => {
                                       const createInput = createField,
                                       createInputValue = objectCreate.value[createInput.field];

                                       const ObjectInput = () => {
                                          switch(createInput.input) {
                                             case "text":
                                             return (
                                                <>
                                                   <TextField
                                                      variant="outlined"
                                                      label={createInput.name}
                                                      defaultValue={createInputValue}
                                                      onBlur={async e => {
                                                         dispatch(changeObjectField({
                                                            field: createInput.field,
                                                            value: e.target.value,
                                                         }));

                                                         if((e.target.value.toString().length === 0 && !createInput?.error) && !!createInput?.required) {
                                                            dispatch(setErrorsOnField({
                                                               field: createField.field,
                                                               errors: ["Поле обязательно для заполнения"],
                                                            }))
                                                         };

                                                         if(!!createInput?.error && e.target.value.toString().length > 0) {
                                                            dispatch(clearErrorsOnField({
                                                               field: createInput.field,
                                                            }));
                                                         };
                                                      }}
                                                      error={!!createInput?.error}
                                                      helperText={createInput?.error}
                                                   />
                                                </>
                                             );
                                             case "number":
                                             return (
                                                <>
                                                   <TextField
                                                      variant="outlined"
                                                      type="number"
                                                      label={createInput.name}
                                                      defaultValue={createInputValue}
                                                      onBlur={e => {
                                                         dispatch(changeObjectField({
                                                            field: createInput.field,
                                                            value: +e.target.value,
                                                         }));

                                                         if(!!createInput?.error && e.target.value.toString().length > 0) {
                                                            dispatch(clearErrorsOnField({
                                                               field: createInput.field,
                                                            }));
                                                         };
                                                      }}
                                                      error={!!createInput?.error}
                                                      helperText={createInput?.error}
                                                   />
                                                </>
                                             );
                                             case "files":
                                             return (
                                                <div className="flex flex-col">
                                                   <InputFile
                                                      type="files"
                                                      textUploaded={
                                                         Array.from(createInputValue)?.length > 0 ? 
                                                         Array.from(createInputValue).map(file => file.name.split(".")[0]).join(","): ''
                                                      }
                                                      onUpload={files => {
                                                         dispatch(changeObjectField({
                                                            field: createInput.field,
                                                            value: files,
                                                         }));

                                                         if(!!createInput?.error) dispatch(clearErrorsOnField({
                                                            field: createInput.field,
                                                         }))
                                                      }}
                                                      label={createInput.name}
                                                   />
                                                   
                                                   {
                                                      !!createInput?.error &&
                                                      <>
                                                         <Typography
                                                            color="error"
                                                            variant="body"
                                                         >
                                                            {createInput.error}
                                                         </Typography>
                                                      </>
                                                   }
                                                </div>
                                             );
                                             case "file":
                                             return (
                                                <>
                                                   <InputFile
                                                      type="file"
                                                      textUploaded={!!createInputValue?.name ? createInputValue.name.split(".")[0]: ''}
                                                      onUpload={file => {
                                                         dispatch(changeObjectField({
                                                            field: createInput.field,
                                                            value: file,
                                                         }));
                                                      }}
                                                      label={createInput.name}
                                                   />
                                                </>
                                             )
                                             case "textarea":
                                             return (
                                                <div className="w-full flex">
                                                   <Textarea
                                                      placeholder={createInput.name}
                                                      defaultValue={createInputValue}
                                                      onBlur={e => {
                                                         dispatch(changeObjectField({
                                                            field: createInput.field,
                                                            value: e.target.value,
                                                         }))
                                                      }}
                                                      
                                                      type="textarea"
                                                      variant="outlined"
                                                   />
                                                </div>
                                             )
                                             case "checkbox": 
                                             return (
                                                <>
                                                   <FormControlLabel
                                                      control={
                                                         <Checkbox
                                                            defaultValue={createInputValue}
                                                            onChange={e => {
                                                               console.log(e);

                                                               dispatch(changeObjectField({
                                                                  field: createInput.field,
                                                                  value: e.target.checked,
                                                               }))
                                                            }}
                                                         />
                                                      }
                                                      label={createInput.name}
                                                   />
                                                   
                                                </>
                                             )
                                             default:
                                             return (
                                                <>
                                                   Нет такого типа { createInput.input }
                                                </>
                                             );
                                          };
                                       };

                                       return (
                                          <>
                                             <ObjectInput key={createField.id} />
                                          </>
                                       )
                                    })
                                 }
                              </div>
                           </CardContent>
                        </Card>
                     </StepContent>
                  </Step>
                  <Step 
                     sx={{ 
                        display: (objectCreate.type === 'sale-business') ? 'block': 'none'
                     }}
                  >
                     <StepLabel> Заполните арендаторов </StepLabel>
                     <StepContent>
                        <Card>
                           <CardContent>
                              <Button onClick={e => console.log(objectCreate)}>click</Button>   
                           </CardContent>
                        </Card>
                     </StepContent>
                  </Step>
               </Stepper>

               { step >= 1 &&
                  <Box sx={{ marginTop: 4 }}>
                     <Button
                        variant="contained"
                        disabled={getErrorsFields.length > 0}
                        color={validate ? 'primary': 'error'}
                        onClick={() => {
                           dispatch(validateFieldsObject());

                           if(getErrorsFields.length === 0) return step === maxSteps ? finishStep(): nextStep()
                        }}
                     >
                        {
                           getErrorsFields.length > 0 ?
                           <> Решите ошибки </>
                           :
                           <>
                              { step === maxSteps ? 'Закончить': 'Далее' }
                           </>
                        }
                     </Button>
                     <Button
                        onClick={() => {
                           return prevStep();
                        }}
                     >
                        Назад
                     </Button>
                  </Box>
               }
            </DialogContent>
         
         </Dialog>
      </>
   )
};