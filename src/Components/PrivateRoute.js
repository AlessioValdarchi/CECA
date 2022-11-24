import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Utils
import * as helper from '../helper';
import Logout from './Logout';

const PrivateRoute = () => {


  return helper.getToken() ? <Outlet /> : <Logout />;
}

export default PrivateRoute;