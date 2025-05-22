const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  // Başlık validasyonu
  if (!title || title.trim().length < 5) {
    setError("Başlık en az 5 karakter olmalıdır");
    return;
  }

  // Açıklama validasyonu
  if (!description || description.trim().length < 20) {
    setError("Açıklama en az 20 karakter olmalıdır");
    return;
  }

  // Fiyat validasyonu
  if (!price || isNaN(price) || price <= 0) {
    setError("Geçerli bir fiyat giriniz");
    return;
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
  }

  try {
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("price", price);
    images.forEach((image) => {
      formData.append("images", image);
    });

    await createPost(formData);
    setSuccess("İlan başarıyla oluşturuldu!");
  } catch (error) {
    setError(
      error.response?.data?.error || "İlan oluşturulurken bir hata oluştu"
    );
  }
};
