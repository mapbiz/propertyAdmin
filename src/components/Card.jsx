import {deleteCard} from "../api/api.js";

export default function Card({setOpen, card, revalidate}) {
  const deleteObject = () => {
    if(window.confirm(`Удалить карточку - ${card.title}`)) {
      deleteCard(card.id)
      alert('УДАЛИЛИ')
      revalidate()
    }
  }

  return (
    <div
      onClick={() => setOpen(true, card, false)}
      className={'w-full cursor-pointer border-2 min-h-[120px] gap-[50px] items-center hover:shadow-lg transition-all duration-300 flex px-[32px]'}>
      <img className={'max-h-[100px]'} src={card.images} alt={''}/>
      <div className={'whitespace-nowrap text-ellipsis overflow-hidden text-start w-[1000%]'}>{card.title}</div>
      <div className={'whitespace-nowrap text-end w-full'}>{card.price}</div>
      <div className={'whitespace-nowrap text-ellipsis text-end w-full'}>{card.adress}</div>
      <button
        onClick={(e) =>{
          e.stopPropagation()
          e.preventDefault()
          deleteObject()
        }}
        className={'text-[20px] leading-[28px] bg-red-700 px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-red-800 shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>Удалить
      </button>
    </div>
  )
}