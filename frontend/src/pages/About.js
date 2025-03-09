import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-6 text-gray-700">
        {/* Sayfa Başlığı */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Hakkımızda
        </h1>

        {/* Hakkımızda Açıklaması */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Biz, müşterilerimizin ihtiyaçlarına en uygun çözümleri sunarak
            onların hayatlarını kolaylaştırmayı ilke edinen bir ekibiz. Gelişen
            teknolojiye ayak uydurarak, sektörümüzde yenilikçi adımlar atmayı ve
            güvenilir bir marka olmayı amaçlıyoruz.
          </p>
        </section>

        {/* Vizyon ve Misyon */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Vizyonumuz
              </h2>
              <p className="text-base leading-relaxed">
                Vizyonumuz, tüm hizmet ve ürün süreçlerimizi toplum yararına
                olacak şekilde geliştirmektir. Kullanıcı deneyimini
                iyileştirmek, hayat kalitesini artıracak çözümler sunmak ve
                sektörümüzde liderlik konumunu elde etmek ana hedeflerimiz
                arasındadır.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Misyonumuz
              </h2>
              <p className="text-base leading-relaxed">
                Misyonumuz, müşterilerimizin karşılaştığı sorunlara hızlı ve
                etkili çözümler sunmak ve onların yaşam kalitesine değer
                katmaktır. Geliştirdiğimiz her projede, kullanıcı dostu bir
                deneyim sunmayı ve sürdürülebilir çözümler üretmeyi amaçlıyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Ekip Üyeleri */}
        <section>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Ekibimiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Ekip Üyesi 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">
                Ahmet Yılmaz
              </h3>
              <p className="text-gray-600">CEO & Kurucu</p>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Ahmet, şirketimizin kurucusu ve stratejik vizyonunu
                şekillendiren liderdir.
              </p>
            </div>

            {/* Ekip Üyesi 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">
                Ayşe Demir
              </h3>
              <p className="text-gray-600">Teknoloji Yöneticisi</p>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Ayşe, projelerimizin teknolojik gelişimini ve yenilikçi
                çözümlerini yönetir.
              </p>
            </div>

            {/* Ekip Üyesi 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">
                Mehmet Can
              </h3>
              <p className="text-gray-600">Proje Yöneticisi</p>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Mehmet, proje yönetim süreçlerimizden sorumlu olup,
                müşterilerimize sağlanan hizmetlerin kalitesini en üst düzeyde
                tutar.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;
