import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ?
     JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state,action){
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if(itemIndex >= 0){
                state.cartItems[itemIndex].quantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].name} cart quantity`, {
                    position: "bottom-left"
                })
            } else {
                const tempProduct = {...action.payload, quantity: 1};
            state.cartItems.push(tempProduct);
            toast.success(`${action.payload.name} added to cart`, {
                position: "bottom-left"
            })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            const newItems = state.cartItems.filter(item => item.id !== action.payload.id);
            state.cartItems = newItems;
            toast.error(`${action.payload.name} removed from cart`, {
                position: "bottom-left"
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if(state.cartItems[itemIndex].quantity > 1){
                state.cartItems[itemIndex].quantity -= 1;
                toast.info(`Decreased ${action.payload.name} cart quantity`, {
                    position: "bottom-left",
                  });
            } else if(state.cartItems[itemIndex].quantity === 1){
                const newItems = state.cartItems.filter(item => item.id !== action.payload.id);
                state.cartItems = newItems;
                toast.error(`${action.payload.name} removed from cart`, {
                    position: "bottom-left",
                  });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
    }
})

export const {addToCart, removeFromCart, decreaseCart} = cartSlice.actions;
export default cartSlice.reducer;