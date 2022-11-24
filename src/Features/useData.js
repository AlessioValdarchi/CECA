import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr"
import { exchangeState } from "./exchangeSlice";
import {store} from "../app/store";
import { differenceSlice } from "./differenceSlice";
export function useData(){

    const [allData, setAllData] = useState([])
    const [allCoins, setAllCoins] = useState("")
    const currentExchange = useSelector(exchangeState)


const fetcher = url => fetch(url).then(resp => resp.json())
const {data, error, isLoading=!data&&!error , mutate} = useSWR(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${allCoins}&tsyms=USDT&e=${currentExchange}`, fetcher, {revalidateOnFocus: true, refreshInterval: 5000})

  const exchange = [  "binance",
  "bitfinex",
  "coinbase",
  "kraken",
  "cryptodotcom",
  "ftx"]

  let temp= [];

 for (let best of exchange) {
      const {data, error, isLoading=!data&&!error , mutate} =  useSWR(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${allCoins}&tsyms=USDT&e=${best}`, fetcher, {revalidateOnFocus: true})
      temp.push(data)}
      
 

  try {
    
   
      
    store.dispatch(differenceSlice.actions.sendDifference(temp))
  } catch (error) {
    console.error(error)
  }
   



const {data:coinData} = useSWR(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USDT`, fetcher)

useEffect(()=>{
  setAllData([])
  if(data){
        for(const item in  data["RAW"]){
            setAllData(prev => [...prev, {
            imgCoin:`https://www.cryptocompare.com/${data["RAW"][item].USDT.IMAGEURL}`,
            price: data["RAW"][item].USDT.PRICE,
            coinName: data["RAW"][item].USDT.FROMSYMBOL,
            change24h: data["RAW"][item].USDT.OPEN24HOUR
          }])
        }
            
}
}, [data])

useEffect(()=>{
  setAllCoins("")
  if(coinData){
coinData.Data.forEach(item => {
  setAllCoins(prev => `${prev},${item.CoinInfo.Name}`)
});
  }
},[coinData])

  return(
    {
      allData,
      error,
      isLoading,
      mutate
    }
  )
}