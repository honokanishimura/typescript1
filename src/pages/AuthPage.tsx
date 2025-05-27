// React hooks and routing
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// UI parts
import Header from '../components/Header';
import ParticlesBackground from '../components/ParticlesBackground';

// Base URL for backend API
import { API_BASE_URL } from '../utils/apiBase';

const AuthPage = () => {
  const { login } = useAuth(); // for saving user after login/signup
  const navigate = useNavigate(); // for redirecting user

  // Sign up form values
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Login form values
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // to show error message

  // When user submits sign-up form
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const result = await res.json();

      // If sign-up failed
      if (!res.ok) {
        setError(result.error || 'Signup failed');
        return;
      }

      // Check if any field is empty
      if (!signupData.firstName || !signupData.lastName || !signupData.email || !signupData.password) {
        setError("All fields are required");
        return;
      }

      // Simulate user ID and save login
      const user = { id: Date.now(), ...signupData };
      login(user);
      navigate('/'); // Go to home
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  // When user submits login form
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const result = await res.json();

      // If login failed
      if (!res.ok) {
        setError(result.error || 'Invalid email or password');
        return;
      }

      login(result.user); // Save login
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Header />

      {/* Background and layout */}
      <div className="relative min-h-screen w-full overflow-hidden">
        <ParticlesBackground />

        {/* Two column layout */}
        <div className="relative z-10 flex flex-col md:flex-row min-h-screen">

          {/* Left side: Sign up form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="bg-white/90 p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-6 text-center">I'm new here</h2>
              <form onSubmit={handleSignUp} className="space-y-4">
                <input type="text" placeholder="First Name*" value={signupData.firstName} onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })} className="w-full border px-4 py-2 rounded" required />
                <input type="text" placeholder="Last Name*" value={signupData.lastName} onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })} className="w-full border px-4 py-2 rounded" required />
                <input type="email" placeholder="Email Address*" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className="w-full border px-4 py-2 rounded" required />
                <input type="password" placeholder="Password*" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className="w-full border px-4 py-2 rounded" required />
                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded font-semibold">CREATE AN ACCOUNT</button>
              </form>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>
          </div>

          {/* Right side: Login form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <div className="bg-white/90 p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-6 text-center">Welcome back</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input type="email" placeholder="Enter Email*" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full border px-4 py-2 rounded" required />
                <input type="password" placeholder="Enter Password*" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full border px-4 py-2 rounded" required />
                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded font-semibold">LOG IN</button>
              </form>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
