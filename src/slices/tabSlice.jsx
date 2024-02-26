import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    activeTab: 'all'
  },
}

export const tabSlice = createSlice({
  name: 'tabMore',
  initialState,
  reducers: {
    resetTab: (state) => {
      return state = initialState;
    },

    setTab: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetTab, setTab } = tabSlice.actions

export default tabSlice.reducer
