// Get the login user from AuthContext
import { useAuth } from '../context/AuthContext';
// For moving to another page
import { Navigate } from 'react-router-dom';
// React type for children 
import { ReactNode } from 'react'; 

// Define the type of props we accept
type Props = {
  children: ReactNode; // Any component inside <ProtectedRoute>...</ProtectedRoute>
};

// Component to protect private pages (only show if user is logged in)
const ProtectedRoute = ({ children }: Props) => {
  // Get the user from context
  const { user } = useAuth();

  // If no user (not logged in), move to login page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If user exists, show the page
  return <>{children}</>; 
};

// Allow other files to use this component
export default ProtectedRoute;
