const createPost = async (req, res) => {
  const { title, description, price, images } = req.body;

  // Başlık validasyonu
  if (!title || title.trim().length < 5) {
    return res
      .status(400)
      .json({ error: "Başlık en az 5 karakter olmalıdır!" });
  }

  // Açıklama validasyonu
  if (!description || description.trim().length < 20) {
    return res
      .status(400)
      .json({ error: "Açıklama en az 20 karakter olmalıdır!" });
  }

  // Fiyat validasyonu
  if (!price || isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "Geçerli bir fiyat giriniz!" });
  }

  // Resim validasyonu
  if (images && images.length > 0) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (images.some((img) => img.size > maxSize)) {
      return res
        .status(400)
        .json({ error: "Her resim en fazla 5MB olabilir!" });
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    if (images.some((img) => !allowedTypes.includes(img.type))) {
      return res
        .status(400)
        .json({
          error: "Sadece JPG ve PNG formatında resim yükleyebilirsiniz!",
        });
    }
  }

  try {
    // Trim işlemleri
    const formattedTitle = title.trim();
    const formattedDescription = description.trim();

    // Post oluşturma
    const post = await Post.create({
      title: formattedTitle,
      description: formattedDescription,
      price: parseFloat(price),
      images,
      user_id: req.user.id,
    });

    res.status(201).json({ message: "İlan başarıyla oluşturuldu!", post });
  } catch (error) {
    console.error("İlan oluşturma hatası:", error);
    res.status(500).json({ error: "İlan oluşturulurken bir hata oluştu!" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, images } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "İlan bulunamadı!" });
    }

    // Sadece değişen alanları güncelle
    const updates = {};

    if (title) {
      if (title.trim().length < 5) {
        return res
          .status(400)
          .json({ error: "Başlık en az 5 karakter olmalıdır!" });
      }
      updates.title = title.trim();
    }

    if (description) {
      if (description.trim().length < 20) {
        return res
          .status(400)
          .json({ error: "Açıklama en az 20 karakter olmalıdır!" });
      }
      updates.description = description.trim();
    }

    if (price) {
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ error: "Geçerli bir fiyat giriniz!" });
      }
      updates.price = parseFloat(price);
    }

    if (images && images.length > 0) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (images.some((img) => img.size > maxSize)) {
        return res
          .status(400)
          .json({ error: "Her resim en fazla 5MB olabilir!" });
      }

      const allowedTypes = ["image/jpeg", "image/png"];
      if (images.some((img) => !allowedTypes.includes(img.type))) {
        return res
          .status(400)
          .json({
            error: "Sadece JPG ve PNG formatında resim yükleyebilirsiniz!",
          });
      }
      updates.images = images;
    }

    // Değişiklik yoksa güncelleme yapma
    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ error: "Güncellenecek bir değişiklik yok!" });
    }

    const updatedPost = await Post.update(id, updates);
    res
      .status(200)
      .json({ message: "İlan başarıyla güncellendi!", post: updatedPost });
  } catch (error) {
    console.error("İlan güncelleme hatası:", error);
    res.status(500).json({ error: "İlan güncellenirken bir hata oluştu!" });
  }
};
