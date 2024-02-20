import HeaderBtn from "./HeaderBtn.jsx";
import {useState} from "react";
import Button from "./Button.jsx";

export default function Header() {
  const [active, setActive] = useState('all')
  return (
    <header
      className={'shadow-xl flex items-center justify-center gap-[40px] fixed w-full z-50 bg-white h-[90px] px-[16px] md:px-[32px] xl:px-[60px]'}>

      <nav
        className={` flex gap-[40px]`}>
        <HeaderBtn change={(e) => setActive(e)} state={'all'} active={active}  text={'Все объекты'}/>
        <HeaderBtn change={(e) => setActive(e)}  state={'2'} active={active}  text={'КВАРТИРЫ'}/>
        <HeaderBtn change={(e) => setActive(e)}  state={'1'} active={active}  text={'КВАРТИРЫ'}/>
        <HeaderBtn change={(e) => setActive(e)}  state={'3'} active={active}  text={'КВАРТИРЫ'}/>
      </nav>
    </header>
  )
}