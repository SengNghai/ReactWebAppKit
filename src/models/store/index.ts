import { configureStore } from '@reduxjs/toolkit'
import * as slices from './slices'

export default configureStore({
  reducer: {
    counter: slices.counterSlice.reducer,
  },
})

