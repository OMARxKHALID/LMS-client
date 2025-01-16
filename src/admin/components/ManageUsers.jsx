import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { updateUsersRole, updateUsersStatus } from "@/redux/slice/authSlice";
import { useToast } from "@/hooks/use-toast";
import { Store, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ManageUsers() {
  const { users } = useSelector((state) => state.auth);
  const { getAllUsers, revokeUserAccess, updateUserRole } = useAuth();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [userToChange, setUserToChange] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getAllUsers();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to fetch users.",
        });
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUserToChange(userId);
    setNewRole(newRole);
    setIsRoleModalOpen(true);
  };

  const confirmRoleChange = async () => {
    try {
      if (!userToChange || !newRole) return;

      await updateUserRole(newRole, userToChange);

      dispatch(updateUsersRole({ userId: userToChange, role: newRole }));

      toast({
        title: "Success",
        description: `User role updated to ${newRole}.`,
      });
      setIsRoleModalOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update user role.",
      });
      setIsRoleModalOpen(false);
    }
  };

  const handleStatusChange = (userId, currentStatus) => {
    setUserToChange(userId);
    setNewStatus(currentStatus === "active" ? "inactive" : "active");
    setIsStatusModalOpen(true);
  };

  const confirmStatusChange = async () => {
    try {
      if (!userToChange || !newStatus) return;

      await revokeUserAccess(userToChange, newStatus);

      dispatch(updateUsersStatus({ userId: userToChange, status: newStatus }));

      toast({
        title: "Success",
        description: `User status updated to ${newStatus}.`,
      });
      setIsStatusModalOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update user status.",
      });
      setIsStatusModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Manage Users</h2>
        <p className="text-muted-foreground">
          Control user access and permissions.
        </p>
      </div>

      <div className="border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">User Info</TableHead>
                <TableHead className="font-medium">Role</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center">
                          {user.role === "admin" ? (
                            <Store className="h-5 w-5" />
                          ) : (
                            <User className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{user.user_name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(newRole) =>
                          handleRoleChange(user._id, newRole)
                        }
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={
                          user.status === "active" ? "destructive" : "default"
                        }
                        size="sm"
                        onClick={() =>
                          handleStatusChange(user._id, user.status)
                        }
                      >
                        {user.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent aria-describedby="role-change-description">
          <DialogHeader>
            <DialogTitle>Confirm Role Change</DialogTitle>
          </DialogHeader>
          <p id="role-change-description">
            Change the role to <strong>{newRole}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRoleChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent aria-describedby="status-change-description">
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
          </DialogHeader>
          <p id="status-change-description">
            Are you sure you want to{" "}
            <strong>
              {newStatus === "active" ? "activate" : "deactivate"}
            </strong>{" "}
            this user?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmStatusChange}>
              {newStatus === "active" ? "Activate" : "Deactivate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
