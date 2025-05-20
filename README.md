# StuDorm - Öğrenci Yaşam Platformu

<div align="center">
  <img src="frontend/src/assets/Logo1.jpeg" alt="StuDorm Logo" width="200"/>
  <h3>Öğrenci Yaşamını Kolaylaştıran Çözüm</h3>
</div>

## 📑 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Başlangıç](#-başlangıç)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Proje Yapısı](#-proje-yapısı)
- [Katkı Sağlama](#-katkı-sağlama)

## 🎓 Proje Hakkında

StuDorm, öğrencilerin yurt bulma, part-time iş ve staj imkanlarına erişmelerini kolaylaştıran kapsamlı bir platformdur. Sistemde öğrenciler yurt, part-time ve staj ilanları paylaşabilir, forumlarda etkileşime geçebilir ve diğer öğrencilerle iletişim kurabilirler.

## ✨ Özellikler

- **Kullanıcı Yönetimi**

  - Kayıt ve giriş sistemi
  - Profil yönetimi
  - Premium üyelik seçenekleri

- **İlan Yönetimi**

  - Yurt ilanları oluşturma ve görüntüleme
  - Part-time iş ilanları oluşturma ve görüntüleme
  - Staj ilanları oluşturma ve görüntüleme

- **Forum Sistemi**

  - Gönderiler oluşturma
  - Beğenme ve beğenmeme fonksiyonları
  - Trend konuları görüntüleme

- **İletişim**

  - İlan sahipleriyle WhatsApp üzerinden iletişim
  - İletişim formu

- **Admin Paneli**
  - Kullanıcı yönetimi
  - İlan yönetimi
  - Forum gönderilerinin yönetimi

## 🛠 Teknolojiler

### Frontend

- React.js
- Tailwind CSS
- React Router
- Axios
- Lucide Icons
- React Slick

### Backend

- Node.js
- Express.js
- MySQL
- JWT Authentication
- Multer (dosya yükleme)
- Bcrypt (şifreleme)

## 🚀 Başlangıç

### Gereksinimler

- Node.js (v16+)
- npm veya yarn
- MySQL veritabanı

## 🔧 Kurulum

### 1. Projeyi klonlayın

```bash
git clone https://github.com/aliburus/studorm.git
cd studorm
```

### 2. Backend kurulumu

```bash
cd backend
npm install
```

`.env` dosyası oluşturun ve aşağıdaki çevre değişkenlerini ayarlayın:

```
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=studorm
```

### 3. Frontend kurulumu

```bash
cd ../frontend
npm install
```

### 4. Veritabanını oluşturun

- MySQL veritabanı oluşturun
- Sağlanan SQL dosyasını içe aktarın veya migration'ları çalıştırın

## 💻 Kullanım

### Backend'i çalıştırma

```bash
cd backend
node server.js
```

### Frontend'i çalıştırma

```bash
cd frontend
npm start
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 📂 Proje Yapısı

```
studorm/
├── backend/              # Backend kodları
│   ├── config/           # Veritabanı ve uygulama yapılandırması
│   ├── controllers/      # Controller fonksiyonları
│   ├── middleware/       # Express middleware'leri
│   ├── models/           # Veritabanı modelleri
│   ├── routes/           # API rotaları
│   └── server.js         # Ana uygulama dosyası
│
└── frontend/             # Frontend kodları
    ├── public/           # Statik dosyalar
    └── src/              # Kaynak kodları
        ├── assets/       # Görseller ve medya dosyaları
        ├── components/   # Yeniden kullanılabilir React bileşenleri
        ├── pages/        # Sayfa bileşenleri
        │   ├── AdminPages/ # Admin paneli sayfaları
        │   └── Users/      # Kullanıcı profil sayfaları
        ├── services/     # API istek fonksiyonları
        └── App.js        # Ana React uygulaması
```

## 👥 Katkı Sağlama

Projeye katkı sağlamak istiyorsanız:

1. Bu depoyu forklayın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'e push edin (`git push origin feature/amazing-feature`)
5. Pull request açın
