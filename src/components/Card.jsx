import {deleteCard, getCurrentCard, reverseImageGet} from "../api/api.js";
import {useDispatch} from "react-redux";
import {setStateWindow} from "../slices/modalSlice.jsx";
import {setObject} from "../slices/tagSlice.jsx";

export default function Card({card}) {
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
                const currentCard = await getCurrentCard(card.slug);

                if(!currentCard.ok) return alert('ошибка загрузки карточки');

                if(currentCard.data.images.length > 0) currentCard.data.images = await  Promise.all(currentCard.data.images.map(async imgUrl => {
                    const getBlobOfImage = await reverseImageGet(imgUrl);


                    return URL.createObjectURL(getBlobOfImage.data);
                }))
                if(currentCard.data.layoutImages.length > 0) currentCard.data.layoutImages = await Promise.all(currentCard.data.layoutImages.map(async imgUrl => {
                    const getBlobOfImage = await reverseImageGet(imgUrl);
                    return URL.createObjectURL(getBlobOfImage.data);
                }));
                dispatch(setStateWindow({
                    modalWindow: true,
                    item: currentCard
                }))
                dispatch(setObject(currentCard.data));

                // if (currentCard.ok) {
                //     dispatch(setStateWindow({
                //         modalWindow: true,
                //         item: currentCard
                //     }))
                //     console.log(currentCard)
                //
                //     dispatch(setObject(currentCard.data));
                // } else {
                //     alert('ошибка загрузки карточки')
                // }
            }}
            className={'w-full cursor-pointer border-2 min-h-[120px] gap-[50px] items-center hover:shadow-lg transition-all duration-300 flex px-[32px]'}>
            <img className={'max-h-[100px]'} src={`http://79.174.82.17:8080/public/${card.images[0]}`} alt={''}/>
            <div className={'whitespace-nowrap text-ellipsis overflow-hidden text-start w-[1000%]'}>{card.title}</div>
            <div className={'whitespace-nowrap text-end w-full'}>{card.price.global}</div>
            <div className={'whitespace-nowrap text-ellipsis text-end w-full'}>{card.address}</div>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    deleteObject()
                }}
                className={'text-[20px] leading-[28px] bg-red-700 px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-red-800 shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>
                Удалить
            </button>
        </div>
    )
}