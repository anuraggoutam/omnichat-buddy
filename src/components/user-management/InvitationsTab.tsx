import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Send, X } from "lucide-react";
import { mockInvitations } from "@/lib/mockUserManagement";
import { toast } from "sonner";

export function InvitationsTab() {
  const handleResend = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
  };

  const handleCancel = (email: string) => {
    toast.success(`Invitation cancelled for ${email}`);
  };

  const handleResendAll = () => {
    const pendingCount = mockInvitations.filter((inv) => inv.status === "sent").length;
    toast.success(`Resent ${pendingCount} pending invitations`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleResendAll}>
          <Send className="h-4 w-4 mr-2" />
          Resend All Pending
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Sent Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvitations.map((invitation) => (
              <TableRow key={invitation.id}>
                <TableCell className="font-medium">{invitation.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{invitation.role}</Badge>
                </TableCell>
                <TableCell>{invitation.sentDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      invitation.status === "accepted"
                        ? "default"
                        : invitation.status === "sent"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {invitation.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {invitation.status === "sent" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResend(invitation.email)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Resend
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancel(invitation.email)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
