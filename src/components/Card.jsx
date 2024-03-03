import {deleteCard, getCurrentCard} from "../api/api.js";
import {useDispatch} from "react-redux";
import {setStateWindow} from "../slices/modalSlice.jsx";
import {setObject} from "../slices/tagSlice.jsx";

export default function Card({card}) {
    console.log(card)
    const deleteObject = () => {
        if (window.confirm(`Удалить карточку - ${card.title}`)) {
            deleteCard(card.id)
            alert('УДАЛИЛИ')
            revalidate()
        }
    }

    const dispatch = useDispatch()

    return (
        <div
            onClick={async () => {
                const currentCard = await getCurrentCard(card.slug)
                if(currentCard.ok) {
                    dispatch(setStateWindow({
                        modalWindow: true,
                        item: currentCard
                    }))
                    dispatch(setObject(currentCard.data))
                } else {
                    alert('ошибка загрузки карточки')
                }
            }


            }
            className={'w-full cursor-pointer border-2 min-h-[120px] gap-[50px] items-center hover:shadow-lg transition-all duration-300 flex px-[32px]'}>
            <img className={'max-h-[100px]'} src={card.images} alt={''}/>
            <div className={'whitespace-nowrap text-ellipsis overflow-hidden text-start w-[1000%]'}>{card.title}</div>
            <div className={'whitespace-nowrap text-end w-full'}>{card.price.global}</div>
            <div className={'whitespace-nowrap text-ellipsis text-end w-full'}>{card.address}</div>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    deleteObject()
                }}
                className={'text-[20px] leading-[28px] bg-red-700 px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-red-800 shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>Удалить
            </button>
        </div>
    )
}