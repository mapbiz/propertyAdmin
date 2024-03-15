import HeaderBtn from "./HeaderBtn.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTab} from "../slices/tabSlice.jsx";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";


export default function Header() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.tabMore.value.activeTab)
    const [active, setActive] = useState('all')

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)
    return (
        <header
            className={'shadow-xl flex  gap-[40px] fixed w-full z-50 bg-white h-[90px] px-[16px] md:px-[32px] xl:px-[60px]'}>
            <div className={'flex  mx-auto max-w-[1280px] w-full items-center'}>
                <img  onClick={() => {
                    navigate('/')
                }} className={'cursor-pointer max-h-[60px]'} src="/property.png" alt=""/>

                <nav className={` flex gap-[40px]`}>
                {
                    location.pathname !== '/arendators'
                    &&
                    <button onClick={(e) => {

                        navigate('/arendators');
                    }}>
                        АРЕНДАТОРЫ
                    </button>
                }

                {
                    (location.pathname !== '/' && location.pathname !== '/pdf')
                    &&
                    <button onClick={(e) => {
                        navigate('/');
                    }}>
                        ОБЪЕКТЫ
                    </button>
                }
                {location.pathname !== '/arendators' &&
                    <>
                        <HeaderBtn change={(e) => {
                            navigate('/')
                            dispatch(setTab({
                                ['activeTab']: 'all'
                            }))
                        }} state={'all'} active={selector}  text={'ВСЕ ОБЪЕКТЫ'}/>
                        <HeaderBtn change={(e) => {
                            navigate('/')
                            dispatch(setTab({
                                ['activeTab']: 'rent'
                            }))
                        }} state={'rent'} active={selector}  text={'АРЕНДА'}/>
                        <HeaderBtn change={(e) => {
                            navigate('/')
                            dispatch(setTab({
                                ['activeTab']: 'sale'
                            }))
                        }}  state={'sale'} active={selector}  text={'ПРОДАЖА'}/>
                    </>

                }
        </nav>
            </div>
        </header>
    )
}