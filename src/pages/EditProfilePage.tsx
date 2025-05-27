// React tools
import { useEffect, useState, useRef } from 'react';
// Move to other page
import { useNavigate } from 'react-router-dom';
// Icons
import { User, CreditCard, MapPin } from 'lucide-react';
// Header component
import Header from '../components/Header';
// Background animation
import ParticlesBackground from '../components/ParticlesBackground';
// Toast message (small popup)
import { toast } from 'react-hot-toast';

const EditProfilePage = () => {

  // For moving to other page
  const navigate = useNavigate();

  // Get user data from localStorage
  const storedUser = localStorage.getItem('authUser');

  // Set user data to edit (if exist)
  const [editedUser, setEditedUser] = useState(() => (storedUser ? JSON.parse(storedUser) : null));

  // Card and expiry info (fake data)
  const [card, setCard] = useState('**** **** **** 1234');
  const [expiry, setExpiry] = useState('10/27');

  // Address info
  const [address, setAddress] = useState({
    postal: '〒000-0000',
    city: 'Osaka Japan',
    name: 'Honoka Nishimura'
  });

  // Profile image (get from localStorage or use default)
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem('authProfileImage') || '/img/user_avatar.png');

  // For file input (upload photo)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If user data is not found, go to login page
  useEffect(() => {
    if (!editedUser) navigate('/auth');
  }, [editedUser, navigate]);

  // When "Save" is clicked
  const handleSave = () => {
    // Save user info and photo to localStorage
    localStorage.setItem('authUser', JSON.stringify(editedUser));
    localStorage.setItem('authProfileImage', profileImage);
    // Show success message
    toast.success('Profile updated successfully!');
    // Go back to profile page
    navigate('/profile');
  };

  // When "Cancel" is clicked
  const handleCancel = () => {
    navigate('/profile');
  };

  // When user uploads a new photo
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // Show new photo
          setProfileImage(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Open file select dialog
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {/* Show header */}
      <Header />

      {/* Main container */}
      <div className="relative min-h-screen w-full overflow-hidden bg-white">
        {/* Show background particles */}
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          <ParticlesBackground />
        </div>

        {/* Content area */}
        <div className="relative z-10 max-w-5xl mx-auto py-16 px-4 space-y-12">

          {/* White box area */}
          <div className="bg-[#fffced]/90 p-6 rounded-xl shadow-xl space-y-10">

            {/* Profile photo area */}
            <div className="flex flex-col items-center">
              <img
                src={profileImage}
                alt=""
                className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-orange-200 object-cover shadow"
              />
              {/* Button to change photo */}
              <button
                onClick={triggerFileSelect}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Change Photo
              </button>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Form to edit name and email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First name */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">First Name</label>
                <input
                  type="text"
                  value={editedUser.firstName}
                  onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                />
              </div>
              {/* Last name */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">Last Name</label>
                <input
                  type="text"
                  value={editedUser.lastName}
                  onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                />
              </div>
              {/* Email (can’t edit) */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
                <input
                  type="email"
                  value={editedUser.email}
                  disabled
                  className="w-full px-4 py-2 border bg-gray-100 rounded-lg"
                />
              </div>
            </div>

            {/* Payment card area */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" /> Payment Method
              </h4>
              <p className="text-xs text-gray-500 mb-2">Enter your card number and expiry date.</p>
              <input
                type="text"
                value={card}
                onChange={(e) => setCard(e.target.value)}
                className="w-full mb-2 px-4 py-2 border rounded-lg bg-white"
              />
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white"
              />
            </div>

            {/* Address info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" /> Shipping Address
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Postal code */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Postal Code</label>
                  <input
                    type="text"
                    value={address.postal || ''}
                    onChange={(e) => setAddress((prev) => ({ ...prev, postal: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                  />
                </div>
                {/* City & Country */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">City & Country</label>
                  <input
                    type="text"
                    value={address.city || ''}
                    onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                  />
                </div>
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="text-sm text-gray-600 mb-1 block">Recipient Name</label>
                  <input
                    type="text"
                    value={address.name || ''}
                    onChange={(e) => setAddress((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Save or cancel buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded shadow"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
