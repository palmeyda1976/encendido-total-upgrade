const brands = [
  "AS Polonia", "Cargo", "Delco Remy", "Klaxcar", "Kukdong",
  "Regitar", "SEG Automotive", "VDO", "ZEN", "ZM",
];

const BrandsSection = () => {
  return (
    <section className="py-12 bg-card border-y border-border">
      <div className="container mx-auto">
        <h2 className="font-heading text-2xl font-bold text-center mb-8">
          Marcas que <span className="text-primary">Trabajamos</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {brands.map((brand) => (
            <div
              key={brand}
              className="brand-logo px-6 py-3 border border-border rounded-sm hover:border-primary/50 transition-all"
            >
              <span className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
