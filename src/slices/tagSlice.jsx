import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {   images: [
      '',
      '',
      ''
    ],
    id: '',
    title: '',
    price: {
      square: null,
      profitability: null,
      global: null,
      rent: {
        year: null,
        mouth: null
      }
    },
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
    panorama: {
      lat: null,
      lon: null
    },
    arendators: [],
    createdAt: '',
    updatedAt: '',
    type: '',
    slug: '',
    info: {
      square: null,
      floor: null,
      ceilingHeight: null,
      countEntrance: null,
      glazing: null,
      typeWindow: '',
      layout: '',
      enter: '',
      finishing: '',
      hood: null,
      force: ''
    },
    metro: '',
    tenantsInfo: [
      {
        detalization: [
          ''
        ],
        indexation: null,
        contract: '',
        rentFlow: {
          mount: null,
          year: null
        },
        tentant: {
          id: '',
          name: '',
          category: '',
          logo: ''
        }
      }
    ],
    globalRentFlow: {
      year: null,
      mouth: null
    },
    payback: null,
    zone: null,
    layoutImages: [
      '',
      '',
      ''
    ]},
}

export const tagSlice = createSlice({
  name: 'tagMore',
  initialState,
  reducers: {
    resetObject: (state) => {
      return initialState
    },
    setArendators: (state, action) => {
      return {
        ...state,
        value: {
          ...state.value,
          arendators: action.payload.arendators,
        },
      };
    },
    addLayoutImage: (state, action) => {
      state.value.layoutImages.push(action.payload);
    },
    addCardImage: (state, action) => {
      state.value.images.push(action.payload);
    },
    removeLayoutImage: (state, action) => {
      state.value.layoutImages.splice(action.payload, 1);
    },
    removeCardImage: (state, action) => {
      state.value.images.splice(action.payload, 1);
    },
    setObject: (state, action) => {
      state.value = {...state.value, ...action.payload }
    },
    openCurrentObject: (state, action) => {
      state.value = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { setObject,addCardImage,removeCardImage, resetObject, setArendators,  openCurrentObject, addLayoutImage, removeLayoutImage} = tagSlice.actions

export default tagSlice.reducer
