import { Truck, ShieldCheck, RotateCcw, Headphones, Gift } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Despacho a Todo Chile", desc: "Envíos rápidos y seguros" },
  { icon: ShieldCheck, title: "Garantía Premium", desc: "Hasta 2 años" },
  { icon: RotateCcw, title: "Devoluciones Fáciles", desc: "Proceso simple" },
  { icon: Headphones, title: "Soporte WhatsApp", desc: "Atención personalizada" },
  { icon: Gift, title: "Desde 1985", desc: "Experiencia y confianza" },
];

const BenefitsBar = () => {
  return (
    <section className="bg-benefit border-y border-border">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {benefits.map((b) => (
            <div key={b.title} className="benefit-item flex-col sm:flex-row text-center sm:text-left">
              <b.icon className="w-8 h-8 text-primary mx-auto sm:mx-0 flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold text-sm text-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBar;
