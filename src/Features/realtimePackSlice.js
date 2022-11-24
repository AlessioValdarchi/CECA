import { createSlice } from "@reduxjs/toolkit"

export const realTimePackSlice = createSlice({
    name: "realtime",
    initialState : [],
    reducers:{
        sendTime: (state, action) => ([...state, action.payload]),
    
        
    }

})