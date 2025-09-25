import { User, LogOut, BookOpen, } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Courses", href: "/courses" },
    { title: "Batches", href: "/batches" },
    { title: "Store", href: "/store" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img className="h-10 w-auto brightness-0 invert" src={logo} alt="CurrencyCore Logo" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.title} to={link.href} className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
                {link.title}
              </NavLink>
            ))}
            {user && (
              <NavLink to="/dashboard/my-courses" className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
                My Courses
              </NavLink>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="h-10 w-32 bg-gray-800 rounded-md animate-pulse"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-11 cursor-pointer w-11 bg-gray-700 border-gray-300 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500">
                    <img className="   rounded-full object-cover  " src={user.picture || `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt={user.name} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900 text-white border-gray-800" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-gray-800 p-2">
                    <Link to="/dashboard/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-gray-800 p-2">
                    <Link to="/dashboard/my-courses" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>My Courses</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer focus:bg-red-500/20 text-red-500 focus:text-red-500 p-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-white hover:bg-gray-800 hover:text-white px-5 py-2">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          {/* Mobile menu logic would also need similar updates */}
        </div>
      </div>
    </header>
  );
};

export default Header;