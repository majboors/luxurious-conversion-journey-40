import { CheckCircle } from "lucide-react";

const benefits = [
  "Professional Design",
  "Fast Development",
  "SEO Optimized",
  "Mobile Responsive",
  "24/7 Support",
  "Secure Hosting",
];

export const Benefits = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-DEFAULT">
          What You Get
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CheckCircle className="w-6 h-6 text-secondary-DEFAULT" />
              <span className="text-lg text-primary-DEFAULT">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};