import React from "react";
import { Building2, Users, MessageSquare, Briefcase } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Yurtlar",
      description: "Keşfedin ve ihtiyaçlarınıza uygun yurtları bulun",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Oda Arkadaşları",
      description: "Bağlantı kurun ve yeni arkadaşlar edinin",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Staj İlanları - İş Fırsatları",
      description: "Fırsatları keşfedin ve kariyerinize yön verin",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Öğrenci Topluluğu",
      description: "Katılın, tartışın ve bilgi paylaşın",
    },
  ];
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-yellow-500 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
