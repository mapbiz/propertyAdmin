import './App.css'
import Card from "./components/Card.jsx";
import ModalWindow from "./components/ModalWindow.jsx";
import ModalCreateObject from './components/Modal/ModalCreateObject.jsx';

import {useEffect, useState} from "react";
import {getCards} from "./api/api.js";
import {useDispatch, useSelector} from "react-redux";
import Popup from "./components/Popup.jsx";
import {setStateWindow} from "./slices/modalSlice.jsx";
import tentants, { getTentants } from "./slices/tentants.jsx";
import NotificationCreateObject from "./components/Notification/NotificationCreateObject.jsx";
import ImageSwitcher from './components/ImageSwitcher/ImageSwitcher.jsx';

export default function App() {
  const tab = useSelector((state) => state.tabMore.value.activeTab),
  tentantsStorage = useSelector(state => state.tentants);

  const cards = useSelector(state => state.modalWindow)
  const dispatch = useDispatch()
  const [isCreateWindow, setCreateWindow] = useState(false),
  [openCreateObjectModal, setOpenCreateObjectModal] = useState(false);
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
  return (
    <div className={'h-auto pt-[120px]  max-w-[1280px] flex-1  mx-auto w-full flex gap-[20px] flex-col'}>
      <div className={'flex w-full justify-end'}>
        <ModalCreateObject  
          Activator={({ toggleOpen }) => {
            return (
              <button
                onClick={() => toggleOpen()}
                className={'btn'}
              >
                Создать объект
              </button>
            )
          }}
        />

      </div>


      <div className={'h-full relative flex flex-col gap-[20px]'}>
          { isLoading ?
              <p> Подождите немного арендаторы загружаются.... </p>
              :
            <>
                {
                    cards.data && cards.data //card.type.match(activeTab) || card !== 'rent'
                        .filter(card => activeTab === 'all' ? card: card.type.match(activeTab.split("-")[0]))
                        .map((filteredCard, idx) => (
                            <Card key={idx} card={filteredCard} />
                        ))
                }
            </>
          }
      </div>
      <ModalWindow isCreate={isCreateWindow}/>
      <Popup />
        <NotificationCreateObject/>
    </div>
  )

}

