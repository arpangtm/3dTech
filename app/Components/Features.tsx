import { Card } from "@/components/ui/card";
import { Box, Zap, Shield, Headphones, Truck, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Box,
    title: "3D Product Visualization",
    description:
      "Explore products from every angle with our advanced 3D rendering technology.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance ensures smooth 3D interactions on any device.",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description:
      "Advanced encryption and secure payment processing for peace of mind.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Expert tech support available around the clock for all your needs.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $100 worldwide.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns with full refund guarantee.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
            Why Choose 3D Tech Shop?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Experience the future of online shopping with our innovative
            features and unmatched service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
