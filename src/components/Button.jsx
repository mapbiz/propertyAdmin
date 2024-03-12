export default function Button({text, ...attrs}) {
  return (
    <button 
      {...attrs}
      className={'text-[20px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}
    >
      {text}
    </button>
  )
}