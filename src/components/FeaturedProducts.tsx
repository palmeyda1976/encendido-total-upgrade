import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(8);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-nav text-sm uppercase tracking-[0.3em]">
            Lo mejor de nuestro catálogo
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
            Productos Destacados
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-secondary/30" />
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
          <p className="text-center text-muted-foreground">
            No hay productos destacados por el momento.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
