import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {
    updateTenantContractById, updateTenantDetalization,
    updateTenantIndex,
    updateTenantRentFlowM,
    updateTenantRentFlowY
} from '../slices/tagSlice'
import axios from "axios";
import {useEffect, useState} from "react";
import {TextField} from "@mui/material";

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
            target: {value},
        } = event;
        const findTentantToAdd = names.find(item => item.name === value)

        // dispatch(setArendators({
        //     tenantsInfo: [...value]
        // }))
    };

    useEffect(() => {
        const getNames = async () => {
            const arendators = (await axios.get('https://prop-test.ru/server/api/v1/tentants')).data
            setNames(arendators.data)
        }
        getNames()
    }, []);

    const handleChangeArendatorName = (e) => {
        dispatch(updateTenantContractById(e))
    }

    return (
        <div>
            <div className={'flex flex-col gap-2.5'}>
                {arendators.map((arendator) => {

                    return (
                        <div className={'flex flex-col gap-2.5'}>
                            <TextField
                                className={'w-full'}
                                value={arendator.tentant.name}
                                label={'Название'}
                                variant="outlined"
                            />
                            <TextField
                                onChange={(e) => {
                                    handleChangeArendatorName({
                                        newContract: e.target.value,
                                        tenantId: arendator.tentant.id
                                    })
                                }}
                                className={'w-full'}
                                label={'contract'}
                                value={arendator.contract}
                            />
                            <TextField
                                onChange={(e) => {
                                    dispatch(updateTenantIndex({
                                        newIndex: e.target.value,
                                        tenantId: arendator.tentant.id
                                    }))
                                }}
                                // updateTenantIndex
                                className={'w-full'}
                                label={'Индексация'}
                                value={arendator.indexation}
                            />
                            <TextField
                                onChange={(e) => {
                                    dispatch(updateTenantDetalization({
                                        newText: e.target.value,
                                        tenantId: arendator.tentant.id
                                    }))
                                }}
                                // updateTenantIndex
                                className={'w-full'}
                                label={'Детализация арендного потока'}
                                value={arendator.detalization.join('\\')}
                            />

                            <div className={'flex gap-2.5'}>
                                <TextField
                                    onChange={(e) => {
                                        dispatch(updateTenantRentFlowM({
                                            newRentFlowM: e.target.value,
                                            tenantId: arendator.tentant.id
                                        }))
                                    }}
                                    label={'Арендный поток месяц'}
                                    value={arendator.rentFlow.mount}
                                />
                                <TextField
                                    onChange={(e) => {
                                        dispatch(updateTenantRentFlowY({
                                            newRentFlowY: e.target.value,
                                            tenantId: arendator.tentant.id
                                        }))
                                    }}
                                    label={'Арендный поток год'}
                                    value={arendator.rentFlow.year}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>


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