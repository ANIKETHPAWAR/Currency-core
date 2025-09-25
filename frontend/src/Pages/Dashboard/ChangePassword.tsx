/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FormEvent } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Button } from '../../components/ui/button';


const ChangePassword = () => {
      const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');
      const [error, setError] = useState('');

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
            if (passwordData.newPassword.length < 6) {
                  setError("New password must be at least 6 characters long.");
                  return;
            }
            setLoading(true);
            setMessage('');
            setError('');
            try {
                  const response = await axiosInstance.post('/user/change-password', passwordData);
                  setMessage(response.data.message);
                  setPasswordData({ oldPassword: '', newPassword: '' });
            } catch (err: any) {
                  setError(err.response?.data?.message || 'Failed to change password.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                  <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                        <div>
                              <label className="text-sm font-medium text-gray-400">Current Password</label>
                              <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordData.oldPassword}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md p-3"
                              />
                        </div>
                        <div>
                              <label className="text-sm font-medium text-gray-400">New Password</label>
                              <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md p-3"
                              />
                        </div>
                        <div className="flex items-center gap-4">
                              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                                    {loading ? 'Updating...' : 'Update Password'}
                              </Button>
                              {message && <p className="text-sm text-green-500">{message}</p>}
                              {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                  </form>
            </div>
      );
}

export default ChangePassword;