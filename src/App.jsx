import './App.css'
import Card from "./components/Card.jsx";
import ModalWindow from "./components/ModalWindow.jsx";
import {useEffect, useState} from "react";
import {getCards} from "./api/api.js";
import {useDispatch, useSelector} from "react-redux";
import Popup from "./components/Popup.jsx";
import {setStateWindow} from "./slices/modalSlice.jsx";
import tentants, { getTentants } from "./slices/tentants.jsx";


export default function App() {
  const tab = useSelector((state) => state.tabMore.value.activeTab),
  tentantsStorage = useSelector(state => state.tentants);

  const cards = useSelector(state => state.modalWindow)
  const dispatch = useDispatch()
  const [isCreateWindow, setCreateWindow] = useState(false)
  // const [cards, setCards] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const activeTab = useSelector(state => state.tabMore.value.activeTab)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCards()
        dispatch(setStateWindow(res.data))
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
    fetchData();

    dispatch(getTentants());

  }, []);
    useEffect(() => {
        if(tentants.isLoading) return;

        setIsLoading(false);

    }, [tentants.isLoading]);


  console.log(cards)
  return (
    <div className={' pt-[120px]  max-w-[1280px] mx-auto w-full flex gap-[20px] flex-col'}>
      <div>
        <button
          onClick={
            () => {
              // setOpenWindow(null, true);
            }
          }
          className={'text-[20px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}
            >
            Создать
            объект
        </button>
      </div>
      <div className={'h-full relative flex flex-col gap-[20px]'}>
          { isLoading ?
              <p> Подождите немного арендодаторы грузяться.... </p>
              :
            <>
                {
                     cards.data && cards.data.map((card, idx) => {
                        return <Card key={idx}   card={card}/>
                     })
                }
            </>
          }
      </div>
      <ModalWindow isCreate={isCreateWindow}/>
      <Popup />
    </div>
  )

}

