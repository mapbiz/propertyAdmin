import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    images: [],
    id: '',
    title: '',
    price: '',
    square: '',
    windowType: '',
    cellingHeight: '',
    finishing: '',
    priceM: '',
    address: '',
    coordinates1: '',
    coordinates2: '',
    description: '',
    addressM: '',
    layout: '',
    entrance: '',
    elPower: '',
    hood: '',
    totalCost: '',
    tenant: '',
    profitability: '',
    monthlyRentalFlow: '',
    annualRentalFlow: '',
    leaseTerm: '',
    panorama: '',
  },
}

export const tagSlice = createSlice({
  name: 'tagMore',
  initialState,
  reducers: {
    resetObject: (state) => {
      return state = initialState;
    },

    setObject: (state, action) => {
      state.value = {...state.value, ...action.payload }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setObject, resetObject } = tagSlice.actions

export default tagSlice.reducer
