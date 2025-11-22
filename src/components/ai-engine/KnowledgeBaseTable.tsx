import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash2, MoreVertical, FileText } from "lucide-react";

interface KnowledgeBaseTableProps {
  knowledgeBase: any[];
  onUpdate: (data: any[]) => void;
}

export function KnowledgeBaseTable({ knowledgeBase, onUpdate }: KnowledgeBaseTableProps) {
  const handleDelete = (id: string) => {
    onUpdate(knowledgeBase.filter((kb) => kb.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    onUpdate(
      knowledgeBase.map((kb) =>
        kb.id === id
          ? { ...kb, status: kb.status === "Active" ? ("Inactive" as const) : ("Active" as const) }
          : kb
      )
    );
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead># of Articles</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {knowledgeBase.map((kb) => (
            <TableRow key={kb.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{kb.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{kb.category}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-foreground">{kb.articles}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{kb.views.toLocaleString()}</span>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    kb.status === "Active"
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {kb.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{kb.lastUpdated}</span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(kb.id)}>
                      {kb.status === "Active" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(kb.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
