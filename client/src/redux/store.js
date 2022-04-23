import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {productsFetch} from './productsSlice';
import { productsApi } from './productsApi';
import cartReducer, { getTotals } from './cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        [productsApi.reducerPath]: productsApi.reducer, 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(productsFetch());
store.dispatch(getTotals());