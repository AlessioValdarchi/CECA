import { useState } from "react";
import { useSelector } from "react-redux";
import { exchangeState } from "../Features/exchangeSlice";
import { Modal } from "./Modal";
import redChart from "../assets/coinsPage/CoinCard/redChart-cropped.svg";
import greenChart from "../assets/coinsPage/CoinCard/greenChart-cropped.svg";
export function CoinCard({ coinName, imgCoin, price, id, change24h }) {
  const percentual = (((price - change24h) / price) * 100).toFixed(2);
  const globalExchange = useSelector(exchangeState);

  const [modalOpen, setOpenModal] = useState(false);

  // function to disable scroll (re-enabled in Modal component)
  function disableScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  return (
    <div className="flex justify-between items-center h-12 w-4/5 rounded-l-full bg-ceca-color-labels">
      <div className="flex justify-between items-center w-3/5">
        <img src={imgCoin} alt="coin" className="w-10 h-10 ml-5" />

        <div className="flex flex-col justify-center items-center w-4/5">
          <p className="text-center">
            {`${new Intl.NumberFormat("it-IT").format(price)} $`}
          </p>
          <p className="text-gray font-semibold">{coinName}</p>
        </div>
      </div>

      <div className="w-1/5 flex flex-col justify-center items-center h-1/2">
        <p>24h%
        </p>
      {Math.sign(percentual) !== -1 ? (
            <p style={{ color: '#77dd77' }}>
              +
              {percentual}
              %
            </p>
          ) : (
            <p style={{ color: '#ff6961' }}>
              {percentual}
              %
            </p>)}
        
      </div>

      {/* <div className="flex justify-end items-center w-1/5">
        <button
          className="w-full font-bold text-xl"
          onClick={(e) => {
            setOpenModal(true);
            disableScroll();
          }}
        >
          +
        </button>
        {modalOpen && (
          <Modal
          setOpenModal={setOpenModal} exchange={globalExchange} crypto={coinName} price={price} img= {imgCoin} volatility= {change24h}
          />
        )}
      </div> */}
    </div>
  );
}
