const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  const updates = {};

  // Başlık validasyonu
  if (title && title !== post.title) {
    if (title.trim().length < 5) {
      setError("Başlık en az 5 karakter olmalıdır");
      return;
    }
    updates.title = title.trim();
  }

  // Açıklama validasyonu
  if (description && description !== post.description) {
    if (description.trim().length < 20) {
      setError("Açıklama en az 20 karakter olmalıdır");
      return;
    }
    updates.description = description.trim();
  }

  // Fiyat validasyonu
  if (price && price !== post.price) {
    if (isNaN(price) || price <= 0) {
      setError("Geçerli bir fiyat giriniz");
      return;
    }
    updates.price = parseFloat(price);
  }

  // Resim validasyonu
  if (images && images.length > 0) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (images.some((img) => img.size > maxSize)) {
      setError("Her resim en fazla 5MB olabilir");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (images.some((img) => !allowedTypes.includes(img.type))) {
      setError("Sadece JPG ve PNG formatında resim yükleyebilirsiniz");
      return;
    }
    updates.images = images;
  }

  // Değişiklik yoksa güncelleme yapma
  if (Object.keys(updates).length === 0) {
    setError("Güncellenecek bir değişiklik yok");
    return;
  }

  try {
    const formData = new FormData();
    Object.keys(updates).forEach((key) => {
      if (key === "images") {
        updates[key].forEach((image) => {
          formData.append("images", image);
        });
      } else {
        formData.append(key, updates[key]);
      }
    });

    await updatePost(id, formData);
    setSuccess("İlan başarıyla güncellendi!");
    // ... existing code ...
  } catch (error) {
    setError(
      error.response?.data?.error || "İlan güncellenirken bir hata oluştu"
    );
  }
};
