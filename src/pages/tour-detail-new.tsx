import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Download, Calendar, MapPin, Clock, Users, Check, X, Image as ImageIcon } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { TourRouteMapStatic } from "../components/TourRouteMap";

interface TourDetailPageProps {
  tourId?: string;
  onNavigate: (page: string, tourId?: string) => void;
}

const departures = [
  { date: "15 Dic 2024", available: 8, price: "$18,500 MXN" },
  { date: "22 Dic 2024", available: 3, price: "$19,800 MXN" },
  { date: "29 Dic 2024", available: 5, price: "$21,500 MXN" },
  { date: "05 Ene 2025", available: 12, price: "$18,500 MXN" },
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
  { 
    day: 1, 
    title: "Llegada a Cancún - Bienvenida al Caribe", 
    destination: "Cancún, Quintana Roo",
    description: "Recepción en el aeropuerto internacional de Cancún con nuestro personal. Traslado privado al hotel todo incluido. Check-in y orientación sobre las instalaciones del resort. Tarde libre para explorar la propiedad, disfrutar de la playa privada o relajarse en las albercas. Cena de bienvenida en el restaurante principal.",
    image: "https://images.unsplash.com/photo-1560242374-f222add02c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5jdW4lMjBhaXJwb3J0JTIwYXJyaXZhbHxlbnwxfHx8fDE3NjM2ODI2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Recepción en aeropuerto", "Traslado al hotel", "Check-in", "Tour de instalaciones", "Cena de bienvenida"]
  },
  { 
    day: 2, 
    title: "Día libre en el Resort - Playa y Relax", 
    destination: "Hotel All Inclusive, Zona Hotelera",
    description: "Despierta con un delicioso desayuno buffet. Día completo para disfrutar de todas las amenidades del hotel: 4 albercas temáticas, playa privada con aguas cristalinas, restaurantes a la carta, snack bars, y actividades recreativas. Clases de baile caribeño por la tarde. Show nocturno en vivo con música tropical.",
    image: "https://images.unsplash.com/photo-1715242563833-946f4b811399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwcG9vbHxlbnwxfHx8fDE3NjM2ODI2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Desayuno buffet", "Playa privada", "Albercas temáticas", "Clases de baile", "Show nocturno"]
  },
  { 
    day: 3, 
    title: "Excursión a Chichén Itzá (Opcional)", 
    destination: "Chichén Itzá - Maravilla del Mundo",
    description: "Tour opcional a la zona arqueológica de Chichén Itzá, una de las 7 maravillas del mundo moderno. Visita guiada de 2 horas por las ruinas mayas más importantes: Templo de Kukulkán, Cenote Sagrado, Juego de Pelota. Incluye parada en cenote para nadar y almuerzo típico yucateco. Regreso al hotel por la tarde.",
    image: "https://images.unsplash.com/photo-1652429337332-1ef0833b7fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGljaGVuJTIwaXR6YSUyMHB5cmFtaWQlMjBtZXhpY298ZW58MXx8fHwxNzYzNjgyNjMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Salida 7:00 AM", "Zona arqueológica", "Visita al cenote", "Almuerzo típico", "Regreso al hotel"]
  },
  { 
    day: 4, 
    title: "Deportes Acuáticos y Aventura", 
    destination: "Playa del Hotel y Marina",
    description: "Día dedicado a deportes y actividades acuáticas incluidas en tu paquete. Kayak en el mar Caribe, snorkel en arrecife cercano para ver vida marina, paddleboard, voleibol playero. Clase de coctelería mexicana por la tarde. Cena especial en restaurante italiano a la carta. Fiesta temática mexicana por la noche.",
    image: "https://images.unsplash.com/photo-1583237559242-1c4e4764ad1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm9ya2VsaW5nJTIwY2FyaWJiZWFuJTIwc2VhfGVufDF8fHx8MTc2MzY4MjYzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Kayak", "Snorkel", "Paddleboard", "Voleibol playero", "Fiesta temática"]
  },
  { 
    day: 5, 
    title: "Compras y Última Playa", 
    destination: "Zona Hotelera & 5ta Avenida",
    description: "Mañana libre para últimas horas de playa y alberca. Tour de compras opcional a la 5ta Avenida de Playa del Carmen (transporte incluido) con 4 horas libres para adquirir artesanías, souvenirs, tequila y productos locales. Regreso al hotel para cena de despedida con menú especial y música en vivo.",
    image: "https://images.unsplash.com/photo-1620095200055-9d1c4f36ba43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5YSUyMGRlbCUyMGNhcm1lbiUyMHNob3BwaW5nJTIwc3RyZWV0fGVufDF8fHx8MTc2MzY4MjYzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Mañana de playa", "Shopping en Playa del Carmen", "Compras de souvenirs", "Cena de despedida"]
  },
  { 
    day: 6, 
    title: "Regreso a Casa", 
    destination: "Aeropuerto Internacional de Cancún",
    description: "Desayuno final en el hotel. Check-out según horario de vuelo. Traslado privado al aeropuerto internacional de Cancún con tiempo suficiente para documentación. Asistencia de nuestro personal hasta el área de abordaje. Vuelo de regreso a Ciudad de México con hermosos recuerdos del Caribe Mexicano.",
    image: "https://images.unsplash.com/photo-1761530611304-234924ae5e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGRlcGFydHVyZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjM2ODI2MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    activities: ["Desayuno", "Check-out", "Traslado al aeropuerto", "Vuelo de regreso"]
  }
];

