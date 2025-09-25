import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface PurchaseModalProps {
      course: { title: string; price: string };
      onClose: () => void;
}

interface RazorpayOptions {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      order_id: string;
      handler: (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
      }) => void;
      prefill: {
            name?: string;
            email?: string;
            contact?: string;
      };
      notes: {
            address: string;
      };
      theme: {
            color: string;
      };
}

declare global {
      interface Window {
            Razorpay: new (options: RazorpayOptions) => { open: () => void };
      }
}

const PurchaseModal = ({ course, onClose }: PurchaseModalProps) => {
      const { user, token } = useAuth();
      const [formData, setFormData] = useState({ phone: '', age: '', address: '', purchaseType: 'Online' });
      const [termsAccepted, setTermsAccepted] = useState(false);
      const [error, setError] = useState('');

      useEffect(() => {
            if (user) {
                  setFormData(prev => ({ ...prev, phone: user.phone || '', address: user.address || '' }));
            }
      }, [user]);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handlePayment = async () => {
            if (!termsAccepted) {
                  setError('You must accept the terms and conditions.');
                  return;
            }

            if (!formData.phone || !formData.age || !formData.address) {
                  setError('Please fill in all required fields.');
                  return;
            }

            setError('');

            try {
                  const orderPayload = {
                        courseTitle: course.title,
                        price: parseFloat(course.price.replace(/,/g, '')),
                        purchaseType: formData.purchaseType,
                        contactInfo: {
                              phone: formData.phone,
                              email: user!.email,
                              age: parseInt(formData.age),
                              address: formData.address,
                        }
                  };

                  const { data } = await axiosInstance.post('/purchase/create-order', orderPayload);

                  const { orderId, amount, currency } = data.data;

                  const options: RazorpayOptions = {
                        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                        amount: amount,
                        currency: currency,
                        name: "CurrencyCore",
                        description: `Payment for ${course.title}`,
                        order_id: orderId,
                        handler: function (response) {
                              axiosInstance.post('/purchase/verify-payment', {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                              });
                              alert('Payment Successful! Verification in progress.');
                              onClose();
                        },
                        prefill: {
                              name: user?.name,
                              email: user?.email,
                              contact: formData.phone,
                        },
                        notes: {
                              address: formData.address
                        },
                        theme: {
                              color: "#3b82f6"
                        }
                  };

                  const rzp1 = new window.Razorpay(options);
                  rzp1.open();

            } catch (err: any) {
                  console.error(err);
                  const errorMessage = err.response?.data?.message || 'Failed to create payment order. Please try again.';
                  setError(errorMessage);
            }
      };

      return (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                  <div className="relative bg-[#0A1D37] border border-gray-800 rounded-xl w-full max-w-4xl shadow-2xl grid grid-cols-1 lg:grid-cols-2">
                        <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-400 hover:text-white">
                              <X />
                        </Button>
                        <div className="p-8 border-r border-gray-800">
                              <h3 className="text-lg font-semibold text-gray-300 tracking-wider">SUMMARY</h3>
                              <div className="mt-6 space-y-4">
                                    <p className="text-xl font-bold text-white">{course.title}</p>
                                    <p className="text-3xl font-bold text-blue-400">₹{course.price}/-</p>
                              </div>
                              <div className="border-t border-gray-700 my-6"></div>
                              <div className="flex justify-between items-center text-xl font-bold text-white">
                                    <span>Total</span>
                                    <span>₹{course.price}/-</span>
                              </div>
                              <div className="mt-8">
                                    <label className="flex items-center gap-3 text-sm text-gray-400">
                                          <input type="checkbox" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} className="form-checkbox h-5 w-5 bg-gray-900 border-gray-700 rounded text-blue-500 focus:ring-blue-500" />
                                          <span>I agree to the <a href="#" className="underline hover:text-white">Terms and Conditions</a></span>
                                    </label>
                              </div>
                        </div>

                        <div className="p-8">
                              <h3 className="text-lg font-semibold text-gray-300 tracking-wider">PAYMENT DETAILS</h3>
                              <div className="mt-6 space-y-5">
                                    <div>
                                          <label className="text-sm font-medium text-gray-400">Email Address</label>
                                          <input type="email" value={user?.email || ''} disabled className="mt-2 w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-gray-400 cursor-not-allowed" />
                                    </div>
                                    <div>
                                          <label className="text-sm font-medium text-gray-400">Phone Number</label>
                                          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 transition" />
                                    </div>
                                    <div>
                                          <label className="text-sm font-medium text-gray-400">Age</label>
                                          <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 transition" />
                                    </div>
                                    <div>
                                          <label className="text-sm font-medium text-gray-400">Address</label>
                                          <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 transition"></textarea>
                                    </div>
                              </div>
                              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                              <Button onClick={handlePayment} disabled={!termsAccepted} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 text-base">
                                    Pay Now
                              </Button>
                        </div>
                  </div>
            </div>
      );
};

export default PurchaseModal;