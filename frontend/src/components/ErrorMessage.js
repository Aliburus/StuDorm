import React from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

const ErrorMessage = ({ message, severity = "error", onClose }) => {
  const getMessage = (code) => {
    switch (code) {
      // Giriş/Kayıt Mesajları
      case "auth/login/success":
        return "✅ Başarıyla giriş yaptınız. Yönlendiriliyorsunuz...";
      case "auth/login/failed":
        return "❌ Giriş yapılamadı. E-posta veya şifre hatalı";
      case "auth/login/admin":
        return "✅ Admin paneline yönlendiriliyorsunuz...";
      case "auth/validation/email":
        return "❌ Lütfen e-posta adresinizi giriniz";
      case "auth/validation/password":
        return "❌ Lütfen şifrenizi giriniz";
      case "auth/register/success":
        return "✅ Kayıt işleminiz başarıyla tamamlandı. Giriş yapabilirsiniz";
      case "auth/register/failed":
        return "❌ Kayıt işlemi başarısız oldu. Lütfen bilgilerinizi kontrol edin";
      case "auth/logout/success":
        return "✅ Başarıyla çıkış yaptınız";
      case "auth/session/expired":
        return "⚠️ Oturumunuz sona erdi. Lütfen tekrar giriş yapın";

      // Şifre İşlemleri
      case "password/validation/empty":
        return "❌ Lütfen tüm alanları doldurunuz";
      case "password/validation/match":
        return "❌ Şifreler eşleşmiyor. Lütfen tekrar kontrol ediniz";
      case "password/validation/current":
        return "❌ Mevcut şifreniz yanlış. Lütfen tekrar deneyiniz";
      case "password/change/success":
        return "✅ Şifreniz başarıyla değiştirildi";
      case "password/change/failed":
        return "❌ Şifre değiştirme işlemi başarısız oldu";
      case "password/reset/success":
        return "✅ Şifreniz başarıyla sıfırlandı. Yeni şifrenizle giriş yapabilirsiniz";
      case "password/reset/failed":
        return "❌ Şifre sıfırlama işlemi başarısız oldu";
      case "password/reset/email/sent":
        return "✅ Şifre sıfırlama bağlantısı e-posta adresinize gönderildi";

      // İlan İşlemleri
      case "listing/validation/title":
        return "❌ Lütfen ilan başlığını giriniz";
      case "listing/validation/description":
        return "❌ Lütfen ilan açıklamasını giriniz";
      case "listing/validation/province":
        return "❌ Lütfen il seçiniz";
      case "listing/validation/district":
        return "❌ Lütfen ilçe seçiniz";
      case "listing/validation/price":
        return "❌ Lütfen fiyat bilgisini giriniz";
      case "listing/validation/gender":
        return "❌ Lütfen cinsiyet seçiniz";
      case "listing/validation/room-type":
        return "❌ Lütfen oda tipini seçiniz";
      case "listing/validation/category":
        return "❌ Lütfen kategori seçiniz";
      case "listing/validation/duration":
        return "❌ Lütfen süre bilgisini giriniz";
      case "listing/validation/requirements":
        return "❌ Lütfen gereksinimleri giriniz";
      case "listing/create/success":
        return "✅ İlanınız başarıyla oluşturuldu";
      case "listing/create/failed":
        return "❌ İlan oluşturulurken bir hata oluştu";
      case "listing/update/success":
        return "✅ İlanınız başarıyla güncellendi";
      case "listing/update/failed":
        return "❌ İlan güncellenirken bir hata oluştu";
      case "listing/delete/success":
        return "✅ İlanınız başarıyla silindi";
      case "listing/delete/failed":
        return "❌ İlan silinirken bir hata oluştu";
      case "listing/premium/required":
        return "⚠️ Bu işlem için premium üyelik gereklidir";
      case "listing/not-found":
        return "❌ İlan bulunamadı veya silinmiş olabilir";

      // Profil İşlemleri
      case "profile/update/success":
        return "✅ Profil bilgileriniz başarıyla güncellendi";
      case "profile/update/failed":
        return "❌ Profil güncellenirken bir hata oluştu";
      case "profile/avatar/success":
        return "✅ Profil fotoğrafınız başarıyla güncellendi";
      case "profile/avatar/failed":
        return "❌ Profil fotoğrafı güncellenirken bir hata oluştu";

      // İletişim Mesajları
      case "contact/validation/email":
        return "❌ Lütfen e-posta adresinizi giriniz";
      case "contact/validation/email-format":
        return "❌ Lütfen geçerli bir e-posta adresi giriniz";
      case "contact/validation/message":
        return "❌ Lütfen mesajınızı giriniz";
      case "contact/validation/message-length":
        return "❌ Mesajınız çok uzun. Maksimum 1000 karakter olmalıdır";
      case "contact/send/success":
        return "✅ Mesajınız başarıyla gönderildi";
      case "contact/send/failed":
        return "❌ Mesaj gönderilirken bir hata oluştu";
      case "contact/reply/success":
        return "✅ Yanıtınız başarıyla gönderildi";
      case "contact/reply/failed":
        return "❌ Yanıt gönderilirken bir hata oluştu";

      // Forum İşlemleri
      case "forum/post/create/success":
        return "✅ Gönderiniz başarıyla paylaşıldı";
      case "forum/post/create/failed":
        return "❌ Gönderi paylaşılırken bir hata oluştu";
      case "forum/comment/create/success":
        return "✅ Yorumunuz başarıyla eklendi";
      case "forum/comment/create/failed":
        return "❌ Yorum eklenirken bir hata oluştu";
      case "forum/like/success":
        return "✅ Beğeni işlemi başarılı";
      case "forum/dislike/success":
        return "✅ Beğenmeme işlemi başarılı";
      case "forum/share/success":
        return "✅ Gönderi bağlantısı panoya kopyalandı";

      // Premium İşlemleri
      case "premium/upgrade/success":
        return "✅ Premium üyeliğiniz başarıyla aktifleştirildi";
      case "premium/upgrade/failed":
        return "❌ Premium üyelik işlemi başarısız oldu";
      case "premium/expired":
        return "⚠️ Premium üyeliğiniz sona erdi";

      // Admin Kullanıcı İşlemleri
      case "admin/user/delete/success":
        return "✅ Kullanıcı başarıyla sistemden silindi";
      case "admin/user/delete/failed":
        return "❌ Kullanıcı silinirken bir hata oluştu. Lütfen tekrar deneyin";
      case "admin/user/update/success":
        return "✅ Kullanıcı bilgileri başarıyla güncellendi";
      case "admin/user/update/failed":
        return "❌ Kullanıcı bilgileri güncellenirken bir hata oluştu";
      case "admin/user/type/update/success":
        return "✅ Kullanıcı tipi başarıyla değiştirildi";
      case "admin/user/type/update/failed":
        return "❌ Kullanıcı tipi değiştirilirken bir hata oluştu";
      case "admin/user/fetch/failed":
        return "❌ Kullanıcı bilgileri alınamadı. Lütfen sayfayı yenileyin";

      // Admin İlan İşlemleri
      case "admin/listing/delete/success":
        return "✅ İlan başarıyla sistemden silindi";
      case "admin/listing/delete/failed":
        return "❌ İlan silinirken bir hata oluştu. Lütfen tekrar deneyin";
      case "admin/listing/update/success":
        return "✅ İlan bilgileri başarıyla güncellendi";
      case "admin/listing/update/failed":
        return "❌ İlan bilgileri güncellenirken bir hata oluştu";
      case "admin/listing/fetch/failed":
        return "❌ İlan bilgileri alınamadı. Lütfen sayfayı yenileyin";

      // Admin Forum İşlemleri
      case "admin/forum/post/delete/success":
        return "✅ Forum gönderisi başarıyla silindi";
      case "admin/forum/post/delete/failed":
        return "❌ Forum gönderisi silinirken bir hata oluştu";
      case "admin/forum/comment/delete/success":
        return "Forum yorumu başarıyla silindi";
      case "admin/forum/comment/delete/failed":
        return "Forum yorumu silinirken bir hata oluştu";
      case "admin/password/change/success":
        return "Şifre başarıyla değiştirildi";
      case "admin/password/change/failed":
        return "Şifre değiştirilirken bir hata oluştu";
      case "admin/user/type/update/success":
        return "Kullanıcı tipi başarıyla güncellendi";
      case "admin/user/type/update/failed":
        return "Kullanıcı tipi güncellenirken bir hata oluştu";
      case "admin/stats/error":
        return "İstatistikler alınırken bir hata oluştu";
      case "admin/logs/error":
        return "Kullanıcı logları alınırken bir hata oluştu";

      // Varsayılan mesaj
      default:
        return message || "❌ Bir hata oluştu. Lütfen tekrar deneyin";
    }
  };

  const getIcon = () => {
    switch (severity) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getBgColor = () => {
    switch (severity) {
      case "success":
        return "bg-green-50 border-green-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-red-50 border-red-200";
    }
  };

  const getTextColor = () => {
    switch (severity) {
      case "success":
        return "text-green-800";
      case "info":
        return "text-blue-800";
      case "warning":
        return "text-yellow-800";
      default:
        return "text-red-800";
    }
  };

  return (
    <div
      className={`relative w-full mb-4 ${getBgColor()} border rounded-lg p-4`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className={`ml-3 ${getTextColor()}`}>
          <p className="text-sm font-medium">{getMessage(message)}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto flex-shrink-0 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
