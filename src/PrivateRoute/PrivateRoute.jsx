import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = (user) => {
    return user && user.email === 'abhinayprajapati0000@gmail.com';
  }

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (!loading && !isAdmin(user)) {
      const { pathname } = location;
      if (pathname.startsWith("/admin")) {
        navigate("/admin-login");
      }
    }
  }, [loading, user, navigate, isAdmin, location]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
