import { createSlice } from "@reduxjs/toolkit"

export const realTimeStampPackSlice = createSlice({
    name: "realtimeStamp",
    initialState : [],
    reducers:{
        sendTimeStamp: (state, action) => ([...state, action.payload])
    
        
    }

})