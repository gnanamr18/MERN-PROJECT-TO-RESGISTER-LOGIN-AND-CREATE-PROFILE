import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import Login from "../../components/auth/Login";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
