import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingCart,
  Package,
  Users,
  Megaphone,
  MessageCircle,
  ShoppingBag,
  BarChart3,
  Settings,
  Workflow,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { demoTenant } from "@/lib/mockData";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Conversations", url: "/conversations", icon: MessageSquare },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Products", url: "/products", icon: Package },
  { title: "Customers", url: "/customers", icon: Users },
];

const marketingItems = [
  { title: "Broadcasts", url: "/broadcasts", icon: Megaphone },
  { title: "Templates", url: "/templates", icon: MessageCircle },
];

const toolsItems = [
  { title: "AI Engine", url: "/ai-engine", icon: Sparkles },
  { title: "Workflows", url: "/workflows", icon: Workflow },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingBag },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-lg">
            {demoTenant.logo}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                {demoTenant.name}
              </span>
              <span className="text-xs text-muted-foreground">Business</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Marketing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {marketingItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/settings"
                    className="hover:bg-sidebar-accent"
                    activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
