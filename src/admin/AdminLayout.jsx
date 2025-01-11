import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarProvider,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarGroup,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation, Outlet, useNavigate, Navigate } from "react-router";
import {
  BookOpen,
  LayoutDashboard,
  BookCopy,
  FolderTree,
  User2,
  ChevronUp,
  DollarSign,
  History,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isActiveRoute = (path) => location.pathname.startsWith(path);
  const shortcutKey = navigator.platform.includes("Mac") ? "⌘" : "Ctrl";

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SidebarProvider>
        <Sidebar className="w-full md:w-64 flex-shrink-0">
          <SidebarHeader>
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-semibold">Admin Panel</h2>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-2">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActiveRoute("/admin")}>
                    <Link
                      to="/admin"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LayoutDashboard className="h-5 w-5 mr-3" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute("/admin/borrowed-books")}
                  >
                    <Link
                      to="/admin/borrowed-books"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <History className="h-5 w-5 mr-3" />
                      <span>Borrowed Books</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute("/admin/purchased-books")}
                  >
                    <Link
                      to="/admin/purchased-books"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <History className="h-5 w-5 mr-3" />
                      <span>Purchased Books</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            {user.role === "admin" && (
              <>
                <SidebarGroup>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActiveRoute("/admin/manage-books")}
                      >
                        <Link
                          to="/admin/manage-books"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <BookOpen className="h-5 w-5 mr-3" />
                          <span>Manage Books</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActiveRoute("/admin/create-book")}
                      >
                        <Link
                          to="/admin/create-book"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 pl-10"
                        >
                          <BookCopy className="h-5 w-5 mr-3" />
                          <span>Add New Book</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActiveRoute("/admin/manage-categories")}
                      >
                        <Link
                          to="/admin/manage-categories"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <FolderTree className="h-5 w-5 mr-3" />
                          <span>Categories</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActiveRoute("/admin/earnings")}
                      >
                        <Link
                          to="/admin/earnings"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <DollarSign className="h-5 w-5 mr-3" />
                          <span>Earnings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </>
            )}
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute("/admin/transcations")}
                  >
                    <Link
                      to="/admin/transactions"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <History className="h-5 w-5 mr-3" />
                      <span>Transactions</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-2">
            <div className="flex items-center justify-between space-x-1">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center w-full text-left">
                    <User2 className="h-4 w-4 mr-2" />
                    <span>{user?.username || "User"}</span>
                    <ChevronUp className="ml-auto h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/" className="w-full">
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-6 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarTrigger className="md:hidden" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Toggle Sidebar {shortcutKey}+B
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex-1 w-full">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
