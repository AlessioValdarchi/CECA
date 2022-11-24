import { createSlice } from "@reduxjs/toolkit"

export const walletAmountSlice = createSlice({
    name: "amount",
    initialState : 50000,
    reducers:{
        sendBuy: (state, action) => state -= action.payload,
        sendSell: (state, action) => state += action.payload ,
        sendTotal: (state, action) =>  (state += action.payload - state) ,
    
        
    }

})