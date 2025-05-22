import { useEffect, useState } from "react";
import { AdminService } from "../../../../services/AdminService";
import { X } from "lucide-react";

const BASE_UPLOAD_URL = "http://localhost:5000";

function ListingsTab({
  listings,
  refreshListings = () => window.location.reload(),
}) {
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState(listings);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    setFilteredListings(
      listings.filter((listing) => {
        const matchesType = selectedType
          ? listing.category === selectedType
          : true;
        const matchesSearch = listing.title
          ? listing.title.toLowerCase().includes(searchTerm.toLowerCase())
          : false;
        return matchesType && matchesSearch;
      })
    );
  }, [listings, selectedType, searchTerm]);

  const openEditModal = (listing) => {
    console.log("Gelen listing verisi:", listing);

    let photoArr = [];
    if (listing.photos) {
      photoArr = listing.photos.split(",").filter((p) => p);
    }
    console.log("Photo array:", photoArr);

    const photos = photoArr.map((p) => {
      const url = p.startsWith("http") ? p : `${BASE_UPLOAD_URL}${p}`;
      console.log("Formatted URL:", url);
      return url;
    });

    console.log("Final photos array:", photos);

    setEditingListing({
      ...listing,
      images: photos,
    });
    setPreviewUrls(photos);
    setEditModalOpen(true);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const totalPhotos = previewUrls.length + files.length;

    if (totalPhotos < 5) {
      alert("En az 5 fotoğraf olmalıdır");
      return;
    }
    if (totalPhotos > 15) {
      alert("En fazla 15 fotoğraf ekleyebilirsiniz");
      return;
    }

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeImage = (index) => {
    const totalPhotos = previewUrls.length - 1;
    if (totalPhotos < 5) {
      alert("En az 5 fotoğraf olmalıdır");
      return;
    }

    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);

    if (index < editingListing.images.length) {
      const newImages = [...editingListing.images];
      newImages.splice(index, 1);
      setEditingListing({ ...editingListing, images: newImages });
    } else {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles.splice(index - editingListing.images.length, 1);
      setSelectedFiles(newSelectedFiles);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    // Tüm form alanlarını FormData'ya ekle
    Array.from(form.elements).forEach((el) => {
      if (el.name && el.value !== undefined) {
        if (el.type === "file") {
          // Dosya alanları için tüm dosyaları ekle
          Array.from(el.files).forEach((file) => {
            formData.append("photos", file);
          });
        } else {
          formData.append(el.name, el.value);
        }
      }
    });

    try {
      const [source, id] = editingListing.unique_id.split("-");
      await AdminService.updateListingDetails(source, id, formData);
      alert("İlan güncellendi");
      setEditModalOpen(false);
      refreshListings(); // Sayfa yenileme yerine refreshListings kullan
    } catch (err) {
      console.error(err);
      alert("İlan güncellenirken bir hata oluştu");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">İlan Yönetimi</h2>
          <div className="flex space-x-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Tüm İlanlar</option>
              <option value="Yurt İlanı">Yurt İlanları</option>
              <option value="Staj İlanı">Staj İlanları</option>
              <option value="Part-time İş">Part-time İşler</option>
            </select>
            <input
              type="text"
              placeholder="İlanlarda ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Başlık", "Tür", "Tarih", "İşlemler"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <tr key={listing.unique_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {listing.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {listing.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(listing.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(listing)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={async () => {
                        const [source, id] = listing.unique_id.split("-");
                        if (
                          confirm(
                            "Bu ilanı silmek istediğinizden emin misiniz?"
                          )
                        ) {
                          try {
                            await AdminService.deleteListing(source, id);
                            alert("İlan silindi");
                            refreshListings();
                          } catch (e) {
                            console.error(e);
                            alert("İlan silinirken bir hata oluştu");
                          }
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  İlan bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && editingListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">İlan Düzenle</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Ortak alanlar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlık
                </label>
                <input
                  name="title"
                  defaultValue={editingListing.title}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  name="description"
                  defaultValue={editingListing.description}
                  className="w-full p-2 border rounded"
                  rows="4"
                />
              </div>

              {/* Yurt ilanları için özel alanlar */}
              {editingListing.source === "yurtads" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      İl
                    </label>
                    <input
                      name="province"
                      defaultValue={editingListing.province}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      İlçe
                    </label>
                    <input
                      name="district"
                      defaultValue={editingListing.district}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fiyat
                    </label>
                    <input
                      name="price"
                      type="number"
                      defaultValue={editingListing.price}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cinsiyet
                    </label>
                    <select
                      name="gender_required"
                      defaultValue={editingListing.gender_required}
                      className="w-full p-2 border rounded"
                    >
                      <option value="erkek">Erkek</option>
                      <option value="kiz">Kız</option>
                      <option value="herkes">Herkes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Oda Tipi
                    </label>
                    <select
                      name="room_type"
                      defaultValue={editingListing.room_type}
                      className="w-full p-2 border rounded"
                    >
                      <option value="single">Tek Kişilik</option>
                      <option value="double">Çift Kişilik</option>
                      <option value="triple">Üç Kişilik</option>
                      <option value="quad">Dört Kişilik</option>
                      <option value="six">Altı Kişilik</option>
                      <option value="shared">Paylaşımlı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fotoğraflar (En az 5, en fazla 15)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                      {editingListing.images &&
                      editingListing.images.length > 0 ? (
                        editingListing.images.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                              onError={(e) => {
                                console.log("Image error:", e.target.src);
                                e.target.onerror = null;
                                e.target.src = "/images/no-image.png";
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
                        ))
                      ) : (
                        <div className="col-span-full text-center text-gray-500">
                          Henüz fotoğraf yok
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      name="photos"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full p-2 border rounded"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Yeni fotoğraflar eklemek için seçin. Mevcut fotoğraflar
                      korunacaktır.
                    </p>
                  </div>
                </>
              )}

              {/* Staj ilanları için özel alanlar */}
              {editingListing.source === "interns" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      name="category"
                      defaultValue={editingListing.category}
                      className="w-full p-2 border rounded"
                    >
                      <option value="software">Yazılım Geliştirme</option>
                      <option value="marketing">Pazarlama</option>
                      <option value="finance">Finans</option>
                      <option value="design">Tasarım</option>
                      <option value="sales">Satış</option>
                      <option value="customer_support">Müşteri Destek</option>
                      <option value="hr">İnsan Kaynakları</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Süre
                    </label>
                    <input
                      name="duration"
                      defaultValue={editingListing.duration}
                      className="w-full p-2 border rounded"
                      placeholder="Örn: 3 ay"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gereksinimler
                    </label>
                    <textarea
                      name="requirements"
                      defaultValue={editingListing.requirements}
                      className="w-full p-2 border rounded"
                      rows="4"
                      placeholder="Staj için gerekli olan beceriler ve gereksinimler"
                    />
                  </div>
                </>
              )}

              {/* Part-time ilanları için özel alanlar */}
              {editingListing.source === "parttimeads" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      name="category"
                      defaultValue={editingListing.category}
                      className="w-full p-2 border rounded"
                    >
                      <option value="software">Yazılım Geliştirme</option>
                      <option value="marketing">Pazarlama</option>
                      <option value="finance">Finans</option>
                      <option value="design">Tasarım</option>
                      <option value="sales">Satış</option>
                      <option value="customer_support">Müşteri Destek</option>
                      <option value="hr">İnsan Kaynakları</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Süre
                    </label>
                    <input
                      name="duration"
                      defaultValue={editingListing.duration}
                      className="w-full p-2 border rounded"
                      placeholder="Örn: Hafta içi 09:00-18:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gereksinimler
                    </label>
                    <textarea
                      name="requirements"
                      defaultValue={editingListing.requirements}
                      className="w-full p-2 border rounded"
                      rows="4"
                      placeholder="İş için gerekli olan beceriler ve gereksinimler"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fiyat
                    </label>
                    <input
                      name="price"
                      type="number"
                      defaultValue={editingListing.price}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingsTab;
