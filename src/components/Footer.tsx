import { Facebook, Instagram, MessageCircle } from "lucide-react";


const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z" />
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/encendidototal", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/encendidototal", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/56912345678", label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer className="bg-footer border-t border-border py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-heading text-xl font-bold">
              <span className="text-primary">Encendido</span> Total
            </span>
            <p className="text-sm text-muted-foreground mt-3">
              Repuestos electromecánicos y accesorios para vehículos. Desde 1985 al servicio de Chile.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="https://tiktok.com/@encendidototal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Categorías</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Alternadores</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Arranques</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Productos Eléctricos</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Equipamiento Minero</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3">Información</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Clientes Mayoristas</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Devoluciones</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Políticas de Despachos</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Seguimiento de Pedidos</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Encendido Total. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
