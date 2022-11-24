import { useDispatch, useSelector } from "react-redux";
import { exchangeChange, exchangeState } from "./exchangeSlice";
import { selectedCryptoSlice } from "../Features/selectedCryptoSlice";
import { store } from "../app/store";
import { useData } from "../Features/useData";
import { useRef } from "react";
import { nanoid } from "nanoid";
const storage = store.getState();

export function ExchangeSelect() {
  const currentExchange = useSelector(exchangeState);
  const dispatch = useDispatch();
  const { allData, error, isLoading, mutate } = useData();
  const exchangeName = useRef();
  const cryptoNames = [
    "BTC",
    "ETH",
    "SOL",
    "BUSD",
    "DOGE",
    "MATIC",
    "BNB",
    "XRP",
    "CHZ",
    "MASK",
    "LTC",
    "ALGO",
    "ADA",
    "APT",
    "LINK",
    "SHIB",
    "FTT",
    "BCH",
    "AVAX",
    "ATOM",
    "ETC",
    "FIL",
    "APE",
    "EOS",
    "DOT",
    "SAND",
    "TRX",
    "RNDR",
    "LUNC",
    "GMT",
    "AXS",
    "NEAR",
    "OP",
    "FTM",
    "BAND",
    "UNI",
    "AAVE",
    "LRC",
    "AR",
    "SUSHI",
    "XMR",
    "MANA",
    "LUNA",
    "SLP",
    "XLM",
    "RAD",
    "WAVES",
    "FLOW",
    "ZIL",
    "ENS",
    "KSM",
    "ICP",
    "RUNE",
    "RSR",
    "OCEAN",
    "EGLD",
    "JST",
    "VET",
    "SRM",
    "INJ",
    "SNX",
    "GRT",
    "DYDX",
    "THETA",
    "HBAR",
    "JASMY",
    "LIT",
    "CRV",
    "KLAY",
    "1INCH",
    "IMX",
    "YGG",
    "GTC",
    "ZEC",
    "USDC",
    "FIRO",
    "XTZ",
    "CAKE",
    "ROSE",
    "GALA",
    "WIN",
    "DASH",
    "QNT",
    "ENJ",
    "COMP",
    "AUDIO",
    "BURGER",
    "IOTX",
    "STORJ",
    "GAL",
    "KNC",
    "ONT",
    "BTC",
    "ETH",
    "SOL",
    "BUSD",
    "DOGE",
    "MATIC",
    "BNB",
    "XRP",
    "CHZ",
    "MASK",
    "LTC",
    "ALGO",
    "ADA",
    "APT",
    "LINK",
    "SHIB",
    "FTT",
    "BCH",
    "AVAX",
    "ATOM",
    "ETC",
    "FIL",
    "APE",
    "EOS",
    "DOT",
    "SAND",
    "TRX",
    "RNDR",
    "LUNC",
    "GMT",
    "AXS",
    "NEAR",
    "OP",
    "FTM",
    "BAND",
    "UNI",
    "AAVE",
    "LRC",
    "AR",
    "SUSHI",
    "XMR",
    "MANA",
    "LUNA",
    "SLP",
    "XLM",
    "RAD",
    "WAVES",
    "FLOW",
    "ZIL",
    "ENS",
    "KSM",
    "ICP",
    "RUNE",
    "RSR",
    "OCEAN",
    "EGLD",
    "JST",
    "VET",
    "SRM",
    "INJ",
    "SNX",
    "GRT",
    "DYDX",
    "THETA",
    "HBAR",
    "JASMY",
    "LIT",
    "CRV",
    "KLAY",
    "1INCH",
    "IMX",
    "YGG",
    "GTC",
    "ZEC",
    "USDC",
    "FIRO",
    "XTZ",
    "CAKE",
    "ROSE",
    "GALA",
    "WIN",
    "DASH",
    "QNT",
    "ENJ",
    "COMP",
    "AUDIO",
    "BURGER",
    "IOTX",
    "STORJ",
    "GAL",
    "KNC",
    "ONT",
  ];

  function changeHandler(e) {
    dispatch(exchangeChange(e.target.value));
  }
  function changeCrypto(e) {
    // if (cryptoNames.some((el) => el === e.target.value)) {
    //   store.dispatch(selectedCryptoSlice.actions.changeCrypto(e.target.value));
    // } else if (e.target.value === "") {
    //   store.dispatch(selectedCryptoSlice.actions.changeCrypto(e.target.value));
    // }

    store.dispatch(selectedCryptoSlice.actions.changeCrypto(e.target.value));
  }

  return (
    <div className=" text-sm w-full p-1 h-full flex  justify-between items-end text-ceca-color-dark-grey relative">
      <input
        list="cryptos"
        name="crypto"
        id="crypto"
        placeholder="Select"
        onChange={changeCrypto}
      />
      <datalist
        id="cryptos"
        name="cryptos"
        list="cryptos"
        className="outline-none bg-transparent font-semibold text-blue-600"
      >
        {allData.map((item) => {
          return <option value={item.coinName} key={nanoid()}></option>;
        })}
      </datalist>
      <select
        onChange={changeHandler}
        id="exchange"
        name="exchange"
        list="exchange"
        ref={exchangeName}
        className="outline-none bg-transparent font-semibold text-blue-600"
      >
        <option value={"binance"}>Binance</option>
        <option value={"bitfinex"}>Bitfinex</option>
        <option value={"coinbase"}>Coinbase</option>
        <option value={"kraken"}>Kraken</option>
        <option value={"cryptodotcom"}>Crypto.com</option>
        <option value={"ftx"}>FTX</option>
        
      </select>
    </div>
  );
}
