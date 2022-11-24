import { configureStore } from "@reduxjs/toolkit"
import { dataPackSlice } from "../Features/dataPackSlice"
import { exchangeReducer } from "../Features/exchangeSlice"
import { combineReducers } from "@reduxjs/toolkit";
import { realTimePackSlice } from "../Features/realtimePackSlice";
import { realTimeStampPackSlice } from "../Features/realTimeStampPackSlice";
import {walletAmountSlice}  from "../Features/walletAmountSlice"
import {selectedCryptoSlice} from "../Features/selectedCryptoSlice"
import {totalBuysSlice} from "../Features/totalBuysSlice"
import {initialStateSlice} from "../Features/initialStateSlice"
import { openModalSlice } from "../Features/openModalSlice";
import { differenceSlice } from "../Features/differenceSlice";
import { customSlice } from "../Features/customSlice";

const reducer = combineReducers({
    exchangeChange: exchangeReducer,
    dataPack: dataPackSlice.reducer,
    realtime: realTimePackSlice.reducer,
    realtimeStamp: realTimeStampPackSlice.reducer,
    walletAmount: walletAmountSlice.reducer,
    selectCrypto: selectedCryptoSlice.reducer,
    totalBuys: totalBuysSlice.reducer,
    initialState: initialStateSlice.reducer,
    modalState: openModalSlice.reducer,
    difference:differenceSlice.reducer,
    custom:customSlice.reducer
    
   });
export const store = configureStore({
        reducer
})