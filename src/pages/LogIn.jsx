import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logIn } = UserAuth();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="w-full h-full object-cover absolute sm:block hidden"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/79fe83d4-7ef6-4181-9439-46db72599559/7a22cef0-c723-405b-8eb7-245472970919/KZ-ru-20221017-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="netflix"
        />
        <div className="bg-black/60 fixed w-full h-screen top-0 left-0"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white ">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 p-3 my-2 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 p-3 my-2 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button className="bg-red-600 py-3 my-6 font-bold rounded">
                  Sign In
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600 mr-2">New to Netflix?</span>{" "}
                  <Link to="/signup">Sign Up</Link>
                </p>
              </form>
              {error ? <p className="bg-red-400 p-3">{error}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
