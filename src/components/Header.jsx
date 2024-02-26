import HeaderBtn from "./HeaderBtn.jsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setTab} from "../slices/tabSlice.jsx";


export default function Header() {
  const dispatch = useDispatch()

  const [active, setActive] = useState('all')
  return (
    <header
      className={'shadow-xl flex items-center justify-center gap-[40px] fixed w-full z-50 bg-white h-[90px] px-[16px] md:px-[32px] xl:px-[60px]'}>

      <nav
        className={` flex gap-[40px]`}>
        <HeaderBtn change={(e) => {
          setActive(e)
          dispatch(setTab({
            ['activeTab']: 'all'
          }))
        }} state={'all'} active={active}  text={'ВСЕ ОБЪЕКТЫ'}/>
        <HeaderBtn change={(e) => {
          setActive(e)
          dispatch(setTab({
            ['activeTab']: 'rent'
          }))
        }} state={'2'} active={active}  text={'АРЕНДА'}/>
        <HeaderBtn change={(e) => {
          setActive(e)
          dispatch(setTab({
            ['activeTab']: 'sell'
          }))
        }}  state={'1'} active={active}  text={'ПРОДАЖА'}/>
      </nav>
    </header>
  )
}