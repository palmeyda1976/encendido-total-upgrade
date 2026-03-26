import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

import prodAlternador1 from "@/assets/prod-alternador-1.jpg";
import prodAlternador2 from "@/assets/prod-alternador-2.jpg";
import prodArranque1 from "@/assets/prod-arranque-1.jpg";
import prodArranque2 from "@/assets/prod-arranque-2.jpg";
import prodElectrico1 from "@/assets/prod-electrico-1.jpg";
import prodElectrico2 from "@/assets/prod-electrico-2.jpg";
import prodMinero1 from "@/assets/prod-minero-1.jpg";
import prodMinero2 from "@/assets/prod-minero-2.jpg";

const imageMap: Record<string, string> = {
  "/products/alternador-1.jpg": prodAlternador1,
  "/products/alternador-2.jpg": prodAlternador2,
  "/products/arranque-1.jpg": prodArranque1,
  "/products/arranque-2.jpg": prodArranque2,
  "/products/electrico-1.jpg": prodElectrico1,
  "/products/electrico-2.jpg": prodElectrico2,
  "/products/minero-1.jpg": prodMinero1,
  "/products/minero-2.jpg": prodMinero2,
};

const resolveImage = (url: string | null): string | null => {
  if (!url) return null;
  return imageMap[url] ?? url;
};

interface ProductCardProps {
  product: Tables<"products">;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number | null) => {
    if (!price) return "Consultar";
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({ title: "Agregado al carro", description: product.name });
  };

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <Link to={`/producto/${product.slug}`} className="block aspect-square bg-white overflow-hidden cursor-pointer">
        {resolveImage(product.image_url) ? (
          <img
            src={resolveImage(product.image_url)!}
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
      </Link>
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
        {product.in_stock && (
          <button
            onClick={handleAdd}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-semibold text-sm py-2 rounded-sm hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar al Carro
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
