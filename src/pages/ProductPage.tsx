import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Package, MessageCircle } from "lucide-react";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: category } = useQuery({
    queryKey: ["category-by-id", product?.category_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", product!.category_id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!product?.category_id,
  });

  const { data: images } = useQuery({
    queryKey: ["product-images", product?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", product!.id)
        .order("display_order");
      if (error) throw error;
      return data;
    },
    enabled: !!product?.id,
  });

  const formatPrice = (price: number | null) => {
    if (!price) return "Consultar";
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const allImages = images && images.length > 0
    ? images.map((img) => img.image_url)
    : product?.image_url
      ? [product.image_url]
      : [];

  const whatsappMessage = product
    ? `Hola, me interesa el producto: ${product.name} (SKU: ${product.sku || "N/A"})`
    : "";
  const whatsappUrl = `https://wa.me/56912345678?text=${encodeURIComponent(whatsappMessage)}`;

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
            {category && (
              <>
                <Link to={`/categoria/${category.slug}`} className="hover:text-primary transition-colors">
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
            <span className="text-foreground">{product?.name ?? "Cargando..."}</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="container mx-auto py-12">
          <div className="grid md:grid-cols-2 gap-10 animate-pulse">
            <div className="aspect-square bg-secondary/50 rounded-lg" />
            <div className="space-y-4">
              <div className="h-4 bg-secondary/50 rounded w-1/4" />
              <div className="h-8 bg-secondary/50 rounded w-3/4" />
              <div className="h-6 bg-secondary/50 rounded w-1/3" />
              <div className="h-20 bg-secondary/50 rounded w-full" />
            </div>
          </div>
        </div>
      ) : product ? (
        <section className="py-10">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square bg-secondary/30 rounded-lg overflow-hidden border border-border">
                  {allImages.length > 0 ? (
                    <img
                      src={allImages[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Package className="w-20 h-20 opacity-30" />
                    </div>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div className="flex gap-3">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                          selectedImage === i ? "border-primary" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {product.brand && (
                  <span className="text-sm text-primary font-semibold uppercase tracking-wider">
                    {product.brand}
                  </span>
                )}
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  {product.name}
                </h1>

                {product.sku && (
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                )}

                <div className="flex items-center gap-4">
                  <span className="font-heading text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded ${
                      product.in_stock
                        ? "bg-green-500/20 text-green-400"
                        : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {product.in_stock ? "En Stock" : "Agotado"}
                  </span>
                </div>

                {product.description && (
                  <div className="border-t border-border pt-6">
                    <h2 className="font-heading text-lg font-semibold text-foreground mb-3">
                      Descripción
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="border-t border-border pt-6 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero w-full flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="container mx-auto py-20 text-center">
          <p className="text-muted-foreground text-lg">Producto no encontrado.</p>
          <Link to="/" className="inline-block mt-6 btn-hero">Volver al Inicio</Link>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
