
import {useDispatch, useSelector} from "react-redux";
import {setObject} from "../slices/tagSlice.jsx";
import {useEffect} from "react";
import {TextField} from "@mui/material";

export default function Tag({name, full, title}) {



  const object = useSelector((state) => state.tagMore.value)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(object)
  }, [object]);

  return (
    <div className={`flex w-full `}>
      <div className={'text-[18px]'}></div>
        <TextField className={'w-full'} onChange={(e) => {
            dispatch(setObject({
                [`${name}`]: e.target.value
            }))
        }} value={object[name]}  label={title && title} variant="outlined" />

    </div>
  )
}