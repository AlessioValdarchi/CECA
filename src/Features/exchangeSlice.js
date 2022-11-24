import { createSlice } from "@reduxjs/toolkit"

const initialState = "binance"

const exchangeSlice = createSlice({
    name: "exchange",
    initialState,

    reducers: {
        exchangeChange:{ 
            reducer: (state, action) => {
            return state = action.payload
        }
    }
    }
})

export const exchangeState = (state) => state.exchangeChange
export const exchangeReducer = exchangeSlice.reducer
export const {exchangeChange} = exchangeSlice.actions