import React from "react";
import {useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ children}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user && user.email === 'abhinayprajapati0000@gmail.com';

  if (!user) {
    navigate("/login");
  }

  if (!isAdmin) {
    navigate("/admin-login")
  }

  return children;
};

export default PrivateRoute;
