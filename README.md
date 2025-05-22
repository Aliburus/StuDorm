# StuDorm

<div align="center">
  <img src="frontend/src/assets/Logo1.jpeg" alt="StuDorm Logo" width="120" />
  <h2>Öğrenciler için Yurt, Oda, İş ve Staj Platformu</h2>
</div>

---

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/frontend-React-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/backend-Node.js-green)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/database-MySQL-blue)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/style-Tailwind_CSS-38B2AC)](https://tailwindcss.com/)

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Güncelleme Geçmişi](#-güncelleme-geçmişi)
- [Katkı ve Geliştirme](#-katkı-ve-geliştirme)
- [Lisans](#-lisans)
- [İletişim](#-iletişim)

## 🚀 Proje Hakkında

StuDorm, öğrencilerin yurt, oda, part-time iş ve staj ilanlarını kolayca bulup paylaşabildiği kapsamlı bir platformdur. Projenin amacı öğrencilerin barınma, iş ve staj ihtiyaçlarını tek bir platformda çözmektir. Platform aynı zamanda forum özellikleri, mesajlaşma sistemi ve premium üyelik avantajları sunmaktadır.

Admin paneli, güçlü kullanıcı yönetimi, ilan yönetimi, iletişim mesajları ve sistem ayarları gibi birçok özelliği içerir.

## ✨ Özellikler

### Kullanıcı İşlemleri

- ✅ JWT tabanlı kimlik doğrulama ve yetkilendirme
- ✅ Telefon ve e-posta validasyonlu kullanıcı kaydı
- ✅ Güvenli şifre yönetimi ve şifre sıfırlama
- ✅ Kullanıcı profil yönetimi ve güncelleme

### İlan İşlemleri

- ✅ Yurt ve oda ilanları oluşturma/düzenleme
- ✅ Part-time iş ilanları oluşturma/düzenleme
- ✅ Staj ilanları oluşturma/düzenleme
- ✅ Çoklu resim yükleme (Yurt ilanları için)
- ✅ İl/ilçe tabanlı filtreleme
- ✅ Gelişmiş arama ve filtreleme özellikleri

### Premium Sistem

- ✅ Premium üyelik satın alma
- ✅ Premium kullanıcı avantajları
- ✅ Premium ilanların öne çıkarılması

### İletişim ve Mesajlaşma

- ✅ İletişim formu
- ✅ Admin ile kullanıcı arası mesajlaşma
- ✅ Mesajlara cevap verme ve raporlama

### Admin Özellikleri

- ✅ Kapsamlı dashboard ve istatistikler
- ✅ Kullanıcı yönetimi (ekleme, silme, güncelleme)
- ✅ Tüm ilanların yönetimi
- ✅ Premium üyelik yönetimi
- ✅ İletişim mesajları yönetimi
- ✅ Sistem ayarları

## 📸 Ekran Görüntüleri

<div align="center">
  <h3>Ana Sayfa</h3>
  <!-- Ana sayfa ekran görüntüsü burada -->
</div>

<div align="center">
  <h3>Admin Paneli</h3>
  <!-- Admin paneli ekran görüntüsü burada -->
</div>

<div align="center">
  <h3>İlan Detay Sayfası</h3>
  <!-- İlan detay ekran görüntüsü burada -->
</div>

## 🛠️ Teknoloji Yığını

### Frontend

- **React**: UI bileşenleri ve SPA yapısı
- **Tailwind CSS**: Modern ve responsive tasarım
- **Axios**: HTTP istekleri
- **Recharts**: Grafikler ve dashboard
- **Lucide React**: Modern ikonlar

### Backend

- **Node.js**: Sunucu tarafı runtime
- **Express.js**: API ve server yönetimi
- **MySQL**: Veritabanı
- **JWT**: Kimlik doğrulama
- **Multer**: Dosya yükleme
- **Bcrypt**: Şifre hashleme

### Diğer

- **Git**: Sürüm kontrolü
- **ESLint**: Kod kalite kontrolü
- **Nodemon**: Geliştirme ortamı

## 📦 Kurulum

### Gereksinimler

- Node.js (v16+ önerilir)
- MySQL (5.7+ önerilir)
- Git

### Adım 1: Projeyi Klonlama

```bash
git clone https://github.com/kullanici-adiniz/StuDorm.git
cd StuDorm
```

### Adım 2: Veritabanı Kurulumu

MySQL veritabanında aşağıdaki tabloları oluşturun:

```sql
-- Kullanıcı Tablosu
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  user_type ENUM('normal', 'premium', 'admin') DEFAULT 'normal',
  premium_price DECIMAL(10,2) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- İletişim Mesajları
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- İletişim Cevapları
CREATE TABLE contact_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_message_id INT NOT NULL,
  answer TEXT NOT NULL,
  answered_email VARCHAR(255) NOT NULL,
  answered_by VARCHAR(255) NOT NULL,
  answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_message_id) REFERENCES contact_messages(id)
);

-- Diğer tablolar için SQL komutlarını buraya ekleyin
```

### Adım 3: Backend Kurulumu

```bash
cd backend
npm install

# .env dosyası oluşturma
cp .env.example .env
# .env dosyasını düzenleyin (veritabanı bilgileri, JWT secret, port vs.)

# Sunucuyu başlatma
npm run dev
```

### Adım 4: Frontend Kurulumu

```bash
cd ../frontend
npm install
npm start
```

## 🖥️ Kullanım

- **Kullanıcı Arayüzü**: http://localhost:3000
- **Admin Paneli**: http://localhost:3000/admin
  - Admin hesabı için: admin@studorm.com / admin123

### Kullanıcı Rehberi

1. Kayıt olun veya giriş yapın
2. İlan vermek için hesabınıza giriş yapın
3. İlan detaylarını ve gerekli bilgileri doldurun
4. İlanınızı yayınlayın veya mevcut ilanları inceleyin

### Admin Rehberi

1. Admin hesabı ile giriş yapın
2. Dashboard üzerinden istatistikleri görüntüleyin
3. Kullanıcı, ilan ve diğer içerikleri yönetin
4. İletişim mesajlarını cevaplayın

## 📝 Güncelleme Geçmişi

### v1.0.0 (2023-06-01)

- İlk sürüm yayınlandı

### v1.1.0 (2023-08-15)

- İl/ilçe seçimi ve güncelleme özelliği eklendi
- Kullanıcıya özel mesajlaşma sistemi geliştirildi

### v1.2.0 (2024-03-10)

- Admin mesaj yönetimi geliştirildi
- İletişim mesajlarına cevap sistemi eklendi
- Kullanıcı arayüzü iyileştirmeleri yapıldı

## 💡 Katkı ve Geliştirme

Projeye katkıda bulunmak için:

1. Bu repo'yu fork edin
2. Feature branch'inizi oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request açın

Ayrıca şunları da yapabilirsiniz:

- Issue açarak hata bildirebilirsiniz
- Dokümantasyonu geliştirebilirsiniz
- Test yazabilirsiniz

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📬 İletişim

**Proje Sorumlusu:** [İsminiz](mailto:email@example.com)

**GitHub:** [github.com/kullanici-adiniz](https://github.com/kullanici-adiniz)

---

<div align="center">
  <p>StuDorm - Öğrenciler için en iyi çözüm</p>
</div>
