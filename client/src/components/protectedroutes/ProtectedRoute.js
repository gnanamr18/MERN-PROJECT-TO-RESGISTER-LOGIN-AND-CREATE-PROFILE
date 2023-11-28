import React from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    return <div>ProtectedRoute</div>;
  }
};

export default ProtectedRoute;
