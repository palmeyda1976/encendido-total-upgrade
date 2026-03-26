import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ChevronRight, SlidersHorizontal, X, FolderOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
type StockFilter = "all" | "in-stock" | "out-of-stock";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [showFilters, setShowFilters] = useState(false);

  const { data: allCategories } = useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { data: category, isLoading: catLoading } = useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: products, isLoading: prodsLoading } = useQuery({
    queryKey: ["products", category?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", category!.id)
        .order("featured", { ascending: false })
        .order("name");
      if (error) throw error;
      return data;
    },
    enabled: !!category?.id,
  });

  const brands = useMemo(() => {
    if (!products) return [];
    const set = new Set(products.map((p) => p.brand).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [products]);

  const filteredAndSorted = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Brand filter
    if (brandFilter !== "all") {
      result = result.filter((p) => p.brand === brandFilter);
    }

    // Stock filter
    if (stockFilter === "in-stock") {
      result = result.filter((p) => p.in_stock);
    } else if (stockFilter === "out-of-stock") {
      result = result.filter((p) => !p.in_stock);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        // already sorted by featured from query
        break;
    }

    return result;
  }, [products, sortBy, brandFilter, stockFilter]);

  const activeFilterCount = [brandFilter !== "all", stockFilter !== "all"].filter(Boolean).length;
  const isLoading = catLoading || prodsLoading;

  const clearFilters = () => {
    setBrandFilter("all");
    setStockFilter("all");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container mx-auto py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{category?.name ?? "Cargando..."}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {category?.name}
              </h1>
              {category?.description && (
                <p className="text-muted-foreground mt-2 max-w-2xl">{category.description}</p>
              )}
              {!isLoading && products && (
                <p className="text-sm text-muted-foreground mt-2">
                  {filteredAndSorted.length} de {products.length} productos
                </p>
              )}
            </div>

            {/* Sort + Filter Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${
                  showFilters || activeFilterCount > 0
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-foreground/70 hover:border-primary/50"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {activeFilterCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0 h-4">
                    {activeFilterCount}
                  </Badge>
                )}
              </button>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[200px] bg-background border-border text-sm">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                  <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 bg-card border border-border rounded-lg p-4 flex flex-wrap items-center gap-4">
              {brands.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-medium">Marca:</span>
                  <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger className="w-[160px] bg-background border-border text-sm h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="all">Todas</SelectItem>
                      {brands.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium">Stock:</span>
                <Select value={stockFilter} onValueChange={(v) => setStockFilter(v as StockFilter)}>
                  <SelectTrigger className="w-[160px] bg-background border-border text-sm h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="in-stock">En Stock</SelectItem>
                    <SelectItem value="out-of-stock">Agotados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors ml-auto"
                >
                  <X className="w-3 h-3" />
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Content with sidebar */}
      <section className="pb-16">
        <div className="container mx-auto flex gap-8">
          {/* Categories Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 border border-border rounded-lg overflow-hidden">
              <div className="bg-primary px-4 py-3 flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-primary-foreground" />
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-primary-foreground">
                  Categorías
                </h3>
              </div>
              <nav className="py-2">
                {allCategories?.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/categoria/${cat.slug}`}
                    className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                      cat.slug === slug
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
                    <div className="aspect-square bg-secondary/50" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-secondary/50 rounded w-1/3" />
                      <div className="h-4 bg-secondary/50 rounded w-2/3" />
                      <div className="h-5 bg-secondary/50 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAndSorted.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSorted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  {products && products.length > 0
                    ? "No se encontraron productos con los filtros seleccionados."
                    : "Aún no hay productos en esta categoría."}
                </p>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="mt-4 text-primary hover:underline text-sm font-medium">
                    Limpiar filtros
                  </button>
                )}
                <Link to="/" className="inline-block mt-6 btn-hero">Volver al Inicio</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
