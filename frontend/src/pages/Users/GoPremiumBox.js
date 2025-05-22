import React from "react";

const GoPremiumBox = ({ onPayment }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl font-bold mb-4">Go Premium 🚀</h2>
      <p className="text-gray-600 mb-6 text-center">
        Premium üyelik ile daha fazla özellikten yararlanabilirsiniz!
      </p>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-3">
          Premium Üyelik Avantajları
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <span className="font-bold">Sınırsız ilan ekleme:</span> Normal
            üyeler en fazla 2 ilan ekleyebilir.
          </li>
          <li>
            <span className="font-bold">Daha uzun ilan süresi:</span> Normal
            üyeler için ilan süresi 2 ay, premium üyeler için süresiz.
          </li>
          <li>
            <span className="font-bold">Öne çıkan ilan:</span> Premium üyelerin
            ilanları özel bir bölümde gösterilir.
          </li>
          <li>
            <span className="font-bold">Daha fazla görünürlük:</span>{" "}
            İlanlarınız ana sayfada daha üst sıralarda yer alır.
          </li>
          <li>
            <span className="font-bold">Özel destek:</span> 7/24 müşteri
            desteğine erişim.
          </li>
        </ul>
      </div>
      <button
        onClick={onPayment}
        className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition font-medium"
      >
        Upgrade to Premium
      </button>
    </div>
  );
};

export default GoPremiumBox;
