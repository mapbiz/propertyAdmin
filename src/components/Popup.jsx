import {useDispatch, useSelector} from "react-redux";
import {setPopupWindow} from "../slices/popupSlice.jsx";
import {setModalWindow, setStateWindow} from "../slices/modalSlice.jsx";

export default function Popup() {

  const popupState = useSelector((state) => state.popupWindow.value)
  const dispatch = useDispatch()

  const clickOutside = () => {
    dispatch(setPopupWindow())
  };
  return (
    <>
      <div
        className={`${popupState ? 'block' : 'hidden'} top-0 right-0 left-0 bottom-0 opacity-60 bg-black fixed`}
        onClick={e => clickOutside(e)}
      ></div>
      <div
        className={`${popupState ? 'block' : 'hidden'} left-[50%] translate-x-[-50%] top-[50%] translate-y-[-100%] fixed h-max w-max flex items-center justify-center`}>
        <div className={'bg-white px-[32px] py-[24px] overflow-y-auto flex gap-[20px] flex-col'}>
        <p className={'text-center text-[20px]'}>Выберите объект</p>
        <div className={'flex gap-4'}>
          <button onClick={() => {
            dispatch(setModalWindow())
            dispatch(setStateWindow({
              stateWindow: 'rent',

            }))
            dispatch(setPopupWindow())
          }} className={'text-[20px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>
            Аренда
          </button>
          <button onClick={() => {
            dispatch(setModalWindow())
            dispatch(setStateWindow({
              stateWindow: 'sell',

            }))
            dispatch(setPopupWindow())
          }}  className={'text-[20px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>
            Продажа
          </button>
          <button onClick={() => {
            dispatch(setModalWindow())
            dispatch(setStateWindow({
              stateWindow: 'bizness',
            }))
            dispatch(setPopupWindow())
          }}  className={'text-[20px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>
            ГАБ
          </button>
        </div>

      </div>
      </div>
    </>

  )
}