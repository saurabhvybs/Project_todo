import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../features/todo/authSlice';


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth); // Accessing auth state

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/todo"); // Redirect to /todo on successful login
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password})); // Dispatching login action
  };

  return (
    <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
              <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                Welcome! Back
              </h1>
              <br />
              <br />
              <p className="hidden lg:block text-normal text-lg sm:text-xl font-medium text-gray-600 mt-2">
                Don't Have an Account ?
              </p><br />
              <Link
                to="/signup"
                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
              >
                Register
              </Link>

              <div className="hidden md:invisible lg:flex items-center mt-8 text-gray-600"></div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
              <div className="flex flex-col">
                <h2 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                  Log in
                </h2>
                <br />
                <label htmlFor="name" className="hidden">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="tel" className="hidden">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
              >
                SignIn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
