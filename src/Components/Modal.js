import React, { useState } from "react";
import { useRef, useEffect, useReducer } from "react";
import { store } from "../app/store";
import { dataPackSlice } from "../Features/dataPackSlice";
import { walletAmountSlice } from "../Features/walletAmountSlice";
import { ThreeDots } from 'react-loader-spinner';
import { getToken } from '../helper.js';
import { useAuthContext } from '../context/AuthContext';
import { updateDatabase } from "./hooks/updateDatabase";
import imgSwitch from '../assets/LOGO.png'
import { openModalSlice } from "../Features/openModalSlice";
import { selectedCryptoSlice } from "../Features/selectedCryptoSlice";
import donepgn from '../assets/done-icon.png'
import { useMemo } from "react";


export function Modal() {

  const [amount, setAmount] = useState('');
  const [amountOnSell, setAmountOnSell] = useState('');
  const { user, isLoading, setUser } = useAuthContext();
  const [buy, setBuy] = useState("");
  const [dataPack, setDataPack] = useState("")
  const firstRender = useRef(true)
  const input = useRef(1)
  const inputSell = useRef(1)
  const storage = store.getState()
  const saldo = storage.walletAmount
  const cryptoForSell = storage.totalBuys
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [loadBuy, setLoadBuy] = useState(false)
  const [doneBuy, setDoneBuy] = useState(false)
  const [loadSell, setLoadSell] = useState(false)
  const [doneSell, setDoneSell] = useState(false)
  const { exchange,crypto,price,img, volatility } = useMemo(()=>    storage.initialState,[doneBuy, doneSell])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setDataPack({ buy, exchange, crypto, price, img, amount, volatility })
  }, [dataPack])

  function amountChange(e) {
    setAmount(Number(e.target.value))
    let buys = e.target.value

    let currentPrice = Number(price)
    let total = buys / currentPrice
    setBuy(Number(total))



  }
  function amountChangeOnSell(e) {
    let currentPrice = Number(price)
    setAmountOnSell(Number(e.target.value))
    let sells = e.target.value
    let total = sells / currentPrice
    if (total > cryptoForSell[crypto].buy) {
      return
    }
    else {
      setBuy(Number(-total))
    }

  }
  function enableScroll() {
    window.onscroll = function () { };
  }
  async function clickEvent(e) {
    e.preventDefault();

    let id = Date.now();
    let data = { buy, exchange, crypto, price, img, amount, volatility, id }
    if (buy) {
      if (amount <= saldo) {
        store.dispatch(walletAmountSlice.actions.sendBuy(amount))
        setDataPack(data);
        (dataPack === undefined || null) ? console.log(1) : store.dispatch(dataPackSlice.actions.sendData(dataPack));
        setLoadBuy(true)
        setTimeout(() => {
          setLoadBuy(false)
          setDoneBuy(true)
        }, 1000);
        setTimeout(() => {
          store.dispatch(selectedCryptoSlice.actions.changeCrypto(""))
          store.dispatch(openModalSlice.actions.setModalTrue(false))
          enableScroll()
        }, 2000);

      }
    }
    else {
      return
    }
  }

  async function clickEventOnSell(e) {
    e.preventDefault()

    let id = Date.now();
    let data = { buy, exchange, crypto, price, img, amount, volatility, id }
    // store.dispatch(walletAmountSlice.actions.sendSell(amount));
    if (buy) {
      store.dispatch(walletAmountSlice.actions.sendSell(amountOnSell))
      setDataPack(data);
      (dataPack === undefined || null) ? console.log(1) : store.dispatch(dataPackSlice.actions.sendData(dataPack));
      setLoadSell(true)
      setTimeout(() => {
        setLoadSell(false)
        setDoneSell(true)
      }, 1000);
      setTimeout(() => {
        store.dispatch(selectedCryptoSlice.actions.changeCrypto(""))
        store.dispatch(openModalSlice.actions.setModalTrue(false))
        enableScroll()
      }, 2000);
    } else {
      return
    }
  }



  function handleUpdateOnBuy() {
    const temp = saldo - amount
    forceUpdate();
    updateDatabase(user, setUser, store, temp);
  }
  function handleUpdateOnSell() {
    const temp = saldo + amountOnSell
    forceUpdate();
    updateDatabase(user, setUser, store, temp);
  }




  return (
    <>
      <div className="fixed z-30 opacity-70 inset-0 w-screen h-screen bg-ceca-color-button-color"></div>

      <div className="fixed h-5/6 z-40 m-auto inset-0 mt-20  border border-solid border-gray-200 shadow-xl rounded-3xl flex flex-col justify-between bg-ceca-color-button-color w-3/4">
        <div className="flex justify-end items-center h-8">
          <button
            onClick={() => {
              store.dispatch(selectedCryptoSlice.actions.changeCrypto(""))
              store.dispatch(openModalSlice.actions.setModalTrue(false))
              enableScroll();
              handleUpdate()
            }}
            className="text-3xl rounded-full  w-10 mt-2 ml-2"
          >
            x
          </button>
        </div>
        <div className="w-full font-semibold flex flex-col items-center gap-5 ">
          <p className="text-xl text-center text-wider">
            Buying</p>


          <input
            type="number"
            min="0"
            onChange={amountChange}
            name="amount"
            ref={input}
            value={amount}

            style={{ color: "#347AF0" }}
            className=" text-center rounded-full w-11/12 h-12 text-2xl bg-ceca-color-labels"
            placeholder={`$0`}
          />
          <small className="text-ceca-dark-grey opacity-50 mb-10">
            {input.current.value / price} {crypto}
          </small>
          <button
            type="submit"
            onClick={(e) => {
              clickEvent(e);
              enableScroll();
              handleUpdateOnBuy()
            }}
            className="text-ceca-color-button-color bg-ceca-color-login-background text-xs p-2 font-semibold rounded-full w-32 h-8"
          >
            Buy
          </button>
          {loadBuy && <ThreeDots
            height="20"
            width="20"
            radius="3"
            color="#347AF0"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />}
          {doneBuy && <img style={{
            height: "20px",
            width: "20px"
          }} src={donepgn}></img>}
        </div>
        <div className="flex flex-col justify-center items-center">
          <div style={{ position: "relative", top: "2.3rem" }} className="flex justify-center items-center  w-20 h-20 rounded-full"><img src={img} className="w-full" /></div>

          <div className="w-full font-semibold flex flex-col items-center gap-5 bg-ceca-color-labels pt-24 pb-16 rounded-b-3xl">
            <p className="text-xl text-center text-wider">
              Selling</p>


            <input
              type="number"
              min="0"
              max={cryptoForSell[crypto] ? price * (cryptoForSell[crypto].buy) : 0}
              onChange={amountChangeOnSell}
              name="amount"
              ref={inputSell}
              value={amountOnSell}

              style={{ color: "#347AF0" }}
              className=" text-center rounded-full w-11/12 h-12 text-2xl mt-5"
              placeholder={`$0`}
            />
            <small className="text-ceca-dark-grey opacity-50 mt-6">
              {/* {inputSell.current.value / price} {crypto} */}

              Max Sell :  {cryptoForSell[crypto] ? ((price * (cryptoForSell[crypto].buy)).toFixed(1)) : 0}$

            </small>

            <button
              type="submit"
              onClick={(e) => {
                clickEventOnSell(e);
                handleUpdateOnSell()
                enableScroll();
              }}
              className="text-ceca-color-button-color bg-ceca-color-login-background text-xs p-2 font-semibold rounded-full w-32 h-8"
            >
              Sell
            </button>
            {loadSell && <ThreeDots
              height="20"
              width="20"
              radius="3"
              color="#347AF0"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />}
            {doneSell && <img style={{
              height: "20px",
              width: "20px"
            }} src={donepgn}></img>}
          </div>



        </div>
      </div>
    </>
  );
}
