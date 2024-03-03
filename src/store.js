import { configureStore } from '@reduxjs/toolkit'
import tag from './slices/tagSlice.jsx'
import tab from './slices/tabSlice.jsx'
import modalWindow from "./slices/modalSlice.jsx";
import popupWindow from "./slices/popupSlice.jsx";
import arendatorSlice from "./slices/arendatorsSlice.jsx";
export const store = configureStore({
  reducer: {
    arendators: arendatorSlice,
    tagMore: tag,
    tabMore: tab,
    modalWindow: modalWindow,
    popupWindow: popupWindow,
  },
})
