import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { API } from '../constant.js';
import { setToken } from '../helper.js';
const axios = require('axios').default;
import logo from '../assets/LOGO.png'
function SignUp() {


  const [dati, setDati] = useState({
    username: '',
    email: '',
    password: '',
  });
  const usernameInput = useRef()
  const emailInput = useRef()
  const passwordInput = useRef()
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [filled, setFilled] = useState(false);
  const [taken, setTaken] = useState(false);

  const changeHandler = (e) => {
    setDati({ ...dati, [e.target.id]: [e.target.value] });
  };

  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const onFinish = async (e) => {
    e.preventDefault();
    const values = {
      username: dati.username[0],
      email: dati.email[0],
      password: dati.password[0],
    };
    setIsLoading(true);

    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        if (data.error.message === "email must be a valid email") {
          setValidEmail(true)
        }
        else if (data.error.message === "password must be at least 6 characters") {
          setValidPassword(true)
        }
        else if (data.error.message === "Email or Username are already taken") {
          setTaken(true)
        }

        Object.entries(dati).map(el => {
          if (el[1] == '') {
            const input = eval(`${el[0]}Input`).current
            setFilled(true)

            input.style.border = "5px solid red"
            setTimeout(() => input.style.border = "none", 2000)
          }
        })
        throw data?.error;

      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);
        sendMail(values.email, values.username)

        navigate('/home/coins', { replace: true });
      }
    } catch (error) {

      console.error(error);
      setError(error ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
      setTimeout(() => { setValidEmail(false), setValidPassword(false), setFilled(false), setTaken(false) }, 2000)

    }
  };
  async function sendMail(email, user) {
    const data = {
      "sender": {
        "name": "Ceca Team",
        "email": "rick@ceca.com"
      },
      "to": [
        {
          "email": email,
          "name": user
        }
      ],
      "subject": "Welcome to Ceca",
      "htmlContent": `<html>
     <head></head>
     <body style="background-color:#347AF0;">
       <h1 style="color:white; text-align: center; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">Welcome to Ceca, ${user}! </h1>
       <div>
           <img style="float: left; margin-right: 2rem;"
             src="https://i.imgur.com/IKYDWxG.png"
             alt="Ceca"
             width="180"
             height="180"
           /><br /><br /><br />
           <p style="color:white; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">Good luck on your crypto journey!</p>
       </div>
     </body>
   </html>`
    }

    const response = await axios.post(
      'https://api.sendinblue.com/v3/smtp/email', data,
      { headers: { 'accept': 'application/json', 'Content-Type': 'application/json', 'api-key': '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' } }
    )
  };

  return (
    <div className="h-screen m-0 w-screen bg-ceca-color-labels flex-col items-center justify-center">
      <div className="w-full  flex justify-center items-center h-40">
        <h1 className="text-2xl font-bold">Create Account</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-full bg-ceca-color-button-color rounded-t-m">
        <form onSubmit={onFinish} className="w-11/12 flex flex-col justify-around gap-3">
          <div className="relative group mb-10  border-b-2 border-ceca-color-labels ">
            <input onChange={changeHandler} ref={usernameInput} type="text" id="username" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none focus:ring focus:ring-violet-300" />
            <label htmlFor="username" className=" transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">Username</label>
          </div>
          <div className="relative group mb-10 border-b-2 border-ceca-color-labels">
            <input ref={emailInput} onChange={changeHandler} type="email" id="email" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none focus:ring focus:ring-violet-300" />
            <label htmlFor="email" className=" transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">Email</label>
          </div>
          <div className="relative group border-b-2 border-ceca-color-labels">
            <input ref={passwordInput} onChange={changeHandler} type="password" id="password" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none focus:ring focus:ring-violet-300" />
            <label htmlFor="password" className="transform  transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">Password</label>
          </div>
          {filled && <p style={{ color: '#ff6961', textAlign: "center" }}>All the fields must be filled</p>}
          {validEmail && <p style={{ color: '#ff6961', textAlign: "center" }}>Email must be a valid email</p>}
          {validPassword && <p style={{ color: '#ff6961', textAlign: "center" }}>Password must be at least 6 characters</p>}
          {taken && <p style={{ color: '#ff6961', textAlign: "center" }}>Email or Username are already taken</p>}

          <div className="flex justify-center mt-10"><button className="  rounded-full   bg-ceca-color-login-background h-16 w-48 text-ceca-color-button-color" onClick={onFinish}>Let's Get Started</button></div>
          <p className="text-center  mt-2">
            Already have an account? <span> </span>
            <span className="font-semibold text-ceca-color-login-background cursor-pointer" onClick={() => navigate('/login')}>Sign In</span>
          </p>
        </form>
      </div>
      
    </div>
  );
}

export default SignUp;
