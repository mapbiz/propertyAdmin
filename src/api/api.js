import axios from "axios";
import {objectToFormData} from "../helpers/formData.js";



const instanceApi = axios.create({
    baseURL: `/api`,
    withCredentials: true,
}),
instance = axios.create({
    baseURL: `/public`
});

const instancePublic = axios.create({
    baseURL: "https://prop-test.ru/server/public"
});
// instance = axios.create({
//     baseURL: "/api",
//     withCredentials: true,
//     headers: {
//         "Access-Control-Allow-Methods": "GET,HEAD,POST,PUT,PATCH,DELETE"
//     }
// })

export const editTentant = async ({
    id,
    name,
    category,
    logo,
}) => await instanceApi.patchForm(`/tentant/${id}`, { name, category, logo });
export const deleteTentant = async id => await instanceApi.delete(`/tentant/${id}`);
export const addTentant = async ({
    name,
    category,
    logo,
}) => await instanceApi.postForm(`/tentant`, {
    name,
    category, 
    logo,
});

export const authUser = async (login, password) => await axios.post(`/auth/login`, { login, password }, {
    withCredentials: true,
});
export const authMe = async () => await axios.get(`/auth/me`, { withCredentials: true });

export const getCards = async slug => await instanceApi.get('/objects');

// export const getCards = async (slug) => {
//     return await axios.get(`https://prop-test.ru/server/api/v1/objects`)
// }

// export const authUser = async (login, password) => await axios.post('/admin/login', { login, password }, { withCredentials: true }),
// authMe = async () => await axios.get('/admin/auth/me', { withCredentials: true });


export const createCard = async data => await instanceApi.post('/object', data);

// export const deleteCard = async (id) => {
//     return await axios.delete(`https://65d32fb7522627d50108390b.mockapi.io/cards/${id}`)
// }

export const getArendators = async () => (await instanceApi.get('/tentants')).data;
// export const getArendators = async () => {
//     return (await axios.get('https://prop-test.ru/server/api/v1/tentants/')).data
// }

export const getCurrentCard = async (slug) => {
    return (await instanceApi.get(`/object/${slug}`)).data
}

/**
 *
 * @param imgUrl { string }
 */

export const reverseImageGet = async imgUrl => {
    const reverseResponce = await instance.get(`${imgUrl}`, {
        responseType: "blob",
    });

    return reverseResponce;
}

export const removeTentantOfObject = async (tentantsId, objectId) => await instanceApi(
    `/object/remove-tentant/${objectId}`,
    {
        data: tentantsId,
    }
);
// export const removeTentantOfObject = async (tentantsId, objectId) => await axios.delete(`https://prop-test.ru/server/api/v1/object/remove-tentant/${objectId}`, {
//     data: tentantsId,
//     withCredentials: true
// });

export const getTentants = async () => await instanceApi.get('/tentants');

export const deleteCard = async id => await instanceApi.delete(`/object/${id}`);
//export const deleteCard = async id => await axios.delete(`https://prop-test.ru/server/api/v1/object/${id}`, {withCredentials: true});

export const createTentantsInCard = async (tenstantsInfo, id) => await instanceApi.post(
    `/object/add-tentant/${id}`,
    {
        tentants: tenstantsInfo, 
    },
);
export const updateTentantsInCard = async (tenstantsInfo, id) => await instanceApi.put(
    `/object/update-tentant/${id}`,
    [...tenstantsInfo],
);

// export const createTentantsInCard = async (tenstantsInfo, id) => await axios.post(`https://prop-test.ru/server/api/v1/object/add-tentant/${id}`, {
//     tentants: tenstantsInfo,
// }, {withCredentials: true});
// export const updateTentantsInCard = async (tenstantsInfo, id) => await axios.put(`https://prop-test.ru/server/api/v1/object/update-tentant/${id}`,
//     [...tenstantsInfo], {withCredentials: true}
// );

export const updateCard = async (id, data) => {
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
        // photoMap: data.imageMap.file,
        photos: data.images.map(img => img.file),
        photosLayout: data.layoutImages.map(img => {
            return img.file
        }),
        globalRentFlowYear: data.globalRentFlow.year,
        globalRentFlowMouth: data.globalRentFlow.mouth,
    })



    return await instanceApi.put(`/object/${id}`, formUpdate);
}
