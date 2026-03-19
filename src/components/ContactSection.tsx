import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contacts = [
  { icon: MessageCircle, label: "WhatsApp Santiago", value: "+56 9 6594 2944", href: "https://wa.me/56965942944" },
  { icon: MessageCircle, label: "WhatsApp Rancagua", value: "+56 9 7706 7587", href: "https://wa.me/56977067587" },
  { icon: Phone, label: "Servicio Técnico", value: "+56 9 5763 9905", href: "https://wa.me/56957639905" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Error", description: "Por favor completa los campos obligatorios.", variant: "destructive" });
      return;
    }
    setSending(true);
    // Simulate send
    setTimeout(() => {
      toast({ title: "Mensaje enviado", description: "Nos pondremos en contacto contigo pronto." });
      setForm({ name: "", email: "", phone: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <section id="contacto" className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            <span className="text-primary">Contáctanos</span>
          </h2>
          <p className="text-muted-foreground mt-2">Estamos para ayudarte</p>
        </div>

        {/* Contact cards */}
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
            <p className="text-sm text-muted-foreground mt-1">Lun-Vie: 8:30 - 17:00</p>
          </motion.div>
        </div>

        {/* Form + Info */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Envíanos un Mensaje
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Nombre *</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre"
                  maxLength={100}
                  className="bg-background border-border"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="tu@email.com"
                    maxLength={255}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Teléfono</label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+56 9 ..."
                    maxLength={20}
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Mensaje *</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="¿En qué podemos ayudarte?"
                  rows={4}
                  maxLength={1000}
                  className="bg-background border-border resize-none"
                />
              </div>
              <Button type="submit" disabled={sending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="w-4 h-4 mr-2" />
                {sending ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </motion.div>

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">Información de la Empresa</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href="mailto:ventas@encendidototal.cl" className="hover:text-primary transition-colors">ventas@encendidototal.cl</a>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  Lunes a Viernes: 8:30 - 17:00 hrs
                </p>
              </div>
            </div>

            {/* Santiago */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Casa Matriz Santiago</p>
                  <p className="text-sm text-muted-foreground">Matucana 20, Estación Central, Región Metropolitana</p>
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0!2d-70.6722!3d-33.4522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4f1e2a7b1a1%3A0x1!2sMatucana%2020%2C%20Estaci%C3%B3n%20Central%2C%20Santiago!5e0!3m2!1ses!2scl!4v1"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Santiago"
                className="w-full"
              />
            </div>

            {/* Rancagua */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading font-semibold text-foreground">Sucursal Rancagua</p>
                  <p className="text-sm text-muted-foreground">Lastarria 512, Región de O'Higgins</p>
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.0!2d-70.7396!3d-34.1701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665ca0a1b2c3d4e%3A0x1!2sLastarria%20512%2C%20Rancagua!5e0!3m2!1ses!2scl!4v1"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Rancagua"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
