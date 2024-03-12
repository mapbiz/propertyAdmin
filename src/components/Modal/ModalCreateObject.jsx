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
   createObject, 
   stagesObject,
   resetCreateObject,
   deleteCreatedObject,
} from "../../slices/createObjectSlice";
import { useDispatch, useSelector } from "react-redux";
import InputFile from "../Input/InputFile";
import Textarea from "../Input/Textarea";
import { countDuplicates, addKeys } from "../../helpers/array";
import { setObject } from "../../slices/tagSlice";
import Tentants from "../Tentants";
import ObjectTentant from "../Tentant/ObjectTentant";
import { createTentantsInCard } from "../../api/api";

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

   const [isLoadingCreate, setIsLoadingCreate] = useState(true);

   const objectCreate = useSelector(state => state.createObject),
   dispatch = useDispatch();  

   const [stageForm, setStageForm] = useState("");

   const [formError, setFormError] = useState("");

   const [errorsFieldsValidate, setErrorsFields] = useState({}),
   [errorsFieldsBeforeValidate, setErrorsFieldsBeforeValidate] = useState({});

   useEffect(() => {
      if(objectCreate.type === null) return;

      const getObjectFieldsOfType = Object
      .keys(objectCreate.value)
      .map(objectField => {
         return {
            ...objectCreate.fields[objectField],
            value: objectCreate.value[objectField],
            fieldName: objectField,
         };
      }),
      getRequiredFields = getObjectFieldsOfType.filter(objectField => !!objectField?.required)
      


      setErrorsFields(beforeErrorsFields => {
         let errors = {};

         getRequiredFields.forEach(requiredField => {
            if(requiredField.value.toString().length === 0) errors[requiredField.fieldName] = {
               form: `${requiredField.name}, обязательно для заполнения!`,
            };
         });

         return errors;
      });

   }, [objectCreate, objectCreate.value, objectCreate.type, objectCreate.fields]);

   // Если шаг стал 0, сбросить валидацию
   useEffect(() => {
      if(step === 0) {
         // Сброс при выходе
         setValidate(true);
         setErrorsFields({});
         setErrorsFieldsBeforeValidate({});
      }; 
      if(step === 2) {
         setFormError('');
      };


   }, [step]);

   useEffect(() => {
      if(objectCreate.isLoading === null) return;

      if(!objectCreate.isLoading && !!objectCreate?.error) {
         setErrorsFields({});
         setErrorsFieldsBeforeValidate({});
         setStep(1);
         setFormError("Поле Загловок должно быть уникальным");
         setIsOpen(false);
      };

      // if(!objectCreate.isLoading && objectCreate.createdObject !== null) {
      //    dispatch(setObject(objectCreate.createdObject));
      // };

      setIsLoadingCreate(objectCreate.isLoading);

   }, [objectCreate.isLoading]);

   const tryFieldValidate = (fieldName, fieldValue) => {
      const getObjectFieldsOfType = Object
      .keys(objectCreate.value)
      .map(objectField => {
         return {
            ...objectCreate.fields[objectField],
            value: objectCreate.value[objectField],
            fieldName: objectField,
         };
      }),
      getRequiredFields = getObjectFieldsOfType.filter(objectField => !!objectField?.required);

      const findRequiredField = getRequiredFields.find(requiredField => requiredField.fieldName === fieldName);

      if(!findRequiredField) return;
      
      setErrorsFieldsBeforeValidate(beforeErrorsFields => {
         let newErrors = {
            ...beforeErrorsFields,
         };

         if(fieldValue.toString().length === 0) newErrors[fieldName] = "Поле обзятельно для заполнения!";
         else Reflect.deleteProperty(newErrors, fieldName);
         
         
         return newErrors;
      });
   },
   tryValidateForm = () => {
      if(JSON.stringify(errorsFieldsValidate) === "{}") {
         setValidate(true);

         return true;
      }
      else {
         setValidate(false);

         Object
         .keys(errorsFieldsValidate)
         .map(errorField => {
            setErrorsFieldsBeforeValidate(beforeErrorFields => {
               const newErrorsField = {
                  ...beforeErrorFields,
               };


               newErrorsField[errorField] = "Поле обязательно для заполнения";

               return {
                  ...newErrorsField,
               }
            });
         });

         return false;
      }
   };

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

   // const validateInputs = () => {
   //    // Фильтрация только на поля нужные к валидовке
   //    const getRequiredFields = sortObjectInputFields
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


   //    // required validation
   //    const validateArray = getRequiredFields.map(requiredField => {
   //       dispatch(setErrorsOnField({
   //          errors: ["Поле обязательно для заполнения"],
   //          field: requiredField.field,
   //       }));

   //       return requiredField.field;
   //    });


   //    setValidate(validateArray.length === 0);
   // };

   const nextStep = async () => {
      if(objectCreate.type === 'sale-business' && step === 1) {
         await enterTentant();
      };
      
      setStep(step+1);
   },
   finishStep = async () => {
      if(getErrorsFields.length > 0) return;

      if(objectCreate.type !== 'sale-business') dispatch(createObject(objectCreate.value));
      if(objectCreate.type === 'sale-business') {
         if(objectCreate.createdObject?.tenantsInfo?.length > 0) {
            const createTentant = objectCreate.createdObject?.tenantsInfo?.filter(tentant => tentant.type === 'create');

            // console.log(createTentant, );

            console.log(objectCreate.createdObject);

            await createTentantsInCard(createTentant.map(tentant => {
               const newTentant = {
                  ...tentant,
               };

               newTentant.tentantId = newTentant.tentant.id;

               delete newTentant.type;
               delete newTentant.tentant;
               

               return newTentant;
            }), objectCreate.createdObject?.id);
         }
      };
      
      dispatch(resetCreateObject());
      setValidate(true);
      setErrorsFields({});
      setErrorsFieldsBeforeValidate({});
      setStep(0);
      setMaxSteps(1);
      setIsOpen(false);
   },
   prevStep = () => {
      if(stageForm === 'objectCreated' && objectCreate.type === 'sale-business') {
         const confirmExit = confirm(`Вы уверены что хотите выйти?
         Обьект будет сброшен, и все настроенные арендаторы тоже`);

         return confirmExit ? setStep(step-1): null;
      };

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

   const close = () => {
      if(objectCreate.createdObject !== null) {
         const confirmDelete = confirm("Если вы закроете данные будут удалены, вы уверены?");



         if(confirmDelete) dispatch(deleteCreatedObject(objectCreate.createdObject.id));
         if(!confirmDelete) return;
      };

      dispatch(resetCreateObject());
      setValidate(true);
      setErrorsFields({});
      setErrorsFieldsBeforeValidate({});
      setStep(0);
      setMaxSteps(1);
      setIsOpen(false);
      return;
   };

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

               <IconButton onClick={() => close()}>
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
                                                         
                                                         tryFieldValidate(createInput.field, e.target.value);

                                                         console.log({ errorsFieldsBeforeValidate });
                                                      }}
                                                      error={!!errorsFieldsBeforeValidate[createInput.field]}
                                                      helperText={
                                                         !!errorsFieldsBeforeValidate[createInput.field] ? 
                                                         errorsFieldsBeforeValidate[createInput.field]: false
                                                      }
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

                                                         tryFieldValidate(createInput.field, e.target.value);
                                                      }}
                                                      error={!!errorsFieldsBeforeValidate[createInput.field]}
                                                      helperText={
                                                         !!errorsFieldsBeforeValidate[createInput.field] ? 
                                                         errorsFieldsBeforeValidate[createInput.field]: false
                                                      }
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

                                                         // if(!!createInput?.error) dispatch(clearErrorsOnField({
                                                         //    field: createInput.field,
                                                         // }))
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
                        {
                           isLoadingCreate ?
                           <> Подождите загружается... </>
                           :
                           <Card>
                              <CardContent>
                                 {/* <Tentants /> */}
                                 <ObjectTentant
                                    
                                 />
                              </CardContent>
                           </Card>
                        }
                     </StepContent>
                  </Step>
               </Stepper>

               { step >= 1 &&
                  <Box sx={{ marginTop: 4 }}>
                     <Button
                        variant="contained"
                        disabled={!validate}
                        color={validate ? 'primary': 'error'}
                        onClick={() => {
                           const valid = tryValidateForm();

                           if(valid) return step === maxSteps ? finishStep(): nextStep();

                        }}
                     >
                        {
                           !validate ?
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
               {
                  formError.length > 0 &&
                  <Typography
                     color="error"
                     variant="body"
                  >{formError}</Typography>
               }
            </DialogContent>
         
         </Dialog>
      </>
   )
};