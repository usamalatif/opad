import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handlevalidToken } from '../utils/AdminApi';

const ProtectedRoute = ({ children }) => {
  const [tokenValidity, setTokenValidity] = useState(null); // Initialize to null
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenValidity = await handlevalidToken('admin');
        console.log(tokenValidity, "hello world");
        setTokenValidity(tokenValidity.status);

        if (!tokenValidity.status) {
          localStorage.removeItem('token'); 
          navigate('/login');

        }
      } catch (error) {
        console.error('Error:', error);
        localStorage.removeItem('token'); 
        navigate('/login');
      }
    };

    if (token) {
      fetchToken();
    } else {
      localStorage.removeItem('token'); 
      navigate('/login');
    }
  }, [navigate, token]);

  if (tokenValidity === null) {
    return null;
  }

  return token && tokenValidity ? children : null;
};

export default ProtectedRoute;
