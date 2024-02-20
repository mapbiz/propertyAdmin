import { configureStore } from '@reduxjs/toolkit'
import tag from './slices/tagSlice.jsx'
export const store = configureStore({
  reducer: {
    tagMore: tag
  },
})
