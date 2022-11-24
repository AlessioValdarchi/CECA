import { nanoid } from "nanoid";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { exchangeState } from "../Features/exchangeSlice";
import { useData } from "../Features/useData";
import { FullCoinCard } from "./FullCoinCard";
import { filteredCrypto } from "../Features/selectedCryptoSlice";
import { store } from "../app/store";
import { Modal } from "./Modal";
import redChart from "../assets/coinsPage/CoinCard/redChart-cropped.svg";
import greenChart from "../assets/coinsPage/CoinCard/greenChart-cropped.svg";



export function Ceca() {
    let storage = store.getState()
const [RAW, setRAW]= useState([]);
const [namec, setNamec] = useState([])

    function doCeca(){
        
let temp = storage.difference.map(el=> Object.entries(el.RAW))
let setted =  Array.from(new Set(temp.flat().sort().map(el=>el[0])))
setNamec(setted)
let data=temp.flat().sort().map(el=>el)
const cheapest = []
for (let item of setted){
   let single = data.filter(el=> el[0] === item)
   cheapest.push(single)
}

let temporaneo = []
for (let item of cheapest){
   temporaneo.push(item.map(el=> el[1]).map(el=> el))
}
const final = []

for (let item of temporaneo){
final.push(item.reduce((acc, cur)=>(acc < cur.USDT.PRICE ? acc : cur),
))}

setted.forEach((el,index)=>{
    setRAW(prev=> [...prev, {[el]: final[index]}] )
   

})

}
useMemo(()=>{doCeca()
    
},[storage.difference])

     
        const globalExchange = "custom";
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const filterStatus = useSelector(filteredCrypto);
        const [cardsArray, setCardsArray] = useState([]);
        const [filteredCards, setFilteredCards] = useState([]);

        const array = 
        RAW.map((item, index) => {
           const root = namec[index]
            return (
                <FullCoinCard
                    price={item[namec[index]].USDT.PRICE}
                    imgCoin={`https://www.cryptocompare.com/${item[namec[index]].USDT.IMAGEURL}`}
                    coinName={root}
                    change24h={item[namec[index]].USDT.OPEN24HOUR}
                    globalExchange={globalExchange}
                    index={index}
                    key={nanoid()}
                />
            );
        })


        useEffect(() => {
            if (filterStatus) {
                setFilteredCards(
                    array
                        .map((el, index) => {
                            const searched = filterStatus.toUpperCase().split("");
                            let isOk = true;
                            searched.forEach((item, index) => {
                                if (item === el.props.coinName.split("")[index]) {
                                } else {
                                    isOk = false;
                                    return;
                                }
                            });
                            if (isOk) {
                                return el;
                            } else {
                                return null;
                            }
                        })
                        .filter((item) => item != null)
                );
            } else {
                setFilteredCards(array);
            }
        }, [filterStatus, RAW]);


        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
        window.onscroll = function () { }

        return (
            <div className="w-full h-full mt-4 flex flex-col gap-6 justify-center items-center ">
               
                {filterStatus ? filteredCards : array}</div>
        );
    }