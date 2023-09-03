import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { PAGES } from "../../utils/const";

const ProtectedRoute = ({ ...props }) => {
  console.log(props.loggedIn);
  return props.loggedIn ? <Outlet /> : <Navigate to={PAGES.LOGIN} />;
};

export default ProtectedRoute;
