import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import { Button } from '../../components/ui/button';


const ProfileSettings = () => {
      const { user, login } = useAuth();
      const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
      const [file, setFile] = useState<File | null>(null);
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');

      useEffect(() => {
            if (user) {
                  setFormData({
                        name: user.name || '',
                        phone: user.phone || '',
                        address: user.address || '',
                  });
            }
      }, [user]);

      const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                  setFile(e.target.files[0]);
            }
      };

      const handlePictureUpload = async () => {
            if (!file) return;
            const uploadData = new FormData();
            uploadData.append('file', file);
            setLoading(true);
            setMessage('');
            try {
                  const response = await axiosInstance.patch('/user/update-profile-picture', uploadData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                  });
                  const updatedUser = response.data.data;
                  const token = localStorage.getItem('accessToken');
                  if (token) {
                        login(token, updatedUser);
                  }
                  setMessage('Profile picture updated successfully!');
            } catch {
                  setMessage('Failed to upload picture. Please try again.');
            } finally {
                  setLoading(false);
            }
      };

      const handleProfileUpdate = async (e: FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setMessage('');
            try {
                  const response = await axiosInstance.patch('/user/update-my-profile', {
                        name: formData.name,
                        phone: formData.phone,
                        address: formData.address
                  });
                  const updatedUser = response.data.data;
                  const token = localStorage.getItem('accessToken');
                  if (token) {
                        login(token, updatedUser);
                  }
                  setMessage('Profile details updated successfully!');
            } catch {
                  setMessage('Failed to update profile. Please try again.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-1 text-center">
                        <img
                              src={user?.picture || `https://api.dicebear.com/8.x/initials/svg?seed=${user?.name}`}
                              alt="Profile"
                              className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover"
                        />
                        <input
                              type="file"
                              onChange={handleFileChange}
                              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 w-full"
                        />
                        <Button
                              onClick={handlePictureUpload}
                              className="mt-4 w-full"
                              disabled={!file || loading}
                        >
                              {loading ? 'Uploading...' : 'Upload New Picture'}
                        </Button>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6 md:col-span-2">
                        <div>
                              <label className="text-sm font-medium text-gray-400">Full Name</label>
                              <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"
                              />
                        </div>
                        <div>
                              <label className="text-sm font-medium text-gray-400">Email Address (Cannot be changed)</label>
                              <input
                                    type="email"
                                    name="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="mt-1 w-full bg-gray-800 border border-gray-700 rounded-md p-3 cursor-not-allowed"
                              />
                        </div>
                        <div>
                              <label className="text-sm font-medium text-gray-400">Phone & Address</label>
                              <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md p-3"
                                    placeholder="Your Phone Number"
                              />
                              <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    rows={3}
                                    className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-md p-3"
                                    placeholder="Your Full Address"
                              ></textarea>
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                                    {loading ? 'Saving...' : 'Save Changes'}
                              </Button>
                              {message && <p className="text-sm text-green-500">{message}</p>}
                        </div>
                  </form>
            </div>
      );
};

export default ProfileSettings;