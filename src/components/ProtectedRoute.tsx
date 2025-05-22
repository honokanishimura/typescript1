// src/components/ProtectedRoute.tsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react'; // 👈 追加！

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>; // 👈 Fragmentで囲むのが一般的
};

export default ProtectedRoute;
