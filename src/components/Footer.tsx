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
