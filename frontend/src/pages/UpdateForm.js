import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateListing, getListingById } from "../services/updateService";
import {
  X,
  Plus,
  FileText,
  DollarSign,
  MapPin,
  Clock,
  Tag,
  FileSpreadsheet,
} from "lucide-react";
import LocationSelector from "../components/LocationSelector";

const BASE_UPLOAD_URL = process.env.REACT_APP_BASE_URL;

const UpdateForm = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Form section titles based on type
  const formTitles = {
    yurt: "Yurt İlanı Güncelle",
    intern: "Staj İlanı Güncelle",
    parttime: "Part Time İlanı Güncelle",
  };

  // Category options for intern and parttime
  const categoryOptions = [
    { value: "software", label: "Yazılım Geliştirme" },
    { value: "marketing", label: "Pazarlama" },
    { value: "finance", label: "Finans" },
    { value: "design", label: "Tasarım" },
    { value: "sales", label: "Satış" },
    { value: "customer_support", label: "Müşteri Destek" },
    { value: "hr", label: "İnsan Kaynakları" },
  ];

  // Room type options for yurt
  const roomTypeOptions = [
    { value: "single", label: "Tek Kişilik" },
    { value: "double", label: "Çift Kişilik" },
    { value: "triple", label: "Üç Kişilik" },
    { value: "quad", label: "Dört Kişilik" },
    { value: "six", label: "Altı Kişilik" },
    { value: "shared", label: "Paylaşımlı" },
  ];

  // Gender options for yurt
  const genderOptions = [
    { value: "erkek", label: "Erkek" },
    { value: "kiz", label: "Kız" },
    { value: "herkes", label: "Herkes" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListingById(type, id);
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
            price: "",
            gender_required: "herkes",
            room_type: "single",
            images: [],
          });
        } else if (type === "parttime") {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            price: data.price || "",
            province: data.province || "",
            district: data.district || "",
            category: data.category || "",
            duration: data.duration || "",
            requirements: data.requirements || "",
            gender_required: "herkes",
            room_type: "single",
            images: [],
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
      newErrors.title = "Lütfen ilan başlığını giriniz";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "İlan başlığı en az 5 karakter olmalıdır";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Lütfen ilan açıklamasını giriniz";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "İlan açıklaması en az 20 karakter olmalıdır";
    }

    if (!formData.province) {
      newErrors.province = "Lütfen il seçiniz";
    }
    if (!formData.district) {
      newErrors.district = "Lütfen ilçe seçiniz";
    }

    if (type === "yurt") {
      if (!formData.price) {
        newErrors.price = "Lütfen fiyat bilgisini giriniz";
      } else if (isNaN(formData.price) || formData.price <= 0) {
        newErrors.price = "Lütfen geçerli bir fiyat giriniz";
      }

      if (!formData.gender_required) {
        newErrors.gender_required = "Lütfen cinsiyet seçiniz";
      }
      if (!formData.room_type) {
        newErrors.room_type = "Lütfen oda tipini seçiniz";
      }
      if (previewUrls.length < 5) {
        newErrors.photos = "En az 5 fotoğraf yüklemeniz gerekmektedir";
      }
    }

    if (type === "intern" || type === "parttime") {
      if (!formData.category) {
        newErrors.category = "Lütfen kategori seçiniz";
      }
      if (!formData.duration) {
        newErrors.duration = "Lütfen süre bilgisini giriniz";
      }
      if (!formData.requirements) {
        newErrors.requirements = "Lütfen gereksinimleri giriniz";
      } else if (formData.requirements.trim().length < 10) {
        newErrors.requirements = "Gereksinimler en az 10 karakter olmalıdır";
      }
    }

    if (type === "parttime") {
      if (!formData.price) {
        newErrors.price = "Lütfen fiyat bilgisini giriniz";
      } else if (isNaN(formData.price) || formData.price <= 0) {
        newErrors.price = "Lütfen geçerli bir fiyat giriniz";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("Lütfen tüm alanları doğru şekilde doldurunuz");
      const firstError = document.querySelector(".text-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const totalPhotos = previewUrls.length + files.length;

    if (totalPhotos < 5) {
      setErrors({ ...errors, photos: "En az 5 fotoğraf olmalıdır" });
      return;
    }
    if (totalPhotos > 15) {
      setErrors({ ...errors, photos: "En fazla 15 fotoğraf ekleyebilirsiniz" });
      return;
    }

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    setSelectedFiles([...selectedFiles, ...files]);

    // Clear photo error if it exists
    if (errors.photos) {
      setErrors({
        ...errors,
        photos: null,
      });
    }
  };

  const removeImage = (index) => {
    const totalPhotos = previewUrls.length - 1;
    if (totalPhotos < 5) {
      setErrors({ ...errors, photos: "En az 5 fotoğraf olmalıdır" });
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

  // Render form field with label and error
  const renderField = (
    name,
    label,
    type = "text",
    icon = null,
    placeholder = "",
    options = null
  ) => {
    return (
      <div className="space-y-2 transition-all duration-200">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          {icon &&
            React.cloneElement(icon, {
              className: "w-4 h-4 inline-block mr-2 text-yellow-500",
            })}
          {label}
        </label>

        {type === "textarea" ? (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-500 outline-none ${
              errors[name] ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            rows="4"
            placeholder={placeholder}
          />
        ) : type === "select" ? (
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-500 outline-none appearance-none bg-white ${
              errors[name] ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e\')',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1em",
            }}
          >
            {!options[0].label.includes("Seçin") && (
              <option value="">Seçin</option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-500 outline-none ${
              errors[name] ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder={placeholder}
          />
        )}

        {errors[name] && (
          <p className="text-sm text-red-500 mt-1 animate-fadeIn">
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Bilgiler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-fadeIn">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {formTitles[type]}
          </h1>
          <p className="text-yellow-100 mt-2">
            İlanınızı güncelleyin ve daha fazla kişiye ulaşın
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4 transform transition-all duration-300 hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4 pb-2 border-b">
              <FileText className="w-5 h-5 text-yellow-500" />
              Temel Bilgiler
            </h3>

            {renderField("title", "İlan Başlığı", "text", <FileText />)}
            {renderField(
              "description",
              "Açıklama",
              "textarea",
              null,
              "İlanınızı detaylı bir şekilde anlatın..."
            )}
          </div>

          {/* Location Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transform transition-all duration-300 hover:shadow-md">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4 pb-2 border-b">
              <MapPin className="w-5 h-5 text-yellow-500" />
              Konum Bilgileri
            </h3>

            <LocationSelector formData={formData} handleChange={handleChange} />

            {(errors.province || errors.district) && (
              <p className="text-sm text-red-500 mt-2 animate-fadeIn">
                {errors.province || errors.district}
              </p>
            )}
          </div>

          {/* Specific Fields Based on Type */}
          {(type === "intern" || type === "parttime") && (
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4 transform transition-all duration-300 hover:shadow-md">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4 pb-2 border-b">
                <FileSpreadsheet className="w-5 h-5 text-yellow-500" />
                İş Detayları
              </h3>

              {renderField(
                "category",
                "Kategori",
                "select",
                <Tag />,
                "",
                categoryOptions
              )}
              {renderField(
                "duration",
                "Süre",
                "text",
                <Clock />,
                type === "intern" ? "Örn: 3 ay" : "Örn: Hafta içi 09:00-18:00"
              )}
              {renderField(
                "requirements",
                "Gereksinimler",
                "textarea",
                null,
                type === "intern"
                  ? "Staj için gerekli olan beceriler ve gereksinimler"
                  : "İş için gerekli olan beceriler ve gereksinimler"
              )}

              {type === "parttime" &&
                renderField("price", "Ücret (₺)", "number", <DollarSign />)}
            </div>
          )}

          {/* Yurt Specific Fields */}
          {type === "yurt" && (
            <>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4 transform transition-all duration-300 hover:shadow-md">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4 pb-2 border-b">
                  <FileSpreadsheet className="w-5 h-5 text-yellow-500" />
                  Yurt Detayları
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField(
                    "gender_required",
                    "Cinsiyet Tercihi",
                    "select",
                    null,
                    "",
                    genderOptions
                  )}
                  {renderField(
                    "room_type",
                    "Oda Türü",
                    "select",
                    null,
                    "",
                    roomTypeOptions
                  )}
                </div>

                {renderField(
                  "price",
                  "Aylık Ücret (₺)",
                  "number",
                  <DollarSign />
                )}
              </div>

              {/* Photos Section */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transform transition-all duration-300 hover:shadow-md">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4 pb-2 border-b">
                  <FileText className="w-5 h-5 text-yellow-500" />
                  Fotoğraflar{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    (En az 5, en fazla 15)
                  </span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md"
                    >
                      <img
                        src={url}
                        alt={`Fotoğraf ${index + 1}`}
                        className="w-full h-32 object-cover transition-transform duration-500 transform group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=Resim+Yok";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                        aria-label="Fotoğrafı kaldır"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}

                  {previewUrls.length < 15 && (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 transition-all duration-300 h-32">
                      <Plus className="w-8 h-8 text-gray-400 mb-2 group-hover:text-yellow-500 transition-colors duration-300" />
                      <span className="text-sm text-gray-500 group-hover:text-yellow-600 transition-colors duration-300">
                        Fotoğraf Ekle
                      </span>
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
                  <p className="text-sm text-red-500 mt-1 animate-fadeIn">
                    {errors.photos}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg border border-red-100 animate-fadeIn">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 hover:shadow-lg active:scale-98"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Güncelleniyor...
              </span>
            ) : (
              "Güncelle"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
