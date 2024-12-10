import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js'yi kullanabilmek için gerekli kütüphaneleri ekliyoruz
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Güncel tarihe göre gelir verilerini oluşturuyoruz
const generateMonthlyRevenue = () => {
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 12 aylık gelir verisi oluşturuluyor (verilen sabit kullanıcı ve üye sayıları ile)
  return months.map((month, index) => {
    const baseUsers = 5000; // Aylık ortalama kullanıcı sayısı
    const users = baseUsers + (Math.random() * 1000 - 500); // Kullanıcı sayısında değişim
    const dormMembers = 20; // Yurt üyeleri
    const employerMembers = 10; // İşveren üyeleri
    const memberFeeDorm = 100; // Yurt üyeliği ücreti (TL)
    const memberFeeEmployer = 150; // İşveren üyeliği ücreti (TL)

    // Aylık üyelik gelirleri (500 TL)
    const monthlyMemberFeeDorm = 500; // Yurt aylık üyelik ücreti (TL)
    const monthlyMemberFeeEmployer = 500; // İşveren aylık üyelik ücreti (TL)
    const yearlyMemberFeeDorm = 5000; // Yurt yıllık üyelik ücreti (TL)
    const yearlyMemberFeeEmployer = 5000; // İşveren yıllık üyelik ücreti (TL)

    // Kullanıcılar için gelir (üyelikler dışında)
    const userIncome = users * 10; // Her kullanıcıdan gelen gelir (örnek olarak 10 TL)

    // Yurt üyelik gelirleri
    const monthlyMembershipIncomeDorm = dormMembers * monthlyMemberFeeDorm;
    const yearlyMembershipIncomeDorm = dormMembers * yearlyMemberFeeDorm;

    // İşveren üyelik gelirleri
    const monthlyMembershipIncomeEmployer =
      employerMembers * monthlyMemberFeeEmployer;
    const yearlyMembershipIncomeEmployer =
      employerMembers * yearlyMemberFeeEmployer;

    // Toplam gelir
    const totalIncome =
      userIncome +
      monthlyMembershipIncomeDorm +
      yearlyMembershipIncomeDorm +
      monthlyMembershipIncomeEmployer +
      yearlyMembershipIncomeEmployer;

    // Dolar cinsine çevirme (örneğin 1 USD = 27 TL)
    const dollarExchangeRate = 27; // Dolar/TL kuru
    const totalIncomeInUSD = (totalIncome / dollarExchangeRate).toFixed(2); // Dolar cinsine çevirme ve virgülden sonra 2 haneli

    const yearlyIncomeInUSD = (
      ((userIncome +
        monthlyMembershipIncomeDorm +
        monthlyMembershipIncomeEmployer) *
        12) /
      dollarExchangeRate
    ).toFixed(2); // Yıllık gelir hesaplama ve dolara çevirme

    return {
      month,
      income: totalIncomeInUSD,
      users: users,
      monthlyMembershipIncomeDorm,
      yearlyMembershipIncomeDorm,
      monthlyMembershipIncomeEmployer,
      yearlyMembershipIncomeEmployer,
      yearlyIncomeInUSD,
    };
  });
};

const monthlyRevenueData = generateMonthlyRevenue();

// Yurtlar ve işverenler verisini simüle et
const dorms = [
  { id: 1, name: "Yurt A", membership: "Premium", price: 100, listings: 45 },
  { id: 2, name: "Yurt B", membership: "Basic", price: 0, listings: 30 },
  { id: 3, name: "Yurt C", membership: "Premium", price: 150, listings: 50 },
  { id: 4, name: "Yurt D", membership: "Basic", price: 100, listings: 25 },
  { id: 5, name: "Yurt E", membership: "Basic", price: 0, listings: 35 },
];

const employers = [
  {
    id: 1,
    name: "Employer A",
    membership: "Premium",
    price: 150,
    listings: 40,
  },
  { id: 2, name: "Employer B", membership: "Basic", price: 0, listings: 25 },
  {
    id: 3,
    name: "Employer C",
    membership: "Premium",
    price: 150,
    listings: 60,
  },
  { id: 4, name: "Employer D", membership: "Basic", price: 150, listings: 30 },
  { id: 5, name: "Employer E", membership: "Basic", price: 0, listings: 20 },
];

const RevenueManagementPage = () => {
  // Yurtlar ve işverenleri en fazla ilan verenlere göre sıralama
  const sortedDorms = dorms.sort((a, b) => b.listings - a.listings).slice(0, 5);
  const sortedEmployers = employers
    .sort((a, b) => b.listings - a.listings)
    .slice(0, 5);

  // Aylık gelir verisi
  const monthlyLabels = monthlyRevenueData.map((data) => data.month);
  const monthlyIncome = monthlyRevenueData.map((data) => data.income);

  // Yıllık gelir verisi
  const totalYearlyIncome = monthlyRevenueData[0].yearlyIncomeInUSD;

  const [totalIncome, setTotalIncome] = useState(totalYearlyIncome);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Revenue Management</h1>
      <p className="mb-4">
        Manage income from dorms, paid memberships, and revenue statistics.
      </p>

      {/* Gelir İstatistikleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Total Yearly Revenue (USD)
          </h2>
          <p className="text-2xl font-bold">${totalIncome}</p>
        </div>
      </div>

      {/* Aylık Gelir Grafiği */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Revenue Chart</h2>
        <Line
          data={{
            labels: monthlyLabels,
            datasets: [
              {
                label: "Monthly Income (USD)",
                data: monthlyIncome,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Monthly Revenue for 2024",
              },
              tooltip: {
                callbacks: {
                  label: (context) => `$${context.raw}`,
                },
              },
            },
          }}
        />
      </div>

      {/* Yurtlar İçin En Fazla İlan Verenler */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Top 5 Dorms with Most Listings
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul>
            {sortedDorms.map((dorm) => (
              <li
                key={dorm.id}
                className="mb-4 flex justify-between items-center"
              >
                <span>{dorm.name}</span>
                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    dorm.membership === "Premium"
                      ? "bg-blue-500"
                      : dorm.membership === "Basic"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  {dorm.membership}
                </span>
                <span>{dorm.listings} Listings</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* İşverenler İçin En Fazla İlan Verenler */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Top 5 Employers with Most Listings
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul>
            {sortedEmployers.map((employer) => (
              <li
                key={employer.id}
                className="mb-4 flex justify-between items-center"
              >
                <span>{employer.name}</span>
                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    employer.membership === "Premium"
                      ? "bg-blue-500"
                      : employer.membership === "Basic"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                >
                  {employer.membership}
                </span>
                <span>{employer.listings} Listings</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RevenueManagementPage;
