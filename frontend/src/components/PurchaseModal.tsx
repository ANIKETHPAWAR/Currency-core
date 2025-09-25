import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { X, Copy, Check, CreditCard, Truck } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import SuccessModal from './SuccessModal';

interface PurchaseModalProps {
      course: { title: string; price: string };
      onClose: () => void;
}

type PaymentMethod = 'bank' | 'cod';

const PurchaseModal = ({ course, onClose }: PurchaseModalProps) => {
      const { user } = useAuth();
      const [formData, setFormData] = useState({ phone: '', age: '', address: '', purchaseType: 'Online' });
      const [termsAccepted, setTermsAccepted] = useState(false);
      const [error, setError] = useState('');
      const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
      const [copiedField, setCopiedField] = useState<string | null>(null);
      const [isLoading, setIsLoading] = useState(false);
      const [showSuccess, setShowSuccess] = useState(false);

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
            setIsLoading(true);

            try {
                  // Create order data
                  const orderData = {
                        courseTitle: course.title,
                        price: parseFloat(course.price.replace(/,/g, '')),
                        purchaseType: formData.purchaseType,
                        paymentMethod: paymentMethod,
                        contactInfo: {
                              phone: formData.phone,
                              email: user!.email,
                              age: parseInt(formData.age),
                              address: formData.address,
                        }
                  };

                  // Send purchase data to backend
                  await axiosInstance.post('/purchase/create-purchase', orderData);

                  // Show success modal
                  setShowSuccess(true);
            } catch (error: any) {
                  console.error('Purchase error:', error);
                  setError(error.response?.data?.message || 'Failed to process purchase. Please try again.');
            } finally {
                  setIsLoading(false);
            }
      };

      const copyToClipboard = async (text: string, field: string) => {
            try {
                  await navigator.clipboard.writeText(text);
                  setCopiedField(field);
                  setTimeout(() => setCopiedField(null), 2000);
            } catch (err) {
                  console.error('Failed to copy: ', err);
            }
      };

      const bankDetails = {
            accountName: "SOUMADIP MAITY",
            accountNumber: "003521713369757",
            ifscCode: "JIOP0000001",
            bankName: "JIO PAYMENTS BANK",
            
      };

      return (
            <>
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
                  <div className="relative bg-[#0A1D37] border border-gray-800 rounded-xl w-full max-w-7xl shadow-2xl grid grid-cols-1 xl:grid-cols-2 my-8">
                        <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-4 right-4 text-gray-400 hover:text-white z-10">
                              <X />
                        </Button>
                        
                        {/* Left Side - Bank Details */}
                        <div className="p-6 xl:p-8 border-b xl:border-b-0 xl:border-r border-gray-800">
                              <h3 className="text-lg font-semibold text-gray-300 tracking-wider mb-6">PAYMENT DETAILS</h3>
                              
                              {/* Payment Method Selection */}
                              <div className="mb-6">
                                    <h4 className="text-md font-semibold text-gray-300 mb-4">Select Payment Method</h4>
                                    <div className="space-y-3">
                                          <label className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition">
                                                <input
                                                      type="radio"
                                                      name="paymentMethod"
                                                      value="bank"
                                                      checked={paymentMethod === 'bank'}
                                                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                      className="mr-3"
                                                />
                                                <CreditCard className="mr-3 text-blue-400" size={20} />
                                                <span className="text-white">Bank Transfer / UPI</span>
                                          </label>
                                          <label className="flex items-center p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition">
                                                <input
                                                      type="radio"
                                                      name="paymentMethod"
                                                      value="cod"
                                                      checked={paymentMethod === 'cod'}
                                                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                      className="mr-3"
                                                />
                                                <Truck className="mr-3 text-green-400" size={20} />
                                                <span className="text-white">Cash on Delivery</span>
                                          </label>
                                    </div>
                              </div>

                              {/* Bank Details */}
                              {paymentMethod === 'bank' && (
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                          <h4 className="text-md font-semibold text-gray-300 mb-4">Bank Transfer Details</h4>
                                          <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
                                                      <span className="text-gray-400 text-sm">Account Name:</span>
                                                      <div className="flex items-center">
                                                            <span className="text-white mr-2 text-sm">{bankDetails.accountName}</span>
                                                            <button
                                                                  onClick={() => copyToClipboard(bankDetails.accountName, 'accountName')}
                                                                  className="text-blue-400 hover:text-blue-300"
                                                            >
                                                                  {copiedField === 'accountName' ? <Check size={16} /> : <Copy size={16} />}
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
                                                      <span className="text-gray-400 text-sm">Account Number:</span>
                                                      <div className="flex items-center">
                                                            <span className="text-white mr-2 text-sm font-mono">{bankDetails.accountNumber}</span>
                                                            <button
                                                                  onClick={() => copyToClipboard(bankDetails.accountNumber, 'accountNumber')}
                                                                  className="text-blue-400 hover:text-blue-300"
                                                            >
                                                                  {copiedField === 'accountNumber' ? <Check size={16} /> : <Copy size={16} />}
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
                                                      <span className="text-gray-400 text-sm">IFSC Code:</span>
                                                      <div className="flex items-center">
                                                            <span className="text-white mr-2 text-sm font-mono">{bankDetails.ifscCode}</span>
                                                            <button
                                                                  onClick={() => copyToClipboard(bankDetails.ifscCode, 'ifscCode')}
                                                                  className="text-blue-400 hover:text-blue-300"
                                                            >
                                                                  {copiedField === 'ifscCode' ? <Check size={16} /> : <Copy size={16} />}
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
                                                      <span className="text-gray-400 text-sm">Bank Name:</span>
                                                      <div className="flex items-center">
                                                            <span className="text-white mr-2 text-sm">{bankDetails.bankName}</span>
                                                            <button
                                                                  onClick={() => copyToClipboard(bankDetails.bankName, 'bankName')}
                                                                  className="text-blue-400 hover:text-blue-300"
                                                            >
                                                                  {copiedField === 'bankName' ? <Check size={16} /> : <Copy size={16} />}
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                                                <p className="text-yellow-300 text-xs">
                                                      <strong>Note:</strong> After making the payment, please send a screenshot of the payment receipt to our WhatsApp number for verification.
                                                </p>
                                          </div>
                                    </div>
                              )}

                              {/* Cash on Delivery */}
                              {paymentMethod === 'cod' && (
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                          <h4 className="text-md font-semibold text-gray-300 mb-4">Cash on Delivery</h4>
                                          <div className="space-y-3">
                                                <p className="text-gray-300 text-sm">
                                                      Pay the amount directly to our delivery person when you receive the course materials.
                                                </p>
                                                <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
                                                      <p className="text-green-300 text-sm">
                                                            <strong>COD Available:</strong> Cash on delivery is available for all courses.
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              )}
                        </div>

                        {/* Right Side - Order Summary & Form */}
                        <div className="p-6 xl:p-8">
                              <h3 className="text-lg font-semibold text-gray-300 tracking-wider mb-6">ORDER SUMMARY</h3>
                              
                              {/* Course Details */}
                              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                                    <h4 className="text-lg font-semibold text-white mb-2">{course.title}</h4>
                                    <div className="flex justify-between items-center">
                                          <span className="text-2xl font-bold text-blue-400">₹{course.price}/-</span>
                                    </div>
                              </div>

                              {/* User Information Form */}
                              <div className="mb-6">
                                    <h4 className="text-md font-semibold text-gray-300 mb-4">Your Information</h4>
                                    <div className="space-y-4">
                                          <div>
                                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                                <input 
                                                      type="email" 
                                                      value={user?.email || ''} 
                                                      disabled 
                                                      className="mt-2 w-full bg-gray-800 border border-gray-700 rounded-md p-3 text-gray-400 cursor-not-allowed" 
                                                />
                                          </div>
                                          <div>
                                                <label className="text-sm font-medium text-gray-400">Phone Number</label>
                                                <input 
                                                      type="tel" 
                                                      name="phone" 
                                                      value={formData.phone} 
                                                      onChange={handleInputChange} 
                                                      className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 transition" 
                                                />
                                          </div>
                                          <div>
                                                <label className="text-sm font-medium text-gray-400">Age</label>
                                                <input 
                                                      type="number" 
                                                      name="age" 
                                                      value={formData.age} 
                                                      onChange={handleInputChange} 
                                                      className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 transition" 
                                                />
                                          </div>
                                          <div>
                                                <label className="text-sm font-medium text-gray-400">Address</label>
                                                <textarea 
                                                      name="address" 
                                                      value={formData.address} 
                                                      onChange={handleInputChange} 
                                                      rows={3} 
                                                      className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 transition"
                                                ></textarea>
                                          </div>
                                    </div>
                              </div>

                              {/* Terms and Conditions */}
                              <div className="mb-6">
                                    <label className="flex items-center gap-3 text-sm text-gray-400">
                                          <input 
                                                type="checkbox" 
                                                checked={termsAccepted} 
                                                onChange={() => setTermsAccepted(!termsAccepted)} 
                                                className="form-checkbox h-5 w-5 bg-gray-900 border-gray-700 rounded text-blue-500 focus:ring-blue-500" 
                                          />
                                          <span>I agree to the <a href="#" className="underline hover:text-white">Terms and Conditions</a></span>
                                    </label>
                              </div>

                              {/* Error Message */}
                              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                                  {/* Action Button */}
                                  <Button 
                                        onClick={handlePayment} 
                                        disabled={!termsAccepted || isLoading} 
                                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-3 text-base font-semibold"
                                  >
                                        {isLoading ? 'Processing...' : (paymentMethod === 'bank' ? 'Proceed with Bank Transfer' : 'Place COD Order')}
                                  </Button>
                        </div>
                  </div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                  isOpen={showSuccess}
                  onClose={() => {
                        setShowSuccess(false);
                        onClose();
                  }}
                  courseTitle={course.title}
                  amount={course.price}
                  paymentMethod={paymentMethod}
                  bankDetails={paymentMethod === 'bank' ? bankDetails : undefined}
            />
            </>
      );
};

export default PurchaseModal;