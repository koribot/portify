"use client";

import { useState, useEffect } from "react";
import { Feature } from "../../types";

interface InteractiveFeaturesProps {
  features: Feature[];
}

export default function InteractiveFeatures({
  features,
}: InteractiveFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="features" className="relative z-10 px-6 py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold text-center mb-20 text-gray-900 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100 ${
                activeFeature === index ? "shadow-xl" : "shadow-md"
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="text-gray-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
