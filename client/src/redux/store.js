import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {productsFetch} from './productsSlice';
import { productsApi } from './productsApi';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        [productsApi.reducerPath]: productsApi.reducer, 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(productsFetch());