import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import productReducer from './features/productSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        cart:cartReducer,
        product:productReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
