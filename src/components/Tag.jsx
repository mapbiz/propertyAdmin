
import {useDispatch, useSelector} from "react-redux";
import {setObject} from "../slices/tagSlice.jsx";
import {useEffect} from "react";
import {TextField} from "@mui/material";

export default function Tag({name, full, title}) {



  const object = useSelector((state) => state.tagMore.value)
    console.log(object)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(object)
  }, [object]);

    const handleChange = (e) => {
        const updatedObject = { ...object };
        updatedObject[name] = { ...updatedObject[name], global: e.target.value };
        dispatch(setObject(updatedObject));
    };

  return (
    <div className={`flex w-full `}>
      <div className={'text-[18px]'}></div>
        <TextField className={'w-full'} onChange={handleChange} value={object[name]?.global || ''}  label={title && title} variant="outlined" />

    </div>
  )
}