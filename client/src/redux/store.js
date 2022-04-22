import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {productsFetch} from './productsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer, 
    }
})

store.dispatch(productsFetch());