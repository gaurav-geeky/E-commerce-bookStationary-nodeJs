import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({

    name: "mycart",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, actions) => {
            console.log(actions.payload);
            state.cart.push(actions.payload);
        },

        qntyInc: (state, actions) => {

            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id == actions.payload.id) {
                    state.cart[i].qnty++;
                }
            }
        },
        qntyDec: (state, actions) => {

            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id == actions.payload.id) {

                    if (state.cart[i].qnty > 1) {
                        state.cart[i].qnty--;
                    }
                }
            }
        },
        proRemove: (state, actions) => {
            state.cart = state.cart.filter(key => key.id != actions.payload.id);
        }


    }
})

export const { addToCart, qntyInc, qntyDec, proRemove } = cartSlice.actions;  // must be in { add cart }
export default cartSlice.reducer;

// we need it there where cart is present (tokri)