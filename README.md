# StuDorm

StuDorm, öğrenciler için yurt, oda, staj ve part-time iş ilanlarını bulup paylaşabilecekleri, modern ve güvenli bir platformdur. Premium üyelik, ilan limiti, ilan yönetimi ve kapsamlı admin paneliyle hem kullanıcılar hem de yöneticiler için kolay ve esnek bir deneyim sunar.

## Genel Proje Mantığı

- **Kullanıcılar** kayıt olup giriş yapabilir, profilini yönetebilir, ilan ekleyebilir ve forumda paylaşım yapabilir.
- **Normal kullanıcılar** 6 ayda sadece 1 ilan ekleyebilir (yurt, staj, parttime toplamı). Premium kullanıcılar sınırsız ilan ekleyebilir.
- **Premium üyelik** ödeme sonrası otomatik aktifleşir, premium kullanıcıların ilanları 45 gün yayında kalır (normalde 7 gün).
- **İlanlar** status alanına sahiptir: `active`, `inactive`, `deleted`. Silme işlemleri soft delete ile yapılır, expires_at dolan ilanlar otomatik inaktif olur.
- **Admin paneli** ile tüm ilanlar (her statüde), kullanıcılar ve iletişim mesajları yönetilebilir. Admin, ilan statüsünü değiştirebilir.
- **Frontend** modern ve kullanıcı dostu, ilan ekleme limiti aşıldığında premium modalı otomatik açılır.

## Temel Özellikler

- JWT tabanlı kimlik doğrulama
- Güvenli şifre yönetimi ve şifre sıfırlama
- Yurt, staj, part-time ilanı ekleme ve düzenleme
- Çoklu fotoğraf yükleme (yurt ilanları için)
- Premium üyelik ve avantajları
- Forum ve topluluk paylaşımı
- Admin paneli ile tam kontrol
- Soft delete ve ilan status yönetimi

## Nasıl Çalışır?

1. **Kayıt Ol & Giriş Yap:** Kullanıcılar e-posta ve telefon ile kayıt olur, giriş yapar.
2. **İlan Ekle:** Kullanıcı, ilan eklerken backend ilan limiti ve premium kontrolü yapar. Limit aşıldıysa premium modal açılır.
3. **Premium Ol:** Kullanıcı ödeme yaparsa premium olur, sınırsız ilan ekleyebilir ve ilanları daha uzun yayında kalır.
4. **İlan Yönetimi:** Kullanıcı ilanlarını düzenleyebilir, silebilir (soft delete). Admin tüm ilanları ve statülerini yönetebilir.
5. **Forum:** Kullanıcılar forumda paylaşım ve yorum yapabilir.
6. **Admin Paneli:** Admin, kullanıcıları, ilanları, premium üyelikleri ve iletişim mesajlarını yönetir.

## Kurulum

### Gereksinimler

- Node.js (v16+)
- MySQL
- Git

### Adımlar

1. **Projeyi Klonla:**
   ```bash
   git clone https://github.com/Aliburus/StuDorm.git
   cd StuDorm
   ```
2. **Veritabanı Kurulumu:**
   - MySQL'de gerekli tabloları oluştur (örnekler README'nin devamında)
3. **Backend Kurulumu:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # .env dosyasını düzenle
   npm run dev
   ```
4. **Frontend Kurulumu:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## Teknik Altyapı

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MySQL, JWT, Multer, Bcrypt

## Katkı ve Geliştirme

- Fork'la, branch aç, değişiklik yap, pull request gönder.
- Issue açarak hata veya öneri bildirebilirsin.

StuDorm - Öğrenciler için en iyi çözüm
