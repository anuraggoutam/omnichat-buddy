import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StickyNote, Star, Ban, Trash2, TrendingUp, ShoppingCart, Clock, Globe, DollarSign, Package } from "lucide-react";
import { demoOrders, activityTimeline } from "@/lib/mockData";
import { ActivityTimeline } from "./ActivityTimeline";

interface CustomerProfileProps {
  customer: any;
}

export const CustomerProfile = ({ customer }: CustomerProfileProps) => {
  const customerOrders = demoOrders.filter(
    (order) => order.customer.id === customer.id
  );
  const activities = activityTimeline[customer.id as keyof typeof activityTimeline] || [];

  return (
    <div className="w-[360px] border-l border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-sm">Customer Profile</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Customer Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-3">
                  {customer.avatar}
                </div>
                <h4 className="font-semibold text-lg">{customer.name}</h4>
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  WhatsApp Opted-in
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {customer.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="sm">
                  <StickyNote className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Ban className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customer Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Customer Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Lifetime Value
                </div>
                <span className="font-semibold">₹{customer.ltv.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShoppingCart className="h-4 w-4" />
                  Total Orders
                </div>
                <span className="font-semibold">{customerOrders.length}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Last Active
                </div>
                <span className="text-sm">2h ago</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Avg Order Value
                </div>
                <span className="font-semibold">₹{customer.averageOrderValue?.toLocaleString() || 0}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  Language
                </div>
                <span className="text-sm">{customer.language === "en" ? "English" : "Hindi"}</span>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">✨</span>
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This customer often responds between 6–9 PM. Best time to send offers.
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {customer.preferredProducts?.slice(0, 2).map((product: string) => (
                  <Badge key={product} variant="secondary" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          {activities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityTimeline activities={activities} />
              </CardContent>
            </Card>
          )}

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Order History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {customerOrders.length > 0 ? (
                customerOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="space-y-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.items?.length || 0} item{(order.items?.length || 0) > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">₹{order.total}</p>
                        <Badge variant="secondary" className="text-xs">
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      View order →
                    </Button>
                    {customerOrders.indexOf(order) < 2 && <Separator className="mt-3" />}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No orders yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                <StickyNote className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};
