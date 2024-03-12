import axios from "axios";
import {objectToFormData} from "../helpers/formData.js";


const instancePublic = axios.create({
    baseURL: "http://79.174.82.17:8080/public"
}),
instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Methods": "GET,HEAD,POST,PUT,PATCH,DELETE"
    }
})


export const getCards = async (slug) => {
    return await axios.get(` http://79.174.82.17:8080/api/v1/objects`)
}


export const createCard = async data => await axios.post('http://79.174.82.17:8080/api/v1/object', data)

// export const deleteCard = async (id) => {
//     return await axios.delete(`https://65d32fb7522627d50108390b.mockapi.io/cards/${id}`)
// }

export const getArendators = async () => {
    return (await axios.get('http://79.174.82.17:8080/api/v1/tentants/')).data
}

export const getCurrentCard = async (slug) => {
    return (await axios.get(`http://79.174.82.17:8080/api/v1/object/${slug}`)).data
}

/**
 *
 * @param imgUrl { string }
 */

export const reverseImageGet = async imgUrl => {
    const reverseResponce = await instancePublic.get(`/${imgUrl}`, {
        responseType: "blob",
    });

    return reverseResponce;
}

export const removeTentantOfObject = async (tentantsId, objectId) => await axios.delete(`http://79.174.82.17:8080/api/v1/object/remove-tentant/${objectId}`, {
    data: tentantsId
});

export const getTentants = async () => await axios.get("http://79.174.82.17:8080/api/v1/tentants");

export const deleteCard = async id => await axios.delete(`http://79.174.82.17:8080/api/v1/object/${id}`);

export const createTentantsInCard = async (tenstantsInfo, id) => await axios.post(`http://79.174.82.17:8080/api/v1/object/add-tentant/${id}`, {
    tentants: tenstantsInfo,
});
export const updateTentantsInCard = async (tenstantsInfo, id) => await axios.put(`http://79.174.82.17:8080/api/v1/object/update-tentant/${id}`, 
    [...tenstantsInfo]
);

export const updateCard = async (id, data) => {
    console.log({ agentRemuneration: data.agentRemuneration });

    const formUpdate = objectToFormData({
        title: data.title,
        description: data.description,
        address: data.address,
        metro: data.metro,
        agentRemuneration: data.agentRemuneration,
        payback: data.type === "sale-business" ? data.payback : undefined,
        zone: data.zone,
        infoSquare: data.info.square,
        infoTypeWindow: data.info.typeWindow,
        infoLayout: data.info.layout,
        infoCountEntrance: data.info.countEntrance,
        infoEnter: data.info.enter,
        infoCeilingHeight: data.info.ceilingHeight,
        infoFinishing: data.info.finishing,
        infoFloor: data.info.floor,
        infoForce: data.info.force,
        infoGlazzing: data.info.glazing,
        infoHood: data.info.hood,
        priceSquare: data.price.square,
        priceProfitability: data.price.profitability,
        priceGlobal: data.price.global,
        priceRentYear: data.price.rent.year,
        priceRentMouth: data.price.rent.mouth,
        lat: data.coordinates.lat,
        lon: data.coordinates.lon,
        panorama: data.panorama,
        photoMap: data.imageMap.file,
        photos: data.images.map(img => img.file),
        photosLayout: data.layoutImages.map(img => {
            return img.file
        }),
        globalRentFlowYear: data.globalRentFlow.year,
        globalRentFlowMouth: data.globalRentFlow.mouth,
    })

    return await axios.put(`/api/object/${id}`, formUpdate, { withCredentials: true })
}
