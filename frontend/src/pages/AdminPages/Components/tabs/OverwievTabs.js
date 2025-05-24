import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Ban,
  Building,
  Briefcase,
  Clock,
  TrendingUp,
  Crown,
  UserCheck,
  Clock8,
  MessageSquare,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";
import { format as d3format } from "d3-format";

function OverviewTab({ stats }) {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [cityStats, setCityStats] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [revenueRes, cityRes, trendRes] = await Promise.all([
          axios.get(
            "http://localhost:5000/api/admin/premium-revenue-by-month",
            config
          ),
          axios.get(
            "http://localhost:5000/api/admin/listing-stats-by-city",
            config
          ),
          axios.get(
            "http://localhost:5000/api/admin/user-listing-trends-by-month",
            config
          ),
        ]);

        setMonthlyRevenue(revenueRes.data);
        setCityStats(cityRes.data);
        setTrendData(trendRes.data);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    fetchData();
  }, []);

  const listingData = [
    { name: "Yurt İlanları", value: stats.dormListings },
    { name: "Part-time İşler", value: stats.partTimeListings },
    { name: "Staj İlanları", value: stats.internListings },
  ];

  const userData = [
    { name: "Premium", value: stats.premiumUsers },
    { name: "Normal", value: stats.basicUsers },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Premium Gelir
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.premiumRevenue?.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <span className="text-green-600 font-bold">₺</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">
                  Premium Üye: {stats.premiumUsers}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-bold">₺</span>
                <span className="text-sm text-gray-600">
                  Üyelik:{" "}
                  {stats.premiumPrice?.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Toplam Kullanıcı
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalUsers.toLocaleString()}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">
                  Premium: {stats.premiumUsers}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">
                  Normal: {stats.basicUsers}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Toplam İlan</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalListings.toLocaleString()}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600">
                  Yurt: {stats.dormListings}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-600">
                  Part-time: {stats.partTimeListings}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">
                  Staj: {stats.internListings}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Forum İstatistikleri
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalPosts.toLocaleString()}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Şehir Bazlı İlan Dağılımı
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="dorm_listings"
                  name="Yurt İlanları"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="parttime_listings"
                  name="Part-time İlanları"
                  fill="#82ca9d"
                />
                <Bar
                  dataKey="intern_listings"
                  name="Staj İlanları"
                  fill="#ffc658"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Kullanıcı ve İlan Trendi
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trendData}
                margin={{ top: 30, right: 40, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 14, fill: "#6b7280" }}
                />
                <YAxis
                  tick={{ fontSize: 14, fill: "#6b7280" }}
                  allowDecimals={false}
                  tickFormatter={(value) => d3format("~s")(value)}
                  domain={[
                    0,
                    (dataMax) => {
                      if (dataMax < 10) return 10;
                      if (dataMax < 100) return Math.ceil(dataMax / 10) * 10;
                      if (dataMax < 1000) return Math.ceil(dataMax / 100) * 100;
                      if (dataMax < 10000)
                        return Math.ceil(dataMax / 1000) * 1000;
                      return Math.ceil(dataMax / 10000) * 10000;
                    },
                  ]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    fontSize: 15,
                  }}
                  labelStyle={{ color: "#6366f1", fontWeight: "bold" }}
                  itemStyle={{ fontWeight: "bold" }}
                  formatter={(value, name) => [
                    d3format("~s")(value),
                    name === "new_users"
                      ? "Yeni Kullanıcı"
                      : name === "total_listings"
                      ? "Toplam İlan"
                      : name,
                  ]}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 15, marginBottom: 10 }}
                />
                <Bar
                  dataKey="new_users"
                  name="Yeni Kullanıcı"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
                <Bar
                  dataKey="total_listings"
                  name="Toplam İlan"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">İlan Dağılımı</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={listingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {listingData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Kullanıcı Dağılımı</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;
