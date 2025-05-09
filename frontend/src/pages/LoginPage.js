import React, { useState } from "react";
import { Mail, Lock, User, UserPlus, ArrowRight, KeyRound } from "lucide-react";
import { register, login } from "../services/UserServices"; // Assuming these functions exist
import { useNavigate } from "react-router-dom"; // For navigation

function LoginPage() {
  const [activeForm, setActiveForm] = useState("login");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For handling error messages

  const navigate = useNavigate(); // React Router's useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await login(email, password); // Call the login service
      localStorage.setItem("token", response.token); // Store the token in localStorage
      alert("Login successful!");
      navigate("/"); // Redirect to the homepage or dashboard
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await register(name, surname, email, password); // Call the register service
      alert("Registration successful! You can now log in.");
      setActiveForm("login"); // Switch to the login form after successful registration
      setName(""); // Reset state
      setSurname("");
      setEmail("");
      setPassword("");
      setConfirmPassword(""); // Reset confirm password field
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8">
        {/* Logo Area */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <KeyRound className="w-10 h-10 text-black" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {activeForm === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="flex gap-8 mt-8">
          {/* Login Form */}
          <div
            className={`w-1/2 transition-all duration-500 rounded-2xl overflow-hidden ${
              activeForm === "login"
                ? "bg-black text-yellow-500 shadow-xl"
                : "bg-yellow-500 text-black shadow-md"
            }`}
          >
            <div className="p-8">
              {activeForm === "login" ? (
                <>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <User className="w-6 h-6 mr-2" />
                    Sign In
                  </h3>
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <button
                    onClick={() => setActiveForm("login")}
                    className="group relative flex items-center px-6 py-3 border-2 border-black rounded-lg text-black font-semibold hover:bg-black hover:text-yellow-500 transition-all duration-300"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Sign In Here
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Register Form */}
          <div
            className={`w-1/2 transition-all duration-500 rounded-2xl overflow-hidden ${
              activeForm === "register"
                ? "bg-black text-yellow-500 shadow-xl"
                : "bg-yellow-500 text-black shadow-md"
            }`}
          >
            <div className="p-8">
              {activeForm === "register" ? (
                <>
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <UserPlus className="w-6 h-6 mr-2" />
                    Create Account
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="John"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Doe"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Register
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <button
                    onClick={() => setActiveForm("register")}
                    className="group relative flex items-center px-6 py-3 border-2 border-black rounded-lg text-black font-semibold hover:bg-black hover:text-yellow-500 transition-all duration-300"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Register Here
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
