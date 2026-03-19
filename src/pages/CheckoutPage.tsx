import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(price);

const CheckoutPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast({ title: "Error", description: "Por favor completa los campos obligatorios.", variant: "destructive" });
      return;
    }
    if (items.length === 0) {
      toast({ title: "Error", description: "Tu carro está vacío.", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast({ title: "¡Pedido enviado!", description: "Nos pondremos en contacto contigo para confirmar tu pedido." });
      clearCart();
      setSending(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <section className="py-10">
        <div className="container mx-auto max-w-5xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
            Finalizar <span className="text-primary">Compra</span>
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground opacity-30 mb-4" />
              <p className="text-muted-foreground text-lg">Tu carro está vacío.</p>
              <Button variant="outline" className="mt-6 border-border" onClick={() => navigate("/")}>
                Volver al Inicio
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-4">Resumen del Pedido</h2>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                        <div className="w-12 h-12 rounded bg-secondary/30 overflow-hidden flex-shrink-0">
                          {item.product.image_url && (
                            <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} x {item.product.price ? formatPrice(item.product.price) : "Consultar"}
                          </p>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
                    <span className="font-heading text-lg font-semibold text-foreground">Total</span>
                    <span className="font-heading text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Form */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-5">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-2">Datos del Cliente</h2>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Nombre Completo *</label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      maxLength={100}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@email.com"
                        maxLength={255}
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Teléfono *</label>
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+56 9 ..."
                        maxLength={20}
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Dirección de Despacho</label>
                    <Input
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Dirección completa"
                      maxLength={200}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Notas del Pedido</label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Indicaciones especiales, consultas, etc."
                      rows={3}
                      maxLength={500}
                      className="bg-background border-border resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold text-base py-6"
                  >
                    {sending ? "Procesando..." : "Confirmar Pedido"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Nos contactaremos contigo para confirmar disponibilidad y coordinar el pago.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
