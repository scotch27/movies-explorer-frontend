import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { PAGES } from "../../utils/const";

const ProtectedRoute = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to={PAGES.MAIN} />;
};

export default ProtectedRoute;
