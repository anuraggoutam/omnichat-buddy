import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Palette,
  Globe,
  MessageSquare,
  Users,
  Shield,
  Brain,
  Bell,
  CreditCard,
  Lock,
  Code,
  Database,
  HelpCircle,
  Info,
} from "lucide-react";
import { BusinessProfile } from "@/components/settings/BusinessProfile";
import { Branding } from "@/components/settings/Branding";
import { TeamMembers } from "@/components/settings/TeamMembers";
import { RolesPermissions } from "@/components/settings/RolesPermissions";
import { AIEngineSettings } from "@/components/settings/AIEngineSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { DeveloperSettings } from "@/components/settings/DeveloperSettings";
import { ChannelsSettings } from "@/components/settings/ChannelsSettings";

interface SettingSection {
  id: string;
  label: string;
  icon: any;
  category?: string;
}

const settingSections: SettingSection[] = [
  { id: "business", label: "Business Profile", icon: Building2, category: "Workspace" },
  { id: "branding", label: "Branding", icon: Palette, category: "Workspace" },
  { id: "domains", label: "Domains", icon: Globe, category: "Workspace" },
  { id: "channels", label: "Channels", icon: MessageSquare, category: "Channels" },
  { id: "team", label: "Team Members", icon: Users, category: "Users & Roles" },
  { id: "roles", label: "Roles & Permissions", icon: Shield, category: "Users & Roles" },
  { id: "ai", label: "AI Engine", icon: Brain, category: "AI & Automation" },
  { id: "notifications", label: "Notifications", icon: Bell, category: "Communication" },
  { id: "billing", label: "Billing", icon: CreditCard, category: "Billing" },
  { id: "security", label: "Security", icon: Lock, category: "Security" },
  { id: "developer", label: "Developer", icon: Code, category: "Developer" },
  { id: "data", label: "Data & Export", icon: Database, category: "Data & Support" },
  { id: "help", label: "Help & Support", icon: HelpCircle, category: "Data & Support" },
  { id: "about", label: "About", icon: Info, category: "Data & Support" },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("business");

  const renderSection = () => {
    switch (activeSection) {
      case "business":
        return <BusinessProfile />;
      case "branding":
        return <Branding />;
      case "channels":
        return <ChannelsSettings />;
      case "team":
        return <TeamMembers />;
      case "roles":
        return <RolesPermissions />;
      case "ai":
        return <AIEngineSettings />;
      case "notifications":
        return <NotificationSettings />;
      case "billing":
        return <BillingSettings />;
      case "security":
        return <SecuritySettings />;
      case "developer":
        return <DeveloperSettings />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Info className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              This settings section is under development
            </p>
          </div>
        );
    }
  };

  const categories = Array.from(
    new Set(settingSections.map((s) => s.category).filter(Boolean))
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your workspace configuration
          </p>
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="p-2">
            {categories.map((category) => (
              <div key={category} className="mb-4">
                <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                  {category}
                </h3>
                <div className="space-y-1">
                  {settingSections
                    .filter((section) => section.category === category)
                    .map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeSection === section.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{section.label}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto p-6">
            {renderSection()}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
