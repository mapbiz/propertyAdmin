import {Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image, Link} from '@react-pdf/renderer';
// Импортируйте шрифт
import InterRegular from '../../fonts/Inter-Regular.ttf'; // Укажите путь к файлу шрифта
import InterBold from '../../fonts/Inter-Bold.ttf'
import metro from '../../public/metro.png'
import map from '../../public/map.png'
import object from '../../public/5.jpg'
import specifications from '../../public/specifications.png'
import cardMap from '../../public/mapCard.jpg'
import propertyLogo from '../../public/property.png'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


const images = [
    '../../public/object.jpg', '../../public/object2.jpg', '../../public/object3.jpg', '../../public/object4.jpg', '../../public/object5.jpg', '../../public/object6.jpg',
]

const apiKey = '6e61e348-993d-4a11-924c-702a0f0279f5'; // Замените на свой API-ключ


// const yandexStaticMapsUrl = `https://static-maps.yandex.ru/1.x/?ll=${card.coordinates.lon},${lat}&size=400,400&z=12&l=map&apikey=${apiKey}`

// Используйте yandexStaticMapsUrl для загрузки изображения или вставьте его в ваше приложение.


const arendators = [
    {
        logo: '../../public/logo.png',
        map: '995 120 ₽',
        gap: '11 941 440 ₽',
        srok: 'ДДА от\n' +
            '01.12.2023 на 10\n' +
            'лет',
        index: '3%',
        detail: '4 % от РТО, но не менее: В ДДА прописана ставка аренды на каждый год БЕЗУСЛОВНО: 1-й год - 497 560 руб/мес 2-й год – 995 120 руб/мес 3-й год – 1 024 974 руб/мес 4-й год – 1 055 723 руб/мес 5-й год – 1 087 394 руб/мес 6-й год – 1 120 016 руб/мес 7-й год – 1 153 617 руб/мес 8-й год – 1 188 225 руб/мес 9-й год – 1 223 872 руб/мес 10-й год – 1 260 588 руб/мес'
    },
    {
        logo: '../../public/logo.png',
        map: '995 120 ₽',
        gap: '11 941 440 ₽',
        srok: 'ДДА от\n' +
            '01.12.2023 на 10\n' +
            'лет',
        index: '3%',
        detail: '4 % от РТО, но не менее: В ДДА прописана ставка аренды на каждый год БЕЗУСЛОВНО: 1-й год - 497 560 руб/мес 2-й год – 995 120 руб/мес 3-й год – 1 024 974 руб/мес 4-й год – 1 055 723 руб/мес 5-й год – 1 087 394 руб/мес 6-й год – 1 120 016 руб/мес 7-й год – 1 153 617 руб/мес 8-й год – 1 188 225 руб/мес 9-й год – 1 223 872 руб/мес 10-й год – 1 260 588 руб/мес'
    },
]


