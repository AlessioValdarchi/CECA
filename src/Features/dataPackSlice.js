import { createSlice } from "@reduxjs/toolkit"

export const dataPackSlice = createSlice({
    name: "buy",
    initialState : "",
    reducers:{
        sendData: (state, action) => ([...state, action.payload]),
        returnInitial : (state, action) => state = action.payload
        
    }

})