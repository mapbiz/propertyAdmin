import Tag from "./Tag.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    addCardImage,
    addLayoutImage,
    removeCardImage,
    removeLayoutImage,
    resetObject,
    setObject, updateCheckBox, updateRent
} from "../slices/tagSlice.jsx";
import {createCard, getCards, getCurrentCard, reverseImageGet, updateCard} from "../api/api.js";
import {objectToFormData} from "../helpers/formData.js";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {swapElements} from "../helpers/array.js";
import {setModalWindow, setStateWindow} from "../slices/modalSlice.jsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload.js";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {TextareaAutosize, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks.jsx";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Input from "./Input.jsx";
import Tentants from "./Tentants.jsx";
import ImageSwitcher from "./ImageSwitcher/ImageSwitcher.jsx";


export default function ModalWindow({isCreate}) {
    const [isUpload, setUpload] = useState(false)
    const [images, setImages] = useState([
        {
            url: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTZCSmCzmIPm0up8wmW566cK5w3sSTUChT5UnaU3VnFxrHwoRNSnks0xUBmj2r2oeJk"
        },
        {
            url: "data:image/jpeg;base64,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"
        },
        {
            url: "https://loremflickr.com/640/480/cats"
        }
    ])

    const tentants = useSelector(state => state.tentants.value);

    const object = useSelector((state) => state.tagMore.value)
    const modalWindow = useSelector((state) => state.modalWindow)

    const isOpen = modalWindow.modalWindow
    const stateWindow = object.type
    const dispatch = useDispatch()

    const [layoutImages, setLayoutImages] = useState([]);

    useEffect(() => {
        if(object.layoutImages.length === 0) return;

        setLayoutImages(object.layoutImages);
    }, [object]);

    const imgToBlob = () => {
        const files = images.filter((el) => el.file.value)
        setImages(files)
        dispatch(setObject({
            ['images']: files
        }))
    }

    const create = () => {
        // imgToBlob()
        const data = objectToFormData(object, 'create')

    }

    const update = async (id) => {
        const getCurrentTitle = await getCurrentCard(object.slug).then(r => r.data.title)

        const copyObject = {
            ...object, 
            images: await Promise.all(object.images.map(async image => {
                return {
                    ...image,
                    file: (await axios.get(image.url, {
                        responseType: 'blob',
                    })).data    
                }
            })),
            layoutImages: await Promise.all(object.layoutImages.map(async layoutImage => {
                return {
                    ...layoutImage,
                    file: (await axios.get(layoutImage.url, {
                        responseType: 'blob',
                    })).data    
                }
            })),
        };

        if (getCurrentTitle === object.title) {
            const {title, ...rest} = copyObject
            const res = await updateCard(id, rest)
            .catch(err => {
                alert(err.response.data.error.message)
            })

            console.log(res);

            if (res.status === 200) dispatch(setModalWindow({modalWindow: false}))
        } else {
            const res = await updateCard(id, copyObject).catch(err => {
                alert(err.response.data.error.message)
            })

            if (res.status === 200) dispatch(setModalWindow({modalWindow: false}))
        }
    }
    const copyObject = async (id) => {
        try {
            const getCurrentObject = await getCurrentCard(object.slug).then(r => r.data)
            const rentCurrentMouth = getCurrentObject.price?.rent?.mouth
            const rentCurrentYear = getCurrentObject.price?.rent?.year
            const profitability = getCurrentObject.price?.profitability
            const newTitle = `${getCurrentObject.title} copy`;
            const coordinatesCurrent = getCurrentObject.coordinates
            const priceCurrent = getCurrentObject.price

            const {
                layoutImages,
                images,
                info,
                type,
                updatedAt,
                globalRentFlow,
                price,
                tenants,
                slug,
                id,
                createdAt,
                coordinates,
                ...restObject
            } = getCurrentObject

            const newObject = {
                ...restObject,
                title: newTitle,
                lat: coordinatesCurrent.lat,
                lon: coordinatesCurrent.lon,
                priceGlobal: price.global,
                priceSquare: price.square,
                photos: object.images.map(photo => {
                    return photo.file
                }),
                photosLayout: object.layoutImages.map(photo => {
                    return photo.file
                }),
                // Добавляем rentCurrentMouth и Year, если они существует
                ...(rentCurrentMouth ? { rentCurrentMouth:  rentCurrentMouth } : {}),
                ...(rentCurrentYear ? { priceRentYear: rentCurrentYear} : {}),
                // ...(getCurrentObject.price?.rent?.mouth ? { rentCurrentMouth: profitability.price?.rent?.mouth } : {}),
            }

            const formData = objectToFormData(newObject)
            const res = await createCard(formData);

            if (res.data.ok) {
                dispatch(setModalWindow({modalWindow: false}));
            } else {
                // Обработка случая, если операция не удалась.
                console.error('Ошибка при создании копии объекта.');
            }
        } catch (err) {
            // Обработка ошибок, например, при запросах к API.
            alert(err.response.data.error.message);
        }
    }

    const clickOutside = () => {
        dispatch(resetObject())
        dispatch(setModalWindow({
            modalWindow: false
        }))

    };

    const navigate = useNavigate()


    const handleFileChange = (event) => {
        /** @type { FileList } */
        const files = event.target.files;
        // Предполагаем, что вы загружаете и обрабатываете один файл за раз
        if (files.length === 1) {
            const file = files[0];

            // Здесь должна быть логика для отправки файла на сервер и получения URL
            // Для примера предположим, что вы получили URL как 'urlToUploadedFile'
            const urlToUploadedFile = URL.createObjectURL(file);

            // Добавляем URL в redux
            dispatch(addLayoutImage({
                url: urlToUploadedFile,
                file
            }));
        }
        else {
            Array.from(files).forEach(file => {
                const url = URL.createObjectURL(file);

                dispatch(addLayoutImage({
                    url,
                    file,
                }));
            });
        };
    }
    const handleImagesChange = (event) => {
        const files = event.target.files;
        // Предполагаем, что вы загружаете и обрабатываете один файл за раз
        if (files.length === 1) {
            const file = files[0];

            // Здесь должна быть логика для отправки файла на сервер и получения URL
            // Для примера предположим, что вы получили URL как 'urlToUploadedFile'
            const urlToUploadedFile = URL.createObjectURL(file);

            // Добавляем URL в redux
            dispatch(addCardImage({
                url: urlToUploadedFile,
                file
            }));
        }
        else {
            Array.from(files).forEach(file => {
                const url = URL.createObjectURL(file); 

                dispatch(addCardImage({
                    url,
                    file,
                }));
            });
        };
    }


    // стилизация кнопок загрузки

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    //стилизация кнопок загрузки
    const infoProject = {
        sale: 'Объект продажи',
        rent: 'Объект Аренды',
        'sale-business': 'Объект ГАБ'
    }

    return (
        <>
            <div
                className={`${isOpen ? 'block' : 'hidden'} top-0 right-0 left-0 bottom-0 opacity-60 bg-black fixed`}
                onClick={e => clickOutside(e)}
            ></div>
            <div
                className={`${isOpen ? 'block' : 'hidden'} left-[50%] translate-x-[-50%] fixed h-max w-max flex items-center justify-center`}>
                <div className={'bg-white  relative w-[1000px] max-h-[85vh] px-[32px]  overflow-y-auto'}>

                    <div className={'pt-[40px] flex flex-col gap-4 pb-[20px]'}>

                        <div className={'flex justify-between items-center'}>
                            <p className={'font-bold text-red-700 text-left text-3xl'}>
                                {infoProject[object.type]}</p>
                            <div className={'flex gap-4'}>
                                <div>
                                    <button
                                        onClick={async () => {
                                            if (isCreate) {
                                                create()
                                            } else {
                                                await copyObject(object.id).finally(async () => {
                                                    const res = await getCards()
                                                    dispatch(setStateWindow(res.data))
                                                })
                                                // revalidate()
                                            }
                                        }}

                                        className={'text-[20px]  right-12 my-[24px] py-2 leading-[28px] bg-[#144728] px-[20px]  text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>
                                        {'Копировать'}
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className={'text-[20px]  right-24 my-[24px] leading-[28px] bg-[#144728] px-[20px] py-2 text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}
                                        onClick={() => {
                                            navigate('/pdf')
                                        }}>Сформировать PDF
                                    </button>
                                </div>

                            </div>

                        </div>

                        <h2 className={'font-bold'}>Основная информация</h2>
                        <Tag
                            title={'Название:'}
                            name={'title'}
                            className={'w-full'}
                            variant="outlined"
                        />
                        <div className={'flex gap-2.5'}>
                        <Tag
                                title={'Адрес'}
                                name={'address'}
                                className={'w-full'}
                                variant="outlined"
                            />
                            <Tag
                                title={'Адрес метро'}
                                name={'metro'}
                                className={'w-full'}
                                variant="outlined"
                            />
                        </div>

                        <Tag
                            type={'textarea'}
                            title={'Описание'}
                            name={'description'}
                            className={'w-full'}
                            variant="outlined"
                        />
                        <div className={'flex gap-2.5'}>
                            <Tag title={`${object.type === 'rent' ? 'Аренда/мес' : 'Цена:'}`} subName={'global'}
                                 name={'price'}/>
                            <Tag subName={'square'}
                                 title={`${object.type === 'rent' ? 'Арендная ставка м2/мес' : 'Цена за м²:'}`}
                                 name={'price'}/>

                            <Tag 
                                name="price"
                                subName="sale"
                                title="Сниженная цена"
                            />
                        </div>
                        <div className={'flex gap-2.5'}>
                            <Tag
                                title={'Этаж'}
                                subName={'floor'}
                                name={'info'}
                                className={'w-full'}
                                variant="outlined"
                            />
                            {
                                stateWindow === 'sale-business' &&
                                <Tag title={'Окупаемость:'} name={'payback'}/>
                            }
                        </div>

                    </div>
                    <div className={'pb-[20px]'}>
                        <h2 className={'font-bold'}>Ссылка панорамы</h2>
                        <div className={'flex gap-[50px] '}>
                            <Input

                                label={"Ссылка на панораму"}
                                inputType="input"
                                path="panorama"
                            />

                        </div>
                        <h2 className={'pt-2.5 pb-2.5 font-bold'}>Координаты карты</h2>
                        <div className={'flex gap-2.5 '}>
                            <Tag
                                subName={'lat'}
                                title={'Координаты Lat'}
                                name={'coordinates'}
                                className={'w-full'}
                                variant="outlined"
                            />
                            <Tag
                                subName={'lon'}
                                title={'Координаты Lon'}
                                name={'coordinates'}
                                className={'w-full'}
                                variant="outlined"
                            />
                        </div>
                    </div>

                    <div className={'flex flex-col w-full gap-4'}>
                        <h2 className={'font-bold'}>Информация об объекте</h2>
                        <div className={'flex gap-2.5'}>
                            <Tag title={'Планировка:'} name={'info'} subName={'layout'}/>
                            <Tag title={'Высота потолков:'} name={'info'} subName={'ceilingHeight'}/>
                        </div>
                        <div className={'flex gap-2.5'}>
                            <Tag title={'Вход:'} subName={'enter'} name={'info'}/>
                            <Tag title={'Эл. мощность:'} subName={'force'} name={'info'}/>
                        </div>
                        <div className={'flex gap-2.5'}>
                            <Tag title={'Отделка:'} name={'info'} subName={'finishing'}/>
                            <Tag title={'Площадь'} name={'info'} subName={'square'}/>
                            <Tag
                                type={'number'}
                                title={'Вознаграждение агента'}
                                name={'agentRemuneration'}
                            />
                        </div>
                        <div className={'flex gap-2.5'}>

                        </div>


                        <div className={'flex items-center'}>
                            <p>Вытяжка</p>
                            <Input
                                inputType="checkbox"
                                path="info.hood"
                            />
                        </div>
                        <div className={'flex items-center'}>
                            <p>Зона погрузки/разгрузки:</p>
                            <Input
                                inputType="checkbox"
                                path="zone"
                            />
                        </div>

                        <div className="flex items-center">
                            <p>Новый?</p>
                            <Input
                                inputType="checkbox"
                                path="isNew"
                            />
                        </div>

                        {
                            stateWindow === 'sale-business' &&
                            <>
                                <h2 className={'font-bold'}>Общий арендный поток</h2>
                                <Tag type={'number'} title={'Месячный арендный поток:'} subName={'mouth'}
                                     name={'globalRentFlow'}/>
                                <Tag type={'number'} title={'Годовой арендный поток:'} subName={'year'}
                                     name={'globalRentFlow'}/>
                                <Tag type={'number'} name={'payback'} title={'Окупаемость в годах:'}></Tag>
                            </>
                        }
                        <h2 className={'font-bold'}>Коммерческие условия</h2>
                        <div className={'flex flex-col gap-2.5'}>
                            {
                                stateWindow === 'rent' &&
                                <>
                                    <TextField
                                        type={'number'}
                                        className={'w-full'}
                                        onChange={(e) => {
                                            dispatch(updateRent({
                                                type: 'year',
                                                value: e.target.value
                                            }))
                                        }}
                                        value={object.price.rent?.year}
                                        label={'Аренда в год'}
                                        variant="outlined"
                                    />
                                    <TextField
                                        type={'number'}
                                        className={'w-full'}
                                        onChange={(e) => {
                                            dispatch(updateRent({
                                                type: 'mouth',
                                                value: e.target.value
                                            }))
                                        }}
                                        value={object.price.rent?.mouth}
                                        label={'Аренда в месяц'}
                                        variant="outlined"
                                    />

                                </>
                            }

                        </div>
                        {
                            (stateWindow === 'sale-business' || stateWindow === 'sell') &&
                            <>
                                {
                                    stateWindow === 'sale-business' &&
                                    <Tag title={'Доходность:'} subName={'profitability'} name={'price'}/>
                                }
                            </>
                        }

                        {
                            stateWindow === 'sale-business' &&
                            <>
                                <h2 className={'font-bold'}>Арендаторы</h2>
                                {
                                    tentants?.length > 0 ?
                                        <Tentants/>
                                        :
                                        <>Сначала создайте одного арендатора</>
                                }
                            </>
                        }

                    </div>
                    <div className={'pt-[20px]'}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon/>}
                        >
                            Загрузить фотографии объекта
                            <VisuallyHiddenInput multiple
                                                 onChange={handleImagesChange}
                                                 type="file"/>
                        </Button>

                        <div className="flex flex-wrap gap-2 pt-4 ">
                            <ImageSwitcher
                                imgs={object.images.map(image => image.url)}
                                setImgs={newImgs => { 
                                    dispatch(setObject({
                                        images: newImgs.map(img => {
                                            return {
                                                url: img,
                                            };
                                        }),
                                    })); 
                                }}
                            />
                            {/* <div
                                className={'flex flex-col relative '}
                            >
                                <div className={'flex gap-2.5'}>
                                    {object.images && object.images.map((item, index) => {
                                        return (
                                            <div className={'flex flex-col'}>
                                                <img
                                                    className={'max-h-[150px] object-contain rounded-tl-[5px] rounded--tr-[5px]'}
                                                    src={`${item.url}`}
                                                />
                                                <Button onClick={(e) => {
                                                    dispatch(removeCardImage(index));
                                                }}
                                                        color={'error'}
                                                        variant={"contained"}>
                                                    Удалить
                                                </Button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className={'pt-[20px]'}>

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon/>}
                        >
                            Загрузить фотографии планировки
                            <VisuallyHiddenInput multiple
                                                 onChange={handleFileChange}
                                                 type="file"/>
                        </Button>

                        <div className="flex flex-wrap gap-2 pt-4 ">
                            {/* {object.layoutImages && object.layoutImages.map((item, index) => {
                                return (
                                    <div className={'flex flex-col'}>
                                        <img
                                            className={'max-h-[150px] object-contain rounded-tl-[5px] rounded--tr-[5px]'}
                                            src={item.url}
                                            alt={''}/>
                                        <Button onClick={(e) => {
                                            dispatch(removeLayoutImage(index));
                                        }}
                                                color={'error'}
                                                variant={"contained"}>
                                            Удалить
                                        </Button>
                                    </div>


                                )
                            })} */}
                            <ImageSwitcher
                                imgs={layoutImages.map(layoutImage => layoutImage.url)}
                                setImgs={newImgs => { 
                                    dispatch(setObject({
                                        layoutImages: newImgs.map(img => {
                                            return {
                                                url: img,
                                            };
                                        }),
                                    })); 
                                }}
                            />
                        </div>
                    </div>
                    <div className={'flex gap-2'}>
                        <button
                            onClick={async () => {
                                if (isCreate) {
                                    create()
                                } else {
                                    await update(object.id).finally(async () => {
                                        const res = await getCards()
                                        dispatch(setStateWindow(res.data))
                                    })
                                    // revalidate()

                                }
                            }}
                            className={'text-[20px] my-[24px] leading-[28px] bg-[#144728] px-[40px] py-[14px] text-white rounded-[5px] md:hover:bg-[#1E653A] shadow-lg active:bg-[#0B2716] duration-300 font-[300] font-inter'}>{isCreate ? 'Создать' : 'Сохранить изменения'}
                        </button>


                    </div>

                </div>
            </div>
        </>


    )
}