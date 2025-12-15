import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Download, Calendar, MapPin, Clock, Users, Check, X } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { toursData } from "../data/tours-data";
import { InteractiveRouteMap } from "../components/InteractiveRouteMap";

interface TourDetailPageProps {
  tourId?: string;
  onNavigate: (page: string, tourId?: string) => void;
}

export function TourDetailPage({ tourId = "1", onNavigate }: TourDetailPageProps) {
  // Get tour data from tours-data.ts
  const tour = toursData[tourId] || toursData["1"];

  const departures = [
    { date: "15 Dic 2024", available: 8, price: `$${tour.price.toLocaleString()} MXN` },
    { date: "22 Dic 2024", available: 3, price: `$${(tour.price * 1.07).toLocaleString()} MXN` },
    { date: "29 Dic 2024", available: 5, price: `$${(tour.price * 1.16).toLocaleString()} MXN` },
    { date: "05 Ene 2025", available: 12, price: `$${tour.price.toLocaleString()} MXN` },
  ];

  const inclusions = [
    "Vuelo redondo desde Ciudad de México",
    "Traslados aeropuerto-hotel-aeropuerto",
    "5 noches de hospedaje en hotel todo incluido",
    "Todas las comidas y bebidas incluidas",
    "Actividades acuáticas no motorizadas",
    "Shows nocturnos y entretenimiento",
    "Seguro de viaje básico",
    "Asistencia 24/7 durante el viaje"
  ];

  const exclusions = [
    "Gastos personales",
    "Propinas para guías y personal del hotel",
    "Tours opcionales fuera del hotel",
    "Seguro de cancelación (opcional)",
    "Documentos de viaje (pasaporte, visas)"
  ];

  const itinerary = [
    { day: 1, title: "Llegada a Cancún", description: "Recepción en el aeropuerto y traslado al hotel. Check-in y bienvenida. Tarde libre para disfrutar las instalaciones." },
    { day: 2, title: "Día libre en el resort", description: "Disfruta de todas las amenidades del hotel: playa, albercas, restaurantes y actividades." },
    { day: 3, title: "Tour opcional a Chichén Itzá", description: "Posibilidad de contratar tour a zonas arqueológicas (no incluido)." },
    { day: 4, title: "Día de playa y deportes acuáticos", description: "Aprovecha las actividades incluidas: kayak, snorkel, paddleboard." },
    { day: 5, title: "Día libre y compras", description: "Última oportunidad para disfrutar el hotel o visitar la zona hotelera." },
    { day: 6, title: "Salida", description: "Check-out y traslado al aeropuerto para vuelo de regreso." }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => onNavigate("tours")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a tours
      </Button>

      {/* Hero Section */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden">
        <img 
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8 text-white w-full">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {tour.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">{tag}</span>
              ))}
            </div>
            <h1 className="text-4xl mb-2">{tour.name}</h1>
            <p className="text-xl text-white/90">{tour.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Info */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Duración</p>
                    <p className="text-neutral-900">{tour.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Destino</p>
                    <p className="text-neutral-900">{tour.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Grupo</p>
                    <p className="text-neutral-900">Mín. 2 pax</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Salida</p>
                    <p className="text-neutral-900">CDMX</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl text-neutral-900">Descripción del tour</h2>
              <div className="prose prose-neutral max-w-none text-neutral-600">
                <p>{tour.description}</p>
              </div>
              
              {/* Highlights */}
              <div className="mt-6">
                <h3 className="text-xl text-neutral-900 mb-4">Aspectos destacados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itinerary */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl text-neutral-900">Itinerario</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center">
                        {item.day}
                      </div>
                    </div>
                    <div className="flex-1 pb-4 border-b border-neutral-200 last:border-0">
                      <h3 className="text-neutral-900 mb-1">{item.title}</h3>
                      <p className="text-neutral-600 mb-3">{item.description}</p>
                      {item.activities && item.activities.length > 0 && (
                        <ul className="space-y-1">
                          {item.activities.map((activity, actIdx) => (
                            <li key={actIdx} className="text-sm text-neutral-500 flex items-start gap-2">
                              <Check className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl text-neutral-900 mb-4">Mapa de ruta</h2>
              <InteractiveRouteMap 
                route={tour.mapRoute}
                tourName={tour.name}
              />
            </CardContent>
          </Card>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl text-neutral-900">Incluye</h3>
                <ul className="space-y-2">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-neutral-600">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl text-neutral-900">No incluye</h3>
                <ul className="space-y-2">
                  {tour.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-neutral-600">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl text-neutral-900">Recomendaciones</h3>
              <ul className="space-y-2">
                {tour.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-neutral-600">
                    <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing & Booking */}
          <Card className="sticky top-6">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-neutral-500 mb-1">Precio por persona desde</p>
                <h2 className="text-3xl text-primary-600">{tour.priceText}</h2>
              </div>

              <Separator />

              <div>
                <h3 className="text-neutral-900 mb-3">Próximas salidas</h3>
                <div className="space-y-2">
                  {departures.map((departure, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
                      <div>
                        <p className="text-neutral-900">{departure.date}</p>
                        <p className="text-neutral-500">{departure.available} plazas</p>
                      </div>
                      <p className="text-primary-600">{departure.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <Button 
                onClick={() => onNavigate("booking-form", tour.id)}
                className="w-full bg-primary-500 hover:bg-primary-600 h-12"
              >
                Solicitar Reservación
              </Button>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Descargar Brochure
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-neutral-900">¿Necesitas ayuda?</h3>
              <p className="text-neutral-600">
                Nuestro equipo está listo para ayudarte con tu reservación
              </p>
              <Button variant="outline" className="w-full">
                Contactar soporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}