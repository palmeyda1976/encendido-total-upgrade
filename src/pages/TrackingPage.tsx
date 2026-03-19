import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Package, CheckCircle2, Truck, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; icon: typeof Package; color: string }> = {
  recibido: { label: "Pedido Recibido", icon: Package, color: "text-blue-500" },
  en_proceso: { label: "En Proceso", icon: Clock, color: "text-amber-500" },
  enviado: { label: "Enviado", icon: Truck, color: "text-purple-500" },
  entregado: { label: "Entregado", icon: CheckCircle2, color: "text-green-500" },
  cancelado: { label: "Cancelado", icon: AlertCircle, color: "text-red-500" },
};

const TrackingPage = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ["order-tracking", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", searchTerm)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!searchTerm,
  });

  const { data: history } = useQuery({
    queryKey: ["order-history", order?.id],
    queryFn: async () => {
      if (!order?.id) return [];
      const { data, error } = await supabase
        .from("order_status_history")
        .select("*")
        .eq("order_id", order.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!order?.id,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = orderNumber.trim();
    if (!trimmed) {
      toast.error("Ingresa un número de pedido");
      return;
    }
    setSearchTerm(trimmed);
  };

  const currentStatus = order?.status ?? "";
  const config = statusConfig[currentStatus] || statusConfig.recibido;
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto text-center">
            <Package className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Seguimiento de Pedido
            </h1>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Ingresa tu número de pedido para conocer el estado de tu compra
            </p>

            <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto flex gap-2">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Ej: ET-20250319-001"
                className="flex-1 bg-background border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </form>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="container mx-auto max-w-2xl">
            {isLoading && (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-muted-foreground mt-4">Buscando pedido...</p>
              </div>
            )}

            {searchTerm && !isLoading && !order && (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Pedido no encontrado
                </h3>
                <p className="text-muted-foreground mt-2">
                  No encontramos un pedido con el número <strong>{searchTerm}</strong>. 
                  Verifica el número e intenta nuevamente.
                </p>
              </div>
            )}

            {order && (
              <div className="space-y-6">
                {/* Order summary */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Pedido</p>
                      <p className="font-heading text-xl font-bold text-foreground">
                        {order.order_number}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 ${config.color}`}>
                      <StatusIcon className="w-5 h-5" />
                      <span className="font-medium text-sm">{config.label}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cliente</p>
                      <p className="text-foreground font-medium">{order.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fecha</p>
                      <p className="text-foreground font-medium">
                        {new Date(order.created_at).toLocaleDateString("es-CL")}
                      </p>
                    </div>
                    {order.notes && (
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Notas</p>
                        <p className="text-foreground">{order.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                {history && history.length > 0 && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-6">
                      Historial del pedido
                    </h3>
                    <div className="space-y-0">
                      {history.map((entry, index) => {
                        const entryConfig = statusConfig[entry.status] || statusConfig.recibido;
                        const EntryIcon = entryConfig.icon;
                        const isLast = index === history.length - 1;

                        return (
                          <div key={entry.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isLast ? 'bg-primary/10' : 'bg-secondary'}`}>
                                <EntryIcon className={`w-4 h-4 ${entryConfig.color}`} />
                              </div>
                              {index < history.length - 1 && (
                                <div className="w-px h-8 bg-border" />
                              )}
                            </div>
                            <div className="pb-6">
                              <p className="font-medium text-foreground text-sm">
                                {entryConfig.label}
                              </p>
                              {entry.description && (
                                <p className="text-muted-foreground text-xs mt-0.5">
                                  {entry.description}
                                </p>
                              )}
                              <p className="text-muted-foreground text-xs mt-1">
                                {new Date(entry.created_at).toLocaleString("es-CL")}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TrackingPage;
