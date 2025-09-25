import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import ContactSection from "../../components/Courses/ContactSection";
import PurchaseModal from '../../components/PurchaseModal';
import { useAuth } from '../../context/AuthContext';

const storeItems = [
  {
    title: "Basic Courses of Forex Trading",
    price: "12,599",
    description: "Learn the fundamentals of forex trading with our comprehensive basic course.",
    features: ["Basic concepts", "Market analysis", "Risk management", "Trading strategies"]
  },
  {
    title: "Premium Courses of Forex Trading (Basic to Advanced Level)",
    price: "24,999",
    description: "Master forex trading from basic to advanced level with our premium course package.",
    features: ["Advanced strategies", "Live trading sessions", "Mentor support", "Certificate"]
  },
  {
    title: "Ultimate Premium Courses of Forex Trading (Ultimate A to Z strategy with Zero Work & Experience)",
    price: "44,999",
    description: "Complete forex trading mastery with zero work experience required. Everything you need to succeed.",
    features: ["Complete A-Z guide", "Personal mentor", "Lifetime access", "Job placement assistance"]
  },
  {
    title: "Trading Tools & Software Package",
    price: "8,999",
    description: "Professional trading tools and software to enhance your trading experience.",
    features: ["Trading software", "Market indicators", "Risk calculator", "Portfolio tracker"]
  },
  {
    title: "One-on-One Mentorship Program",
    price: "15,999",
    description: "Personal mentorship with experienced traders to accelerate your learning.",
    features: ["Personal mentor", "Custom strategies", "Weekly sessions", "Direct support"]
  },
  {
    title: "Trading Psychology Masterclass",
    price: "6,999",
    description: "Master the psychological aspects of trading for consistent success.",
    features: ["Mindset training", "Emotion control", "Decision making", "Stress management"]
  }
];

const Store = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(storeItems[0]);

  const handleBuyNow = (item: typeof storeItems[0]) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Trading Store
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive collection of forex trading courses, tools, and mentorship programs designed to accelerate your trading journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {storeItems.map((item, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                <div className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold text-blue-400">₹{item.price}/-</span>
              </div>
              <Button 
                onClick={() => handleBuyNow(item)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Buy Now
              </Button>
            </div>
          ))}
        </div>

        <ContactSection />
      </div>

      {isModalOpen && (
        <PurchaseModal 
          course={selectedItem} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Store;
