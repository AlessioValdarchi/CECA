import { nanoid } from "nanoid";
import { useState,useReducer } from "react";
import { CoinCard } from "./CoinCard";
import { Modal } from "./Modal";
import {store} from '../app/store'
import { selectedCryptoSlice } from "../Features/selectedCryptoSlice";
import { initialStateSlice } from "../Features/initialStateSlice";
import { openModalSlice } from "../Features/openModalSlice";
export function FullCoinCard({
  price,
  imgCoin,
  coinName,
  change24h,
  globalExchange,
  index,
}) {
  const [modalOpen, setOpenModal] = useState(false);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const storage = store.getState();

  function disableScroll() {
    store.dispatch(selectedCryptoSlice.actions.changeCrypto(coinName))
    forceUpdate()
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  return (
    <div className="flex justify-center items-center h-16 w-full bg-ceca-color-labels rounded-l-full rounded-r-full shadow-md shadow-black  border-b border-b-gray-300 gap-1">
      <CoinCard
        key={nanoid()}
        price={price}
        imgCoin={imgCoin}
        id={index + 1}
        coinName={coinName}
        change24h={change24h}
      />
      <div className="flex justify-end items-center w-1/5">
        <button
          className="w-full font-bold text-xl cursor-pointer"
          onClick={(e) => {
            disableScroll();
            store.dispatch(openModalSlice.actions.setModalTrue(true))
            store.dispatch(initialStateSlice.actions.sendInitial({exchange:globalExchange,
              crypto:coinName,
              price:price,
              img:imgCoin,
              volatility:change24h}))
          }}
        >
          +
        </button>
        {storage.modalState && (
          <Modal
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
}
