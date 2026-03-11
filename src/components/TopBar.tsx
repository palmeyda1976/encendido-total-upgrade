import { Mail, MapPin, Phone } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-topbar border-b border-border">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-2 text-xs text-muted-foreground gap-1">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a href="mailto:ventas@encendidototal.cl" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Mail className="w-3 h-3" />
            ventas@encendidototal.cl
          </a>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Santiago &amp; Rancagua, Chile
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+56965942944" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Phone className="w-3 h-3" />
            +56 9 6594 2944
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <span className="hidden sm:inline">Desde 1985</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
