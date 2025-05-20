import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-yellow-600 mb-8 border-b pb-4">
            Kullanım Koşulları
          </h1>

          <div className="space-y-6 text-gray-700">
            <p className="mb-4">
              Bu internet sitesine girmeniz veya bu internet sitesindeki
              herhangi bir bilgiyi kullanmanız aşağıdaki koşulları kabul
              ettiğiniz anlamına gelir.
            </p>

            <p className="mb-4">
              Bu internet sitesine girilmesi, sitenin ya da sitedeki bilgilerin
              ve diğer verilerin programların vs. kullanılması sebebiyle,
              sözleşmenin ihlali, haksız fiil, ya da başkaca sebeplere binaen,
              doğabilecek doğrudan ya da dolaylı hiçbir zarardan StuDorm sorumlu
              değildir. StuDorm, sözleşmenin ihlali, haksız fiil, ihmal veya
              diğer sebepler neticesinde; işlemin kesintiye uğraması, hata,
              ihmal, kesinti hususunda herhangi bir sorumluluk kabul etmez.
            </p>

            <p className="mb-4">
              StuDorm işbu site ve site uzantısında mevcut her tür hizmet, ürün,
              siteyi kullanma koşulları ile sitede sunulan bilgileri önceden bir
              ihtara gerek olmaksızın değiştirme, siteyi yeniden organize etme,
              yayını durdurma hakkını saklı tutar. Değişiklikler sitede yayım
              anında yürürlüğe girer. Sitenin kullanımı ya da siteye giriş ile
              bu değişiklikler de kabul edilmiş sayılır. Bu koşullar link
              verilen diğer web sayfaları için de geçerlidir.
            </p>

            <p className="mb-4">
              StuDorm, sözleşmenin ihlali, haksız fiil, ihmal veya diğer
              sebepler neticesinde; işlemin kesintiye uğraması, hata, ihmal,
              kesinti, silinme, kayıp, işlemin veya iletişimin gecikmesi,
              bilgisayar virüsü, iletişim hatası, hırsızlık, imha veya izinsiz
              olarak kayıtlara girilmesi, değiştirilmesi veya kullanılması
              hususunda herhangi bir sorumluluk kabul etmez.
            </p>

            <p className="mb-4">
              Bu internet sitesi StuDorm'un kontrolü altında olmayan başka
              internet sitelerine bağlantı veya referans içerebilir. StuDorm, bu
              sitelerin içerikleri veya içerdikleri diğer bağlantılardan sorumlu
              değildir.
            </p>

            <p className="mb-4">
              StuDorm bu internet sitesinin genel görünüm ve dizaynı ile
              internet sitesindeki tüm bilgi, resim, StuDorm markası ve diğer
              markalar, www.studorm.com alan adı, logo, ikon, demonstratif,
              yazılı, elektronik, grafik veya makinede okunabilir şekilde
              sunulan teknik veriler, bilgisayar yazılımları, uygulanan satış
              sistemi, iş metodu ve iş modeli de dahil tüm materyallerin
              ("Materyaller") ve bunlara ilişkin fikri ve sınai mülkiyet
              haklarının sahibi veya lisans sahibidir ve yasal koruma
              altındadır. Internet sitesinde bulunan hiçbir Materyal; önceden
              izin alınmadan ve kaynak gösterilmeden, kod ve yazılım da dahil
              olmak üzere, değiştirilemez, kopyalanamaz, çoğaltılamaz, başka bir
              lisana çevrilemez, yeniden yayımlanamaz, başka bir bilgisayara
              yüklenemez, postalanamaz, iletilemez, sunulamaz ya da dağıtılamaz.
              Internet sitesinin bütünü veya bir kısmı başka bir internet
              sitesinde izinsiz olarak kullanılamaz. Aksine hareketler hukuki ve
              cezai sorumluluğu gerektirir. StuDorm'un burada açıkça
              belirtilmeyen diğer tüm hakları saklıdır.
            </p>

            <p className="mb-4">
              StuDorm, dilediği zaman bu yasal uyarı sayfasının içeriğini
              güncelleme yetkisini saklı tutmaktadır ve kullanıcılarına siteye
              her girişte yasal uyarı sayfasını ziyaret etmelerini tavsiye
              etmektedir.
            </p>

            <div className="border-t pt-4 mt-8 text-sm text-gray-500">
              <p>Son güncelleme tarihi: 10 Kasım 2023</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
