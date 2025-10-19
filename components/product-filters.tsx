"use client";

import { useState, useEffect } from "react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
import { Slider } from "@/ui/slider";
import { Badge } from "@/ui/badge";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  initialCategories?: number[];
}

export interface FilterState {
  categories: number[];
  priceRange: [number, number];
  inStock: boolean;
  featured: boolean;
}

interface Category {
  id: number;
  name: string;
  count: string;
}

export function ProductFilters({
  onFiltersChange,
  initialCategories = [],
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategories,
    priceRange: [0, 100],
    inStock: false,
    featured: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, count")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data || []);
      }
      setLoading(false);
    }
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   onFiltersChange(filters);
  // }, [filters, onFiltersChange]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((id) => id !== categoryId);

    updateFilters({ categories: newCategories });
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [0, 100],
      inStock: false,
      featured: false,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100 ||
    filters.inStock ||
    filters.featured;

  if (loading) {
    return <div className="text-center">Loading filters...</div>;
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <h3 className="font-medium">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {category.name}
                </Label>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="font-medium">Price Range (EUR)</h3>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) =>
                updateFilters({ priceRange: value as [number, number] })
              }
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>€{filters.priceRange[0]}</span>
              <span>€{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-3">
          <h3 className="font-medium">Availability</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) =>
                updateFilters({ inStock: checked as boolean })
              }
            />
            <Label
              htmlFor="in-stock"
              className="text-sm font-normal cursor-pointer"
            >
              In Stock Only
            </Label>
          </div>
        </div>

        {/* Featured */}
        <div className="space-y-3">
          <h3 className="font-medium">Special</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured}
              onCheckedChange={(checked) =>
                updateFilters({ featured: checked as boolean })
              }
            />
            <Label
              htmlFor="featured"
              className="text-sm font-normal cursor-pointer"
            >
              Featured Products
            </Label>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-3">
            <h3 className="font-medium">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId);
                return (
                  <Badge
                    key={categoryId}
                    variant="secondary"
                    className="text-xs"
                  >
                    {category?.name}
                    <button
                      onClick={() => handleCategoryChange(categoryId, false)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                <Badge variant="secondary" className="text-xs">
                  €{filters.priceRange[0]} - €{filters.priceRange[1]}
                </Badge>
              )}
              {filters.inStock && (
                <Badge variant="secondary" className="text-xs">
                  In Stock
                </Badge>
              )}
              {filters.featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
