import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

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

  const isLoading = catLoading || prodsLoading;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="container mx-auto py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{category?.name ?? "Cargando..."}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-10">
        <div className="container mx-auto">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            {category?.name}
          </h1>
          {category?.description && (
            <p className="text-muted-foreground mt-2 max-w-2xl">{category.description}</p>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Aún no hay productos en esta categoría.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Pronto agregaremos productos aquí.
              </p>
              <Link
                to="/"
                className="inline-block mt-6 btn-hero"
              >
                Volver al Inicio
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
