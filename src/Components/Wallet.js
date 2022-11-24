import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../app/store';
import { Chart } from './Chart';
import arrow from '../assets/Eo_circle_green_arrow-up.svg.png';
import { useData } from '../Features/useData';
import { realTimePackSlice } from '../Features/realtimePackSlice';
import { realTimeStampPackSlice } from '../Features/realTimeStampPackSlice';
import switchUpImg from '../assets/switch-38.svg';
import switchDownImg from "../assets/1024px-Eo_circle_red_arrow-down.svg.png"
import usdImg from '../assets/USD-PNG-Background.png';
import { totalBuysSlice } from "../Features/totalBuysSlice"
import { useAuthContext } from '../context/AuthContext';
import ReactPaginate from 'react-paginate';


export function Wallet() {
  const navigate = useNavigate();
  const { allData } = useData();
  const [temp, setTemp] = useState([]);
  const [fiat, setFiat] = useState(true);
  const storage = store.getState();
  const saldo = storage.walletAmount;
  const { user } = useAuthContext()

  const tempStorage = storage.dataPack !== "" && storage.dataPack.filter(Boolean)
  const split = storage.dataPack !== "" && Array.from(new Set(tempStorage.map((el) => el.crypto)));
  const totalBuys = {}
  if (
    storage.dataPack !== "") {
    for (let i = 0; i < split.length; i++) {
      totalBuys[split[i]] = {
        buy: tempStorage.filter((el) => el.crypto === split[i]).map((el) => el.buy || 1).reduce((acc, el) => acc + el, 0),
        singleBuy: tempStorage.filter((el) => el.crypto === split[i]).map((el) => el.buy || 1),
        img: tempStorage.find((el) => el.crypto === split[i]).img,
        vlt: tempStorage.find((el) => el.crypto === split[i]).volatility,
        crypto: split[i],
        price: tempStorage.find((el) => el.crypto === split[i]).price,
        realTimePrice: allData.find(
          (el) => split[i] === el.coinName,
        )?.price,

      };
    }
  }
  useEffect(() => { store.dispatch(totalBuysSlice.actions.sendTotal(totalBuys)) }, [totalBuys])
  const x = Object.values(totalBuys).length >= 1 && (Object.values(totalBuys).map((el) => el.buy * el.realTimePrice).reduce((acc, item) => acc + item));

  const usdBalanceCard = (
    <div className="flex justify-between items-center p-2 pr-10 pl-6 border-b border-b-gray-300 gap-1 rounded-full bg-ceca-color-labels w-11/12">
      <div className="flex space-between items-center grow gap-1 ">
        <img className="w-8 h-8 rounded-full" src={usdImg} alt="true" />
        <div className="flex flex-col items-baseline">
          <p>USD</p>

        </div>
      </div>

      <div>
        <p>
          $
          {new Intl.NumberFormat('en-EN').format(saldo.toFixed(2))}
        </p>

      </div>
    </div>
  );

  const makeCard = (el) => {
    const percentual = (((el.realTimePrice - el.vlt) / el.realTimePrice) * 100).toFixed(2);
    return (
      <div className="flex justify-between items-center p-2 pr-10 pl-6 border-b border-b-gray-300 gap-1 rounded-full bg-ceca-color-labels w-11/12">
        <div className="flex space-between items-center grow gap-1 ">
          <img className="w-10 h-10 rounded-full" src={el.img} alt="true" />
          <div className="flex flex-col items-baseline">
            <p>{el.crypto}</p>
            <small className="text-center">
              {el.buy.toFixed(3)}
              {' '}
              {el.crypto}
            </small>
          </div>
        </div>

        <div>
          <p>
            $
            {new Intl.NumberFormat('en-EN').format((el.buy * el.realTimePrice).toFixed(2))}
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
            </p>
          )}
        </div>
      </div>
    );
  };

  const makeTrans = (el) => {
    for (const item of el.singleBuy) {
      if (Math.sign(item * el.price) === 1) {
        const time = Date.now();
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = `${String(new Date(time).getHours()).padStart(2, '0')}:${String(new Date(time).getMinutes()).padStart(2, '0')} ${month[new Date(time).getMonth()]} ${String(new Date(time).getDate()).padStart(2, '0')}, ${(new Date(time).getYear()) + 1900} `;
        setTemp((prev) => [...prev, <div className="flex justify-around items-center p-2 pr-10 pl-6 border-b border-b-gray-300 gap-1 rounded-full bg-ceca-color-labels w-11/12">

          <div className="flex space-between items-center grow gap-1 ">
            <img className="w-10 h-10 rounded-full" src={arrow} alt="true" />
            <div className="flex flex-col items-baseline">
              <p>
                $
                {(item * el.price).toFixed(2)}
              </p>
              <small className="text-center">
                {item.toFixed(3)}
                {' '}
                {el.crypto}
              </small>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <p style={{ color: '#77dd77' }}>Deposited</p>
            <p>{date}</p>
          </div>
        </div>]);
      }
      else {
        const time = Date.now();
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = `${String(new Date(time).getHours()).padStart(2, '0')}:${String(new Date(time).getMinutes()).padStart(2, '0')} ${month[new Date(time).getMonth()]} ${String(new Date(time).getDate()).padStart(2, '0')}, ${(new Date(time).getYear()) + 1900} `;
      
        setTemp((prev) => [...prev, <div className="flex justify-around items-center p-2 pr-10 pl-6 border-b border-b-gray-300 gap-1 rounded-full bg-ceca-color-labels w-11/12">

          <div className="flex space-between items-center grow gap-1 ">
            <img className="w-10 h-10 rounded-full" src={switchDownImg} alt="true" />
            <div className="flex flex-col items-baseline">
              <p>
                $
                {(item * el.price * -1).toFixed(2)}
              </p>
              <small className="text-center">
                {(item * -1).toFixed(3)}
                {' '}
                {el.crypto}
              </small>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p style={{ color: '#ff6961' }}>Withdraw</p>
            <p>{date}</p>
          </div>
        </div>]);
      }
    }
  };


  useEffect(() => {
    store.dispatch(realTimePackSlice.actions.sendTime(Object.values(totalBuys).length >= 1 && (saldo + Object.values(totalBuys).map((el) => el.buy * el.realTimePrice).reduce((acc, item) => acc + item))));
    store.dispatch(realTimeStampPackSlice.actions.sendTimeStamp(Date.now()));
  }, [x]);

  useEffect(() => {
    Object.entries(totalBuys).map((el) => makeTrans(el[1]));
  }, [totalBuys.singleBuy]);

  function switchFiat() {
    fiat ? setFiat(false) : setFiat(true);
  }

  const items = temp.slice(0, temp.length / 2).map((el) => el)
  function Items({ currentItems }) {
    return (
      <>
        {
          currentItems.map((item) => (
            
              item
            
          ))}
      </>
    );
  }
  
  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      window.scrollTo(0, document.body.scrollHeight)
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
        className='flex gap-3 mb-10'
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return (
    <div style={{ overflowY: "scroll" }} className="flex flex-col items-center w-full">

      <div className="w-full bg-ceca-color-login-background py-5 flex flex-col justify-center items-center">
        <div className="flex-col items-center w-full text-ceca-color-button-color">
          <h1 className="text-center text-2xl tracking-wider font-light">{user.username}'s Portfolio</h1>
          <br />
          <br />
          <div className="flex justify-center">
            {' '}
            {fiat ? (
              <h3 className="text-center text-4xl font-extrabold ">
                $
                {new Intl.NumberFormat('en-EN').format((saldo + (Object.values(totalBuys).length >= 1 && x || 0)).toFixed(2))}
              </h3>
            ) : (
              <h3 className="text-center text-4xl font-extrabold ">
                $
                {Object.values(totalBuys).length >= 1 && new Intl.NumberFormat('en-EN').format((x).toFixed(2)) || 0}
              </h3>
            )}
            {' '}
          </div>
          <div className="flex flex-col items-center mt-3">
            <img onClick={switchFiat} className="ml-3 w-7 opacity-50" src={switchUpImg} alt="" />
            <p className="text-center text-base text-ceca-color-button-color opacity-50 ">
              {fiat ? 'Total' : 'Crypto'}
              {' '}
              Balance
              {' '}
            </p>
          </div>
        </div>


        <div style={{maxWidth:"41rem"}} className='w-full'>
          <Chart fiat={fiat} saldo={saldo} />
        </div>
      </div>
      <section className=" flex flex-col gap-1 w-11/12">
        <h3 className=" mx-5 my-5 font-bold ">Assets</h3>

        <div className="w-full flex flex-col justify-center items-center gap-4">
          {usdBalanceCard}
          {Object.values(totalBuys).length >= 1 ? Object.entries(totalBuys).map((el) => makeCard(el[1])) : <button className="text-ceca-color-button-color bg-ceca-color-login-background text-xs p-2 font-semibold rounded-full w-32 h-8" onClick={() => navigate('/home/coins')}>Buy some assets</button>}
        </div>
      </section>
      <br />
      <section className=" flex flex-col gap-1 w-11/12">
        {Object.values(totalBuys).length >= 1 && <h3 className=" mx-5 my-5 font-bold ">Latest transactions</h3>}
        <div className="w-full h-80 flex flex-col items-center gap-4">
        <PaginatedItems itemsPerPage={2} />,
    
        </div>
        
      </section>

    </div >
  );
}
