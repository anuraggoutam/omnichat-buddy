import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, FileText } from "lucide-react";
import { mockInvoices, mockCurrentPlan } from "@/lib/mockBilling";
import { toast } from "sonner";

interface InvoiceViewerDrawerProps {
  invoiceId: string | null;
  onClose: () => void;
}

export function InvoiceViewerDrawer({ invoiceId, onClose }: InvoiceViewerDrawerProps) {
  const invoice = mockInvoices.find((inv) => inv.id === invoiceId);

  if (!invoice) return null;

  const subtotal = invoice.items.reduce((sum, item) => sum + item.total, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <Drawer open={!!invoiceId} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Invoice {invoice.id}</DrawerTitle>
          <DrawerDescription>
            Invoice date: {invoice.date}
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">Bill From</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your Company Name<br />
                  123 Business Street<br />
                  City, State 12345<br />
                  GST: 29ABCDE1234F1Z5
                </p>
              </div>
              <div className="text-right">
                <h3 className="font-semibold text-lg">Bill To</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Customer Business<br />
                  456 Client Avenue<br />
                  City, State 67890<br />
                  GST: 27XYZAB5678C2D9
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Invoice Items</h3>
              <div className="space-y-2">
                {invoice.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <div className="font-medium">{item.description}</div>
                      <div className="text-muted-foreground">
                        {item.quantity} × ₹{item.unitPrice}
                      </div>
                    </div>
                    <div className="font-medium">₹{item.total.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString()}.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString()}.00</span>
              </div>
            </div>

            <Separator />

            <div className="text-sm text-muted-foreground">
              <p><strong>Payment Method:</strong> {invoice.paymentMethod}</p>
              <p><strong>Payment Status:</strong> {invoice.status.toUpperCase()}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => toast.success("Downloading PDF...")}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => toast.info("Printing invoice...")}>
              <FileText className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
