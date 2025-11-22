import { Badge } from "@/components/ui/badge";
import { LeadSource } from "@/lib/mockData";

interface LeadSourceBadgeProps {
  source: LeadSource;
}

const sourceConfig = {
  website: { label: "Website", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
  facebook_ads: { label: "FB Ads", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  instagram_ads: { label: "IG Ads", color: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300" },
  google_ads: { label: "Google Ads", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" },
  referral: { label: "Referral", color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
  organic: { label: "Organic", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
};

export const LeadSourceBadge = ({ source }: LeadSourceBadgeProps) => {
  const config = sourceConfig[source] || sourceConfig.organic; // Fallback to organic if source not found

  return (
    <Badge variant="outline" className={`text-xs border-0 ${config.color}`}>
      {config.label}
    </Badge>
  );
};
