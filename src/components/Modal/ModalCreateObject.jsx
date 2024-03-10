import { useState, useMemo, useEffect, useId } from "react";


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
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';

import { UploadFile } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';

import { pickObjectType, typesObject, changeObjectField, resetObjectField, createObject } from "../../slices/createObjectSlice";
import { useDispatch, useSelector } from "react-redux";
import InputFile from "../Input/InputFile";
import Textarea from "../Input/Textarea";
import { countDuplicates } from "../../helpers/array";

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
   [isFinish, setIsFinish] = useState(false);

   const objectCreate = useSelector(state => state.createObject),
   dispatch = useDispatch();

   const enterTentant = async () => {
      dispatch(createObject(objectCreate.value));
   };

   const nextStep = async () => {
      if(objectCreate.type === 'sale-business' && step === 1) {
         await enterTentant();
      };
      
      setStep(step+1);
   },
   finishStep = () => {
      console.log('finish');
   },
   prevStep = () => {
      setStep(step-1);
   };

   const pickType = type => {
      dispatch(pickObjectType({ type }));

      if(type !== null && typesObject[type] !== undefined) nextStep();
      if(type === 'sale-business') setMaxSteps(2);
   };

   const toggleOpen = () => {
      setIsOpen(!isOpen);
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

         return readyFieldArray.map(field => {
            return {
               ...field, 
               id: Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER),
            }
         });
      },
      [objectCreate]
   );

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
                                                      onBlur={e => {
                                                         dispatch(changeObjectField({
                                                            field: createInput.field,
                                                            value: e.target.value,
                                                         }));
                                                      }}
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
                                                         }))
                                                      }}
                                                   />
                                                </>
                                             );
                                             case "files":
                                             return (
                                                <>
                        
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
                                                      }}
                                                      label={createInput.name}
                                                   />
                                                </>
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
                        display: objectCreate.type === 'sale-business' ? 'block': 'none'
                     }}
                  >
                     <StepLabel> Заполните арендаторов </StepLabel>
                     <StepContent>
                        <Card>
                           <CardContent>
                              Арендаторы   
                           </CardContent>
                        </Card>
                     </StepContent>
                  </Step>
               </Stepper>

               <Box sx={{ marginTop: 4 }}>
                  <Button
                     variant="contained"
                     onClick={() => {
                        return step === maxSteps ? finishStep(): nextStep()
                     }}
                  >
                     { step === maxSteps ? 'Закончить': 'Далее' }
                  </Button>
                  <Button
                     onClick={() => {
                        return prevStep();
                     }}
                  >
                     Назад
                  </Button>
               </Box>
            </DialogContent>
         
         </Dialog>
      </>
   )
};