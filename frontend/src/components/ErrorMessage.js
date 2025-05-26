import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

const ErrorMessage = ({ message, severity = "error", onClose }) => {
  const errorMessages = {
    // Kimlik doğrulama hataları
    "auth/invalid-email":
      "Geçersiz e-posta adresi. Lütfen doğru formatta bir e-posta adresi girin.",
    "auth/user-not-found":
      "Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.",
    "auth/wrong-password":
      "Hatalı şifre. Lütfen şifrenizi kontrol edip tekrar deneyin.",
    "auth/email-already-in-use":
      "Bu e-posta adresi zaten kullanımda. Lütfen başka bir e-posta adresi deneyin.",
    "auth/weak-password":
      "Şifre çok zayıf. En az 6 karakter, bir büyük harf ve bir rakam içermelidir.",
    "auth/network-request-failed":
      "İnternet bağlantınızı kontrol edin ve tekrar deneyin.",

    // Form doğrulama hataları
    "validation/name": "İsim en az 2 karakter olmalıdır.",
    "validation/surname": "Soyisim en az 2 karakter olmalıdır.",
    "validation/phone":
      "Geçerli bir telefon numarası giriniz (örn: +905551234567 veya 05551234567).",
    "validation/password":
      "Şifre en az 6 karakter, bir büyük harf ve bir rakam içermelidir.",
    "validation/password-match":
      "Şifreler eşleşmiyor. Lütfen tekrar kontrol edin.",
    "validation/email":
      "Geçerli bir e-posta adresi giriniz (örn: ornek@mail.com).",

    // Şifre değiştirme hataları
    "password/validation/empty": "Lütfen tüm alanları doldurun.",
    "password/validation/match": "Yeni şifre ve şifre tekrarı eşleşmiyor.",
    "password/validation/current": "Mevcut şifre yanlış.",
    "password/validation/format":
      "Şifre en az bir büyük harf ve bir rakam içermelidir.",
    "password/change/success": "Şifre başarıyla güncellendi!",
    "password/change/failed":
      "Şifre güncellenirken bir hata oluştu. Lütfen tekrar deneyin.",
    "password/reset/success":
      "Şifreniz başarıyla güncellendi. Yönlendiriliyorsunuz...",
    "password/reset/failed":
      "Şifre sıfırlama işlemi başarısız oldu. Lütfen tekrar deneyin.",

    // İşlem hataları
    "operation/failed": "İşlem başarısız oldu. Lütfen tekrar deneyin.",
    "operation/success": "İşlem başarıyla tamamlandı.",
    "operation/loading": "İşlem devam ediyor, lütfen bekleyin...",

    // Sistem hataları
    "system/error":
      "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    "system/maintenance": "Sistem bakımda. Lütfen daha sonra tekrar deneyin.",

    // İletişim hataları
    "contact/send/success": "Mesajınız başarıyla gönderildi.",
    "contact/send/failed": "Mesaj gönderilirken bir hata oluştu.",
    "contact/validation/name": "Lütfen adınızı girin.",
    "contact/validation/email": "Lütfen geçerli bir e-posta adresi girin.",
    "contact/validation/subject": "Lütfen bir konu girin.",
    "contact/validation/message": "Lütfen bir mesaj girin.",
    "contact/validation/length":
      "Mesaj çok uzun. Maksimum 1000 karakter olmalıdır.",
    "contact/messages/fetch/failed": "Mesajlar alınamadı.",
    "contact/reply/success": "Mesaj başarıyla gönderildi.",
    "contact/reply/failed": "Mesaj gönderilirken bir hata oluştu.",

    // Admin işlemleri hataları
    "admin/user/fetch/failed": "Kullanıcılar alınamadı.",
    "admin/user/update/success": "Kullanıcı bilgileri başarıyla güncellendi.",
    "admin/user/update/failed":
      "Kullanıcı bilgileri güncellenirken bir hata oluştu.",
    "admin/user/delete/success": "Kullanıcı başarıyla silindi.",
    "admin/user/delete/failed": "Kullanıcı silinirken bir hata oluştu.",

    // İlan işlemleri hataları
    "listing/create/success": "İlanınız başarıyla oluşturuldu.",
    "listing/create/failed":
      "İlan oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
    "listing/update/success": "İlanınız başarıyla güncellendi.",
    "listing/update/failed":
      "İlan güncellenirken bir hata oluştu. Lütfen tekrar deneyin.",
    "listing/delete/success": "İlanınız başarıyla silindi.",
    "listing/delete/failed":
      "İlan silinirken bir hata oluştu. Lütfen tekrar deneyin.",
    "listing/not-found": "İlan bulunamadı.",
    "listing/unauthorized": "Bu işlem için yetkiniz bulunmuyor.",

    // İlan doğrulama hataları
    "listing/validation/title": "İlan başlığı en az 5 karakter olmalıdır.",
    "listing/validation/description":
      "İlan açıklaması en az 20 karakter olmalıdır.",
    "listing/validation/price": "Geçerli bir fiyat giriniz.",
    "listing/validation/address": "Lütfen geçerli bir adres giriniz.",
    "listing/validation/images": "En az 1 fotoğraf yüklemelisiniz.",
    "listing/validation/features": "En az 1 özellik seçmelisiniz.",
    "listing/validation/contact": "İletişim bilgileri eksik veya hatalı.",

    // Premium özellikler
    "listing/premium/required":
      "Bu özelliği kullanmak için premium üye olmalısınız.",
    "listing/premium/expired": "Premium üyeliğiniz sona erdi.",
    "listing/premium/limit": "Premium özellik kullanım limitinize ulaştınız.",

    // Dosya yükleme hataları
    "upload/size": "Dosya boyutu çok büyük. Maksimum 5MB olmalıdır.",
    "upload/format":
      "Desteklenmeyen dosya formatı. Sadece JPG, PNG ve WEBP kabul edilir.",
    "upload/failed": "Dosya yüklenirken bir hata oluştu.",
    "upload/limit": "Maksimum 5 fotoğraf yükleyebilirsiniz.",

    // Forum işlemleri hataları
    "forum/post/create/success": "Gönderi başarıyla oluşturuldu.",
    "forum/post/create/failed": "Gönderi oluşturulurken bir hata oluştu.",
    "forum/post/update/success": "Gönderi başarıyla güncellendi.",
    "forum/post/update/failed": "Gönderi güncellenirken bir hata oluştu.",
    "forum/post/delete/success": "Gönderi başarıyla silindi.",
    "forum/post/delete/failed": "Gönderi silinirken bir hata oluştu.",
    "forum/post/not-found": "Gönderi bulunamadı.",
    "forum/post/unauthorized": "Bu işlem için yetkiniz bulunmuyor.",

    // Forum yorum hataları
    "forum/comment/create/success": "Yorum başarıyla eklendi.",
    "forum/comment/create/failed": "Yorum eklenirken bir hata oluştu.",
    "forum/comment/update/success": "Yorum başarıyla güncellendi.",
    "forum/comment/update/failed": "Yorum güncellenirken bir hata oluştu.",
    "forum/comment/delete/success": "Yorum başarıyla silindi.",
    "forum/comment/delete/failed": "Yorum silinirken bir hata oluştu.",
    "forum/comment/not-found": "Yorum bulunamadı.",
    "forum/comment/unauthorized": "Bu işlem için yetkiniz bulunmuyor.",

    // Forum doğrulama hataları
    "forum/validation/content": "Gönderi içeriği boş olamaz.",
    "forum/validation/comment": "Yorum içeriği boş olamaz.",
    "forum/validation/length":
      "İçerik çok uzun. Maksimum 1000 karakter olmalıdır.",

    // Varsayılan hata mesajı
    default: "Bir hata oluştu. Lütfen tekrar deneyin.",
  };

  const getMessage = () => {
    return errorMessages[message] || errorMessages.default;
  };

  const getIcon = () => {
    switch (severity) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", mb: 2 }}>
      <Alert
        severity={severity}
        sx={{
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          "& .MuiAlert-icon": {
            display: "flex",
            alignItems: "center",
          },
        }}
        action={
          onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )
        }
      >
        <AlertTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {getIcon()}
          {severity === "error"
            ? "Hata"
            : severity === "success"
            ? "Başarılı"
            : severity === "warning"
            ? "Uyarı"
            : "Bilgi"}
        </AlertTitle>
        {getMessage()}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
