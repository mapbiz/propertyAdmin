import './App.css'
import Card from "./components/Card.jsx";
import ModalWindow from "./components/ModalWindow.jsx";
import {useEffect, useState} from "react";

import {getCards} from "./api/api.js";
import {useDispatch, useSelector} from "react-redux";
import {resetObject, setObject} from "./slices/tagSlice.jsx";
import {setPopupWindow} from "./slices/popupSlice.jsx";
import Popup from "./components/Popup.jsx";
import {setStateWindow} from "./slices/modalSlice.jsx";



function App() {
  const tab = useSelector((state) => state.tabMore.value.activeTab)
  const dispatch = useDispatch()

  const [isCreateWindow, setCreateWindow] = useState(false)
  const [cards, setCards] = useState([])



  const cardsRequest = async () => {

    let res = []

    if (tab === 'all') {
       res = await getCards('cards')
    }
    if (tab === 'rent') {
       res = await getCards('rent')
    }

    if (tab === 'sell') {
       res = await getCards('sell')
    }
    setCards(res.data)
  }

  useEffect(() => {
    console.log(tab)
    cardsRequest()
  }, [tab]);

  const revalidateCard = () => {
    cardsRequest()
  }

  const setOpenWindow = (card, createValue) => {
    if (card === null) {
      dispatch(setPopupWindow({
        ['modalWindow']: true
      }))
      dispatch(resetObject())
    } else {

      dispatch(setObject(
        card
      ))
      dispatch(setStateWindow({
        ['modalWindow']: true
      }))

    }

    setCreateWindow(createValue)
  }

  return (
    <div className={' pt-[120px]  max-w-[1280px] mx-auto w-full flex gap-[20px] flex-col'}>
      <div>
        <button
          onClick={
            () => {
              setOpenWindow(null, true);
            }
          }
          className={'text-[20px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>Создать
          объект
        </button>
      </div>
      <div className={'h-full relative flex flex-col gap-[20px]'}>
        {
         cards && cards.map((card, idx) => {
            return <Card key={idx} revalidate={revalidateCard} setOpen={() => setOpenWindow(card, false)} card={card}/>
          })
        }
      </div>
      <ModalWindow revalidate={revalidateCard} isCreate={isCreateWindow}/>
      <Popup />
    </div>
  )
}

export default App
