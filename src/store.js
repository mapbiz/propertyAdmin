import { configureStore } from '@reduxjs/toolkit'
import tag from './slices/tagSlice.jsx'
import tab from './slices/tabSlice.jsx'
export const store = configureStore({
  reducer: {
    tagMore: tag,
    tabMore: tab
  },
})
