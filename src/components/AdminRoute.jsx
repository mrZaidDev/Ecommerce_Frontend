import React, { useContext } from "react";
import { AuthDataContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isAuthenticated,isAdmin] = useContext(AuthDataContext);
  if (!isAuthenticated && !isAdmin) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default AdminRoute;
