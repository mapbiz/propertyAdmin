import {deleteCard, getCurrentCard, reverseImageGet} from "../api/api.js";
import {useDispatch} from "react-redux";
import {setStateWindow} from "../slices/modalSlice.jsx";
import {setObject} from "../slices/tagSlice.jsx";

export default function Card({card}) {
    const deleteObject = async () => {
        if (window.confirm(`Удалить карточку - ${card.title}`)) {
            const resToDelete = await deleteCard(card.id);


            resToDelete.status === 204 ? alert('УДАЛИЛИ'): alert("При удалении произошла ошибка!");

            revalidate()
        }
    }

    const dispatch = useDispatch()

    return (
        <div
            onClick={async () => {
                const currentCard = await getCurrentCard(card.slug);

                if(!currentCard.ok) return alert('ошибка загрузки карточки');

                const reader = new FileReader();

                if(currentCard.data.images.length > 0) currentCard.data.images = await  Promise.all(currentCard.data.images.map(async imgUrl => {
                    const getBlobOfImage = await reverseImageGet(imgUrl);

                    return {
                        url: URL.createObjectURL(getBlobOfImage.data),
                        file: getBlobOfImage.data,
                    }
                }))
                if(!!currentCard.data.imageMap) currentCard.data.imageMap = await (async () => {

                    const getBlobOfImage = await reverseImageGet(currentCard.data.imageMap);

                    return {
                        url: URL.createObjectURL(getBlobOfImage.data),
                        file: getBlobOfImage.data,
                    }
                })()
                if(currentCard.data.layoutImages.length > 0) currentCard.data.layoutImages = await Promise.all(currentCard.data.layoutImages.map(async (imgUrl, index) => {

                    const getBlobOfImage = await reverseImageGet(imgUrl);


                    return {
                        url: URL.createObjectURL(getBlobOfImage.data),
                        file: getBlobOfImage.data,
                    }
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
            className={'w-full cursor-pointer c min-h-[120px] gap-[50px] items-center hover:shadow-lg transition-all duration-300 flex px-[32px]'}>
            <img className={'max-h-[100px]'} src={`${import.meta.env.VITE_SERVER_URL}public/${card.images[0]}`} alt={''}/>
            <div className={'whitespace-nowrap text-ellipsis overflow-hidden text-start w-full max-w-[300px]'}>{card.title}</div>
            <div className={'whitespace-nowrap text-end w-full'}>{card.price.global}</div>
            <div className={'whitespace-nowrap text-ellipsis truncate text-end w-full max-w-[300px]'}>{card.address}</div>
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