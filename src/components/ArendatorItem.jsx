import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import { TextField, Typography } from "@mui/material";
import { deleteTentant, editTentant, reverseImageGet } from "../api/api";
import {deleteTentantOfStorage, getTentants} from "../slices/tentants";


export default function ArendatorItem({key, logo, id, object, category, name}) {
    const dispatch = useDispatch();

    const [mode, setMode] = useState('view');

    const [editName, setEditName] = useState(name),
    [editCategory, setEditCategory] = useState(category),
    [editLogo, setEditLogo] = useState({
        url: logo,
        file: '',
    });

    const [isDeleted, setIsDeleted] = useState(false),
    [editData, setIsEditData] = useState({}),
    [isEdit, setIsEdit] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleData = async () => {
            const getImageUrl = await reverseImageGet(logo);

            setEditLogo({
                url: URL.createObjectURL(getImageUrl.data),
                file: getImageUrl.data,
            })
        };

        handleData();
    }, []); 

    useEffect(() => {
        if(!isDeleted) return;

        dispatch(deleteTentantOfStorage({ id }));
    }, [isDeleted]);
    useEffect(() => {
        if(!isEdit) return;

    }, [isEdit]);

    const onSaveTentant = async id => {
        try {
            const responceEditTentant = await editTentant({
                id,
                name: editName,
                category: editCategory,
                logo: editLogo.file,
            });

            dispatch(getTentants()); 

            return setMode('view');
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
    },
    deleteTenant = async id => {
        const responceDeleteTentant = await deleteTentant(id);

        return setIsDeleted(true);
    };

    return (
        <div className={'flex border-2 p-2 items-center gap-4 justify-between max-w-[1280px]'}>
            {   
                mode === 'view' ?
                <img
                    width="200"
                    height="200"
                    src={`/public/${logo}`} 
                />
                :
                <>
                    <div className="relative">
                        <img 
                            width="200"
                            height="200"
                            src={editLogo.url}
                        />

                        <input 
                            type='file' 
                            className="opacity-0 absolute w-full h-full top-0 bottom-0"
                            onChange={e => {
                                setEditLogo({
                                    url: URL.createObjectURL(e.target.files[0]),
                                    file: e.target.files[0],
                                });
                            }}
                        />
                    </div>
                </>
            }

            <div className={'flex flex-col gap-2'}>
                <div className="flex flex-col gap-1">
                    {
                        mode === 'view' ?
                        <>
                            <Typography variant="body"> {name} </Typography>
                            <Typography variant="caption">{category}</Typography>
                        </>
                        :
                        <>
                            <TextField
                                label="Название"
                                defaultValue={name}
                                onChange={e => setEditName(e.target.value)}
                                error={!!errors?.name}
                                helperText={!!errors?.name ? errors.name: false}
                            />
                            <TextField
                                label="Категория"
                                defaultValue={category}
                                onChange={e => setEditCategory(e.target.value)}
                                error={!!errors?.category}
                                helperText={!!errors?.category ? errors.category: false}
                            />
                        </>
                    }          
                </div>

                <div className="flex gap-2">
                    {
                        mode === 'view' ?

                        <Button 
                            variant={"contained"}
                            onClick={async (e) => {
                                //if(mode === 'edit') await onSaveTentant(id);

                                return mode === 'view' ? setMode('edit'): setMode('view')
                            }}
                        >
                            { mode === 'edit' ? 'Сохранить': 'Редактировать' }
                        </Button>
                        :
                        <Button
                            variant="contained"
                            onClick={async () => {
                                return await onSaveTentant(id);
                            }}
                        >
                            Сохранить
                        </Button>
                    }

                    <Button 
                        onClick={async (e) => {
                            await deleteTenant(id).finally(() => {
                                dispatch(getTentants())
                            });
                        }}      
                        variant={"contained"} 
                        color={"error"}
                    >
                        Удалить
                    </Button>
                </div>
            </div>
        </div>
    )
}