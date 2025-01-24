import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpenCheck,
  UserCircle,
  Book,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Bookmark,
  HomeIcon,
  HelpCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useBorrow } from "@/hooks/useBorrow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/utils";
import Notifications from "../ui/notifications";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const { borrows } = useSelector((state) => state.borrow);
  const { getBorrowRecords } = useBorrow();
  const { signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      getBorrowRecords();
    }
  }, [user]);

  const mainNavItems = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Browse Books", href: "/books", icon: Book },
    { label: "About Us", href: "/about-us", icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 h-16">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpenCheck className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hidden sm:inline-block">
                Codebook Hub
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {mainNavItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center space-x-2",
                  location.pathname === href && "text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />

            {user && <Notifications borrows={borrows} />}

            {user ? (
              <UserMenu user={user} signOut={signOut} />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[calc(100vw-2rem)] md:w-56 mr-4"
              >
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {mainNavItems.map(({ label, href, icon: Icon }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link to={href} className="w-full">
                      <Icon className="mr-2 h-4 w-4" />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}

                {!user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="w-full">
                        <UserCircle className="mr-2 h-4 w-4" />
                        Get Started
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/manage-books" className="w-full">
                        <Bookmark className="mr-2 h-4 w-4" />
                        My Books
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/profile" className="w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={signOut}
                      className="text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

const UserMenu = ({ user, signOut }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex items-center space-x-2">
        <UserCircle className="h-5 w-5" />
        <span className="hidden sm:inline-block">{user.user_name}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link to="/admin" className="cursor-pointer">
          <User className="mr-2 h-4 w-4" /> Dashboard
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/admin/manage-books" className="cursor-pointer">
          <Bookmark className="mr-2 h-4 w-4" /> My Books
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/admin/profile" className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={signOut} className="text-red-600">
        <LogOut className="mr-2 h-4 w-4" /> Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
