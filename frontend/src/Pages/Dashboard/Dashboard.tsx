import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, User } from 'lucide-react';

const Dashboard = () => {
      const { user } = useAuth();

      return (
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                  <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                  <p className="text-gray-400 mt-2">Here's a quick overview of your account.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                        <Link to="/dashboard/my-courses" className="bg-black/50 p-6 rounded-lg hover:bg-gray-800 transition-colors">
                              <div className="flex items-center gap-4">
                                    <BookOpen className="h-8 w-8 text-blue-400" />
                                    <div>
                                          <h2 className="text-xl font-semibold">My Courses</h2>
                                          <p className="text-gray-400 text-sm">View all your purchased courses.</p>
                                    </div>
                              </div>
                        </Link>
                        <Link to="/dashboard/edit-profile" className="bg-black/50 p-6 rounded-lg hover:bg-gray-800 transition-colors">
                              <div className="flex items-center gap-4">
                                    <User className="h-8 w-8 text-blue-400" />
                                    <div>
                                          <h2 className="text-xl font-semibold">Edit Profile</h2>
                                          <p className="text-gray-400 text-sm">Update your personal information.</p>
                                    </div>
                              </div>
                        </Link>
                  </div>
            </div>
      );
};

export default Dashboard;