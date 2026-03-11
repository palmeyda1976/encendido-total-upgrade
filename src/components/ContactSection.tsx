import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const contacts = [
  { icon: MessageCircle, label: "WhatsApp Santiago", value: "+56 9 6594 2944", href: "https://wa.me/56965942944" },
  { icon: MessageCircle, label: "WhatsApp Rancagua", value: "+56 9 7706 7587", href: "https://wa.me/56977067587" },
  { icon: Phone, label: "Servicio Técnico", value: "+56 9 5763 9905", href: "https://wa.me/56957639905" },
];

const ContactSection = () => {
  return (
    <section id="contacto" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            <span className="text-primary">Contáctanos</span>
          </h2>
          <p className="text-muted-foreground mt-2">Estamos para ayudarte</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-all group"
            >
              <c.icon className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-heading font-semibold text-foreground">{c.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{c.value}</p>
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="font-heading font-semibold text-foreground">Horario</p>
            <p className="text-sm text-muted-foreground mt-1">Lun-Vie: 8:30 - 17:30</p>
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-heading font-semibold text-foreground">Santiago</p>
              <p className="text-sm text-muted-foreground">Matucana 20, Estación Central, Región Metropolitana</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-heading font-semibold text-foreground">Rancagua</p>
              <p className="text-sm text-muted-foreground">Lastarria 512, Región de O'Higgins</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
