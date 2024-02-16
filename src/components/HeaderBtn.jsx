import {useState} from "react";

export default function HeaderBtn({text, active, state, change}) {

  return (
    <button
      onClick={() => change(state)}

      className={`text-[16px] lg:text-[12px] 2xl:text-[16px] font-[500] lg:font-[400] leading-[24px]  lg:text-[#000000] text-white lg:md:hover:text-[#3F7F58] lg:active:text-[#144728] flex flex-col  lg:items-center font-inter`}>
      {text}
      {active === state && <span className={'w-full h-[2px] bg-[#144728] lg:block hidden'}></span>}
    </button>
  )
}