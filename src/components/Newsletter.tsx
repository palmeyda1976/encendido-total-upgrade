import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email("Ingresa un email válido").max(255);

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    // Simulate subscription
    await new Promise((r) => setTimeout(r, 800));
    toast.success("¡Te has suscrito exitosamente!");
    setEmail("");
    setLoading(false);
  };

  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Suscríbete a nuestro Newsletter
          </h2>
          <p className="text-muted-foreground mt-3 font-body">
            Recibe ofertas exclusivas, novedades y promociones directamente en tu correo.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="flex-1 bg-background border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-body"
              required
              maxLength={255}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-hero flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {loading ? "Enviando..." : "Suscribirse"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            No compartimos tu información. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
