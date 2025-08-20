import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { Nav } from 'react-day-picker';

// The Button component is correctly typed and implemented.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline" | "default";
}

const Button: React.FC<ButtonProps> = ({ children, className, variant, ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  let variantClasses = '';
  switch (variant) {
    case 'ghost':
      variantClasses = 'text-gray-600 hover:text-gray-900';
      break;
    case 'outline':
      variantClasses = 'border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300';
      break;
    default:
      variantClasses = 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white';
      break;
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Main App component to simulate a complete application
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Simulating a loading state and user authentication check
  useEffect(() => {
    // Simulate API call or auth check
    setTimeout(() => {
      setLoading(false);
      // Simulating a logged-in user
      setUser({ email: 'john.doe@example.com' });
    }, 1500);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = () => {
    // Simulate user logout
    setUser(null);
  };

  return (
    <div className=" bg-gray-50 font-inter">
      {/* Navbar Component */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HireQ
          </span>
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/cv" className="text-gray-600 hover:text-gray-900 transition-colors">
            CV
          </a>
          <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            Interview
          </a>
          <a href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
            Profile
          </a>
          <a href="/result" className="text-gray-600 hover:text-gray-900 transition-colors">
            Result
          </a>
        </div>

        {/* Right Buttons & Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          {loading ? (
            <div className="animate-pulse flex space-x-3">
              <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
              <div className="h-9 w-24 bg-gray-200 rounded-lg"></div>
            </div>
          ) : user ? (
            <>
              <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.email}</span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="hidden md:flex"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <a href="#" className="hidden md:flex">
                <Button variant="ghost">
                  Sign In
                </Button>
              </a>
              <a href="#" className="hidden md:flex">
                <Button>
                  Get Started
                </Button>
              </a>
            </>
          )}

          {/* Mobile menu toggle button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-md">
          <div className="flex flex-col items-start p-4 space-y-4">
            <a href="#" className="w-full text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium">
              CV
            </a>
            <a href="#" className="w-full text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium">
              Interview
            </a>
            <a href="#" className="w-full text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium">
              Profile
            </a>
            <a href="#" className="w-full text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium">
              Result
            </a>
            <div className="w-full border-t border-gray-200 pt-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <a href="#" className="w-full block mb-4">
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </a>
                  <a href="#" className="w-full block">
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content (placeholder) */}
    </div>
  );
};

export default Navbar;