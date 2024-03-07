import { TextField, Checkbox } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setObject, updateCheckBox} from "../slices/tagSlice.jsx";
import {useEffect, useMemo, useRef, useState} from "react";
import deepObject from "object-path";

export default function Input({
    path= null,
    inputType = 'input',
    valueType = 'text',
    ...attrs
}) {
    const objectStorage = useSelector(state => state.tagMore.value),
    dispatch = useDispatch();


    const setInObjectStorage = (path, value) => {
        const copyStorageObject = {
            ...objectStorage
        };

        deepObject.set(copyStorageObject, path, value);


        return copyStorageObject;
    },
    getInObjectStorage = path => {
        return deepObject.get(objectStorage, path);
    }

    const onBlur = e => {
        const changedValue = setInObjectStorage(path, e.target.value);


        return dispatch(setObject(changedValue));
    },
    onClick = e => {},
    onChecked = e => {
        //console.log(path, e.target.checked)

        const changedValue = setInObjectStorage(path, e.target.checked);


        //console.log(changedValue)

        return dispatch(setObject(changedValue));
    };


    const handlerController = (type, event) => {
        switch (type) {
            case "blur":
                onBlur(event);
            break;
            case "click":
                onClick(event);
            break;
            case "checked":
                onChecked(event);
            break;

        }
    };

    const ComponentController = (...attrs) => {
        switch (inputType) {
            case "input":
            return <TextField
                {...attrs}
                defaultValue={getInObjectStorage(path)}
                onBlur={e => handlerController('blur', e)}
            />
            case "checkbox":
            return <Checkbox
                {...attrs}
                defaultChecked={getInObjectStorage(path)}
                onClick={e => handlerController('checked', e)}
            />
        }
    };


    // useEffect(() => {
    //     componentContoroller()
    // }, [inputType]);

    return (
       <>
            <ComponentController {...attrs} />
       </>
    )
};