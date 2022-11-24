import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { store } from "./app/store";
import { Coins } from "./Components/Coins";
import { Login } from "./Components/Login";
import { Welcome } from "./Components/Welcome";
import SignUp from "./Components/SignUp";
import { Wallet } from "./Components/Wallet";
import Profile from "./Components/Profile";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import PrivateRoute from "./Components/PrivateRoute";


import Page404 from "./Components/Page404";
import { ArticlesList } from "./Components/ArticlesList";
import { Ceca } from "./Components/Ceca";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
          <Route path="*" element={<Page404 />} />
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<PrivateRoute />}>
              <Route element={<App />} >
              <Route path="wallet" element={<Wallet />} />
              <Route path="profile" element={<Profile />} />
              <Route path="coins" element={<Coins />} />
              <Route path="articles" element={<ArticlesList />} />
              <Route path="ceca"  element={<Ceca />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
