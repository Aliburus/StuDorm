import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  UserPlus,
  ArrowRight,
  KeyRound,
  AlertCircle,
  CheckCircle,
  X,
  Phone,
} from "lucide-react";
import { register, login } from "../services/UserServices"; // Assuming these functions exist
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";

function LoginPage() {
  const [activeForm, setActiveForm] = useState("login");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For handling error messages
  const [success, setSuccess] = useState(""); // For handling success messages
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  // Hata ve başarı mesajlarını belirli bir süre sonra temizle
  useEffect(() => {
    const timer = setTimeout(() => {
      if (error) setError("");
      if (success) setSuccess("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, success]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setSuccess(""); // Reset success state

    // E-posta validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setError("E-posta adresi boş bırakılamaz");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Geçerli bir e-posta adresi giriniz");
      return;
    }

    // Şifre validation
    if (!password) {
      setError("Şifre boş bırakılamaz");
      return;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      setSuccess("Giriş başarılı! Yönlendiriliyorsunuz...");

      // Token'ı decode et ve admin kontrolü yap
      const decoded = JSON.parse(atob(response.token.split(".")[1]));

      setTimeout(() => {
        if (decoded.user_type === "admin") {
          setIsAdmin(true);
          setIsAuthenticated(true);
          navigate("/admin");
        } else {
          setIsAuthenticated(true);
          navigate("/");
        }
      }, 1500); // Yönlendirme öncesi kullanıcıya başarı mesajını görme şansı ver
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // İsim ve soyisim kontrolü ve düzenleme
    if (name.length < 2) {
      setError("İsim en az 2 karakter olmalıdır");
      return;
    }
    if (surname.length < 2) {
      setError("Soyisim en az 2 karakter olmalıdır");
      return;
    }

    // İsim ve soyadı düzenleme
    const formattedName = name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    const formattedSurname = surname
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // E-posta validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setError("E-posta adresi boş bırakılamaz");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Geçerli bir e-posta adresi giriniz (örn: ornek@mail.com)");
      return;
    }

    // Telefon numarası validation
    if (!phone) {
      setError("Telefon numarası boş bırakılamaz");
      return;
    }

    // Türk numarası kontrolü
    const turkishPhoneRegex = /^(\+90|0)?[5][0-9][0-9][1-9]([0-9]){6}$/;
    // Uluslararası numara kontrolü
    const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;

    if (
      !turkishPhoneRegex.test(phone) &&
      !internationalPhoneRegex.test(phone)
    ) {
      setError(
        "Geçerli bir telefon numarası giriniz:\nTürk numarası: +905551234567 veya 05551234567\nUluslararası numara: +1234567890"
      );
      return;
    }

    // Telefon numarasını WhatsApp formatına dönüştür
    let formattedPhone = phone;
    if (phone.startsWith("0")) {
      formattedPhone = "90" + phone.substring(1);
    } else if (phone.startsWith("+")) {
      formattedPhone = phone.substring(1);
    }

    // Şifre validation
    if (!password) {
      setError("Şifre boş bırakılamaz");
      return;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Şifre en az bir büyük harf içermelidir");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Şifre en az bir rakam içermelidir");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    try {
      await register(
        formattedName,
        formattedSurname,
        email,
        formattedPhone,
        password
      );
      setSuccess("Kayıt işlemi başarılı! Giriş yapabilirsiniz.");

      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setActiveForm("login");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin."
      );
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!modalEmail) {
      setError("Lütfen e-posta adresinizi girin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: modalEmail,
          newPassword,
          confirmPassword,
        }
      );
      setSuccess("Şifreniz başarıyla güncellendi.");
      setShowForgotPassword(false);
      setNewPassword("");
      setConfirmPassword("");
      setModalEmail("");
    } catch (error) {
      setError(
        error.response?.data?.error || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
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
            Hoş Geldiniz
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {activeForm === "login"
              ? "Hesabınız yok mu?"
              : "Zaten hesabınız var mı?"}
          </p>
        </div>

        {/* Notification Area */}
        {error && (
          <div className="flex items-center p-4 mb-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <div className="flex-1 text-red-700">{error}</div>
            <button
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="flex items-center p-4 mb-4 bg-green-50 border-l-4 border-green-500 rounded-md">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <div className="flex-1 text-green-700">{success}</div>
            <button
              onClick={() => setSuccess("")}
              className="text-green-500 hover:text-green-700"
            >
              <X className="w-4 h-4" />
            </button>
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
                    Giriş Yap
                  </h3>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        E-posta Adresi
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="E-posta adresinizi girin"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Şifre
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Şifrenizi girin"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-yellow-500 hover:text-yellow-600"
                      >
                        Şifremi Unuttum
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Giriş Yap
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
                    Giriş Yap
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
                    Hesap Oluştur
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Ad
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Adınız"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Soyad
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Soyadınız"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        E-posta
                      </label>
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="E-posta adresiniz"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Telefon
                      </label>
                      <div className="relative">
                        <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="+90 5XX XXX XX XX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Şifre
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Şifrenizi girin"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Şifre Tekrarı
                      </label>
                      <div className="relative">
                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Şifrenizi tekrar girin"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Kayıt Ol
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
                    Kayıt Ol
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Şifremi Unuttum Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-96">
              <h3 className="text-xl font-bold mb-4">Şifre Sıfırlama</h3>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Şifre Tekrarı
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                  >
                    Şifreyi Güncelle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
