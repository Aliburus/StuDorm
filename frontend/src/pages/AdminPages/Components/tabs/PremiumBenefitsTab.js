import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

function PremiumBenefitsTab() {
  const [benefits, setBenefits] = useState([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    benefit_list: "",
    price: "",
    button_text: "",
  });
  const [editId, setEditId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/premium-benefits`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBenefits(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Premium benefits alınamadı:", error);
        setError("Premium benefits yüklenirken bir hata oluştu");
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (benefit) => {
    setEditId(benefit.id);
    setForm({
      id: benefit.id,
      title: benefit.title,
      description: benefit.description,
      benefit_list: benefit.benefit_list,
      price: benefit.price,
      button_text: benefit.button_text,
    });
    setError("");
    setSuccess("");
    setShowEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/api/premium-benefits/${editId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Başarıyla güncellendi");
      setEditId(null);
      setShowEdit(false);
      setForm({
        id: "",
        title: "",
        description: "",
        benefit_list: "",
        price: "",
        button_text: "",
      });
      fetchBenefits();
    } catch (err) {
      setError("Güncelleme başarısız");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setEditId(null);
    setShowEdit(false);
    setForm({
      id: "",
      title: "",
      description: "",
      benefit_list: "",
      price: "",
      button_text: "",
    });
    setError("");
    setSuccess("");
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Premium Benefits
      </h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 font-semibold">ID</th>
              <th className="px-4 py-2 font-semibold">Başlık</th>
              <th className="px-4 py-2 font-semibold">Açıklama</th>
              <th className="px-4 py-2 font-semibold">Avantajlar</th>
              <th className="px-4 py-2 font-semibold">Fiyat</th>
              <th className="px-4 py-2 font-semibold">Buton</th>
              <th className="px-4 py-2 font-semibold">Güncellendi</th>
              <th className="px-4 py-2 font-semibold">Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {benefits.map((b) => (
              <tr key={b.id} className="hover:bg-yellow-50 transition">
                <td className="px-4 py-2 border-t text-center">{b.id}</td>
                <td className="px-4 py-2 border-t font-semibold">{b.title}</td>
                <td className="px-4 py-2 border-t max-w-xs whitespace-pre-line text-gray-700">
                  {b.description}
                </td>
                <td className="px-4 py-2 border-t max-w-xs whitespace-pre-line text-gray-700">
                  {b.benefit_list &&
                    b.benefit_list.split(/,|\n/).map((item, i) => (
                      <div key={i} className="mb-1 flex items-start">
                        <span className="w-2 h-2 mt-2 mr-2 bg-yellow-400 rounded-full inline-block"></span>
                        <span>{item.trim()}</span>
                      </div>
                    ))}
                </td>
                <td className="px-4 py-2 border-t text-center font-bold text-yellow-600">
                  {b.price}
                </td>
                <td className="px-4 py-2 border-t text-center">
                  {b.button_text}
                </td>
                <td className="px-4 py-2 border-t text-center text-xs text-gray-500">
                  {b.updated_at && b.updated_at.split("T")[0]}
                </td>
                <td className="px-4 py-2 border-t text-center">
                  <button
                    className="text-blue-600 font-semibold hover:underline"
                    onClick={() => handleEdit(b)}
                  >
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={handleCancel}
              title="Kapat"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Benefit Düzenle
            </h3>
            {error && (
              <div className="mb-2 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-2 p-2 bg-green-100 text-green-700 rounded">
                {success}
              </div>
            )}
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Başlık"
                className="w-full border px-2 py-1 rounded"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Açıklama"
                className="w-full border px-2 py-1 rounded"
                required
              />
              <textarea
                name="benefit_list"
                value={form.benefit_list}
                onChange={handleInputChange}
                placeholder="Avantajlar (virgülle ayır)"
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                name="price"
                value={form.price}
                onChange={handleInputChange}
                placeholder="Fiyat"
                className="w-full border px-2 py-1 rounded"
                required
              />
              <input
                name="button_text"
                value={form.button_text}
                onChange={handleInputChange}
                placeholder="Buton Yazısı"
                className="w-full border px-2 py-1 rounded"
                required
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className={`flex-1 py-2 rounded font-bold bg-yellow-500 text-black hover:bg-yellow-600 ${
                    loading ? "opacity-50" : ""
                  }`}
                  disabled={loading}
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  className="flex-1 py-2 rounded font-bold bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={handleCancel}
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PremiumBenefitsTab;
