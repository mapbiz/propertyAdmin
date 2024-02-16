export default function Tag({title, text, full}) {
  return (
    <div className={`flex ${full ? 'w-[500px]' : 'w-[450px] '}  justify-between pr-[40px]`}>
      <input className={'w-[24px]'} type={"checkbox"}/>
      <div className={'text-[18px]'}>{title}</div>
      <input value={text} className={'border-2'} type={'text'}/>
    </div>
  )
}