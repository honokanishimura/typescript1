// src/pages/ProfilePage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticlesBackground from '../components/ParticlesBackground';
import { CreditCard, MapPin, User, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

  const handleSave = () => {
    if (editedUser) {
      localStorage.setItem('authUser', JSON.stringify(editedUser));
      setEditMode(false);
      toast.success('Profile updated successfully!');
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setEditMode(false);
    toast('Changes cancelled.');
  };

  if (!user) return null;

  return (
    <>
      <ParticlesBackground />
      <Header />
      <div className="relative min-h-screen z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-orange-600 hover:underline hover:text-orange-700 transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Profile Card */}
            <div className="bg-[#fffced] p-6 rounded-xl shadow-lg text-center space-y-4">
              <img src="/img/user_avatar.png" alt="User avatar" className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-orange-200 shadow" />
              <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* Right: Profile Details */}
            <div className="md:col-span-2 bg-[#fffced] p-6 rounded-xl shadow-xl">
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Profile Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editedUser?.firstName || ''}
                    disabled={!editMode}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev!, firstName: e.target.value }))
                    }
                    className={`w-full px-4 py-2 border rounded-lg ${
                      editMode ? 'bg-white ring-2 ring-blue-300' : 'bg-gray-100 cursor-not-allowed'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editedUser?.lastName || ''}
                    disabled={!editMode}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev!, lastName: e.target.value }))
                    }
                    className={`w-full px-4 py-2 border rounded-lg ${
                      editMode ? 'bg-white ring-2 ring-blue-300' : 'bg-gray-100 cursor-not-allowed'
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={editedUser?.email || ''}
                    disabled
                    className="w-full px-4 py-2 border bg-gray-100 cursor-not-allowed rounded-lg"
                  />
                </div>
              </div>

              <hr className="my-8" />

              <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" />
                Payment Method
              </h4>
              <p className="text-gray-600 mb-6">
                Visa ending in **** 1234<br />
                Expires 10/27
              </p>

              <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Shipping Address
              </h4>
              <p className="text-gray-600 whitespace-pre-line">
                〒555-0000<br />
                Osaka, Japan<br />
                Honoka Nishimura
              </p>

              {editMode && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
