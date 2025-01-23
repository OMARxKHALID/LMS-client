import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { BookOpenCheck, UserCircle, Book, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useBorrow } from "@/hooks/useBorrow";
import Notifications from "@/components/ui/notifications";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { borrows } = useSelector((state) => state.borrow);
  const { getBorrowRecords } = useBorrow();
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getBorrowRecords();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container h-14 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <BookOpenCheck className="h-6 w-6 text-primary" />
            <span className="font-bold text-primary">Codebook Hub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/books"
              className="text-primary hover:text-primary/80 cursor-pointer flex items-center space-x-2"
            >
              <Book className="h-4 w-4 text-primary" />
              <span>Browse Books</span>
            </Link>
            <Link to="/about-us" className="text-gray-500 hover:text-gray-900">
              About Us
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <ModeToggle />
          <Notifications borrows={borrows} />
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <UserCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-primary">{user.user_name}</span>
                </div>
              </Link>
              <Button variant="outline" onClick={signOut} size="sm">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
        <button
          className="md:hidden text-primary"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 border-t">
            <Link
              to="/books"
              className="text-primary hover:text-primary/80 cursor-pointer flex items-center space-x-2"
              onClick={toggleMenu}
            >
              <Book className="h-4 w-4 text-primary" />
              <span>Browse Books</span>
            </Link>
            <Link
              to="/about"
              className="text-gray-500 hover:text-gray-900"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <ModeToggle />
            {user ? (
              <>
                <Link to="/admin" onClick={toggleMenu}>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <UserCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm text-primary">
                      {user.user_name}
                    </span>
                  </div>
                </Link>
                <Button
                  variant="outline"
                  onClick={signOut}
                  size="sm"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
