import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import type { IPurchase } from '../../types/purchase.interface';


const PurchaseHistory = () => {
      const [purchases, setPurchases] = useState<IPurchase[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            axiosInstance.get('/purchase/my-courses')
                  .then(response => setPurchases(response.data.data))
                  .catch(err => console.error("Failed to fetch purchase history", err))
                  .finally(() => setLoading(false));
      }, []);

      if (loading) {
            return <div className="text-center">Loading purchase history...</div>;
      }

      return (
            <div>
                  <h2 className="text-2xl font-bold mb-6">Purchase History</h2>
                  <div className="overflow-x-auto">
                        <table className="w-full text-left">
                              <thead className="border-b border-gray-700">
                                    <tr>
                                          <th className="p-4">Course Name</th>
                                          <th className="p-4">Date</th>
                                          <th className="p-4">Amount</th>
                                          <th className="p-4">Status</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {purchases.length > 0 ? purchases.map(p => (
                                          <tr key={p._id} className="border-b border-gray-800">
                                                <td className="p-4 font-medium">{p.courseTitle}</td>
                                                <td className="p-4 text-gray-400">{new Date(p.createdAt).toLocaleDateString('en-GB')}</td>
                                                <td className="p-4 text-gray-400">₹{p.price}</td>
                                                <td className="p-4">
                                                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${p.paymentStatus === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                            {p.paymentStatus}
                                                      </span>
                                                </td>
                                          </tr>
                                    )) : (
                                          <tr><td colSpan={4} className="p-4 text-center text-gray-500">No purchase history found.</td></tr>
                                    )}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default PurchaseHistory;