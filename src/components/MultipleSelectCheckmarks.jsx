import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {setArendators} from '../slices/tagSlice'
import axios from "axios";
import {useEffect, useState} from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

console.log()
export default function MultipleSelectCheckmarks() {
    const arendators = useSelector(state => state.tagMore.value.tenantsInfo)
    console.log(arendators)
    const [names, setNames] = useState([])
    console.log()
    const dispatch = useDispatch()
    const handleChange = (event) => {
        console.log(event)
        const {
            target: { value },
        } = event;
        const findTentantToAdd = names.find(item => item.name === value)

        // dispatch(setArendators({
        //     tenantsInfo: [...value]
        // }))
    };

    useEffect(() => {
        const getNames = async () => {
            const arendators = (await axios.get('http://79.174.82.17:8080/api/v1/tentants')).data
            setNames(arendators.data)
        }
        getNames()
    }, []);

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-checkbox-label">Арендатор</InputLabel>
                <button onClick={names}>123</button>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={arendators.map((item) => {
                        return item.tentant.name
                    })}
                    onChange={handleChange}
                    input={<OutlinedInput label="Арендатор" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >

                    {names.map((renters) => (
                        <MenuItem key={renters.id} value={renters.name}>
                            <Checkbox  checked={arendators.findIndex(rentOnObj =>
                                rentOnObj.tentant.id === renters.id
                            ) > -1} />
                            <ListItemText primary={renters.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}