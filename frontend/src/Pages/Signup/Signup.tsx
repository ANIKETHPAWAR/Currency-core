/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import logo from '../../assets/logo.png';
import axiosInstance from '../../api/axiosInstance';

const Signup = () => {
      const navigate = useNavigate();
      const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
                  await axiosInstance.post('/user/register', formData);
                  navigate('/login');
            } catch (err: any) {
                  setError(err.response?.data?.message || 'Failed to create account.');
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
                  <div className="w-full max-w-md space-y-8">
                        <div>
                              <Link to="/" className="flex justify-center">
                                    <img
                                          className="h-12 w-auto brightness-0 invert"
                                          src={logo}
                                          alt="CurrencyCore Logo"
                                    />
                              </Link>
                              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                                    Create a new account
                              </h2>
                              <p className="mt-2 text-center text-sm text-gray-400">
                                    Or{' '}
                                    <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400">
                                          sign in to your existing account
                                    </Link>
                              </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                              <div className="space-y-4 rounded-md shadow-sm">
                                    <div>
                                          <input
                                                id="full-name"
                                                name="name"
                                                type="text"
                                                autoComplete="name"
                                                required
                                                className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-900 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                                placeholder="Full name"
                                                onChange={handleChange}
                                          />
                                    </div>
                                    <div>
                                          <input
                                                id="email-address"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-900 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                                placeholder="Email address"
                                                onChange={handleChange}
                                          />
                                    </div>
                                    <div>
                                          <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="new-password"
                                                required
                                                className="relative block w-full appearance-none rounded-md border border-gray-700 bg-gray-900 px-3 py-3 text-white placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                                placeholder="Password"
                                                onChange={handleChange}
                                          />
                                    </div>
                              </div>
                              {error && <p className="text-sm text-red-500">{error}</p>}
                              <div>
                                    <Button
                                          type="submit"
                                          disabled={loading}
                                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                    >
                                          {loading ? 'Creating...' : 'Create Account'}
                                    </Button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default Signup;