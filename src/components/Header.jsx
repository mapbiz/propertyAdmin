import HeaderBtn from "./HeaderBtn.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTab} from "../slices/tabSlice.jsx";
import {NavLink, useNavigate} from "react-router-dom";


export default function Header() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.tabMore.value.activeTab)
    const [active, setActive] = useState('all')

    const navigate = useNavigate()
    return (
        <header
            className={'shadow-xl flex  gap-[40px] fixed w-full z-50 bg-white h-[90px] px-[16px] md:px-[32px] xl:px-[60px]'}>
            <div className={'flex justify-between mx-auto max-w-[1280px] w-full items-center'}>
                <img  onClick={() => {
                    navigate('/')
                }} className={'cursor-pointer max-h-[60px]'} src="/property.png" alt=""/>
                <nav
                    className={` flex gap-[40px]`}>
                    {/*<NavLink className={({isActive, isPending}) => {*/}
                    {/*  return  isPending ? "text-red-700" : isActive ? "text-green-500 underline underline-offset-4" : ""*/}

                    {/*}} to={'/'}>*/}
                    {/*    Все объекты*/}
                    {/*</NavLink>*/}

                    {/*<NavLink*/}
                    {/*    className={({isActive, isPending}) => {*/}
                    {/*        return  isPending ? "text-red-700" : isActive ? "text-green-500 underline underline-offset-4" : ""*/}
                    {/*    }}*/}
                    {/*    to={'/sale'}>Продажа</NavLink>*/}
                    {/*<button*/}
                    {/*    className={({isActive, isPending}) => {*/}
                    {/*        return  isPending ? "text-red-700" : isActive ? "text-green-500 underline underline-offset-4" : ""*/}
                    {/*    }}*/}
                    {/*    to={'/rent'}>Аренда</button>*/}
                    <HeaderBtn change={(e) => {
                        dispatch(setTab({
                            ['activeTab']: 'all'
                        }))
                    }} state={'all'} active={selector}  text={'ВСЕ ОБЪЕКТЫ'}/>
                    <HeaderBtn change={(e) => {

                        dispatch(setTab({
                            ['activeTab']: 'rent'
                        }))
                    }} state={'rent'} active={selector}  text={'АРЕНДА'}/>
                    <HeaderBtn change={(e) => {
                        dispatch(setTab({
                            ['activeTab']: 'sell'
                        }))
                    }}  state={'sell'} active={selector}  text={'ПРОДАЖА'}/>
                </nav>

            </div>
        </header>
    )
}