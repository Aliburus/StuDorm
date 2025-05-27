import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 to-black text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                StuDorm ile Tanışın
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Öğrencileri ve ev/yurt sahiplerini buluşturan yenilikçi
                platformumuz
              </p>
              <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Hakkımızda Özet */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Biz Kimiz?
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  StuDorm, 2025 yılında öğrencilerin konaklama sorunlarına çözüm
                  bulmak amacıyla kuruldu. Misyonumuz, öğrencilerin güvenilir ve
                  uygun fiyatlı konaklama seçeneklerine erişimini
                  kolaylaştırmak, ev/yurt sahiplerinin ise boş kapasitelerini
                  verimli bir şekilde değerlendirmelerine yardımcı olmaktır.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Teknoloji odaklı çözümlerimizle, konaklama arama ve bulma
                  sürecini basitleştirerek her iki taraf için de değer yaratmayı
                  hedefliyoruz. StuDorm olarak, kullanıcı deneyimini sürekli
                  geliştirerek sektörde öncü olmayı amaçlıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Özelliklerimiz */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Öğrencilere Tam Destek
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Yurt ve Konaklama
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Öğrencilerin bütçelerine uygun, güvenli ve kaliteli yurt ve
                  konaklama seçeneklerine kolayca erişmesini sağlıyoruz. Detaylı
                  filtreler ve kapsamlı bilgilerle en uygun seçeneği bulmanıza
                  yardımcı oluyoruz.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Oda Arkadaşı Bulma
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Benzer ilgi alanlarına ve yaşam tarzına sahip oda arkadaşları
                  bulmanıza olanak tanıyoruz. Eşleştirme sistemimiz sayesinde
                  uyumlu kişilerle tanışarak maliyetlerinizi düşürün ve sosyal
                  çevrenizi genişletin.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Part-time İş Fırsatları
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Öğrencilerin eğitimlerine devam ederken çalışabileceği
                  part-time iş olanaklarını bir araya getiriyoruz. Esnek çalışma
                  saatleri, öğrenci dostu işverenler ve kazanç fırsatlarıyla
                  okul masraflarınıza destek olun.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Staj ve Kariyer
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Kariyerinize adım atmanızı sağlayacak staj ve mezuniyet
                  sonrası iş fırsatlarını sizinle buluşturuyoruz. Farklı
                  sektörlerden şirketlerle bağlantı kurarak profesyonel
                  gelişiminizi destekliyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vizyon ve Misyon */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Vizyonumuz ve Misyonumuz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-yellow-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Vizyonumuz
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Öğrenci konaklama sektöründe yenilikçi teknolojiler kullanarak
                  Türkiye'nin lider platformu haline gelmek ve bu modeli global
                  pazarlara taşımak.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-yellow-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Misyonumuz
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Öğrencilere güvenli, uygun fiyatlı ve kaliteli konaklama
                  seçenekleri sunarken, ev sahiplerine de verimli bir şekilde
                  potansiyellerini değerlendirme imkanı sağlamak.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Değerlerimiz */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Değerlerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-yellow-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Güvenilirlik
                </h3>
                <p className="text-gray-700">
                  Tüm kullanıcılarımız için güvenli bir platform oluşturmak
                  önceliğimizdir.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-yellow-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Yenilikçilik
                </h3>
                <p className="text-gray-700">
                  Sürekli gelişim ve yenilikçi çözümlerle sektörde öncü olmak
                  için çalışıyoruz.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-yellow-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  Kullanıcı Odaklılık
                </h3>
                <p className="text-gray-700">
                  Her kararımızda kullanıcılarımızın ihtiyaç ve beklentilerini
                  ön planda tutuyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;
