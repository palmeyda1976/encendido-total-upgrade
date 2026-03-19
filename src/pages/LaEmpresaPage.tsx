import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LaEmpresaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />

      <section className="py-16">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-10">
            La Empresa
          </h1>

          <div className="rounded-lg overflow-hidden mb-10">
            <img
              src="https://www.encendidototal.cl/sitio-web-pyme/wp-content/uploads/2021/03/encendido-total-fachada-1920x695-tinified-1024x371.jpg"
              alt="Fachada Encendido Total"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6 text-foreground/90 text-base leading-relaxed">
            <p>
              Repuestos Automotrices Ltda. nace en 1985, empresa chilena, con más de 30 años en el mercado dedicada a importar y comercializar un amplio y variado stock en motores de arranque, alternadores y sus componentes, además de toda la gama de repuestos eléctricos; ampolletas, cables, balizas, faroles, baterías, instrumentos, relays, interruptores, flashers, etc.
            </p>
            <p>
              Somos importadores directos de prestigiosas marcas como: REGITAR, FLÖSSER, KLAXCAR, DELCO REMY, BOSCH, SULCARBON, ZM, MONARK, HC-CARGO, WASSHARDT, NACHI, entre otras.
            </p>
            <p className="text-muted-foreground">
              Repuestos Automotrices Ltda. was created in 1985, Chilean company, with more than 30 years in the market dedicated to import and comercialize a wide and varied stock of starters, alternators and its components, beside all the range of electric supplies; light bulbs, wires, flashing beacons, tail light, batteries, instruments, relays, switches, flashers, etc.
            </p>
            <p className="text-muted-foreground">
              We are direct importers of prestigious brands such as: REGITAR, FLÖSSER, KLAXCAR, DELCO REMY, BOSCH, SULCARBON, ZM, MONARK, HC-CARGO, WASSHARDT, NACHI, among others.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LaEmpresaPage;
