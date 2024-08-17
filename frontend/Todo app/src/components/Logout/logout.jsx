import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for v6
import { useDispatch } from 'react-redux';
import { logout } from '../../features/todo/authSlice'; // Adjust the path as needed

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
