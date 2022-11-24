import { createSlice } from "@reduxjs/toolkit"
export const initialStateSlice = createSlice({
    name: "initialState",
    initialState : {},
    reducers:{
        sendInitial: (state, action) =>  state = action.payload ,
        
    }

})