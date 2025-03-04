import {
  deleteCard,
  getCards,
  getCurrentCard,
  reverseImageGet,
} from '../api/api.js';
import { useDispatch } from 'react-redux';
import { setStateWindow } from '../slices/modalSlice.jsx';
import { setObject } from '../slices/tagSlice.jsx';
import { typesObject } from '../slices/createObjectSlice.jsx';
import clsx from 'clsx';

export default function Card({
  card,
  noDisplay = false,
  onForceDelete = null,

  isArchive = false,
}) {
  const deleteObject = async () => {
    if (typeof onForceDelete === 'function') return await onForceDelete(card);

    if (window.confirm(`Удалить карточку - ${card.title}`)) {
      const resToDelete = await deleteCard(card.id).finally(async () => {
        const res = await getCards();
        dispatch(setStateWindow(res.data));
      });
      resToDelete();
    }
  };

  const dispatch = useDispatch();

  return (
    <div
      onClick={async () => {
        if (noDisplay) return;

        const currentCard = await getCurrentCard(card.slug);

        if (!currentCard.ok) return alert('ошибка загрузки карточки');

        const reader = new FileReader();

        if (currentCard.data.images.length > 0)
          currentCard.data.images = await Promise.all(
            currentCard.data.images.map(async imgUrl => {
              const getBlobOfImage = await reverseImageGet(imgUrl);

              return {
                url: URL.createObjectURL(getBlobOfImage.data),
                file: getBlobOfImage.data,
              };
            }),
          );
        if (!!currentCard.data.imageMap)
          currentCard.data.imageMap = await (async () => {
            const getBlobOfImage = await reverseImageGet(
              currentCard.data.imageMap,
            );

            return {
              url: URL.createObjectURL(getBlobOfImage.data),
              file: getBlobOfImage.data,
            };
          })();
        if (currentCard.data.layoutImages.length > 0)
          currentCard.data.layoutImages = await Promise.all(
            currentCard.data.layoutImages.map(async (imgUrl, index) => {
              const getBlobOfImage = await reverseImageGet(imgUrl);

              return {
                url: URL.createObjectURL(getBlobOfImage.data),
                file: getBlobOfImage.data,
              };
            }),
          );
        dispatch(
          setStateWindow({
            modalWindow: true,
            item: currentCard,
          }),
        );
        dispatch(setObject(currentCard.data));
      }}
      className={
        'w-full cursor-pointer  border-2 min-h-[120px] gap-[50px] items-center hover:shadow-lg hover:bg-green-100 transition-all duration-300 flex px-[32px]'
      }
    >
      <img className={'w-[150px]'} src={`/public/${card.images[0]}`} alt={''} />
      <div
        className={
          'whitespace-nowrap text-ellipsis overflow-hidden text-start w-full max-w-[300px]'
        }
      >
        <p>Название объекта</p>
        <p>{card.title}</p>
      </div>
      <div className={'whitespace-nowrap text-start w-full'}>
        <p>Цена:</p>
        <p>{card.price.global}</p>
      </div>
      <div
        className={
          'whitespace-nowrap text-ellipsis truncate text-start w-full max-w-[300px]'
        }
      >
        <p>Адрес:</p>
        <p>{card.address}</p>
      </div>
      <div
        className={
          'whitespace-nowrap text-ellipsis truncate text-start w-full max-w-[300px]'
        }
      >
        <p>Тип объекта:</p>
        <p>{typesObject[card.type]}</p>
      </div>

      <button
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          deleteObject();
        }}
        className={clsx(
          isArchive
            ? 'bg-gray-600 md:hover:bg-gray-700'
            : 'bg-red-700 md:hover:bg-red-800',
          'text-[20px] leading-[28px]  px-[40px] py-[14px] text-white rounded-[5px]  shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter',
        )}
      >
        {isArchive ? 'Разархивировать' : 'Удалить'}
      </button>
    </div>
  );
}
