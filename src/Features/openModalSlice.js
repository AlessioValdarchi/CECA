import { createSlice } from "@reduxjs/toolkit"

export const openModalSlice = createSlice({
    name: "modal",
    initialState : false,
    reducers:{
        setModalTrue: (state, action) => state = action.payload ,
    
        
    }

})

export const filteredCrypto = (state) => state.selectCrypto;