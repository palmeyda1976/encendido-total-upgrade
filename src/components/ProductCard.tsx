import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

interface ProductCardProps {
  product: Tables<"products">;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number | null) => {
    if (!price) return "Consultar";
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <Link to={`/producto/${product.slug}`} className="block aspect-square bg-secondary/30 overflow-hidden cursor-pointer">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        {product.brand && (
          <span className="text-xs text-primary font-semibold uppercase tracking-wider">
            {product.brand}
          </span>
        )}
        <h3 className="font-heading font-semibold text-foreground mt-1 line-clamp-2">
          {product.name}
        </h3>
        {product.sku && (
          <p className="text-xs text-muted-foreground mt-1">SKU: {product.sku}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="font-heading text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              product.in_stock
                ? "bg-green-500/20 text-green-400"
                : "bg-destructive/20 text-destructive"
            }`}
          >
            {product.in_stock ? "En Stock" : "Agotado"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
