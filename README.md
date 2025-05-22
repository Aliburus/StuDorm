# StuDorm - Öğrenci Yurt ve İlan Yönetim Sistemi

## Proje Hakkında

StuDorm, öğrencilere ve yöneticilere yönelik bir yurt, ilan ve kullanıcı yönetim platformudur. Admin paneli, kullanıcı yönetimi, ilan yönetimi, iletişim mesajları ve şifre işlemleri gibi birçok özelliği içerir.

## Özellikler

- Kullanıcı kayıt & giriş sistemi (JWT tabanlı)
- Admin paneli (kullanıcı, ilan, mesaj ve ayar yönetimi)
- İl/ilçe seçimi ve güncelleme
- Kullanıcıya özel mesajlaşma ve admin cevabı
- Şifre değiştirme
- Premium kullanıcı yönetimi
- Modern ve responsive arayüz (React + Tailwind CSS)

## Kurulum

### Gereksinimler

- Node.js (v16+ önerilir)
- MySQL

### 1. Veritabanı

- `contact_messages` ve `contact_answers` gibi gerekli tabloları oluşturun.
- Örnek tablo oluşturma:

```sql
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_message_id INT NOT NULL,
  answer TEXT NOT NULL,
  answered_email VARCHAR(255) NOT NULL,
  answered_by VARCHAR(255) NOT NULL,
  answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_message_id) REFERENCES contact_messages(id)
);
```

### 2. Backend

```bash
cd backend
npm install
npm start
```

- `.env` dosyası ile veritabanı ve JWT ayarlarını yapın.

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

## Kullanım

- `http://localhost:3000` üzerinden kullanıcı arayüzüne erişebilirsiniz.
- `http://localhost:3000/admin` üzerinden admin paneline erişebilirsiniz.

## Katkı ve Geliştirme

- Pull request ve issue açabilirsiniz.
- Kod standartlarına ve proje yapısına uygun katkı beklenmektedir.

## Lisans

MIT
