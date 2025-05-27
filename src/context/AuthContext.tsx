// Import basic React tools
import { createContext, useContext, useState, useEffect } from 'react';

// Type for user info
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

// Type for the auth context (what we share)
type AuthContextType = {
  user: User | null; // Logged-in user or null
  login: (user: User) => void; // Function to login
  logout: () => void; // Function to logout
};

// Create a context. This will be shared across app.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide the context to all children (pages/components)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Keep user data in memory (default is null)
  const [user, setUser] = useState<User | null>(null);

  // On first load, check if user is saved in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser'); // Get from browser storage
    if (storedUser) {
      try {
        // Try to convert text to object
        setUser(JSON.parse(storedUser));
      } catch (err) {
        // If it fails, remove the data
        console.error('Failed to parse user from localStorage:', err);
        localStorage.removeItem('authUser');
      }
    }
  }, []); // Only run once when page opens

  // When user logs in
  const login = (user: User) => {
    setUser(user); // Save user in memory
    localStorage.setItem('authUser', JSON.stringify(user)); // Save in browser
  };

  // When user logs out
  const logout = () => {
    setUser(null); // Remove user from memory
    localStorage.removeItem('authUser'); // Remove from browser
  };

  // Share user, login, logout with all children
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth anywhere in the app
export const useAuth = () => {
  const context = useContext(AuthContext); // Get the context
  if (!context) {
    // If used outside AuthProvider, throw error
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // Return user, login, logout
};
