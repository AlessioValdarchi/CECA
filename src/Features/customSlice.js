import { createSlice } from "@reduxjs/toolkit"
export const customSlice = createSlice({
    name: "customState",
    initialState : {},
    reducers:{
        sendCustom: (state, action) =>  state = action.payload ,
        
    }

})