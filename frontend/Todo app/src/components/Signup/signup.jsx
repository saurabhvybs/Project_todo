import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = { email, username, password };

    try {
      // Make the API request using axios instance
      const response = await axiosInstance.post('/register', userData);

      console.log('User registered successfully:', response.data);
      
      // Redirect to login page or todo page after successful registration
      navigate('/login'); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };
  return (
    <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden lg:block p-6 mr-2 bg-gray-100 sm:rounded-lg">
              <h1 className="text-4xl text-gray-800 font-extrabold tracking-tight md:text-3xl">
                Welcome !
              </h1>
              <br />
              <br />
              <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 mt-2">
                Already Have an Account ?
              </p>
              <br />
              <Link
                to="/login"
                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
              >
                Log in
              </Link>

              <div className="flex items-center mt-8 text-gray-600"></div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
              <div className="flex flex-col">
                <h2 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                  Sign up
                </h2>
                <br />
                <label for="email" className="hidden">
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
                <label for="name" className="hidden">
                  Username
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-2">
                <label for="password" className="hidden">
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
              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
