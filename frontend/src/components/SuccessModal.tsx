import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  amount: string;
  paymentMethod: 'bank' | 'cod';
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
}

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  courseTitle, 
  amount, 
  paymentMethod, 
  bankDetails 
}: SuccessModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="relative bg-[#0A1D37] border border-gray-800 rounded-xl w-full max-w-md shadow-2xl transform transition-all duration-500 ease-out">
        {/* Close Button */}
        <Button 
          onClick={onClose} 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X size={20} />
        </Button>

        {/* Success Content */}
        <div className="p-8 text-center">
          {/* Animated Check Icon */}
          <div className={`mx-auto mb-6 w-20 h-20 rounded-full bg-green-500 flex items-center justify-center transform transition-all duration-700 ${
            isAnimating ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
          }`}>
            <CheckCircle 
              size={48} 
              className="text-white animate-pulse"
            />
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-400 animate-bounce">
              Order Placed Successfully!
            </h2>
            
            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <h3 className="text-lg font-semibold text-white">{courseTitle}</h3>
              <p className="text-2xl font-bold text-blue-400">₹{amount}/-</p>
            </div>

            {/* Payment Instructions */}
            {paymentMethod === 'bank' && bankDetails && (
              <div className="bg-gray-800 rounded-lg p-4 text-left space-y-3">
                <h4 className="text-md font-semibold text-gray-300 mb-3">Payment Instructions:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account:</span>
                    <span className="text-white font-mono">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account No:</span>
                    <span className="text-white font-mono">{bankDetails.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">IFSC:</span>
                    <span className="text-white font-mono">{bankDetails.ifscCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bank:</span>
                    <span className="text-white">{bankDetails.bankName}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded">
                  <p className="text-yellow-300 text-xs">
                    <strong>Note:</strong> After payment, send receipt screenshot to our WhatsApp for verification.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-gray-800 rounded-lg p-4 text-left">
                <h4 className="text-md font-semibold text-gray-300 mb-3">Delivery Information:</h4>
                <p className="text-gray-300 text-sm mb-3">
                  We will contact you shortly to arrange delivery. Please keep the exact amount ready for our delivery person.
                </p>
                <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
                  <p className="text-green-300 text-xs">
                    <strong>COD Order:</strong> No additional charges for cash on delivery.
                  </p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                <strong>We will contact you shortly!</strong><br />
                Check your email for order confirmation and updates.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 text-base font-semibold"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
