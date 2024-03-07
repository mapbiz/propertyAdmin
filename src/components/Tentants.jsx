import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';

import AddIcon from '@mui/icons-material/Add';

import Input from "./Input.jsx";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addNewTentant } from "../slices/tagSlice.jsx";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


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

    const clickSelectTentant = tentant => {
        console.log(tentant);

        setIsOpenSelect(false);
    }

    useEffect(() => {

    }, []);

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                objectStorageTentants.length > 0 ?
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-multiple-chip-label">Выбрать арендатора</InputLabel>
                        <Select
                            sx={{ width: '100%' }}
                            className="w-full"
                            // value={isOpenSelect}
                            open={isOpenSelect}
                            id="select"
                            onClick={e => {
                                console.log(e);

                            }}
                            labelId="demo-multiple-chip-label"
                        >
                            {
                                tentans.length > 0 ?
                                <>
                                    <MenuItem disabled value="">
                                        <em>Выберете арендатора</em>
                                    </MenuItem>
                                    {
                                        tentans.map(tentant => {
                                            return (
                                                <MenuItem
                                                    onClick={e => clickSelectTentant(tentant)}
                                                    key={tentant.id}
                                                    value={tentant.id}
                                                >
                                                    {tentant.name}
                                                </MenuItem>
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
                    </FormControl>
                    :
                    <>
                        <Button onClick={() => clickAddNewTentant()}>
                            Добавить нового арендатора
                            <AddIcon/>
                        </Button>
                    </>
            }
        </List>
    )
}