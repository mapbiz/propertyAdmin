import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const popupWindowSlice = createSlice({
  name: 'popupWindow',
  initialState,
  reducers: {
    setPopupWindow: (state) => {
      state.value = !state.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPopupWindow } = popupWindowSlice.actions

export default popupWindowSlice.reducer