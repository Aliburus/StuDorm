import React, { useState } from "react";
import Logo1 from "../assets/Logo1.jpeg";
import { register } from "../services/UserServices";

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [surname, setSurname] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log({ name, surname, email, password, confirmPassword });
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await register(name, surname, email, password);
      console.log("Kayıt başarılı:", response);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-white">
      <div className="mb-10">
        <img className="w-[250px] h-[120px]" src={Logo1} alt="Logo" />
      </div>

      <div className="flex w-full max-w-4xl">
        {/* Login Form */}
        <div
          className={`w-1/2 p-8 transition-all duration-500 rounded-lg shadow-lg ${
            activeForm === "login"
              ? "bg-black text-yellow-500"
              : "bg-yellow-500 text-black"
          }`}
        >
          {activeForm === "login" && (
            <>
              <h2 className="text-4xl font-bold mb-4">Login</h2>
              <form className="flex flex-col justify-center h-[400px]">
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
                <button className="w-full py-2 rounded-md bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition duration-300">
                  Login
                </button>
              </form>
            </>
          )}
          {activeForm === "register" && (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={() => setActiveForm("login")}
                className="text-black border p-4 border-black rounded-lg font-bold transition duration-300 hover:bg-black hover:text-yellow-500"
              >
                Login here
              </button>
            </div>
          )}
        </div>

        {/* Register Form */}
        <div
          className={`w-1/2 p-8 transition-all duration-500 rounded-lg shadow-lg ${
            activeForm === "register"
              ? "bg-black text-yellow-500"
              : "bg-yellow-500 text-black"
          }`}
        >
          {activeForm === "register" && (
            <>
              <h2 className="text-4xl font-bold mb-4">Register</h2>
              <form
                onSubmit={handlesubmit}
                className="flex flex-col justify-center h-[400px]"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                  onChange={(e) => setName(e.target.value)}
                />{" "}
                <input
                  type="text"
                  placeholder="Surname"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                  onChange={(e) => setSurname(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 mb-4 border border-gray-700 bg-gray-800 text-white rounded-md"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-md bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition duration-300"
                >
                  Register
                </button>
              </form>
            </>
          )}
          {activeForm === "login" && (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={() => setActiveForm("register")}
                className="text-black border p-4 border-black rounded-lg font-bold transition duration-300 hover:bg-black hover:text-yellow-500"
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
