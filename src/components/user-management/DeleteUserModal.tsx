import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { mockUsers } from "@/lib/mockUserManagement";
import { toast } from "sonner";

interface DeleteUserModalProps {
  userId: string | null;
  onClose: () => void;
}

export function DeleteUserModal({ userId, onClose }: DeleteUserModalProps) {
  const user = mockUsers.find((u) => u.id === userId);

  const handleDelete = () => {
    toast.success(`User ${user?.name} has been deleted`);
    onClose();
  };

  return (
    <AlertDialog open={!!userId} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{user?.name}</strong>? This action
            cannot be undone. All data associated with this user will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
