import { createSlice } from "@reduxjs/toolkit"

export const selectedCryptoSlice = createSlice({
    name: "crypto",
    initialState : "",
    reducers:{
        changeCrypto: (state, action) => state = action.payload ,
    
        
    }

})

export const filteredCrypto = (state) => state.selectCrypto;