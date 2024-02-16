export default function Card({img, title, price, adress}) {

  const deleteObject = () => {
    if(window.confirm(`Удалить карточку - ${title}`)) {
      alert('УДАЛИЛИ')
    }

  }


  return (
    <div
      className={'w-full cursor-pointer border-2 h-[120px] items-center hover:shadow-lg transition-all duration-300 flex gap gap-[200px] px-[32px]'}>
      <img className={'h-[70%]'} src={img} alt={''}/>
      <div className={''}>{title}</div>
      <div className={''}>{price}</div>
      <div>{adress}</div>
      <button
        onClick={() => deleteObject()}
        className={'text-[20px] leading-[28px] bg-red-700 px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-red-800 shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>Удалить</button>
    </div>
  )
}