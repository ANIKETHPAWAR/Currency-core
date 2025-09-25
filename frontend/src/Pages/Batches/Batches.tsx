import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import ContactSection from "../../components/Courses/ContactSection";
import PurchaseModal from '../../components/PurchaseModal';
import { useAuth } from '../../context/AuthContext';

const courseData = [
      {
            title: "Basic Courses of Forex Trading",
            price: "12,599",
      },
      {
            title: "Premium Courses of Forex Trading ( Basic to Advanced Level )",
            price: "24,999",
      },
      {
            title: "Ultimate Premium Courses of Forex Trading ( Ultimate A to Z strategy with Zero Work & Experience )",
            price: "44,999",
      },
];

const Batches = () => {
      const { user } = useAuth();
      const navigate = useNavigate();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedCourse, setSelectedCourse] = useState(courseData[0]);

      const handleBuyNow = (course: typeof courseData[0]) => {
            if (!user) {
                  navigate('/login');
            } else {
                  setSelectedCourse(course);
                  setIsModalOpen(true);
            }
      };

      return (
            <div className="bg-black text-white">
                  <section className="bg-[#0A1D37] pt-32 pb-20">
                        <div className="container mx-auto px-4 text-center">
                              <h1 className="text-4xl md:text-5xl font-bold">Forex Trading Courses</h1>
                              <p className="mt-2 text-lg text-gray-300">Learn and Earn Today</p>
                              <div className="mt-12 max-w-4xl mx-auto space-y-6">
                                    {courseData.map((batch) => (
                                          <div key={batch.title} className="bg-black/20 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between text-left shadow-lg">
                                                <h2 className="text-xl font-semibold mb-4 md:mb-0 md:w-1/2">{batch.title}</h2>
                                                <div className="flex items-center gap-6">
                                                      <p className="text-2xl font-bold text-blue-400">₹{batch.price}/-</p>
                                                      <Button onClick={() => handleBuyNow(batch)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3">Buy Now</Button>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </section>

                  <section className="py-20 bg-black">
                        <div className="container mx-auto px-4">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div>
                                          <h2 className="text-4xl font-bold">Location Details</h2>
                                          <p className="mt-4 text-gray-400">
                                                We believe in a practical and hands-on learning approach.
                                          </p>
                                    </div>
                                    <div>
                                          <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.153929497025!2d88.3907723154235!3d22.49849794098939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02716327421333%3A0xde223bdf485434d3!2sSantoshpur%2C%20Kolkata%2C%20West%20Bengal%20700075!5e0!3m2!1sen!2sin!4v1678886400000"
                                                width="100%"
                                                height="400"
                                                style={{ border: 0 }}
                                                allowFullScreen={true}
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="rounded-lg shadow-md filter grayscale invert"
                                          ></iframe>
                                    </div>
                              </div>
                        </div>
                  </section>

                  <ContactSection />

                  {isModalOpen && <PurchaseModal course={selectedCourse} onClose={() => setIsModalOpen(false)} />}
            </div>
      );
};

export default Batches;