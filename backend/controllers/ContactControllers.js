const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  // İsim validasyonu
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: "İsim en az 2 karakter olmalıdır!" });
  }

  // E-posta validasyonu
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    return res.status(400).json({ error: "E-posta adresi boş bırakılamaz!" });
  }
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Geçerli bir e-posta adresi giriniz!" });
  }

  // Mesaj validasyonu
  if (!message || message.trim().length < 10) {
    return res
      .status(400)
      .json({ error: "Mesaj en az 10 karakter olmalıdır!" });
  }

  try {
    // Trim işlemleri
    const formattedName = name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    const formattedEmail = email.trim();
    const formattedMessage = message.trim();

    // Mesajı kaydet
    await Contact.create({
      name: formattedName,
      email: formattedEmail,
      message: formattedMessage,
    });

    res.status(201).json({ message: "Mesajınız başarıyla gönderildi!" });
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    res.status(500).json({ error: "Mesaj gönderilirken bir hata oluştu!" });
  }
};