export function TourDetailPageNew({ tourId, onNavigate }: TourDetailPageProps) {
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
          src="https://images.unsplash.com/photo-1660315247626-12267f8d68db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwZGVzdGluYXRpb258ZW58MXx8fHwxNzYzNTgwNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cancún Todo Incluido"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-8 text-white w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">Playa</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">Todo Incluido</span>
            </div>
            <h1 className="text-4xl mb-2">Cancún Todo Incluido Premium</h1>
            <p className="text-xl text-white/90">Disfruta del paraíso caribeño con todo incluido</p>
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
                    <p className="text-neutral-900">6 días / 5 noches</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Destino</p>
                    <p className="text-neutral-900">Cancún</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Salidas</p>
                    <p className="text-neutral-900">Semanales</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Grupo</p>
                    <p className="text-neutral-900">2-40 pax</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl text-neutral-900 mb-3">Descripción del Tour</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Descubre el paraíso del Caribe Mexicano con nuestro paquete todo incluido en Cancún. 
                  Disfruta de playas de arena blanca, aguas turquesa cristalinas, y la mejor hospitalidad 
                  mexicana en un resort 5 estrellas. Este tour incluye todas las comidas, bebidas nacionales 
                  e internacionales ilimitadas, actividades acuáticas, entretenimiento nocturno y mucho más. 
                  Perfecto para familias, parejas o grupos de amigos que buscan relajación y diversión sin 
                  preocupaciones. Nuestro equipo estará disponible 24/7 para asegurar que tu experiencia sea 
                  inolvidable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Itinerary */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-2xl text-neutral-900">Itinerario Detallado</h2>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-200" />
                
                <div className="space-y-8">
                  {itinerary.map((day, index) => (
                    <div key={day.day} className="relative flex gap-6">
                      {/* Timeline Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                          <span>{day.day}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                          {/* Image */}
                          <div className="h-48 bg-neutral-200 relative overflow-hidden">
                            <img 
                              src={day.image} 
                              alt={day.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full shadow">
                              <span className="text-neutral-900">Día {day.day}</span>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-5 space-y-3">
                            <div>
                              <h3 className="text-xl text-neutral-900 mb-1">{day.title}</h3>
                              <div className="flex items-center gap-2 text-neutral-500">
                                <MapPin className="w-4 h-4" />
                                <span>{day.destination}</span>
                              </div>
                            </div>
                            
                            <p className="text-neutral-600 leading-relaxed">
                              {day.description}
                            </p>

                            {/* Activities Pills */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              {day.activities.map((activity, i) => (
                                <span 
                                  key={i} 
                                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                                >
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inclusions/Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl text-neutral-900">¿Qué incluye?</h3>
                <ul className="space-y-3">
                  {inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl text-neutral-900">No incluye</h3>
                <ul className="space-y-3">
                  {exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-red-600" />
                      </div>
                      <span className="text-neutral-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Route Map */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl text-neutral-900">Mapa de Ruta</h2>
              <p className="text-neutral-600">
                Recorrido completo del circuito por el Caribe Mexicano
              </p>
              
              {/* Interactive Route Map */}
              <TourRouteMapStatic 
                stops={[
                  { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
                  { name: "Cancún", lat: 21.1619, lng: -86.8515, type: "stop" },
                  { name: "Chichén Itzá", lat: 20.6843, lng: -88.5678, type: "stop" },
                  { name: "Playa del Carmen", lat: 20.6296, lng: -87.0739, type: "stop" },
                  { name: "Cancún", lat: 21.1619, lng: -86.8515, type: "stop" },
                  { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
                ]}
                tourName="Cancún Todo Incluido Premium"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Price Card */}
          <Card className="sticky top-6">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-neutral-500 mb-1">Precio desde</p>
                <h3 className="text-4xl text-primary-600">$18,500</h3>
                <p className="text-neutral-500">MXN por persona</p>
              </div>
              
              <Separator />

              <div>
                <h4 className="text-neutral-900 mb-3">Próximas salidas</h4>
                <div className="space-y-2">
                  {departures.map((dep, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                      <div>
                        <p className="text-neutral-900">{dep.date}</p>
                        <p className="text-emerald-600">{dep.available} espacios</p>
                      </div>
                      <p className="text-neutral-900">{dep.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-primary-500 hover:bg-primary-600"
                onClick={() => onNavigate("booking-form", tourId)}
              >
                Reservar ahora
              </Button>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </CardContent>
          </Card>

          {/* Need Help Card */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <h4 className="text-neutral-900">¿Necesitas ayuda?</h4>
              <p className="text-neutral-600">
                Nuestros asesores están listos para ayudarte con cualquier duda.
              </p>
              <Button variant="outline" className="w-full">
                Contactar asesor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}