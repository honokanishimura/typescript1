import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Curtain', href: '/category/curtain', submenu: ['All', 'Fabric', 'Cotton'] },
  { name: 'Mirror', href: '/category/mirror', submenu: ['All', 'Desk', 'Floor'] },
  { name: 'Plant', href: '/category/plant', submenu: ['All', 'Indoor', 'Outdoor'] },
  { name: 'Rug', href: '/category/rug', submenu: ['All', 'Wool', 'Cotton'] },
  { name: 'Sofa', href: '/category/sofa', submenu: ['All', '2-seater', 'Sectional'] },
  { name: 'Table', href: '/category/table', submenu: ['All', 'New', 'Sale'] },
  { name: 'TVstand', href: '/category/tvstand', submenu: ['All', 'Modern', 'Wood'] },
  { name: 'Chair', href: '/category/chair', submenu: ['All', 'Comfort', 'Office'] },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user: contextUser, logout } = useAuth();
  const [user, setUser] = useState(contextUser);
  const navigate = useNavigate();

  // ✅ スクロール時の影効果
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ ローカルストレージから user を補完
  useEffect(() => {
    if (!contextUser) {
      const stored = localStorage.getItem('authUser');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse authUser:', e);
        }
      }
    } else {
      setUser(contextUser);
    }
  }, [contextUser]);

  const handleCategoryClick = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  const handleSubmenuClick = (category: string, submenu: string) => {
    navigate(
      submenu === 'All'
        ? '/products'
        : `/category/${category.toLowerCase()}?filter=${submenu.toLowerCase()}`
    );
    setActiveDropdown(null);
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`bg-white shadow-md sticky top-0 z-50 text-gray-900 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left - Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-gray-900 tracking-wide hover:opacity-80 transition"
        >
          HYO
        </Link>

        {/* Center - Categories */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          {categories.map((cat) => (
            <div key={cat.name} className="relative">
              <button
                onClick={() => handleCategoryClick(cat.name)}
                className={`flex items-center gap-1 ${activeDropdown === cat.name ? 'text-orange-500' : 'hover:text-orange-500'}`}
              >
                {cat.name}
                <i className={`fas ${activeDropdown === cat.name ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm ml-1`} />
              </button>
              {activeDropdown === cat.name && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                  {cat.submenu.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSubmenuClick(cat.name, item)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right - User Icon & Dropdown */}
        <div className="flex items-center space-x-6 relative">
          {user && (
            <span className="hidden md:inline text-sm text-gray-600 font-medium">
              Welcome, {user.firstName}!
            </span>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-xl hover:text-orange-500 flex items-center gap-1"
              >
                <i className="fas fa-user" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-lg z-50">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Page
                  </Link>


                  <Link to="/order-history" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Order History
                  </Link>

                  <Link to="/favorites" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Favorites
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogoutClick();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="text-xl hover:text-orange-500">
              <i className="fas fa-user" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
