import Tag from "./Tag.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setObject} from "../slices/tagSlice.jsx";
import {createCard, updateCard} from "../api/api.js";

import {objectToFormData} from "../helpers/formData.js";
import {useState} from "react";


export default function ModalWindow({isCreate, setOpenWindow, isOpen, revalidate}) {
  const [isUpload, setUpload] = useState(false)
  const [images, setImages] = useState( [{url: "https://loremflickr.com/640/480/cats"},{url: "https://loremflickr.com/640/480/cats"},{url: "https://loremflickr.com/640/480/cats"}])


  const object = useSelector((state) => state.tagMore.value)
  const dispatch = useDispatch()

  const create = () => {
   const data = objectToFormData(object, 'create')
   createCard(data)
  }

  const update = () => {
    const data = objectToFormData(object, 'update')
    updateCard(data, object['id'])
  }

  const clickOutside = e => {
    setOpenWindow(false);
  };

  return (
    <>
      <div
        className={`${isOpen ? 'block' : 'hidden'} top-0 right-0 left-0 bottom-0 opacity-60 bg-black fixed`}
        onClick={e => clickOutside(e) }
      ></div>
      <div
        className={`${isOpen ? 'block' : 'hidden'} left-[50%] translate-x-[-50%] fixed h-max w-max flex items-center justify-center`}>
        <div className={'bg-white w-[1000px] h-[700px] px-[32px] py-[24px] overflow-y-auto'}>
          <div className={'flex flex-wrap gap-4'}>
            <Tag title={'Цена:'} name={'price'}/>
            <Tag title={'Площадь:'} name={'square'}/>
            <Tag title={'Тип окон:'} name={'windowType'}/>
            <Tag title={'Планировка:'} name={'layout'}/>
            <Tag title={'Высота потолков:'} name={'cellingHeight'}/>
            <Tag title={'Вход:'} name={'entrance'}/>
            <Tag title={'Эл. мощность:'} name={'elPower'}/>
            <Tag title={'Отделка:'} name={'finishing'}/>
            <Tag title={'Вытяжка:'} name={'hood'}/>
            <Tag title={'Общая стоимость:'} name={'totalCost'}/>
            <Tag title={'Цена за м²:'} name={'priceM'}/>
            <Tag title={'Арендатор:'} name={'tenant'}/>
            <Tag title={'Доходность:'} name={'profitability'}/>

          </div>
          <div className={'pt-[20px] flex flex-col gap-4'}>
            <Tag full={true} title={'Месячный арендный поток:'} name={'monthlyRentalFlow'}/>
            <Tag full={true} title={'Годовой арендный поток:'} name={'annualRentalFlow'}/>
            <Tag full={true} title={'Срок договора аренды:'} name={'leaseTerm'}/>
          </div>
          <div className={'pt-[20px]'}>
            <label htmlFor="file">Фото: </label>
            <input id={'foto'} type="file"/>
          </div>
          <div className={'pt-[20px]'}>
            <label htmlFor="file">Планировка: </label>
            <input
              type='file'
              multiple
              onChange={({target: {files}}) => {
                setUpload(true)
                if (files.length <= 0) {
                  return alert('Файлов нет!')
                }

                for (let i = 0; i < files.length; i++) {
                  const currentFile = files.item(i),
                    currentFileUrl = URL.createObjectURL(currentFile);

                  setImages(prevState => {
                    prevState.push({ url: currentFileUrl, file: currentFile });
                    setUpload(false)
                    return prevState;
                  })
                }
              }}
            />

            <div className="flex flex-wrap gap-2 pt-4">
              {isUpload === false && images.map((imgUrl, index) => {
                return (
                  <div key={index * 1000} className={'flex flex-col'}>
                    <img
                      className={'max-h-[200px] object-contain rounded-tl-[5px] rounded--tr-[5px]'}
                      src={imgUrl.url}
                    />
                    <button className={'py-[12px] shadow-lg rounded-br-[5px] rounded-bl-[5px] flex justify-center w-full md:hover:bg-red-800 transition-all duration-300 bg-red-700'}>Удалить</button>
                  </div>

                )
              })}

              {/*<img*/}
              {/*  className={'max-h-[300px] object-contain'}*/}
              {/*  key={object['images']}*/}
                  {/*  src={object['images']}*/}
                  {/*/>*/}


            </div>
          </div>
          <div className={'pt-[20px]'}>
            <label htmlFor="file">Панорама: </label>
            <input onChange={(e) => {
              dispatch(setObject({
                ['panorama']: e.target.value
              }))
            }} value={object['panorama']} className={'w-full border-2 h-[40px] pl-[15px]'} type="text"/>
          </div>
          <div className={'pt-[40px] flex flex-col gap-4 pb-[20px]'}>
            <select className={'border-2 h-[40px] pl-[15px]'} name="select" id="1">
              <option value="Аренда">Аренда</option>
              <option value="Продажа"> Продажа</option>
            </select>
            <input onChange={(e) => {
              dispatch(setObject({
                ['title']: e.target.value
              }))
            }} value={object['title']} className={'w-full border-2 h-[40px] pl-[15px]'} placeholder={'Название'}
                   type="text"/>
            <input onChange={(e) => {
              dispatch(setObject({
                ['address']: e.target.value
              }))
            }} value={object['address']} className={'w-full border-2 h-[40px] pl-[15px]'} placeholder={'Адрес'}
                   type="text"/>
            <input onChange={(e) => {
              dispatch(setObject({
                ['addressM']: e.target.value
              }))
            }} value={object['addressM']} className={'w-full border-2 h-[40px] pl-[15px]'} placeholder={'Адрес метро'}
                   type="text"/>
            <input onChange={(e) => {
              dispatch(setObject({
                ['coordinates']: e.target.value
              }))
            }} value={object['coordinates']} className={'w-full border-2 h-[40px] pl-[15px]'} placeholder={'Координаты'}
                   type="text"/>
            <textarea onChange={(e) => {
              dispatch(setObject({
                ['description']: e.target.value
              }))
            }} value={object['description']} className={'w-full border-2 h-[120px] pl-[15px]'}
                      placeholder={'Описание'}/>

          </div>
          <button
            onClick={() =>{
              if (isCreate) {
                create()
                revalidate()
              } else {
                update()
                revalidate()
              }
            }}
            className={'text-[20px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>{isCreate ? 'Создать' : 'Редактировать'}</button>
        </div>
      </div>
    </>


)
}