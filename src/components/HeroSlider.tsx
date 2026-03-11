import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-1.jpg";

const slides = [
  {
    image: heroImg,
    subtitle: "Repuestos electromecánicos desde 1985",
    title: "Todos los repuestos\nque necesitas",
    highlight: "Calidad Garantizada",
    cta: "Ver Productos",
  },
  {
    image: heroImg,
    subtitle: "Nueva Importación ZEN & ZM",
    title: "Alternadores y\nMotores de Partida",
    highlight: "Stock Disponible",
    cta: "Ver Catálogo",
  },
  {
    image: heroImg,
    subtitle: "Marcas Internacionales",
    title: "SEG Automotive\ny AS Polonia",
    highlight: "Envíos a Todo Chile",
    cta: "Comprar Ahora",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative h-[500px] md:h-[650px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-foreground/70 mb-3 font-body">
              {slides[current].subtitle}
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-2 whitespace-pre-line">
              <span className="text-primary">{slides[current].highlight}</span>
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-6 text-foreground whitespace-pre-line">
              {slides[current].title}
            </h2>
            <a href="#categorias" className="btn-hero">
              {slides[current].cta}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/40 hover:bg-primary/80 text-foreground hover:text-primary-foreground rounded-full transition-all">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/40 hover:bg-primary/80 text-foreground hover:text-primary-foreground rounded-full transition-all">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-4 bg-foreground/30"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
