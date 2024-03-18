import {useDispatch, useSelector} from "react-redux";
import {setObject, updateCheckBox} from "../slices/tagSlice.jsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {TextField} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {Label} from "@mui/icons-material";
import Textarea from "./Input/Textarea.jsx";

export default function Tag({name, full, title, subName = null, checkbox = false, sub3Name = null, type = 'text'}) {
    const field = useRef("");
    const [isCheked, setIsCheked] = useState(false)
    const object = useSelector((state) => state.tagMore.value)

    const dispatch = useDispatch()


    const handleChange = (e) => {

        if (checkbox === true) {

        }
        if (!e.target.value) {
            return subName !== null ?
                dispatch(setObject({
                    [name]: {
                        ...object[name],
                        [subName]: ''
                    }
                }))
                :
                dispatch(setObject({
                    [name]: ""
                }));
        }
        const updatedObject = {...object};

        if (subName === null) updatedObject[name] = type === 'number' ? +e.target.value  : e.target.value;
        else if (sub3Name !== null && subName !== null) {
            updatedObject[name] = {
                [subName]: {
                    ...updatedObject[subName],
                    [sub3Name]: type === 'number' ? +e.target.value  : e.target.value
                }
            }
        } else updatedObject[name] = {...updatedObject[name], [subName]: type === 'number' ? +e.target.value  : e.target.value};

        dispatch(setObject(updatedObject));
    };

    const tagDisplayValue = useMemo(() => {
        if (subName !== null && sub3Name === null) return object[name][subName];
        if (subName !== null && sub3Name !== null) return object[name][subName][sub3Name];
        if (subName === null && sub3Name === null) return object[name];
    }, [object]);

    return (
        <div className={`flex w-full `}>
            <div className={'text-[18px]'}>
            </div>
            {/*object[name]?.[subName] || object[name] || ''*/}
            {(!checkbox)  ?
                <>
                    <TextField
                        type={type}
                        className={'w-full'}
                        onChange={handleChange}
                        value={tagDisplayValue}
                        label={title && title}
                        multiline={type === 'textarea'}
                        variant="outlined"
                    />
                </>
                :
                <div className={'flex justify-center items-center'}>
                    <p>{title}</p>
                    <Checkbox
                        onClick={(e) => {

                        }}
                        defaultChecked={tagDisplayValue}>
                    </Checkbox>
                </div>
            }

        </div>
    )
}