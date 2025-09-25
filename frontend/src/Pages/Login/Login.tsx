/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import loginImage from '../../assets/about-image.jpeg';

const Login = () => {
      const navigate = useNavigate();
      const auth = useAuth();
      const [formData, setFormData] = useState({ email: '', password: '' });
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            try {
                  const response = await axiosInstance.post('/auth/login', formData);
                  const { accessToken, user } = response.data.data;
                  auth.login(accessToken, user);
                  navigate('/dashboard/my-courses');
            } catch (err: any) {
                  setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="flex min-h-screen bg-black text-white">
                  <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
                        <div className="w-full max-w-md">
                              <Link to="/" className="flex justify-center mb-8">
                                    <img className="h-12 w-auto brightness-0 invert" src={logo} alt="CurrencyCore Logo" />
                              </Link>
                              <div className="text-center">
                                    <h2 className="text-3xl font-bold tracking-tight">Sign in to your account</h2>
                                    <p className="mt-2 text-sm text-gray-400">
                                          Or{' '}
                                          <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-400">
                                                create a new account
                                          </Link>
                                    </p>
                              </div>
                              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                          <input name="email" type="email" required className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 focus:ring-2 focus:ring-blue-500" placeholder="Email address" onChange={handleChange} />
                                          <input name="password" type="password" required className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 focus:ring-2 focus:ring-blue-500" placeholder="Password" onChange={handleChange} />
                                    </div>
                                    {error && <p className="text-sm text-red-500">{error}</p>}
                                    <div>
                                          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                                                {loading ? 'Signing in...' : 'Sign in'}
                                          </Button>
                                    </div>
                              </form>
                        </div>
                  </div>
                  <div className="hidden lg:block flex-1 relative">
                        <img src={loginImage} alt="Trading" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60"></div>
                  </div>
            </div>
      );
};

export default Login;