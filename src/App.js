import { Navbar } from "./Components/Navbar";
import { Suspense, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext.js"
import * as helper from './helper';
import { store } from './app/store'
import { dataPackSlice } from "./Features/dataPackSlice";
import { Coins } from "./Components/Coins";
import Profile from "./Components/Profile";
import { Wallet } from "./Components/Wallet";
import Favicon from 'react-favicon'
import logo from './assets/favicon/LOGO.ico'
import { openModalSlice } from "./Features/openModalSlice";
import { selectedCryptoSlice } from "./Features/selectedCryptoSlice";
import { ArticlesList } from "./Components/ArticlesList";
import { motion } from "framer-motion"
import {customSlice} from './Features/customSlice'
import { Ceca } from "./Components/Ceca";




export function App() {


  const { user } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  let storage = store.getState()

//algoritmo sorting best crypto in exchanged

// if(storage.exchangeChange === "custom"){
  
  
//   let temp = storage.difference.map(el=> Object.entries(el.RAW))
//   let setted =  Array.from(new Set(temp.flat().sort().map(el=>el[0])))
//   let data=temp.flat().sort().map(el=>el)
//   const cheapest = []
//   for (let item of setted){
//      let single = data.filter(el=> el[0] === item)
//      cheapest.push(single)
//   }
  
//   let temporaneo = []
//   for (let item of cheapest){
//      temporaneo.push(item.map(el=> el[1]).map(el=> el))
//   }
//   const final = []
  
//   for (let item of temporaneo){
//   final.push(item.reduce((acc, cur)=>(acc < cur.USDT.PRICE ? acc : cur),
//   ))}
//   const RAW = []
//   setted.forEach((el,index)=>{
//       RAW.push({[el]: final[index]})
//   }
  
//   )
//   store.dispatch(customSlice.actions.sendCustom(RAW))
// }
  

  useEffect(() => {
  }, [user?.avatar_url]);
  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);

    };
  }, []);


  const handleUnload = async (e) => {
    e.preventDefault()
    helper.removeToken()

  };
  if (location.pathname !== "/home/coins") {
    store.dispatch(selectedCryptoSlice.actions.changeCrypto(""))
    store.dispatch(openModalSlice.actions.setModalTrue(false))
  }

  return (
    <div className="relative text-base ">
      <Favicon url={logo} />
      <div className="flex justify-between items-center  p-5 border-b border-b-gray-300 bg-ceca-color-login-background">

        <div className="w-12 bg-ceca-color-login-background rounded-full">
          <img
            src={require("./assets/LOGO.png")}
            className="object-cover cursor-pointer"
            onClick={() => { navigate('/home/coins') }}
          ></img>
        </div>
        <div className="w-40  flex justify-around items-center">

          {location.pathname === "/home/profile" && <button className="  mx-auto rounded-full   text-ceca-color-login-background  ml-3 h-10  w-36 bg-ceca-color-button-color" onClick={() => { helper.removeToken(), navigate("/"), store.dispatch(dataPackSlice.actions.returnInitial("")) }}>Logout</button>}
          <div className="w-40 flex gap-3 items-center justify-end">
            <img src={user?.avatar_url || require("./assets/avatar-placeholder.webp")} className='aspect-auto w-12 rounded-full'></img>
          </div>
        </div>
      </div>
      <div className="content-div">

      </div>
      {location.pathname === "/home/coins" && <Coins />}
      {location.pathname === "/home/profile" && <Profile />}
      {location.pathname === "/home/wallet" && <Wallet />}
      {location.pathname === "/home/articles" && <ArticlesList />}
      {location.pathname === "/home/ceca" && <Ceca />}



      <Navbar />
    </div>
  );
}
