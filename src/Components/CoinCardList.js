import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { exchangeState } from "../Features/exchangeSlice";
import { useData } from "../Features/useData";
import { FullCoinCard } from "./FullCoinCard";
import { filteredCrypto } from "../Features/selectedCryptoSlice";

import { store } from "../app/store";

export function CoinCardList(prop) {
  const globalExchange = useSelector(exchangeState);
  const { allData, error, isLoading, mutate } = useData();
  const storage = store.getState()
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const filterStatus = useSelector(filteredCrypto);
  const [cardsArray, setCardsArray] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

    const array =  allData.map((item, index) => {
        return (
          <FullCoinCard
            price={item.price}
            imgCoin={item.imgCoin}
            coinName={item.coinName}
            change24h={item.change24h}
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
  }, [filterStatus, allData]);


  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
  window.onscroll = function () {}

  return (
    <div className="w-full h-full mt-4 flex flex-col gap-6 justify-center items-center ">
      {!isLoading && !error ? filterStatus ? filteredCards : array : null}</div>
  );
}
