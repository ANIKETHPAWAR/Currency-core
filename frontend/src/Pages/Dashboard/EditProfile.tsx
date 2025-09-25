import { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import PurchaseHistory from './PurchaseHistory';
import ChangePassword from './ChangePassword';


const EditProfile = () => {
      const [activeTab, setActiveTab] = useState('settings');

      const renderContent = () => {
            switch (activeTab) {
                  case 'settings':
                        return <ProfileSettings />;
                  case 'history':
                        return <PurchaseHistory />;
                  case 'password':
                        return <ChangePassword />;
                  default:
                        return <ProfileSettings />;
            }
      };

      return (
            <div className="bg-black text-white min-h-screen py-24">
                  <div className="container mx-auto px-4">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                              <h1 className="text-3xl font-bold mb-8">My Profile</h1>
                              <div className="flex border-b border-gray-700 mb-8">
                                    <button onClick={() => setActiveTab('settings')} className={`px-4 py-3 font-medium transition-colors ${activeTab === 'settings' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}>
                                          Profile Settings
                                    </button>
                                    <button onClick={() => setActiveTab('history')} className={`px-4 py-3 font-medium transition-colors ${activeTab === 'history' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}>
                                          Purchase History
                                    </button>
                                    <button onClick={() => setActiveTab('password')} className={`px-4 py-3 font-medium transition-colors ${activeTab === 'password' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}>
                                          Change Password
                                    </button>
                              </div>
                              <div>
                                    {renderContent()}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default EditProfile;