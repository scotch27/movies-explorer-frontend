import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { PAGES } from "../../utils/const";

const ProtectedRoute = ({ loggedIn, toAuth }) => {
  if (!loggedIn && toAuth) return <Navigate to={PAGES.LOGIN} />;
  if (loggedIn && !toAuth) return <Navigate to={PAGES.MOVIES} />;
  return <Outlet />;
};

export default ProtectedRoute;
