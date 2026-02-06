import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./CartSlice"; 

const store = configureStore({
    reducer: {
        mycart: myReducer
    }
})

export default store; 
