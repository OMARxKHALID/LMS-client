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
  Home,
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
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out.",
      });
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isActiveRoute = (path) => location.pathname.startsWith(path);
  const shortcutKey = navigator.platform.includes("Mac") ? "⌘" : "Ctrl";

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <SidebarProvider>
        <Sidebar className="flex-shrink-0 w-full md:w-56">
          <SidebarHeader>
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-semibold">
                {user.role === "admin" ? "Admin Panel" : "User Panel"}
              </h2>
              <Link to="/">
                <Home className="w-5 h-5" />
              </Link>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-2">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/admin"
                      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                        isActiveRoute("/admin") ? "bg-gray-100" : ""
                      }`}
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/admin/borrowed-books"
                      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                        isActiveRoute("/admin/borrowed-books")
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      <History className="w-5 h-5 mr-3" />
                      <span>Borrowed Books</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/admin/purchased-books"
                      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                        isActiveRoute("/admin/purchased-books")
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      <History className="w-5 h-5 mr-3" />
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
                      <SidebarMenuButton asChild>
                        <Link
                          to="/admin/manage-books"
                          className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                            isActiveRoute("/admin/manage-books")
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <BookOpen className="w-5 h-5 mr-3" />
                          <span>Manage Books</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link
                          to="/admin/create-book"
                          className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 pl-10 ${
                            isActiveRoute("/admin/create-book")
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <BookCopy className="w-5 h-5 mr-3 " />
                          <span>Add New Book</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link
                          to="/admin/manage-categories"
                          className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                            isActiveRoute("/admin/manage-categories")
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <FolderTree className="w-5 h-5 mr-3" />
                          <span>Categories</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link
                          to="/admin/earnings"
                          className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                            isActiveRoute("/admin/earnings")
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <DollarSign className="w-5 h-5 mr-3" />
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
                  <SidebarMenuButton asChild>
                    <Link
                      to="/admin/transactions"
                      className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                        isActiveRoute("/admin/transactions")
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      <History className="w-5 h-5 mr-3" />
                      <span>Transactions</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-1 border-t">
            <div className="flex items-center justify-between space-x-1">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center w-full text-left">
                    <User2 className="w-4 h-4 mr-2" />
                    <span className="text-sm">{user?.user_name || "User"}</span>
                    <ChevronUp className="w-4 h-4 ml-auto" />
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
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/manage-users" className="w-full">
                        Manage Users
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onSelect={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container px-4 py-6 mx-auto sm:px-6 md:px-8">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4">
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

              <div className="flex-1 w-full sm:w-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
