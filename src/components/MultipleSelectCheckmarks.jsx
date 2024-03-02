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
const names = ['пятерочка','магнит']

export default function MultipleSelectCheckmarks() {
    const arendators = useSelector(state => state.tagMore.value.arendators)

        console.log(arendators)
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        dispatch(setArendators({
            arendators: [...value]
        }))
    };

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="demo-multiple-checkbox-label">Арендатор</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={arendators}
                    onChange={handleChange}
                    input={<OutlinedInput label="Арендатор" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={arendators.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}