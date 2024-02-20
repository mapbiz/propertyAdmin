import axios from "axios";

export const getCards = async () => {
  return await axios.get('https://65d32fb7522627d50108390b.mockapi.io/cards')
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