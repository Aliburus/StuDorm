import React, { useState } from "react";
import Logo1 from "../assets/Logo1.jpeg";

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState("login"); // Başlangıçta Login formu aktif

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-white">
      <div className="mb-10">
        {" "}
        <img className="w-[250px] h-[120px]" src={Logo1} alt="Logo" />
      </div>

      <div className="flex w-full max-w-4xl">
        {/* Left side - Login */}
        <div
          className={`w-1/2 p-8 transition-all duration-500 ${
            activeForm === "login"
              ? "bg-black text-white"
              : "bg-yellow-600 text-black"
          }`}
        >
          {activeForm === "login" && (
            <>
              <h2 className="text-4xl font-bold mb-4">Login</h2>
              <form className="flex flex-col justify-center h-[400px]">
                {" "}
                {/* Set fixed height for the form */}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                />
                <button
                  className={`w-full py-2 rounded-md ${
                    activeForm === "login"
                      ? "bg-yellow-600 text-black"
                      : "bg-black text-yellow-600"
                  }`}
                >
                  Login
                </button>
              </form>
            </>
          )}
          {activeForm === "register" && (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={() => setActiveForm("login")} // Login formuna geçiş
                className="text-black border p-4 border-black rounded-lg font-bold transition duration-300"
              >
                Login here
              </button>
            </div>
          )}
        </div>

        {/* Right side - Register */}
        <div
          className={`w-1/2 p-8 transition-all duration-500 ${
            activeForm === "register"
              ? "bg-black text-white"
              : "bg-yellow-600 text-black"
          }`}
        >
          {activeForm === "register" && (
            <>
              <h2 className="text-4xl font-bold mb-4">Register</h2>
              <form className="flex flex-col justify-center h-[400px]">
                {" "}
                {/* Set fixed height for the form */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                />
                <button
                  className={`w-full py-2 rounded-md ${
                    activeForm === "register"
                      ? "bg-yellow-600 text-black"
                      : "bg-black text-yellow-600"
                  }`}
                >
                  Register
                </button>
              </form>
            </>
          )}
          {activeForm === "login" && (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={() => setActiveForm("register")} // Register formuna geçiş
                className="text-black border p-4 border-black rounded-lg font-bold transition duration-300"
              >
                Register here
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
