import {useDispatch, useSelector} from "react-redux";
import {setObject} from "../slices/tagSlice.jsx";
import {useEffect, useRef, useState} from "react";
import {TextField} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {Label} from "@mui/icons-material";

export default function Tag({name, full, title, subName = null, checkbox = false}) {
    const field = useRef("");
    const [isCheked, setIsCheked] = useState(false)
    const object = useSelector((state) => state.tagMore.value)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if(subName !== null) {
    //         field.current = object[name][subName];
    //     }
    //     else field.current = object[name];
    // }, [object]);

    const handleChange = (e) => {

        if(checkbox === true) {
            e.target.value = e.target.checked
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

        if (subName === null) updatedObject[name] = e.target.value;
        else updatedObject[name] = {...updatedObject[name], [subName]: e.target.value};

        dispatch(setObject(updatedObject));
    };

    return (
        <div className={`flex w-full `}>
            <div className={'text-[18px]'}>
            </div>
            {/*object[name]?.[subName] || object[name] || ''*/}
            {!checkbox ?
                <TextField
                    className={'w-full'}
                    onChange={handleChange}
                    value={
                        subName !== null ?
                            object[name][subName]
                            :
                            object[name]
                    }
                    label={title && title}
                    variant="outlined"
                />
                :
                <>
                    <p>{title}</p>
                    <Checkbox
                        onChange={(e) => {
                            handleChange(e);
                            setIsCheked(e.target.checked)
                        }}
                        checked={isCheked}>
                    </Checkbox>
                </>
            }

        </div>
    )
}