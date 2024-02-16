import {useState} from "react";
import Tag from "./Tag.jsx";
import Button from "./Button.jsx";

export default function ModalWindow({create}) {
  const [isOpen, setOpen] = useState(0)
  return (
    <>
      <div onClick={() => setOpen(false)} className={`${isOpen ? 'block' : 'hidden'} top-0 right-0 left-0 bottom-0 opacity-60 bg-black absolute`}>
      </div>
      <div
        className={`${isOpen ? 'block' : 'hidden'} top-0 right-0 left-0 bottom-0 flex items-center justify-center absolute`}>
        <div className={'bg-white w-[1000px] h-[700px] px-[32px] py-[24px] overflow-y-auto'}>
          <div className={'flex flex-wrap gap-4'}>
            <Tag title={'Площадь:'} text={'123'}/>
            <Tag title={'Тип окон:'} text={'123'}/>
            <Tag title={'Планировка:'} text={'123'}/>
            <Tag title={'Высота потолков:'} text={'123'}/>
            <Tag title={'Вход:'} text={'123'}/>
            <Tag title={'Эл. мощность:'} text={'123'}/>
            <Tag title={'Отделка:'} text={'123'}/>
            <Tag title={'Вытяжка:'} text={'123'}/>
            <Tag title={'Общая стоимость:'} text={'123'}/>
            <Tag title={'Цена за м²:'} text={'123'}/>
            <Tag title={'Арендатор:'} text={'123'}/>
            <Tag title={'Доходность:'} text={'123'}/>

          </div>
          <div className={'pt-[20px] flex flex-col gap-4'}>
            <Tag full={true} title={'Месячный арендный поток:'} text={'123'}/>
            <Tag full={true} title={'Годовой арендный поток:'} text={'123'}/>
            <Tag full={true} title={'Срок договора аренды:'} text={'123'}/>
          </div>
          <div className={'pt-[20px]'}>
            <label htmlFor="file">Фото: </label>
            <input id={'foto'} type="file"/>
          </div>
          <div className={'pt-[20px]'}>
            <label htmlFor="file">Планировка: </label>
            <input id={'plan'} type="file"/>
          </div>
          <div className={'pt-[20px]'}>
            <label htmlFor="file">Панорама: </label>
            <input className={'w-full border-2 h-[40px] pl-[15px]'} type="text"/>
          </div>
          <div className={'pt-[40px] flex flex-col gap-4 pb-[20px]'}>
            <select className={'border-2 h-[40px] pl-[15px]'} name="select" id="1">
              <option value="Аренда">Аренда </option>
              <option value="Продажа"> Продажа</option>
            </select>
            <input className={'w-full border-2 h-[40px] pl-[15px]'} placeholder={'Название'} type="text"/>
            <input className={'w-full border-2 h-[40px] pl-[15px]'} placeholder={'Адрес'} type="text"/>
            <input className={'w-full border-2 h-[40px] pl-[15px]'} placeholder={'Адрес метро'} type="text"/>
            <input className={'w-full border-2 h-[40px] pl-[15px]'} placeholder={'Координаты'} type="text"/>
            <textarea className={'w-full border-2 h-[120px] pl-[15px]'} placeholder={'Описание'}/>
          </div>
          {
            create && <Button text={'Создать'} />
          }
        </div>
      </div>

    </>
  )
}