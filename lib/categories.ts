import { createClient } from "@/lib/supabase/client";
import { Category } from "./types";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, description, image, count")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  // Convert count to string for each category
  return (data ?? []).map((category) => ({
    ...category,
    // count: String(category.count),
  }));
}
