import { configureStore } from '@reduxjs/toolkit'
import tag from './slices/tagSlice.jsx'
import tab from './slices/tabSlice.jsx'
import modalWindow from "./slices/modalSlice.jsx";
import popupWindow from "./slices/popupSlice.jsx";
import arendatorSlice from "./slices/arendatorsSlice.jsx";
import tentantsSlice from "./slices/tentants.jsx";
import createObjectSlice from './slices/createObjectSlice.jsx';
import notificationSlice from './slices/notificationSlice.jsx';

export const store = configureStore({
  reducer: {
    createObject: createObjectSlice,
    tentants: tentantsSlice,
    arendators: arendatorSlice,
    tagMore: tag,
    tabMore: tab,
    notification: notificationSlice,
    modalWindow: modalWindow,
    popupWindow: popupWindow,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
})