Font.register({family: 'Inter', src: InterRegular});
Font.register({family: 'InterBold', src: InterBold});
export default function TestPdf() {
    const reader = new FileReader();

    const card = useSelector((state) => state.tagMore.value)


    // Разделение текста на абзацы
    const paragraphs = card.description.split('\r\n');

// Создание компонентов Text для каждого абзаца
    const textComponents = paragraphs.map((paragraph, index) => (
        <Text key={index} style={{paddingTop: 10, fontSize: 12}}>
            {paragraph}
        </Text>
    ));

    const title = () => {
        return (
            <View style={styles.titleObject}>
                <View style={{...styles.flexRow, ...styles.gap,}}>
                    <Image style={{width: '38px', height: '38px'}} src={map}></Image>
                    <Text style={styles.text}>{card.address}</Text>
                </View>
                {
                    card.metro
                    &&
                    <View style={{...styles.flexRow, ...styles.gap}}>
                        <Image style={{width: '38px', height: '38px'}} src={metro}></Image>
                        <Text style={styles.text}>{card.metro}</Text>
                    </View>
                }
            </View>
        )
    }

    const item = (icon, tag, value, metric) => {
        return (
            <View style={{
                display: "flex",
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: '20px',
                borderBottom: '2px solid #DDEEE4'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6.5px',
                    alignItems: 'center'
                }}>
                    <Image style={{width: '40px', height: '40px'}}
                           src={icon}></Image>
                    <Text style={{fontSize: '44px', color: 'black'}}>
                        {tag}
                    </Text>
                </View>
                <View style={{display: "flex", flexDirection: 'row', gap: '6px'}}>
                    <Text style={{fontSize: '42px'}}>
                        {value}
                    </Text>
                    {
                        metric
                        &&
                        <Text style={{fontSize: '42px'}}>
                            {metric}
                        </Text>
                    }
                </View>

            </View>
        )
    }

    const footer = () => {
        return (
            <View style={{
                position: 'absolute',
                maxWidth: '2080px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                margin: '0 auto',
                left: '200px',
                right: 0,
                bottom: '100px'
            }}>
                <Image style={{width: '533px', height: '156px', objectFit: 'contain'}} src={propertyLogo}></Image>
                <View style={{
                    width: '100%',
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                }}>
                    <Link style={{textDecoration: 'none', color: 'black', fontSize: '40px'}}
                          href={'tel:+7 495 792 84 98'}>
                        +7 495 792 84 98
                    </Link>
                    <Link style={{textDecoration: 'none', color: 'black', fontSize: '40px'}}
                          href={'mailto:info@propertyplus.ru'}>
                        info@propertyplus.ru
                    </Link>
                    <Text style={{fontSize: '40px', fontFamily: 'Inter'}}>г. Москва, ул Усачева 2, стр. 3</Text>
                </View>
            </View>
        )
    }

    const styles = StyleSheet.create({
        page: {
            position: 'relative',
            paddingTop: '140px',
            flexDirection: 'column',
            backgroundColor: 'white',
            paddingHorizontal: '200px',
        },
        section: {
            display: "flex",
            width: '100%',
        },
        text: {
            maxWidth: '1976px',
            fontFamily: 'Inter',
            display: "flex",
        },
        titleObject: {
            paddingLeft: '24px',
            fontSize: '38px',
            paddingVertical: '34px',
            gap: '31px',
            alignItems: 'flex-start',
            display: "flex",
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            backgroundColor: '#DDEEE4'
        },
        flexRow: {
            display: "flex",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        gap: {
            gap: '14px',
        },
        imagePreview: {
            objectFit: 'cover',
            width: '1020px',
            height: '777px',
        },
        pt120: {
            fontFamily: 'Inter',
            paddingTop: '120px',
            display: "flex",

        },
        textSale: {
            textAlign: 'center',
            fontSize: '48px',
            color: '#144728',
            backgroundColor: '#DDEEE4',
            marginTop: '40px',
            paddingVertical: '10px'
        },
        text64: {
            width: '100%',
            fontFamily: 'InterBold',
            fontWeight: "bold",
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            textAlign: "center",
            fontSize: '60px',
            color: '#144728'
        },
        titleBlack: {
            fontFamily: 'InterBold',
            fontSize: '48px',
            fontWeight: 'bold',
        }

    });
    const typeOfCard = {
        sale: "Продажа торговой площади",
        rent: 'Аренда торговой площади',
        'sale-business': 'ГАБ'
    }
    const navigate = useNavigate()

  

    return (
        <div className={'pt-[150px] flex flex-col justify-center w-full'}>
            <div className={'w-full flex justify-center mb-20'}>
                <button className={'btn'} onClick={() => {
                    navigate('/')
                }}>Вернуться назад
                </button>
            </div>

            <PDFViewer className={'h-screen w-full'}>
                <Document>
                    <Page size={{width: 2480, height: 3508,}} style={styles.page}>
                        {title()}
                        <View style={{...styles.pt120, display: "flex", flexDirection: 'row', gap: '40px'}}>
                            <View style={{maxWidth: '1020px'}}>
                                {
                                    card.images.length > 0
                                    &&
                                    <Image style={styles.imagePreview} src={`${card.images[0].url}`}></Image>
                                }
                                <Text style={{
                                    ...styles.textSale,
                                    width: '100%',
                                    textAlign: "center",
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: 'center'
                                }}>{typeOfCard[card.type]}
                                </Text>
                                {paragraphs.map(item => {
                                    return <Text style={{paddingTop: '40px', fontSize: '40px'}}>
                                        {item}
                                    </Text>
                                })}
                            </View>
                            <View style={{maxWidth: '1020px'}}>
                                {/*блок площадь цена цена за м2*/}
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        width: '100%',
                                        display: "flex",
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Text style={{fontSize: '40px'}}>Площадь:</Text>
                                        <Text style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            fontFamily: 'InterBold',
                                            display: 'flex',
                                            gap: '8px'
                                        }}>
                                            {card.info.square}
                                            <Text style={{color: '#144728', fontSize: '40px'}}>м²</Text>
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '100%',
                                        display: "flex",
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{fontSize: '40px'}}>Цена:</Text>
                                        <Text style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            fontFamily: 'InterBold',
                                            display: 'flex',
                                            gap: '8px'
                                        }}>
                                            {card.price.global && (card.price.global).toLocaleString('ru')}
                                            <Text style={{color: '#144728', fontSize: '40px'}}>₽</Text>
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '100%',
                                        display: "flex",
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end'
                                    }}>
                                        <Text style={{fontSize: '40px'}}>
                                            {card.type !== 'rent' ? 'Цена за м²' : 'Цена за м²/мес:'}


                                        </Text>
                                        <Text style={{
                                            fontSize: '48px',
                                            fontWeight: 'bold',
                                            fontFamily: 'InterBold',
                                            display: 'flex',
                                            gap: '8px'
                                        }}>
                                            {card.price.square && (card.price.square).toLocaleString('ru')}
                                            <Text style={{color: '#144728', fontSize: '40px'}}>₽</Text>
                                        </Text>
                                    </View>
                                    {/*блок площадь цена цена за м2*/}
                                </View>
                                {/*блок зеленый*/}
                                <View style={{
                                    marginTop: '40px',
                                    paddingVertical: '30px',
                                    backgroundColor: '#DDEEE4',
                                    width: '100%',
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    {
                                        (card.type === 'rent') &&

                                        <Text style={styles.text64}>
                                            Аренда
                                        </Text>
                                    }
                                    {
                                        (card.type === 'sale') &&

                                        <Text style={styles.text64}>
                                            Продажа торговой площади
                                        </Text>
                                    }
                                    {
                                        (card.type === 'sale-business') &&
                                        <>
                                            <Text style={styles.text64}>
                                                ГАБ
                                            </Text>
                                            <Text style={styles.text64}>
                                                {card.tenantsInfo.map(tentant => {
                                                    return tentant.tentant.name
                                                })}
                                            </Text>
                                            <Text style={styles.text64}>
                                                {card.payback} лет
                                            </Text>
                                        </>
                                    }
                                </View>
                                {/*блок зеленый*/}
                                {/*Коммерческие условия*/}
                                <View style={{marginTop: '40px',}}>
                                    <Text style={styles.titleBlack}>
                                        Коммерческие условия
                                    </Text>
                                    {card.type === 'rent'
                                        &&
                                        <View style={{border: '3px solid #DDEEE4', marginTop: '20px'}}>
                                            {
                                                card.price.rent.mouth &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px',
                                                    borderBottom: '2px solid #DDEEE4'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            Арендная ставка в месяц/м²:
                                                        </Text>
                                                    </View>
                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.price.square && (card.price.square).toLocaleString('ru')}
                                                    </Text>
                                                </View>
                                            }

                                            {
                                                card.price.rent.year &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px',
                                                    borderBottom: '2px solid #DDEEE4'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            Арендная ставка в год:
                                                        </Text>
                                                    </View>
                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.price.rent.year && card.price.rent.year}
                                                    </Text>
                                                </View>
                                            }
                                            {
                                                card.payback &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            Окупаемость:
                                                        </Text>
                                                    </View>

                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.payback && card.payback} лет
                                                    </Text>
                                                </View>
                                            }

                                        </View>
                                    }
                                    {
                                        card.type === 'sale'
                                        &&
                                        <View style={{border: '3px solid #DDEEE4', marginTop: '20px'}}>
                                            {
                                                card.price.global &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px',
                                                    borderBottom: '2px solid #DDEEE4'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            Общая стоимость:
                                                        </Text>
                                                    </View>
                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.price.global && (card.price.global).toLocaleString('ru')}
                                                    </Text>
                                                </View>
                                            }

                                            {
                                                card.price.square &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px',
                                                    borderBottom: '2px solid #DDEEE4'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            Цена за м²:
                                                        </Text>
                                                    </View>
                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.price.square && card.price.square}
                                                    </Text>
                                                </View>
                                            }
                                            {
                                                card.payback &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            Окупаемость:
                                                        </Text>
                                                    </View>

                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.payback && card.payback} лет
                                                    </Text>
                                                </View>
                                            }

                                        </View>

                                    }
                                    {card.type === 'sale-business' &&
                                        <View style={{border: '3px solid #DDEEE4', marginTop: '20px'}}>
                                            {
                                                card.globalRentFlow.mouth &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px',
                                                    borderBottom: '2px solid #DDEEE4'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            МАП:
                                                        </Text>
                                                    </View>
                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.globalRentFlow.mouth && (card.globalRentFlow.mouth).toLocaleString('ru')}
                                                    </Text>
                                                </View>
                                            }

                                            {
                                                card.globalRentFlow.year &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px',
                                                    borderBottom: '2px solid #DDEEE4'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            ГАП:
                                                        </Text>
                                                    </View>
                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.globalRentFlow.year && card.globalRentFlow.year}
                                                    </Text>
                                                </View>
                                            }
                                            {
                                                card.payback &&
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    padding: '20px'
                                                }}>
                                                    <View style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        gap: '6.5px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Image style={{width: '40px', height: '40px'}}
                                                               src={specifications}></Image>
                                                        <Text style={{fontSize: '44px', color: '#144728'}}>
                                                            Окупаемость:
                                                        </Text>
                                                    </View>

                                                    <Text style={{fontSize: '44px'}}>
                                                        {card.payback && card.payback} лет
                                                    </Text>
                                                </View>
                                            }

                                        </View>
                                    }

                                </View>
                                {/*Коммерческие условия*/}
                                {/*Технические хар-ки*/}
                                <View style={{marginTop: '40px',}}>
                                    <Text style={styles.titleBlack}>
                                        Технические характеристики
                                    </Text>
                                    <View style={{border: '3px solid #DDEEE4', marginTop: '20px'}}>
                                        {
                                            card.info.floor
                                            &&
                                            item('./etazh.jpg', 'Этаж', `${card.info.floor}`)
                                        }
                                        {
                                            card.info.enter
                                            &&
                                            item('./vhod.png', 'Количество входов', `${card.info.enter}`)
                                        }
                                        {
                                            card.info.square
                                            &&
                                            item('./ploshad.png', 'Площадь', `${card.info.square}`, 'м²')
                                        }
                                        {
                                            card.info.ceilingHeight
                                            &&
                                            item('./potolok.png', 'Высота потолков', `${card.info.ceilingHeight}`, 'м')
                                        }
                                        {
                                            card.info.force
                                            &&
                                            item('./set.png', 'Мощность', `${card.info.force}`, 'кВт')
                                        }
                                        {
                                            card.info.layout
                                            &&
                                            item('./plan.png', 'Планировка', `${card.info.layout}`,)
                                        }
                                        {
                                            card.info.typeWindow
                                            &&
                                            item('./steklo.png', 'Остекление', `${card.info.typeWindow}`,)
                                        }
                                        {
                                            card.info.finishing
                                            &&
                                            item('./otdelka.png', 'Отделка', `${card.info.finishing}`,)
                                        }

                                    </View>
                                </View>
                                {/*Технические хар-ки*/}
                            </View>

                        </View>
                        {/*Карта*/}
                        <View style={{paddingTop: '150px'}}>
                            <Link target={"_blank"}
                                  href={`https://maps.yandex.ru/?text=${card.coordinates.lat}+${card.coordinates.lon}`}>
                                {
                                    // https://static-maps.yandex.ru/v1?lang=ru_RU&ll=28.98824,41.043451&z=9&size=200,200&apikey=YOUR_API_KEY
                                    card.coordinates.lat &&
                                    <Image style={{width: '2080px', height: '962px', objectFit: 'cover'}}
                                           src={`https://static-maps.yandex.ru/v1?lang=ru_RU&ll=${card.coordinates.lon},${card.coordinates.lat}&size=650,450&apikey=6e61e348-993d-4a11-924c-702a0f0279f5&scale=1&z=15&pt=${card.coordinates.lon},${card.coordinates.lat},pm2dgm`}></Image>
                                }
                            </Link>
                        </View>

                        {/*Карта*/}
                        {footer()}
                    </Page>
                    <Page size={{width: 2480, height: 3508}} style={styles.page}>
                        {title()}
                        <View style={{paddingTop: '200px'}}>
                            {(card.type !== 'rent' && card.type !== 'sale') &&
                                <View style={{
                                    flexDirection: "row",
                                    display: 'flex',
                                    width: '100%',
                                    border: '2px solid #9E9E9E',
                                    backgroundColor: '#EAEAEA'
                                }}>
                                    <View style={{
                                        width: '40%',
                                        paddingTop: '30px',
                                        paddingBottom: '30px',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{
                                            fontSize: '36px',
                                            fontWeight: 'bold',
                                            fontFamily: 'InterBold',
                                            width: '100%',
                                            textAlign: "center"
                                        }}>
                                            Арендатор
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '40%',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{
                                            fontSize: '36px',
                                            fontFamily: 'Inter',
                                            width: '100%',
                                            textAlign: "center"
                                        }}>
                                            МАП
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '40%',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{
                                            fontSize: '36px',
                                            fontFamily: 'Inter',
                                            width: '100%',
                                            textAlign: "center"
                                        }}>
                                            ГАП
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '50%',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{
                                            fontSize: '36px',
                                            fontFamily: 'Inter',
                                            width: '100%',
                                            textAlign: "center"
                                        }}>
                                            Договор
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '50%',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{
                                            fontSize: '36px',
                                            fontFamily: 'Inter',
                                            width: '100%',
                                            textAlign: "center"
                                        }}>
                                            Индексация
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '100%',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Text style={{
                                            fontSize: '36px',
                                            fontFamily: 'Inter',
                                            width: '100%',
                                            textAlign: "center",
                                        }}>
                                            Детализация арендного потока
                                        </Text>
                                    </View>
                                </View>
                            }

                            {card.type !== 'rent' && card.tenantsInfo.map(item => {
                                return <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    borderBottom: '2px solid #9E9E9E',
                                    borderLeft: '2px solid #9E9E9E'
                                }}>
                                    <View style={{
                                        width: '40%',
                                        padding: '20px',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        {/*тут*/}
                                        <Image style={{width: '150px', height: '150px'}}
                                               src={`/public/${item.tentant.logo}`}></Image>
                                    </View>
                                    <View style={{
                                        width: '40%',
                                        padding: '20px',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{fontSize: '36px', fontFamily: 'Inter', color: 'black'}}>
                                            {item.rentFlow.month && item.rentFlow.month}
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '40%',
                                        padding: '20px',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{fontSize: '36px', fontFamily: 'Inter', color: 'black'}}>
                                            {item.rentFlow.year && item.rentFlow.year}
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '50%',
                                        padding: '20px',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{fontSize: '36px', fontFamily: 'Inter', color: 'black'}}>
                                            {item.contract}
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '50%',
                                        padding: '20px',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{fontSize: '36px', fontFamily: 'Inter', color: 'black'}}>
                                            {item.indexation}
                                        </Text>
                                    </View>
                                    <View style={{
                                        width: '100%',
                                        padding: '20px',
                                        height: '100%',
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        borderRight: '1px solid #9E9E9E'
                                    }}>
                                        <Text style={{fontSize: '36px', fontFamily: 'Inter', color: 'black'}}>
                                            {item.detalization && item.detalization.map(detalization => {
                                                return detalization
                                            })}
                                        </Text>
                                    </View>
                                </View>
                            })}
                            <View style={{
                                display: "flex",
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: '60px',
                                marginTop: '200px'
                            }}>
                                {card.layoutImages.length > 1 ?
                                    card.layoutImages.map(item => {
                                        return (
                                            <Image
                                                style={{maxWidth: '1010px', maxHeight: '700px', objectFit: 'contain'}}
                                                src={item.url}></Image>
                                        )
                                    }) :
                                    card.layoutImages.map(item => {
                                        return (
                                            <Image
                                                style={{maxHeight: '1200px', objectFit: 'contain', paddingTop: '200px'}}
                                                src={item.url}></Image>
                                        )
                                    })
                                }

                            </View>
                        </View>
                        {footer()}
                    </Page>
                    <Page size={{width: 2480, height: 3508}} style={styles.page}>
                        {title()}
                        <View style={{
                            display: "flex",
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: '60px',
                            paddingTop: '150px'
                        }}>
                            {card.images.map(item => {
                                return (
                                    <Image style={{maxWidth: '1010px', maxHeight: '700px', objectFit: 'contain'}}
                                           src={item.url}>

                                    </Image>
                                )
                            })}
                        </View>
                        {footer()}
                    </Page>
                </Document>
            </PDFViewer>
        </div>

    )
}