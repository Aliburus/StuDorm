import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreditCard, Building2, AlertCircle } from "lucide-react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [bank, setBank] = useState("");
  const [cardType, setCardType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fixedAmount = 4000;

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      if (!cardNumber || !bank || !cardType) {
        setError("Lütfen tüm alanları doldurun!");
        setLoading(false);
        return;
      }

      if (cardNumber.length !== 16) {
        setError(
          "Geçersiz kart numarası! Lütfen doğru bir kart numarası girin."
        );
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:5000/api/payments", {
        cardNumber,
        amount: fixedAmount,
      });

      if (response.data.success) {
        const userToken = sessionStorage.getItem("token");
        if (userToken) {
          await axios.post(
            "http://localhost:5000/api/user/upgrade-to-premium",
            { paymentStatus: "successful" },
            { headers: { Authorization: `Bearer ${userToken}` } }
          );
        }

        alert("Ödeme başarılı! Premium üyelik işlemi tamamlandı.");
        navigate("/account");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <CreditCard className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Premium Üyelik
            </h2>
            <p className="text-gray-600">
              Özel özellikleri açmak için aşağıdaki ödeme işlemine
              geçebilirsiniz.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Kart Numarası"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                maxLength="16"
              />
            </div>

            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Banka"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
              />
            </div>

            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">Kart Tipi Seçin</option>
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">American Express</option>
              </select>
            </div>

            {/* Ödeme Miktarı Kısmı */}
            <div className="relative bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <span className="text-gray-700">Ödeme Miktarı</span>
              <span className="font-bold text-yellow-600">
                {fixedAmount} TL
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                İşleniyor...
              </div>
            ) : (
              "Ödemeye Geç"
            )}
          </button>

          <p className="mt-4 text-xs text-center text-gray-500">
            Ödeme bilgileriniz güvenli bir şekilde işlenecektir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
