// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import FavoritesPage from './pages/FavoritesPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import ConfirmPage from './pages/ConfirmPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import EditProfilePage from './pages/EditProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/confirm" element={<ConfirmPage />} />
              <Route path="/order-history" element={<OrderHistoryPage />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
