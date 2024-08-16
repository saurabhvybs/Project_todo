// LogoutButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    // Clear JWT and email from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    // Dispatch the logout action
    dispatch(logout());

    // Redirect to login page
    history.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
