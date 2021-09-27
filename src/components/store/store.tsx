import { configureStore } from '@reduxjs/toolkit'
import reducer from './index';

const store = configureStore({
  reducer: reducer,
})

export default store