import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateListing, getListingById } from "../services/updateService";
import { X, Plus, FileText, DollarSign, MapPin } from "lucide-react";
import LocationSelector from "../components/LocationSelector";

const BASE_UPLOAD_URL = "http://localhost:5000";

const UpdateForm = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    gender_required: "herkes",
    province: "",
    district: "",
    room_type: "single",
    category: "",
    duration: "",
    requirements: "",
    images: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListingById(type, id);
        console.log("Gelen data:", data);
        const formattedImages = (data.images || []).map((image) =>
          image.startsWith("http") ? image : `${BASE_UPLOAD_URL}${image}`
        );
        if (type === "yurt") {
          const [province, district] = (data.location || "").split(", ");
          setFormData({
            title: data.title || "",
            description: data.description || "",
            price: data.price || "",
            province: province || data.province || "",
            district: district || data.district || "",
            images: data.images || [],
            gender_required: data.gender_required || "herkes",
            room_type: data.room_type || "single",
            category: "",
            duration: "",
            requirements: "",
          });
        } else if (type === "intern") {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            province: data.province || "",
            district: data.district || "",
            category: data.category || "",
            duration: data.duration || "",
            requirements: data.requirements || "",
          });
        } else if (type === "parttime") {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            price: data.price || "",
            province: data.province || "",
            district: data.district || "",
            images: [],
            gender_required: "herkes",
            room_type: "single",
            category: data.category || "",
            duration: data.duration || "",
            requirements: data.requirements || "",
          });
        }
        setPreviewUrls(formattedImages);
        setLoading(false);
      } catch (err) {
        setError("Veri yüklenirken bir hata oluştu");
        setLoading(false);
      }
    };
    fetchData();
  }, [type, id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Bu alan zorunludur";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Bu alan zorunludur";
    }
    if (!formData.province) {
      newErrors.province = "Bu alan zorunludur";
    }
    if (!formData.district) {
      newErrors.district = "Bu alan zorunludur";
    }

    if (type === "yurt") {
      if (!formData.price) {
        newErrors.price = "Bu alan zorunludur";
      }
      if (!formData.gender_required) {
        newErrors.gender_required = "Bu alan zorunludur";
      }
      if (!formData.room_type) {
        newErrors.room_type = "Bu alan zorunludur";
      }
      if (previewUrls.length < 5) {
        newErrors.photos = "En az 5 fotoğraf yüklemelisiniz";
      }
    }

    if (type === "intern" || type === "parttime") {
      if (!formData.category) {
        newErrors.category = "Bu alan zorunludur";
      }
      if (!formData.duration) {
        newErrors.duration = "Bu alan zorunludur";
      }
      if (!formData.requirements) {
        newErrors.requirements = "Bu alan zorunludur";
      }
    }

    if (type === "parttime" && !formData.price) {
      newErrors.price = "Bu alan zorunludur";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      if (type === "intern" || type === "parttime") {
        const dataToSend = {
          title: formData.title,
          description: formData.description,
          province: formData.province,
          district: formData.district,
          category: formData.category,
          duration: formData.duration,
          requirements: formData.requirements,
        };
        if (type === "parttime") {
          dataToSend.price = formData.price;
        }
        await updateListing(type, id, dataToSend);
        navigate("/account");
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("province", formData.province);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("gender_required", formData.gender_required);
      formDataToSend.append("room_type", formData.room_type);
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });
      selectedFiles.forEach((file) => {
        formDataToSend.append("photos", file);
      });
      await updateListing(type, id, formDataToSend);
      navigate("/account");
    } catch (err) {
      setError(
        err.response?.data?.message || "Güncelleme sırasında bir hata oluştu"
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const totalPhotos = previewUrls.length + files.length;

    if (totalPhotos < 5) {
      setError("En az 5 fotoğraf olmalıdır");
      return;
    }
    if (totalPhotos > 15) {
      setError("En fazla 15 fotoğraf ekleyebilirsiniz");
      return;
    }

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeImage = (index) => {
    const totalPhotos = previewUrls.length - 1;
    if (totalPhotos < 5) {
      setError("En az 5 fotoğraf olmalıdır");
      return;
    }

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);

    if (index < formData.images.length) {
      const newImages = [...formData.images];
      newImages.splice(index, 1);
      setFormData({ ...formData, images: newImages });
    } else {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles.splice(index - formData.images.length, 1);
      setSelectedFiles(newSelectedFiles);
    }
  };

  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {type === "yurt"
          ? "Yurt İlanı Güncelle"
          : type === "intern"
          ? "Staj İlanı Güncelle"
          : "Part Time İlanı Güncelle"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="w-4 h-4 inline-block mr-2 text-yellow-500" />
            İlan Başlığı
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Açıklama
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-yellow-500" />
            Konum Bilgileri
          </h3>
          <LocationSelector formData={formData} handleChange={handleChange} />
          {(errors.province || errors.district) && (
            <p className="text-sm text-red-500 mt-2">
              {errors.province || errors.district}
            </p>
          )}
        </div>

        {(type === "intern" || type === "parttime") && (
          <>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Kategori Seçin</option>
                <option value="software">Yazılım Geliştirme</option>
                <option value="marketing">Pazarlama</option>
                <option value="finance">Finans</option>
                <option value="design">Tasarım</option>
                <option value="sales">Satış</option>
                <option value="customer_support">Müşteri Destek</option>
                <option value="hr">İnsan Kaynakları</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Süre
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder={
                  type === "intern" ? "Örn: 3 ay" : "Örn: Hafta içi 09:00-18:00"
                }
                required
              />
              {errors.duration && (
                <p className="text-sm text-red-500 mt-1">{errors.duration}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Gereksinimler
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="4"
                placeholder={
                  type === "intern"
                    ? "Staj için gerekli olan beceriler ve gereksinimler"
                    : "İş için gerekli olan beceriler ve gereksinimler"
                }
                required
              />
              {errors.requirements && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.requirements}
                </p>
              )}
            </div>
          </>
        )}

        {type === "parttime" && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <DollarSign className="w-4 h-4 inline-block mr-2 text-yellow-500" />
              Ücret
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price}</p>
            )}
          </div>
        )}

        {type === "yurt" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Cinsiyet Tercihi
                </label>
                <select
                  name="gender_required"
                  value={formData.gender_required}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="erkek">Erkek</option>
                  <option value="kiz">Kız</option>
                  <option value="herkes">Herkes</option>
                </select>
                {errors.gender_required && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.gender_required}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Oda Türü
                </label>
                <select
                  name="room_type"
                  value={formData.room_type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="single">Tek Kişilik</option>
                  <option value="double">Çift Kişilik</option>
                  <option value="triple">Üç Kişilik</option>
                  <option value="quad">Dört Kişilik</option>
                  <option value="six">Altı Kişilik</option>
                  <option value="shared">Paylaşımlı</option>
                </select>
                {errors.room_type && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.room_type}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fotoğraflar (En az 5, en fazla 15)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {previewUrls.length < 15 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                    <Plus className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Fotoğraf Ekle</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {errors.photos && (
                <p className="text-sm text-red-500 mt-1">{errors.photos}</p>
              )}
            </div>
          </>
        )}

        {error && (
          <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
