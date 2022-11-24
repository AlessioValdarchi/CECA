import { createSlice } from "@reduxjs/toolkit"
export const totalBuysSlice = createSlice({
    name: "totalBuys",
    initialState : {},
    reducers:{
        sendTotal: (state, action) =>  (state = action.payload) ,
        
    }

})