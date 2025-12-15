import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { 
  Play,
  MapPin,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Globe2,
  Users,
  TrendingUp,
  BookOpen,
  Award
} from "lucide-react";
import logoImage from "../assets/b0068d10880ef77f72866c01e1cd0f92ea3daf5f.png";
import brochuresImage from "../assets/27abe46a891a45273c85d60351ee838cad4a483d.png";
import heroImage from "../assets/8690bdbde4b2c291c1c6c69b9bb3e7729fab7030.png";
import { AITravelAssistant } from "../components/AITravelAssistant";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [magazineIndex, setMagazineIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  // Destinations data
  const destinations = [
    {
      title: "Machu Picchu",
      location: "Perú",
      priceFrom: "Desde $21,999 MXN",
      image: "https://images.unsplash.com/photo-1445796068163-f1115a21bbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNodSUyMHBpY2NodSUyMHN1bnJpc2V8ZW58MXx8fHwxNzYzNjgzNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Bali",
      location: "Indonesia",
      priceFrom: "Desde $32,999 MXN",
      image: "https://images.unsplash.com/photo-1656247203824-3d6f99461ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmljZSUyMHRlcnJhY2VzfGVufDF8fHx8MTc2MzYxODE0MHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Santorini",
      location: "Grecia",
      priceFrom: "Desde $38,999 MXN",
      image: "https://images.unsplash.com/photo-1676730056228-7e38cbb88edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzYzNjgzNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Maldivas",
      location: "Océano Índico",
      priceFrom: "Desde $48,999 MXN",
      image: "https://images.unsplash.com/photo-1637576308588-6647bf80944d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlciUyMGJ1bmdhbG93fGVufDF8fHx8MTc2MzYyMDM5MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Patagonia",
      location: "Argentina",
      priceFrom: "Desde $27,999 MXN",
      image: "https://images.unsplash.com/photo-1649710972692-34778ba6164f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBtb3VudGFpbnN8ZW58MXx8fHwxNzYzNjgzNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Japón",
      location: "Asia",
      priceFrom: "Desde $42,999 MXN",
      image: "https://images.unsplash.com/photo-1617599137346-98e7c279ebe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MXx8fHwxNzYzNTY5NTg1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Islandia",
      location: "Europa",
      priceFrom: "Desde $39,999 MXN",
      image: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VsYW5kJTIwbm9ydGhlcm4lMjBsaWdodHN8ZW58MXx8fHwxNzYzNjQxNTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Safari",
      location: "África",
      priceFrom: "Desde $56,999 MXN",
      image: "https://images.unsplash.com/photo-1535759802691-bf5a6cfe6ce9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2FmYXJpJTIwZWxlcGhhbnR8ZW58MXx8fHwxNjM2ODM3NzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Nueva Zelanda",
      location: "Oceanía",
      priceFrom: "Desde $52,999 MXN",
      image: "https://images.unsplash.com/photo-1591806319810-2eff9c6ee3de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB6ZWFsYW5kJTIwbmF0dXJlJTIwZmpvcmRzJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2MzY4NzU5OXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  // Magazines/Guides
  const magazines = [
    {
      title: "Guía Completa: Europa 2024",
      subtitle: "Las mejores rutas y destinos imperdibles",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MzY1MjM5OHww&ixlib=rb-4.1.0&q=80&w=1080",
      pages: 48
    },
    {
      title: "Caribe Premium",
      subtitle: "Resorts todo incluido y experiencias exclusivas",
      image: "https://images.unsplash.com/photo-1662306027628-232e396f2aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJpYmJlYW4lMjBiZWFjaCUyMHR1cnF1b2lzZXxlbnwxfHx8fDE3NjM2ODM3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      pages: 36
    },
    {
      title: "Maravillas de Asia",
      subtitle: "Templos, cultura y playas paradisíacas",
      image: "https://images.unsplash.com/photo-1617599137346-98e7c279ebe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MXx8fHwxNzYzNTY5NTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      pages: 52
    },
    {
      title: "Dubai & Emiratos",
      subtitle: "Lujo, modernidad y tradición",
      image: "https://images.unsplash.com/photo-1657106251952-2d584ebdf886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBuaWdodHxlbnwxfHx8fDE3NjM2MzgwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      pages: 40
    }
  ];

  // Training Videos
  const trainingVideos = [
    {
      title: "Destino: Perú - Machu Picchu y Cusco",
      duration: "18:45",
      views: "3.5k vistas",
      thumbnail: "https://images.unsplash.com/photo-1568517868534-1637be8943be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNodSUyMHBpY2NodSUyMHBlcnUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzYzNjg3NDk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Destino: Safari en África - Kenia y Tanzania",
      duration: "22:15",
      views: "4.2k vistas",
      thumbnail: "https://images.unsplash.com/photo-1617198920209-220e1e8a652e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBlbGVwaGFudHN8ZW58MXx8fHwxNzYzNjg3NDk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Destino: Japón - Tokio, Kioto y Monte Fuji",
      duration: "20:30",
      views: "3.8k vistas",
      thumbnail: "https://images.unsplash.com/photo-1730800328482-38d2d44e0428?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMG1vdW50JTIwZnVqaSUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MXx8fHwxNzYzNjg3NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const nextMagazine = () => {
    setMagazineIndex((prev) => (prev + 1) % magazines.length);
  };

  const prevMagazine = () => {
    setMagazineIndex((prev) => (prev - 1 + magazines.length) % magazines.length);
  };

  const nextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % trainingVideos.length);
  };

  const prevVideo = () => {
    setVideoIndex((prev) => (prev - 1 + trainingVideos.length) % trainingVideos.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation - Transparente sobre hero */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <img src={logoImage} alt="TravelShop" className="h-12" />

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#destinos" className="text-neutral-700 hover:text-primary-600 transition-colors">
                Destinos
              </a>
              <a href="#plataforma" className="text-neutral-700 hover:text-primary-600 transition-colors">
                Plataforma
              </a>
              <a href="#recursos" className="text-neutral-700 hover:text-primary-600 transition-colors">
                Recursos
              </a>
              <a href="#capacitacion" className="text-neutral-700 hover:text-primary-600 transition-colors">
                Capacitación
              </a>
              <a href="#oficinas" className="text-neutral-700 hover:text-primary-600 transition-colors">
                Oficinas
              </a>
            </nav>

            {/* CTA Button */}
            <Button 
              onClick={() => onNavigate("login")}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6"
            >
              Acceso Agencias
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Full screen con imagen espectacular */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image with Parallax effect */}
        <div className="absolute inset-0">
          <img 
            src={heroImage}
            alt="Travel destination"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-white mb-6 text-4xl md:text-5xl">
            Inspirando agentes de viajes<br />
            desde 1999
          </h1>
          <h4 className="text-neutral-100 max-w-3xl mx-auto mb-12">
            Conectamos agencias con experiencias extraordinarias. Descubre destinos únicos, 
            plataforma digital avanzada y soporte dedicado.
          </h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate("login")}
              className="bg-white text-neutral-900 hover:bg-neutral-100 text-lg px-10 py-7"
            >
              Explorar Portal
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7"
            >
              Conocer más
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Gallery Grid - Estilo Airbnb */}
      <section id="destinos" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4">
              Destinos que inspiran
            </h2>
            <p className="text-xl text-neutral-600">
              Conecta a tus clientes con las experiencias más extraordinarias del mundo
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Large featured */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl cursor-pointer h-[500px]">
              <img 
                src={destinations[0].image}
                alt={destinations[0].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-sm mb-2 opacity-90">{destinations[0].location}</p>
                <h3 className="text-3xl mb-2">{destinations[0].title}</h3>
                <p className="text-sm mb-2 opacity-90">{destinations[0].priceFrom}</p>
              </div>
            </div>

            {/* Smaller items */}
            {destinations.slice(1, 5).map((dest, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-3xl cursor-pointer h-[240px]"
              >
                <img 
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs mb-1 opacity-90">{dest.location}</p>
                  <h3 className="text-xl">{dest.title}</h3>
                  <p className="text-sm mb-1 opacity-90">{dest.priceFrom}</p>
                </div>
              </div>
            ))}

            {/* More items */}
            {destinations.slice(5).map((dest, idx) => (
              <div 
                key={idx} 
                className="md:col-span-2 group relative overflow-hidden rounded-3xl cursor-pointer h-[280px]"
              >
                <img 
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm mb-1 opacity-90">{dest.location}</p>
                  <h3 className="text-2xl">{dest.title}</h3>
                  <p className="text-sm mb-1 opacity-90">{dest.priceFrom}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform USPs - Con screenshots */}
      <section id="plataforma" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4">
              Tu portal completo de gestión
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Todo lo que necesitas en una plataforma moderna, intuitiva y potente
            </p>
          </div>

          {/* Feature 1 - Image left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcGxhdGZvcm0lMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYzNjgzMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl text-neutral-900">Confirmación</div>
                    <div className="text-neutral-600">Instantánea</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Acceso en tiempo real</span>
              </div>
              <h3 className="text-3xl md:text-4xl text-neutral-900 mb-6">
                Reservaciones al instante
              </h3>
              <p className="text-lg text-neutral-600 mb-6">
                Sistema de gestión de reservaciones en tiempo real. Consulta disponibilidad, 
                precios actualizados y confirma reservas instantáneamente.
              </p>
              <ul className="space-y-4">
                {[
                  "Inventario actualizado en tiempo real",
                  "Confirmación automática de reservas",
                  "Gestión completa del ciclo de vida",
                  "Documentación generada automáticamente"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 - Image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full mb-6">
                <Globe2 className="w-4 h-4" />
                <span>Catálogo completo</span>
              </div>
              <h3 className="text-3xl md:text-4xl text-neutral-900 mb-6">
                Más de 500 tours en 150 destinos
              </h3>
              <p className="text-lg text-neutral-600 mb-6">
                Accede a nuestro catálogo completo de productos: tours, traslados, actividades 
                y experiencias únicas. Todo con descripciones detalladas, imágenes y precios transparentes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Globe2, value: "150+", label: "Destinos" },
                  { icon: Users, value: "500+", label: "Tours" },
                  { icon: TrendingUp, value: "18%", label: "Comisión" },
                  { icon: Award, value: "25 años", label: "Experiencia" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                    <stat.icon className="w-6 h-6 text-primary-600 mb-2" />
                    <div className="text-2xl text-neutral-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1728237361511-7566d9a74a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGRlc3RpbmF0aW9uJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NjM2ODMxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Tours catalog"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magazines Carousel */}
      <section id="recursos" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4">
              Recursos y materiales de venta
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Guías, catálogos y revistas digitales diseñados para compartir con tus clientes
            </p>
          </div>

          {/* Brochures Display - Direct Image */}
          <div className="mb-12">
            <img 
              src={brochuresImage}
              alt="TravelShop Brochures"
              className="w-full h-auto rounded-3xl"
            />
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => onNavigate("login")}
              className="bg-primary-600 hover:bg-primary-700"
            >
              Acceder a todos los recursos
            </Button>
          </div>
        </div>
      </section>

      {/* Training Videos Carousel */}
      <section id="capacitacion" className="py-24 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4">
              Capacitación continua
            </h2>
            <p className="text-xl text-neutral-600">
              Webinars, tutoriales y certificaciones para tu equipo
            </p>
          </div>

          {/* Videos Grid - Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainingVideos.map((video, idx) => (
              <Card key={idx} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-shadow group cursor-pointer">
                <div className="relative aspect-video bg-neutral-200 overflow-hidden">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-neutral-900/30 group-hover:bg-neutral-900/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-neutral-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm text-white">{video.duration}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full mb-4">
                    <BookOpen className="w-3 h-3" />
                    <span className="text-sm">Destino</span>
                  </div>
                  <h3 className="text-2xl text-neutral-900 mb-3">{video.title}</h3>
                  <p className="text-neutral-600 mb-4">{video.views}</p>
                  <Button className="w-full bg-primary-600 hover:bg-primary-700">
                    <Play className="w-4 h-4 mr-2" />
                    Ver ahora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section id="oficinas" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-neutral-900 mb-4">
              Nuestras oficinas
            </h2>
            <p className="text-xl text-neutral-600">
              Soporte cercano cuando lo necesites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CDMX */}
            <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-shadow">
              <div className="aspect-video bg-neutral-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1731638769298-38589b60be52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBtZXhpY28lMjBjaXR5fGVufDF8fHx8MTc2MzY4MzE5NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="CDMX Office"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl text-neutral-900 mb-6">Ciudad de México</h3>
                
                <div className="space-y-4 text-neutral-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <p>Avenida Tamaulipas 150, Primer Piso, Hipódromo, CP 06100, CDMX</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <p>6276 2243</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <p>general@travelshop.com.mx</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver en mapa
                </Button>
              </CardContent>
            </Card>

            {/* Guadalajara */}
            <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-shadow">
              <div className="aspect-video bg-neutral-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1666026932244-b0fdcccf6d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5jdW4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjM2ODMxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Guadalajara Office"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl text-neutral-900 mb-6">Guadalajara</h3>
                
                <div className="space-y-4 text-neutral-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <p>Av. López Mateos No. 1480 4to Piso Oficina 401, Col. Chapalita C.P. 44500</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <p>(33) 1814 7772</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-600" />
                    <p>r.delacruz@travelshop.com.mx</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver en mapa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Final visual */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1589966781848-056f1d039519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWxlciUyMGJhY2twYWNrJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2MzY4Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Join TravelShop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-secondary-900/95"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl mb-6">
            Únete a la familia TravelShop
          </h2>
          <p className="text-xl mb-12 text-neutral-100">
            Comienza hoy a ofrecer experiencias inolvidables a tus clientes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => onNavigate("login")}
              className="bg-white text-neutral-900 hover:bg-neutral-100 text-lg px-10 py-7"
            >
              Acceder al portal
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-10 py-7"
            >
              Contactar ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src={logoImage} alt="TravelShop" className="h-10 mb-6 brightness-0 invert" />
              <p className="text-sm text-neutral-400">
                Inspirando agentes de viajes desde 1999
              </p>
            </div>

            <div>
              <h4 className="text-white mb-4">Compañía</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Nuestro equipo</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Certificaciones</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Trabaja con nosotros</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Para Agencias</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Cómo afiliarse</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Comisiones</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Capacitación</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">FAM Trips</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-500">
            <p>© 2025 TravelShop. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      <AITravelAssistant />
    </div>
  );
}