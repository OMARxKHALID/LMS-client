import { useEffect } from "react";
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
import { setUsers } from "@/redux/slice/authSlice";
import { useToast } from "@/hooks/use-toast";

export default function ManageUsers() {
  const { users } = useSelector((state) => state.auth);
  const { getAllUsers, revokeUserAccess } = useAuth();
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getAllUsers();
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";

      await revokeUserAccess(userId, updatedStatus);

      // Update the users list in Redux with the new status
      dispatch(
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, status: updatedStatus } : user
          )
        )
      );

      toast({
        title: "Success",
        description: `User status updated to ${updatedStatus}.`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update user status.",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Manage Users</h2>
        <p className="text-muted-foreground">
          Control user access and permissions
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.user_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
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
                      onClick={() => toggleUserStatus(user._id, user.status)}
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5" className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
