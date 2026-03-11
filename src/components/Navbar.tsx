import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Alternadores", href: "/categoria/alternadores" },
  { label: "Arranques", href: "/categoria/arranques" },
  { label: "Eléctricos y Otros", href: "/categoria/electricos-y-otros" },
  { label: "Equipamiento Minero", href: "/categoria/equipamiento-minero" },
  { label: "Contacto", href: "/#contacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-nav sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold tracking-wide">
            <span className="text-primary">Encendido</span>
            <span className="text-foreground"> Total</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors uppercase tracking-wide font-nav"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-foreground/70 hover:text-primary transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-foreground/70 hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button className="relative p-2 text-foreground/70 hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground/70 hover:text-primary transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-border bg-secondary/50 py-3">
          <div className="container mx-auto">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full bg-background border border-border rounded-sm px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-nav">
          <div className="container mx-auto py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors uppercase tracking-wide py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
