"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { ProductFilters, type FilterState } from "@/components/product-filters";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Badge } from "@/ui/badge";
import { Search, Grid, List, Filter } from "lucide-react";
import type { Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { getProducts } from "@/lib/products";
import { useSearchParams } from "next/navigation";

export enum CategoryId {
  EssentialOils = 0,
  PremiumHerbs = 1,
  SignatureBlends = 2,
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const initialCategories =
    categoryId && !isNaN(Number(categoryId)) ? [Number(categoryId)] : [];

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(categoryId || undefined);
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (filters: FilterState) => {
    let filtered = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category_id)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price_eur >= filters.priceRange[0] &&
        product.price_eur <= filters.priceRange[1]
    );

    // Filter by stock
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock_quantity > 0);
    }

    // Filter by featured
    if (filters.featured) {
      filtered = filtered.filter((product) => product.featured);
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price_eur - b.price_eur);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price_eur - a.price_eur);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Re-apply filters with new search query
    handleFiltersChange({
      categories: [],
      priceRange: [0, 100],
      inStock: false,
      featured: false,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container px-4 py-16">
          <div className="text-center">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">
          Our Products
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
          Discover our complete collection of premium essential oils, herbs, and
          signature blends.
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {console.log(initialCategories, "initialCategories")}
        {/* Filters Sidebar */}
        <aside className={`w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
          <ProductFilters
            onFiltersChange={handleFiltersChange}
            initialCategories={initialCategories}
          />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </span>
              {searchQuery && (
                <Badge variant="secondary">Search: "{searchQuery}"</Badge>
              )}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showQuickView={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
