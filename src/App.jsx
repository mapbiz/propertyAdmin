import './App.css'
import Card from "./components/Card.jsx";
import ModalWindow from "./components/ModalWindow.jsx";
import {useEffect, useState} from "react";

import {getCards} from "./api/api.js";
import {useDispatch} from "react-redux";
import {resetObject, setObject} from "./slices/tagSlice.jsx";


function App() {
  const dispatch = useDispatch()

  const [ModalWindowIsOpen, setModalWindowIsOpen] = useState(false)
  const [isCreateWindow, setCreateWindow] = useState(false)
  const [cards, setCards] = useState([])



  const cardsRequest = async () => {
    const res = await getCards()
    setCards(res.data)
  }

  useEffect(() => {

    cardsRequest()
  }, []);


  const revalidateCard = () => {
    cardsRequest()
  }

  const setOpenWindow = (isOpen, card, createValue) => {
    setModalWindowIsOpen(isOpen)

    if (card === null) {
      dispatch(resetObject())
    } else {
      dispatch(setObject(
        card
      ))
    }



    setCreateWindow(createValue)
  }

  return (
    <div className={' pt-[120px]  max-w-[1280px] mx-auto w-full flex gap-[20px] flex-col'}>
      <div>
        <button
          onClick={
            () => {
              setOpenWindow(true, null, true);
            }
          }
          className={'text-[20px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>Создать
          объект
        </button>
      </div>
      <div className={'h-full relative flex flex-col gap-[20px]'}>
        {
         cards && cards.map((card, idx) => {
            return <Card key={idx} revalidate={revalidateCard} setOpen={() => setOpenWindow(true, card, false)} card={card}/>
          })
        }
      </div>
      <ModalWindow revalidate={revalidateCard} setOpenWindow={setOpenWindow} isCreate={isCreateWindow}
                   isOpen={ModalWindowIsOpen}/>
    </div>
  )
}

export default App
