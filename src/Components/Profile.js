import React from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext } from "../context/AuthContext.js";
import { API } from "../constant";
import { useState } from "react";
import { getToken } from "../helper.js";
import { Navigate } from "react-router";
import { updateDatabase } from "./hooks/updateDatabase.js";


const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false)
  const { user, isLoading, setUser } = useAuthContext();
  updateDatabase()

  const [dati, setDati] = useState({
    username: user?.username,
    email: user?.email,
    github_username: user?.github_username || "",
    avatar_url: user?.avatar_url

  })


  const changeHandler = e => {
    setDati({ ...dati, [e.target.id]: e.target.value });
  }



  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setSaved(false)
    setLoading(true);
    const values= {
    ...dati
    };
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(values),
      });
      const responseData = await response.json();
    

      setUser(responseData);
      setSaved(true)
      setTimeout(() => {setSaved(false)
       return <Navigate to="/login" />
    }, 2000)

     
      
    } catch (error) {
      console.log("Error", error)
    } finally {
      setLoading(false);
      

    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }
  return (

<div className="h-screen m-0 w-screen  bg-ceca-color-labels flex-col items-center justify-center">
    <div className="w-full  flex justify-center items-center h-40">
      <h1 className='text-2xl font-bold'>Update Your Profile</h1>
    </div>
    <div className="flex justify-center h-full bg-ceca-color-button-color rounded-t-m">
      <form onSubmit={handleProfileUpdate} className="w-11/12 flex flex-col gap-10 p-10">
      <div className="relative group  border-b-2 border-ceca-color-labels ">
          <input  onChange={changeHandler}type="text" value = {dati?.username}id="username" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none focus:ring focus:ring-violet-300" />
          <label htmlFor="username" className=" transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">Username</label>
        </div>
        <div className="relative group border-b-2 border-ceca-color-labels">
          <input  value = {dati?.email} onChange={changeHandler}type="text" id="email" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none focus:ring focus:ring-violet-300" />
          <label htmlFor="email" className=" transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">Email</label>
        </div>
        <div className="relative group border-b-2 border-ceca-color-labels">
          <input value = {dati?.github_username} onChange={changeHandler} type="text" id="github_username" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none focus:ring focus:ring-violet-300" />
          <label htmlFor="github_username" className="transform  transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">GitHub Username</label>
        </div> 
        <div className="relative group border-b-2 border-ceca-color-labels">
          <input value = {dati?.avatar_url} onChange={changeHandler} type="text" id="avatar_url" required className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none focus:ring focus:ring-violet-300" />
          <label htmlFor="avatar_url" className="transform  transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0 ">Avatar Url</label>
        </div>
        {/* {wrong && <p className='text-center'>Wrong Email or Password</p>} */}
        <div className="flex flex-col items-center justify-center mt-10" ><button className="  rounded-full   bg-ceca-color-login-background h-16 w-48 text-ceca-color-button-color" onClick={handleProfileUpdate}>Save</button> {saved && <p>Data saved</p>}</div>      </form>
        


    </div>
  </div>
  );
};

export default Profile;