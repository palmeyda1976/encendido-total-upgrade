import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import catAlternadores from "@/assets/cat-alternadores.jpg";
import catArranques from "@/assets/cat-arranques.jpg";
import catElectricos from "@/assets/cat-electricos.jpg";
import catMinero from "@/assets/cat-minero.jpg";

const categories = [
  { name: "Alternadores", slug: "alternadores", image: catAlternadores, desc: "Alternadores nuevos y remanufacturados" },
  { name: "Arranques", slug: "arranques", image: catArranques, desc: "Motores de partida para todo vehículo" },
  { name: "Eléctricos y Otros", slug: "electricos-y-otros", image: catElectricos, desc: "Componentes eléctricos y accesorios" },
  { name: "Equipamiento Minero", slug: "equipamiento-minero", image: catMinero, desc: "Repuestos para maquinaria pesada" },
];

const Categories = () => {
  return (
    <section id="categorias" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Nuestras <span className="text-primary">Categorías</span>
          </h2>
          <p className="text-muted-foreground mt-2">Encuentra lo que necesitas para tu vehículo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="category-card h-72"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                <h3 className="font-heading text-xl font-bold text-foreground">{cat.name}</h3>
                <p className="text-sm text-foreground/70 mt-1">{cat.desc}</p>
                <span className="inline-block mt-3 text-xs font-semibold text-primary uppercase tracking-wider group-hover:underline">
                  Ver Productos →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
