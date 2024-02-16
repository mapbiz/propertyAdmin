import Button from "./components/Button.jsx";

export default function Auth() {

  return (
    <div className={'w-full h-screen flex items-center justify-center'}>
      <div className={'w-[400px] h-[290px] py-[44px] px-[16px] flex flex-col gap-4 rounded-3xl  mb-[100px] shadow-2xl'}>
        <div className={'w-full flex flex-col gap-[25px] pb-[10px]'}>
          <input placeholder={'Email'} className={'w-full border-2 h-[50px] rounded-[15px] px-[10px]'} type="text"/>
          <input placeholder={'Password'} className={'w-ful border-2 h-[50px] rounded-[15px] px-[10px]'} type="text"/>
        </div>
        <Button text={'Авторизоваться'}/>
      </div>

    </div>
  )
}