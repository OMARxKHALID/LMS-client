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
import {
  Link,
  useLocation,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  BookCopy,
  FolderTree,
  User2,
  ChevronUp,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
              <span className="text-sm text-gray-500">{user.userType}</span>
            </div>
          </SidebarHeader>

          <SidebarContent className="overflow-y-auto">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    aria-label="Dashboard"
                    isActive={isActiveRoute("/admin")}
                    tooltip="Dashboard"
                  >
                    <Link to="/admin">
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                      <span className="ml-2">Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            {user.userType === "seller" && (
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      aria-label="Manage Books"
                      isActive={isActiveRoute("/admin/manage-books")}
                      tooltip="Manage Books"
                    >
                      <Link to="/admin/manage-books">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="ml-2">Manage Books</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          aria-label="Add New Book"
                          isActive={isActiveRoute("/admin/create-book")}
                          tooltip="Add New Book"
                        >
                          <Link to="/admin/create-book">
                            <BookCopy className="h-4 w-4 text-primary" />
                            <span className="ml-2">Add New Book</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      aria-label="Categories"
                      isActive={isActiveRoute("/admin/manage-categories")}
                      tooltip="Categories"
                    >
                      <Link to="/admin/manage-categories">
                        <FolderTree className="h-4 w-4 text-primary" />
                        <span className="ml-2">Categories</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User2 className="h-4 w-4 text-primary" />
                      <span className="ml-2">{user?.username || "User"}</span>
                      <ChevronUp className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <DropdownMenuItem>
                      <Link to="/" className="w-full">
                        Home
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Link to="/admin/profile" className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-admin">
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
