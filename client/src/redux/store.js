import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {productsFetch} from './productsSlice';
import { productsApi } from './productsApi';
import cartReducer, { getTotals } from './cartSlice';
import authReducer, { loadUser } from './authSlice';
import usersReducer, { usersFetch } from './usersSlice';
import ordersReducer from './ordersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        orders: ordersReducer,
        products: productsReducer,
        users: usersReducer,
        [productsApi.reducerPath]: productsApi.reducer, 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));
store.dispatch(usersFetch());