import ArendatorItem from "./ArendatorItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchArendators, fetchArendatorsFailure, fetchArendatorsSuccess} from "../slices/arendatorsSlice.jsx";
import { getTentants, addNewTentant } from "../slices/tentants.jsx";

import {addTentant, getArendators} from "../api/api.js";
import {useEffect, useState} from "react";
import { Button, Typography, TextField, } from "@mui/material";


export const getArendatorsRedux = () => async (dispatch) => {
    try {
        dispatch(fetchArendators());
        const landlords = await getArendators().then(r => {
            return r.data
        });
        dispatch(fetchArendatorsSuccess(landlords));
    } catch (error) {
        dispatch(fetchArendatorsFailure(error.message));
    }
};


export default function ArendatorsList() {
    const dispatch = useDispatch();

    const tentants = useSelector(state => state.tentants);

    const [isLoading, setIsLoading] = useState(true);

    const [createTentant, setCreateTentant] = useState(false);  

    const [name, setName] = useState(''),
    [category, setCategory] = useState(''),
    [logo, setLogo] = useState({});


    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getTentants());
    }, []);

    useEffect(() => {
        setErrors({});
    }, [logo, name, category]) 

    useEffect(() => {
        if(tentants.isLoading) return;

        setIsLoading(false);
    }, [tentants.isLoading])

    const addNew = async () => {
        try {
            const responceCreateTentant = await addTentant({
                name,
                category,
                logo: logo.file,
            });
            

            dispatch(getTentants());

            setLogo({});

            return setCreateTentant(false);
        }
        catch(responceError) {
            if(!!responceError.response.data?.errors) {
                setErrors(beforeErrors => {
                    let errors = {};

                    responceError.response.data?.errors.forEach(errorObject => {
                        errors[errorObject.field.split('/')[1]] = errorObject.message;
                    });

                    return errors;
                });
                console.log(errors);
            };

            if(!!responceError.response.data?.error) {
                setErrors({
                    name: responceError.response.data.error.message,
                });
            };
        };
    };

    return (
        <main className={'pt-[150px] flex-1'}>
            <div className="flex justify-center mb-2">
                <Button onClick={e => setCreateTentant(true)}>
                    Добавить нового арендатора
                </Button>
            </div>

            <div className="w-full flex justify-center">
                {
                    createTentant &&
                    <div className={'flex border-2 p-2 items-center gap-4 justify-between max-w-[1280px]'}>
                        <div className="relative">
                            {
                                logo.toString().length > 0 &&
                                <img 
                                    width="200"
                                    height="200"
                                    src={logo.url}
                                />
                            }

                            <input 
                                type='file' 
                                accept="image/*"
                                className={`${ logo.toString().length > 0 ? 'opacity-0 absolute w-full h-full top-0 bottom-0': ''}`}
                                onChange={e => {
                                    setLogo({
                                        url: URL.createObjectURL(e.target.files[0]),
                                        file: e.target.files[0],
                                    });
                                }}
                            />

                            {
                                errors?.logo !== undefined &&
                                <Typography 
                                    variant="body"
                                    color="error"
                                >
                                    {
                                        errors.logo
                                    }
                                </Typography>
                            }
                        </div>
                        <div className={'flex flex-col gap-2'}>
                            <div className="flex flex-col gap-1">
                                <TextField
                                    label="Название"
                                    onChange={e => setName(e.target.value)}
                                    error={!!errors?.name}
                                    helperText={!!errors?.name ? errors.name: false}
                                />
                                <TextField
                                    label="Категория"
                                    onChange={e => setCategory(e.target.value)}
                                    error={!!errors?.category}
                                    helperText={!!errors?.category ? errors.category: false}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={async () => await addNew()}>Сохранить</Button>
                        </div>
                    </div>
                }
            </div>

            {
                isLoading ?
                <> Подождите немного загружается... </>
                :
                <div className="flex flex-col justify-center items-center gap-y-2">
                    {
                        tentants.value?.length > 0 ?
                        tentants.value.map(item => {
                            return (
                                <ArendatorItem 
                                    name={item.name} 
                                    category={item.category} 
                                    id={item.id} 
                                    logo={item.logo} 
                                    key={item.id} 
                                />
                            )
                        })
                        :  
                        <Typography variant="body">Сначала добавьте аредндатора</Typography>
                    }
                </div>
            }
        </main>
    )
}