import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    modalWindow: false,
    stateWindow: '',
  },

}

export const modalWindowSlice = createSlice({
  name: 'modalWindow',
  initialState,
  reducers: {
    setModalWindow: (state) => {
      state.value.modalWindow = !state.value.modalWindow
    },
    setStateWindow: (state, action) => {
      console.log(action.payload)

    state.value = {...state.value, ...action.payload }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setModalWindow,setStateWindow } = modalWindowSlice.actions

export default modalWindowSlice.reducer