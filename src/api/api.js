import axios from "axios";


const instancePublic = axios.create({
  baseURL: "http://79.174.82.17:8080/public"
})

export const getCards = async (slug) => {
  return await axios.get(` http://79.174.82.17:8080/api/v1/objects`)
}

/**
 * @returns { {data: { id: string, title: string, price: number, cellingHeight: number | { from: number, to: number } } }
 * */
export const createCard = async (data) => {
  return await axios.post('https://65d32fb7522627d50108390b.mockapi.io/cards', data)
}

export const updateCard = async (data, id) => {
  return await axios.put(`https://65d32fb7522627d50108390b.mockapi.io/cards/${id}`, data)
}

export const deleteCard = async (id) => {
  return await axios.delete(`https://65d32fb7522627d50108390b.mockapi.io/cards/${id}`)
}

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