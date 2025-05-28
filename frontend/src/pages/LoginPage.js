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
import ErrorMessage from "../components/ErrorMessage";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

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

  useEffect(() => {
    const loginError = localStorage.getItem("loginError");
    if (loginError) {
      setError(loginError);
      localStorage.removeItem("loginError");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("auth/validation/email");
      return;
    }

    if (!password) {
      setError("auth/validation/password");
      return;
    }

    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.token);
      let userId = response.id || response.user_id || response.user?.id;
      if (!userId && response.token) {
        try {
          const decoded = JSON.parse(atob(response.token.split(".")[1]));
          userId =
            decoded.id || decoded.user_id || decoded.userId || decoded.user?.id;
        } catch (e) {
          userId = undefined;
        }
      }
      if (userId) {
        localStorage.setItem("userId", String(userId));
      }

      if (response.user_type === "admin") {
        setIsAdmin(true);
        setIsAuthenticated(true);
        setSuccess("auth/login/admin");
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1500);
      } else {
        setIsAuthenticated(true);
        setSuccess("auth/login/success");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "auth/login/failed";
      setError(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || name.trim().length < 2) {
      setError("Lütfen geçerli bir isim giriniz (en az 2 karakter)");
      return;
    }

    if (!surname || surname.trim().length < 2) {
      setError("Lütfen geçerli bir soyisim giriniz (en az 2 karakter)");
      return;
    }

    if (!email) {
      setError("Lütfen e-posta adresinizi giriniz");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError(
        "Lütfen geçerli bir e-posta adresi giriniz (örn: ornek@mail.com)"
      );
      return;
    }

    if (!phone) {
      setError("Lütfen telefon numaranızı giriniz");
      return;
    }

    const turkishPhoneRegex = /^(\+90|0)?[5][0-9][0-9][1-9]([0-9]){6}$/;
    const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;

    if (
      !turkishPhoneRegex.test(phone) &&
      !internationalPhoneRegex.test(phone)
    ) {
      setError(
        "Lütfen geçerli bir telefon numarası giriniz (örn: +905551234567 veya 05551234567)"
      );
      return;
    }

    if (!password) {
      setError("Lütfen bir şifre belirleyiniz");
      return;
    }

    if (password.length < 6) {
      setError("Şifreniz en az 6 karakter olmalıdır");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Şifreniz en az bir büyük harf içermelidir");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Şifreniz en az bir rakam içermelidir");
      return;
    }

    if (password !== confirmPassword) {
      setError("Girdiğiniz şifreler eşleşmiyor. Lütfen tekrar kontrol edin");
      return;
    }

    try {
      const response = await register({
        name,
        surname,
        email,
        password,
        phone,
        birthDate,
      });
      setSuccess("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => {
        setActiveForm("login");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Kayıt olurken bir hata oluştu";
      let displayError = "";

      switch (errorMessage) {
        case "Bu e-posta adresi zaten kullanılıyor!":
          displayError = "Bu e-posta adresiyle kayıtlı bir hesap zaten var";
          break;
        case "Bu telefon numarası zaten kullanılıyor!":
          displayError = "Bu telefon numarasıyla kayıtlı bir hesap zaten var";
          break;
        default:
          displayError = "Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin";
      }
      setError(displayError);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!modalEmail) {
      setError("validation/email");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/forgot-password`,
        {
          email: modalEmail,
        }
      );
      setSuccess("password/reset/email/sent");
      setShowForgotPassword(false);
      setModalEmail("");
    } catch (error) {
      setError("password/reset/failed");
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
        {error && <ErrorMessage message={error} />}
        {success && <ErrorMessage message={success} severity="success" />}

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
                          placeholder="ornek@mail.com"
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
                          placeholder="En az 6 karakter, 1 büyük harf ve 1 rakam"
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
                          placeholder="Adınız (en az 2 karakter)"
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
                          placeholder="Soyadınız (en az 2 karakter)"
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
                          placeholder="ornek@mail.com"
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
                          placeholder="En az 6 karakter, 1 büyük harf ve 1 rakam"
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

                {error && <ErrorMessage message={error} />}
                {success && (
                  <ErrorMessage message={success} severity="success" />
                )}

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
                    Şifre Sıfırlama Bağlantısı Gönder
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
