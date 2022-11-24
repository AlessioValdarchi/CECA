import { createSlice } from "@reduxjs/toolkit"
export const differenceSlice = createSlice({
    name: "initialState",
    initialState : {},
    reducers:{
        sendDifference: (state, action) =>  state = action.payload ,
        
    }

})