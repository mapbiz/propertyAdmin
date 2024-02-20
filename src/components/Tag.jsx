
import {useDispatch, useSelector} from "react-redux";
import {setObject} from "../slices/tagSlice.jsx";
import {useEffect} from "react";

export default function Tag({name, full, title}) {
  const object = useSelector((state) => state.tagMore.value)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(object)
  }, [object]);

  return (
    <div className={`flex ${full ? 'w-[500px]' : 'w-[450px] '}  justify-between pr-[40px]`}>
      <div className={'text-[18px]'}>{title && title}</div>
      <input onChange={(e) => {
        dispatch(setObject({
          [`${name}`]: e.target.value
        }))
      }} value={object[name]} className={'border-2'} type={'text'}/>
    </div>
  )
}