import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PortfolioProfile = {
  id: number;
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  availability: string;
};

export type PortfolioEntry = {
  id: number;
  type: "project" | "experience" | "skill" | "education" | "testimonial";
  title: string;
  subtitle: string;
  description: string;
  period: string;
  link: string;
  featured: boolean;
  sort_order: number;
};

export const portfolioQuery = queryOptions({
  queryKey: ["portfolio"],
  queryFn: async () => {
    const [profileResult, entriesResult] = await Promise.all([
      supabase.from("portfolio_profile").select("*").eq("id", 1).single(),
      supabase.from("portfolio_entries").select("*").order("sort_order"),
    ]);
    if (profileResult.error) throw profileResult.error;
    if (entriesResult.error) throw entriesResult.error;
    return {
      profile: profileResult.data as PortfolioProfile,
      entries: entriesResult.data as PortfolioEntry[],
    };
  },
});