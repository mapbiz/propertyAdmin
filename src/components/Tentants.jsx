import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';

import AddIcon from '@mui/icons-material/Add';

import Input from "./Input.jsx";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { createTentantsInCard, removeTentantOfObject, updateTentantsInCard } from '../api/api.js';

import { addNewTentant, joinTentant, setTentantData, deleteTenant } from "../slices/tagSlice.jsx";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { ListItemAvatar, ListItemText, TextField, Menu } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Tentants({

}) {
    const objectStorage = useSelector(state => state.tagMore.value),
    tentans = useSelector(state => state.tentants.value),
    objectStorageTentants = objectStorage.tenantsInfo,
    dispatch = useDispatch();


    const [isOpenSelect, setIsOpenSelect] = useState(true);

    const clickAddNewTentant = () => {
        dispatch(addNewTentant());
    };

    const [joinedTentant, setJoinedTentant] = useState([]);

   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
      

   const handleMenuClick = e => {
      setAnchorEl(e.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   },
   handleCloseItem = tentant => {
      console.log({ tentant });

        dispatch(joinTentant({
            tentant,
        }));

      return handleClose();
   };

    const clickSelectTentant = (tentant, index) => {
        clickAddNewTentant();
        
        dispatch(joinTentant({tentant, index}));
        setIsOpenSelect(false);
    }

    const clickSaveChanges = async () => {
        const createNewTentantInObject = objectStorage.tenantsInfo.filter(tentant => tentant.type === 'create'),
        updateTentantInObject = objectStorage.tenantsInfo.filter(tentant => tentant.type === 'update');

        console.log(objectStorage.tenantsInfo);

        const responceToCreate = createNewTentantInObject.length > 0 ? await createTentantsInCard(createNewTentantInObject.map(tentant => {
            const newTentant = {
                ...tentant,
            };

            newTentant.tentantId = newTentant.tentant.id;

            delete newTentant.type;
            delete newTentant.tentant;
            

            return newTentant;
        }), objectStorage.id) : null;


        const responceToUpdate = updateTentantInObject.length > 0 ? await updateTentantsInCard(updateTentantInObject.map(tentant => {
            const newTentant = {
                ...tentant,
                rentFlow: {
                    ...tentant.rentFlow,
                },
            };

            newTentant.tentantId = newTentant.tentant.id;


            delete newTentant.rentFlow.mouth;
            delete newTentant.type;
            delete newTentant.tentant;
            
            return newTentant;
        }), objectStorage.id)
        : null;

    };

    const onClickDeleteJoinTentant = async tentant => {
        dispatch(deleteTenant(tentant.id));

        await removeTentantOfObject([{ tenatantId: tentant.id }], objectStorage.id);
    };

    return (
        <>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    objectStorage.tenantsInfo.length > 0 ?
                        <>
                            
                            { 
                                objectStorage.tenantsInfo.map((tentantInObject, index) => {
                                    return (
                                        <>
                                            {
                                                !tentantInObject.tentant.id ?
                                                <>
                                                    {/* <FormControl sx={{ width: '100%', marginTop: 4, }}>
                                                        <InputLabel id="select-label">Выбрать арендатора</InputLabel>
                                                        <Select
                                                            sx={{ width: '100%' }}
                                                            className="w-full"
                                                            open={isOpenSelect}
                                                            id="select"
                                                            onClick={e => {
                                                                if(e.target.id === 'select') setIsOpenSelect(true);
                                                                else setIsOpenSelect(false);
                                                            }}
                                                            labelId="select-label"
                                                        >
                                                            {
                                                                tentans.length > 0 ?
                                                                <>
                                                                    <MenuItem disabled value="">
                                                                        <em>Выберете арендатора</em>
                                                                    </MenuItem>
                                                                    {
                                                                        [...tentans].map(tentant => {
                                                                            return (
                                                                                <>
                                                                                    { 
                                                                                        objectStorage
                                                                                        .tenantsInfo
                                                                                        .findIndex(tentantInfo => tentantInfo.tentant.id === tentant.id) === -1 &&

                                                                                        <MenuItem
                                                                                            onClick={e => clickSelectTentant(tentant, index)}
                                                                                            key={tentant.id}
                                                                                            value={tentant.id}
                                                                                        >
                                                                                            {tentant.name}
                                                                                        </MenuItem>
                                                                                    }
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    Сначала создайте арендаторов
                                                                </>
                                                            }
                                                        </Select>
                                                    </FormControl> */}
                                                </>
                                                :
                                                <>
                                                    <ListItem 
                                                        sx={{ width: "100%" }}
                                                        key={tentantInObject.tentant.id}
                                                    >
                                                        <div className='flex flex-col'>
                                                            <div className='flex items-center'>
                                                                <ListItemAvatar>
                                                                    <img 
                                                                        width="200" 
                                                                        height="200" 
                                                                        src={`https://prop-test.ru/server/public/${tentantInObject.tentant.logo}`} 
                                                                    />
                                                                </ListItemAvatar>
                                                                <ListItemText 
                                                                    primary={tentantInObject.tentant.name}
                                                                    secondary={tentantInObject.tentant.category}
                                                                />
                                                                <Button 
                                                                    color="error"
                                                                    onClick={() => {
                                                                        if(tentantInObject.type === 'update') 
                                                                        return onClickDeleteJoinTentant(tentantInObject.tentant);
                                                                        else dispatch(deleteTenant(tentantInObject.tentant.id));
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </div>
                                                            
                                                            <div className='flex gap-4 items-end'>
                                                                <TextField
                                                                    variant="standard"
                                                                    label="Индексация"
                                                                    type="number"
                                                                    defaultValue={tentantInObject.indexation}
                                                                    onBlur={e => {
                                                                        const newTentant = {
                                                                            ...tentantInObject
                                                                        }

                                                                        console.log(typeof +e.target.value); 
                                                                        newTentant.indexation = +e.target.value;

                                                                        dispatch(setTentantData({ 
                                                                            id: index, 
                                                                            data: newTentant,
                                                                        }))
                                                                    }}
                                                                />
                                                                <TextField
                                                                    variant="standard"
                                                                    label="Договор"
                                                                    defaultValue={tentantInObject.contract}
                                                                    onBlur={e => {
                                                                        const newTentant = {
                                                                            ...tentantInObject
                                                                        }

                                                                        newTentant.contract = e.target.value;
                                                                        dispatch(setTentantData({ 
                                                                            id: index, 
                                                                            data: newTentant, 
                                                                        }))
                                                                    }}
                                                                />
                                                                <TextField
                                                                    variant="standard"
                                                                    label="Месячный арендный поток"
                                                                    type="number"
                                                                    defaultValue={tentantInObject.rentFlow.month}
                                                                    onBlur={e => {
                                                                        const newTentant = {
                                                                            ...tentantInObject,
                                                                            rentFlow: {
                                                                                ...tentantInObject.rentFlow,
                                                                            },
                                                                        }

                                                                        newTentant.rentFlow.month = e.target.value;

                                                                        dispatch(setTentantData({ 
                                                                            id: index, 
                                                                            data: newTentant,
                                                                        }))
                                                                    }}
                                                                />
                                                                <TextField
                                                                    variant="standard"
                                                                    label="Годовой арендный поток"
                                                                    type="number"
                                                                    defaultValue={tentantInObject.rentFlow.year}
                                                                    onBlur={e => {
                                                                        const newTentant = {
                                                                            ...tentantInObject,
                                                                            rentFlow: {
                                                                                ...tentantInObject.rentFlow,
                                                                            },
                                                                        }

                                                                        newTentant.rentFlow.year = +e.target.value;
                                                                        dispatch(setTentantData({ 
                                                                            id: index, 
                                                                            data: newTentant,
                                                                        }))
                                                                    }}
                                                                />
                                                                <div>
                                                                    <em>Добавлять разные элементы через запятую</em>
                                                                    <TextField
                                                                        label="Детализация"
                                                                        variant="standard"
                                                                        defaultValue={tentantInObject.detalization.join(",")}
                                                                        onBlur={e => {
                                                                            const newTentant = {
                                                                                ...tentantInObject
                                                                            }

                                                                            newTentant.detalization = e.target.value.split(",");

                                                                            dispatch(setTentantData({ 
                                                                                id: index, 
                                                                                data: newTentant, 
                                                                            }));
                                                                        }}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </ListItem>
                                                </>
                                            }
                                        </>
                                    )
                                })
                            }
                            <>
                                {/* <FormControl sx={{ width: '100%', marginTop: 4, }}>
                                    <InputLabel id="select-label">Выбрать арендатора</InputLabel>
                                    <Select
                                        sx={{ width: '100%' }}
                                        className="w-full"
                                        open={isOpenSelect}
                                        id="select"
                                        onClick={e => {
                                            if(e.target.id === 'select') setIsOpenSelect(true);
                                            else setIsOpenSelect(false);
                                        }}
                                        labelId="select-label"
                                    >
                                        {
                                            tentans.length > 0 ?
                                            <>
                                                <MenuItem disabled value="">
                                                    <em>Выберете арендатора</em>
                                                </MenuItem>
                                                {
                                                    [...tentans].map((tentant, index) => {
                                                        return (
                                                            <>
                                                                { 
                                                                    objectStorage
                                                                    .tenantsInfo
                                                                    .findIndex(tentantInfo => tentantInfo.tentant.id === tentant.id) === -1 &&

                                                                    <MenuItem
                                                                        onClick={e => clickSelectTentant(tentant, index)}
                                                                        key={tentant.id}
                                                                        value={tentant.id}
                                                                    >
                                                                        {tentant.name}
                                                                    </MenuItem>
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                            :
                                            <>
                                                Сначала создайте арендаторов
                                            </>
                                        }
                                    </Select>
                                </FormControl> */}
                                <Button
                                    id="menu"
                                    onClick={handleMenuClick}
                                > Добавить Арендодатора </Button>
                                <Menu
                                    id="tentant-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'menu',
                                    }}
                                >
                                    {
                                        tentans.map(tentant => {
                                            return (
                                                <>
                                                    { 
                                                        objectStorage
                                                        .tenantsInfo
                                                        .findIndex(tentantInfo => tentantInfo.tentant.id === tentant.id) === -1 &&
                                                        <MenuItem 
                                                            key={tentant.id}
                                                            value={tentant.id}
                                                            onClick={() => handleCloseItem(tentant)}
                                                        >
                                                            {tentant.name}
                                                        </MenuItem>
                                                    }
                                                </>
                                            );
                                        })
                                    }
                                </Menu>
                            </>
                            {/* <Button onClick={() => clickAddNewTentant()}>
                                Добавить нового арендатора
                                <AddIcon/>
                            </Button> */}
                        </>
                        :
                        <>
                            <Button onClick={() => clickAddNewTentant()}>
                                Добавить нового арендатора
                                <AddIcon/>
                            </Button>
                        </>
                }
            </List>

            <Button onClick={() => clickSaveChanges()}>
                Сохранить изменения!
            </Button>
        </>
    )
}