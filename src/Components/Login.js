import React, { useState, useRef, useReducer,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { API } from '../constant.js';
import { setToken } from '../helper.js';
import { store } from "../app/store"
import { dataPackSlice } from "../Features/dataPackSlice";
import {walletAmountSlice}  from "../Features/walletAmountSlice"
import useStateWithCallback, { useStateWithCallbackInstant } from 'use-state-with-callback';
import { updateDatabase } from './hooks/updateDatabase';

export function Login() {
  const { user, setUser } = useAuthContext();
  const [wrong, setWrong] = useState(false);
  const [filled, setFilled] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);


  const handleUnload = async (e) => {
    helper.removeToken()
  };
  const emailInput = useRef()
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const passwordInput = useRef()
  const [dati, setDati] = useState({
    email: '',
    password: '',
  });
  const changeHandler = (e) => {
    setDati({ ...dati, [e.target.id]: [e.target.value] });
  };

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const value = {
        identifier: dati.email[0],
        password: dati.password[0],
      };
      const response = await fetch(`${API}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        Object.entries(dati).map(el => {
          if (el[1] == '') {
            const input = eval(`${el[0]}Input`).current
            setFilled(true)


            input.style.border = "5px solid red"
            setTimeout(() => input.style.border = "none", 2000)
          }
        })
        if (data?.error.message === "Invalid identifier or password") { setWrong(true); }
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);
        setLogged(true)
        
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
      setTimeout(() => { setWrong(false); setFilled(false) }, 2000);
    }
  };


function handleUpdate() {
    if (user?.TotalBuy !== null) {
      user?.TotalBuy.map(el => { store.dispatch(dataPackSlice.actions.sendData(el || null)) })
      
    }
    if(Boolean(user?.Saldo))
    {store.dispatch(walletAmountSlice.actions.sendTotal(user?.Saldo))
      setLogged(true)
    }
  
}
useEffect(()=> {
  logged && handleUpdate()
  logged &&  navigate("/home/coins")
},[logged])
  
  // (user !== "undefined") && setLogged(true)

  return (
    <div className="h-screen m-0 w-screen bg-ceca-color-labels flex-col items-center justify-center">
      <div className="w-full  flex justify-center items-center h-40">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
      </div>
      <div className="flex items-center justify-center h-full bg-ceca-color-button-color rounded-t-m">
        <form className="w-11/12 flex flex-col justify-around gap-3">
          <div className="relative group mb-10  border-b-2 border-ceca-color-labels">
            <input ref={emailInput} onChange={changeHandler} type="text" id="email" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none   focus:ring focus:ring-violet-300" />
            <label htmlFor="email" className=" transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">Email or Username</label>
          </div>
          <div className="relative group mb-10  border-b-2 border-ceca-color-labels">
            <input ref={passwordInput} onChange={changeHandler} type="password" id="password" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none   focus:ring focus:ring-violet-300" />
            <label htmlFor="password" className="transform  transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">Password</label>
          </div>
          {wrong && <span style={{ color: '#ff6961', textAlign: "center" }}>Wrong Identifier or Password</span>}
          {filled && <p style={{ color: '#ff6961', textAlign: "center" }}>All fields must be filled</p>}
          <div className="flex justify-center mt-10"><button className=" hover:bg-violet-700  rounded-full  text-ceca-color-button-color bg-ceca-color-login-background h-16 w-48" onClick={onFinish}>Login</button></div>
          <p className="text-center  mt-2">
            Don't have an account?<span> </span>
            <span className="font-semibold text-ceca-color-login-background cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span>
          </p>

        </form>

      </div>
    </div>

  );
}
