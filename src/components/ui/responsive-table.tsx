import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  mobileLabel?: string;
  mobileRender?: (item: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  className?: string;
  mobileCardClassName?: string;
  showMobileCard?: boolean;
}

export function ResponsiveTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  emptyMessage = "No data available",
  emptyIcon,
  className,
  mobileCardClassName,
  showMobileCard = true,
}: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile();

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {emptyIcon}
        <p className="mt-4 text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  // Mobile card view
  if (isMobile && showMobileCard) {
    return (
      <div className={cn("space-y-3", className)}>
        {data.map((item) => (
          <Card
            key={keyExtractor(item)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              onRowClick && "hover:border-primary/50",
              mobileCardClassName
            )}
            onClick={() => onRowClick?.(item)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                {columns.map((column) => {
                  const content = column.mobileRender
                    ? column.mobileRender(item)
                    : column.render
                    ? column.render(item)
                    : (item as any)[column.key];

                  if (content === null || content === undefined) return null;

                  return (
                    <div key={column.key} className="flex flex-col gap-1">
                      {column.mobileLabel && (
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {column.mobileLabel}
                        </span>
                      )}
                      <div className={cn("text-sm", column.className)}>{content}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Desktop table view
  return (
    <div className={cn("rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.headerClassName}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={keyExtractor(item)}
              className={onRowClick ? "cursor-pointer" : ""}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => {
                const content = column.render
                  ? column.render(item)
                  : (item as any)[column.key];

                return (
                  <TableCell key={column.key} className={column.className}>
                    {content}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Horizontal scroll table for mobile when cards aren't suitable
export function ScrollableTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  emptyMessage = "No data available",
  emptyIcon,
  className,
}: Omit<ResponsiveTableProps<T>, "showMobileCard" | "mobileCardClassName">) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {emptyIcon}
        <p className="mt-4 text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto -mx-4 sm:mx-0", className)}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.headerClassName}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={keyExtractor(item)}
                  className={onRowClick ? "cursor-pointer" : ""}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => {
                    const content = column.render
                      ? column.render(item)
                      : (item as any)[column.key];

                    return (
                      <TableCell key={column.key} className={column.className}>
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

