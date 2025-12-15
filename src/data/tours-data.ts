export interface TourData {
  id: string;
  name: string;
  subtitle: string;
  destination: string;
  category: string;
  tags: string[];
  image: string;
  gallery: string[];
  duration: string;
  price: number;
  priceText: string;
  cities: string[];
  description: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
  }>;
  mapRoute: Array<{
    name: string;
    lat: number;
    lng: number;
    type: "start" | "stop" | "end";
  }>;
  recommendations: string[];
}

export const toursData: Record<string, TourData> = {
  "1": {
    id: "1",
    name: "Cancún Todo Incluido Premium",
    subtitle: "Disfruta del paraíso caribeño con todo incluido",
    destination: "Caribe",
    category: "Playa",
    tags: ["Playa", "Todo Incluido", "Familiar"],
    image: "https://images.unsplash.com/photo-1653959747793-c7c3775665f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhcmFkaXNlJTIwYmVhY2glMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjg2OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1660315247626-12267f8d68db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwZGVzdGluYXRpb258ZW58MXx8fHwxNzYzNTgwNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5jdW4lMjBiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjM2ODY5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1621616541108-eaf5ecd73c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJpYmJlYW4lMjBwb29sfGVufDF8fHx8MTc2MzY4Njk5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "6 días / 5 noches",
    price: 18500,
    priceText: "desde $18,500 MXN",
    cities: ["Cancún", "Playa del Carmen"],
    description: "Escápate al paraíso del Caribe Mexicano con nuestro paquete todo incluido. Disfruta de playas de arena blanca, aguas cristalinas color turquesa, y la mejor gastronomía en resorts de lujo. Un viaje perfecto para familias, parejas o amigos que buscan relajación y diversión sin preocupaciones.",
    highlights: [
      "Resort 5 estrellas con sistema todo incluido",
      "Acceso a todas las instalaciones y restaurantes",
      "Actividades acuáticas no motorizadas incluidas",
      "Shows nocturnos y entretenimiento en vivo",
      "Excursión opcional a Chichen Itzá o Tulum",
      "Día de playa en Playa del Carmen"
    ],
    included: [
      "Vuelo redondo Ciudad de México - Cancún",
      "Traslados aeropuerto-hotel-aeropuerto",
      "5 noches de hospedaje en resort 5 estrellas",
      "Régimen Todo Incluido (comidas, bebidas, snacks)",
      "Impuestos hoteleros",
      "Seguro de viaje básico",
      "Kit de bienvenida TravelShop"
    ],
    notIncluded: [
      "Excursiones opcionales",
      "Propinas",
      "Actividades acuáticas motorizadas",
      "Spa y tratamientos especiales",
      "Consumos extras fuera del plan",
      "Seguro de viaje premium"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Cancún",
        description: "Bienvenido al paraíso caribeño. Recepción en el aeropuerto y traslado a tu resort.",
        activities: [
          "Recepción en aeropuerto con representante TravelShop",
          "Traslado privado al resort",
          "Check-in y orientación del hotel",
          "Tiempo libre para disfrutar de las instalaciones",
          "Cena de bienvenida en el restaurante principal"
        ]
      },
      {
        day: 2,
        title: "Día de relax en el resort",
        description: "Disfruta de todas las amenidades del resort todo incluido.",
        activities: [
          "Desayuno buffet internacional",
          "Acceso a playa privada y albercas",
          "Actividades acuáticas no motorizadas (kayak, paddleboard)",
          "Clases de cocina mexicana o mixología",
          "Cena temática y show nocturno"
        ]
      },
      {
        day: 3,
        title: "Excursión a Playa del Carmen",
        description: "Descubre la famosa Quinta Avenida y sus playas paradisíacas.",
        activities: [
          "Traslado a Playa del Carmen",
          "Tiempo libre en Quinta Avenida para compras",
          "Almuerzo en restaurante local",
          "Tarde de playa libre",
          "Regreso al resort"
        ]
      },
      {
        day: 4,
        title: "Día libre o excursión opcional",
        description: "Elige tu propia aventura: relájate o explora las maravillas mayas.",
        activities: [
          "Opción 1: Día completo de relax en el resort",
          "Opción 2: Excursión a Chichen Itzá (costo adicional)",
          "Opción 3: Excursión a Tulum y cenote (costo adicional)",
          "Opción 4: Tour de snorkel en arrecifes (costo adicional)"
        ]
      },
      {
        day: 5,
        title: "Último día en el paraíso",
        description: "Aprovecha tu último día completo en Cancún.",
        activities: [
          "Desayuno especial frente al mar",
          "Sesión de spa (costo adicional) o relax en la playa",
          "Almuerzo en restaurante de especialidades",
          "Actividades de despedida",
          "Cena de gala y fiesta mexicana nocturna"
        ]
      },
      {
        day: 6,
        title: "Regreso a casa",
        description: "Despedida del Caribe Mexicano con hermosos recuerdos.",
        activities: [
          "Último desayuno en el resort",
          "Check-out",
          "Traslado al aeropuerto de Cancún",
          "Vuelo de regreso a Ciudad de México"
        ]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Cancún", lat: 21.1619, lng: -86.8515, type: "stop" },
      { name: "Playa del Carmen", lat: 20.6296, lng: -87.0739, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Llevar protector solar biodegradable",
      "Ropa ligera y traje de baño",
      "Documentos de identificación vigentes",
      "Efectivo para propinas y extras",
      "Cámara sumergible para actividades acuáticas"
    ]
  },
  "2": {
    id: "2",
    name: "Europa Clásica 15 Días",
    subtitle: "Un viaje inolvidable por las capitales más emblemáticas",
    destination: "Europa",
    category: "Cultural",
    tags: ["Cultural", "Historia", "Arte"],
    image: "https://images.unsplash.com/photo-1704301123672-929bec118be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBibHVlJTIwZG9tZXxlbnwxfHx8fDE3NjM1Nzk5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MzY4Njk5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwY29sb3NzZXVtfGVufDF8fHx8MTc2MzY4Njk5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzYWdyYWRhJTIwZmFtaWxpYXxlbnwxfHx8fDE3NjM2ODY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "15 días / 14 noches",
    price: 85000,
    priceText: "desde $85,000 MXN",
    cities: ["París", "Roma", "Barcelona", "Ámsterdam"],
    description: "Descubre la magia de Europa en un recorrido por sus ciudades más icónicas. Desde la elegancia parisina hasta el arte de Ámsterdam, pasando por la historia romana y la modernidad catalana. Un viaje perfecto para amantes de la cultura, el arte y la buena gastronomía.",
    highlights: [
      "Torre Eiffel y Museo del Louvre en París",
      "Coliseo Romano y Vaticano en Roma",
      "Sagrada Familia y Park Güell en Barcelona",
      "Canales y museos de Ámsterdam",
      "Traslados en tren de alta velocidad",
      "Guías locales expertos en cada ciudad"
    ],
    included: [
      "Vuelo redondo internacional",
      "14 noches de hospedaje en hoteles 4 estrellas céntricos",
      "Desayunos diarios tipo buffet",
      "Traslados entre ciudades en tren",
      "Tours guiados en cada ciudad",
      "Entradas a principales atracciones",
      "Seguro de viaje internacional",
      "Acompañante TravelShop todo el recorrido"
    ],
    notIncluded: [
      "Almuerzos y cenas",
      "Propinas para guías locales",
      "Entradas a museos opcionales",
      "Actividades extras",
      "Gastos personales",
      "Bebidas alcohólicas"
    ],
    itinerary: [
      {
        day: 1,
        title: "Ciudad de México - París",
        description: "Vuelo internacional con destino a la Ciudad de la Luz.",
        activities: [
          "Salida desde Ciudad de México",
          "Vuelo nocturno a París",
          "Llegada matutina al aeropuerto Charles de Gaulle",
          "Traslado al hotel céntrico",
          "Check-in y tiempo libre"
        ]
      },
      {
        day: 2,
        title: "París: Tour panorámico",
        description: "Descubre los principales monumentos de París.",
        activities: [
          "Desayuno en el hotel",
          "Tour panorámico: Torre Eiffel, Arco del Triunfo, Campos Elíseos",
          "Crucero por el Sena",
          "Tarde libre en Montmartre",
          "Opcional: Show en Moulin Rouge"
        ]
      },
      {
        day: 3,
        title: "París: Louvre y Versalles",
        description: "Arte e historia en sus máximas expresiones.",
        activities: [
          "Visita guiada al Museo del Louvre",
          "Excursión al Palacio de Versalles",
          "Recorrido por los Jardines de Versalles",
          "Regreso a París",
          "Cena opcional en restaurante parisino"
        ]
      },
      {
        day: 4,
        title: "París - Roma",
        description: "Viaje en tren de alta velocidad a la Ciudad Eterna.",
        activities: [
          "Desayuno y check-out",
          "Traslado a estación de tren",
          "Viaje en tren a Roma",
          "Llegada y check-in en hotel romano",
          "Tarde libre en Trastevere"
        ]
      },
      {
        day: 5,
        title: "Roma: Centro Histórico",
        description: "Explora el corazón de la antigua Roma.",
        activities: [
          "Visita al Coliseo Romano",
          "Foro Romano y Monte Palatino",
          "Fontana di Trevi",
          "Plaza de España",
          "Panteón de Agripa"
        ]
      },
      {
        day: 6,
        title: "Roma: Vaticano",
        description: "Descubre los tesoros del Estado más pequeño del mundo.",
        activities: [
          "Tour guiado en Museos Vaticanos",
          "Capilla Sixtina",
          "Basílica de San Pedro",
          "Plaza de San Pedro",
          "Tarde libre para compras"
        ]
      },
      {
        day: 7,
        title: "Roma - Barcelona",
        description: "Viaje aéreo a la capital catalana.",
        activities: [
          "Desayuno y check-out",
          "Vuelo a Barcelona",
          "Check-in en hotel",
          "Tarde libre en Las Ramblas",
          "Cena de tapas (opcional)"
        ]
      },
      {
        day: 8,
        title: "Barcelona: Gaudí",
        description: "Arte modernista en su máxima expresión.",
        activities: [
          "Visita a la Sagrada Familia",
          "Park Güell",
          "Casa Batlló",
          "Paseo por el Paseo de Gracia",
          "Barrio Gótico"
        ]
      },
      {
        day: 9,
        title: "Barcelona: Día libre",
        description: "Explora Barcelona a tu ritmo.",
        activities: [
          "Desayuno en el hotel",
          "Opciones: Camp Nou, Montjuïc, Playa Barceloneta",
          "Mercado de La Boquería",
          "Compras en Portal del Ángel",
          "Espectáculo de fuentes mágicas (nocturno)"
        ]
      },
      {
        day: 10,
        title: "Barcelona - Ámsterdam",
        description: "Vuelo a la Venecia del Norte.",
        activities: [
          "Desayuno y check-out",
          "Vuelo a Ámsterdam",
          "Check-in en hotel",
          "Tour en barco por los canales",
          "Cena en el Barrio Rojo"
        ]
      },
      {
        day: 11,
        title: "Ámsterdam: Arte y cultura",
        description: "Museos de clase mundial.",
        activities: [
          "Museo Van Gogh",
          "Rijksmuseum",
          "Paseo en bicicleta por la ciudad",
          "Barrio Jordaan",
          "Casa de Ana Frank (reserva previa)"
        ]
      },
      {
        day: 12,
        title: "Ámsterdam: Excursión a Zaanse Schans",
        description: "Descubre los molinos holandeses tradicionales.",
        activities: [
          "Excursión a Zaanse Schans",
          "Visita a molinos de viento",
          "Fábrica de quesos",
          "Fábrica de zuecos tradicionales",
          "Regreso a Ámsterdam"
        ]
      },
      {
        day: 13,
        title: "Ámsterdam: Día libre",
        description: "Último día completo en Europa.",
        activities: [
          "Desayuno en el hotel",
          "Día libre para actividades personales",
          "Sugerencias: Mercado de flores, Heineken Experience",
          "Compras de souvenirs",
          "Cena de despedida grupal"
        ]
      },
      {
        day: 14,
        title: "Ámsterdam - Ciudad de México",
        description: "Vuelo de regreso.",
        activities: [
          "Desayuno y check-out",
          "Traslado al aeropuerto",
          "Vuelo internacional de regreso",
          "Llegada a Ciudad de México el mismo día"
        ]
      },
      {
        day: 15,
        title: "Llegada a México",
        description: "Fin del viaje inolvidable.",
        activities: [
          "Llegada a Ciudad de México",
          "Despedida del grupo",
          "Fin de servicios"
        ]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "París", lat: 48.8566, lng: 2.3522, type: "stop" },
      { name: "Roma", lat: 41.9028, lng: 12.4964, type: "stop" },
      { name: "Barcelona", lat: 41.3851, lng: 2.1734, type: "stop" },
      { name: "Ámsterdam", lat: 52.3676, lng: 4.9041, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Pasaporte vigente con al menos 6 meses de validez",
      "Ropa cómoda para caminar",
      "Adaptador europeo para dispositivos",
      "Seguro médico internacional",
      "Euros en efectivo para gastos menores"
    ]
  },
  "3": {
    id: "3",
    name: "Patagonia Aventura",
    subtitle: "Explora el fin del mundo en una aventura épica",
    destination: "Sudamérica",
    category: "Aventura",
    tags: ["Aventura", "Naturaleza", "Trekking"],
    image: "https://images.unsplash.com/photo-1729476266005-b14af8894f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBnbGFjaWVyJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2MzY4Njk5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1649710972692-34778ba6164f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBtb3VudGFpbnN8ZW58MXx8fHwxNzYzNjgzNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFjaWVyJTIwcGVyaXRvJTIwbW9yZW5vfGVufDF8fHx8MTc2MzY4Njk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2h1YWlhJTIwYXJnZW50aW5hfGVufDF8fHx8MTc2MzY4Njk5OHww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "10 días / 9 noches",
    price: 65000,
    priceText: "desde $65,000 MXN",
    cities: ["Buenos Aires", "El Calafate", "Ushuaia"],
    description: "Vive la aventura de tu vida en la Patagonia Argentina. Desde los glaciares imponentes de El Calafate hasta la ciudad más austral del mundo en Ushuaia, pasando por la vibrante Buenos Aires. Un viaje para los amantes de la naturaleza, el trekking y los paisajes espectaculares.",
    highlights: [
      "Glaciar Perito Moreno - Patrimonio de la Humanidad",
      "Navegación por el Canal Beagle",
      "Trekking en Parque Nacional Los Glaciares",
      "Ushuaia - La ciudad del fin del mundo",
      "Show de tango en Buenos Aires",
      "Avistamiento de fauna patagónica"
    ],
    included: [
      "Vuelos internacionales y domésticos",
      "9 noches de hospedaje en hoteles seleccionados",
      "Desayunos diarios",
      "Traslados aeropuerto-hotel-aeropuerto",
      "Excursiones mencionadas en el itinerario",
      "Guías especializados en español",
      "Entradas a parques nacionales",
      "Seguro de viaje y asistencia"
    ],
    notIncluded: [
      "Almuerzos y cenas no especificadas",
      "Propinas",
      "Equipo de trekking personal",
      "Bebidas alcohólicas",
      "Actividades opcionales",
      "Gastos personales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Buenos Aires",
        description: "Bienvenido a la capital argentina.",
        activities: [
          "Llegada al aeropuerto de Ezeiza",
          "Traslado al hotel en zona céntrica",
          "Check-in y briefing del viaje",
          "Tarde libre para explorar la ciudad",
          "Cena de bienvenida con show de tango"
        ]
      },
      {
        day: 2,
        title: "Buenos Aires - City Tour",
        description: "Descubre la París de Sudamérica.",
        activities: [
          "Tour por La Boca y Caminito",
          "Plaza de Mayo y Casa Rosada",
          "Barrio de San Telmo",
          "Puerto Madero",
          "Cementerio de la Recoleta"
        ]
      },
      {
        day: 3,
        title: "Buenos Aires - El Calafate",
        description: "Vuelo a la capital nacional de los glaciares.",
        activities: [
          "Desayuno y check-out",
          "Vuelo a El Calafate",
          "Llegada y traslado al hotel",
          "Tarde libre en el pueblo",
          "Cena con cordero patagónico"
        ]
      },
      {
        day: 4,
        title: "Glaciar Perito Moreno",
        description: "Uno de los espectáculos naturales más impresionantes del planeta.",
        activities: [
          "Excursión de día completo al Glaciar Perito Moreno",
          "Caminata por las pasarelas frente al glaciar",
          "Safari náutico (opcional)",
          "Minitrekking sobre el glaciar (opcional con suplemento)",
          "Regreso a El Calafate"
        ]
      },
      {
        day: 5,
        title: "Navegación Ríos de Hielo",
        description: "Explora glaciares desde el Lago Argentino.",
        activities: [
          "Navegación todo el día por Ríos de Hielo",
          "Visita a Glaciar Upsala",
          "Glaciar Spegazzini",
          "Almuerzo a bordo",
          "Regreso a El Calafate por la tarde"
        ]
      },
      {
        day: 6,
        title: "El Calafate - Ushuaia",
        description: "Viaje al fin del mundo.",
        activities: [
          "Desayuno y check-out",
          "Vuelo a Ushuaia",
          "Traslado al hotel",
          "Tour panorámico por la ciudad más austral",
          "Cena con centolla fueguina"
        ]
      },
      {
        day: 7,
        title: "Parque Nacional Tierra del Fuego",
        description: "Naturaleza en estado puro.",
        activities: [
          "Excursión al Parque Nacional Tierra del Fuego",
          "Trekking por senderos costeros",
          "Visita a Bahía Lapataia - Fin de la Ruta 3",
          "Tren del Fin del Mundo (opcional)",
          "Regreso a Ushuaia"
        ]
      },
      {
        day: 8,
        title: "Navegación Canal Beagle",
        description: "Descubre la fauna marina patagónica.",
        activities: [
          "Navegación por el Canal Beagle",
          "Isla de los Lobos - colonia de lobos marinos",
          "Isla de los Pájaros - aves marinas",
          "Faro Les Eclaireurs",
          "Tarde libre en Ushuaia"
        ]
      },
      {
        day: 9,
        title: "Ushuaia - Buenos Aires",
        description: "Regreso a la capital.",
        activities: [
          "Desayuno y check-out",
          "Vuelo de regreso a Buenos Aires",
          "Check-in en hotel",
          "Tarde libre para compras",
          "Cena de despedida"
        ]
      },
      {
        day: 10,
        title: "Regreso a México",
        description: "Fin de la aventura patagónica.",
        activities: [
          "Desayuno en el hotel",
          "Traslado al aeropuerto",
          "Vuelo internacional de regreso",
          "Fin de servicios"
        ]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, type: "stop" },
      { name: "El Calafate", lat: -50.3379, lng: -72.2646, type: "stop" },
      { name: "Ushuaia", lat: -54.8019, lng: -68.3029, type: "stop" },
      { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Ropa abrigada en capas - clima muy variable",
      "Chaqueta impermeable y cortaviento",
      "Calzado de trekking impermeable",
      "Protector solar y lentes de sol",
      "Cámara con baterías extra (el frío las descarga rápido)"
    ]
  },
  "4": {
    id: "4",
    name: "Nueva York y Boston Express",
    subtitle: "La Gran Manzana y la cuna de la independencia americana",
    destination: "Norteamérica",
    category: "Ciudad",
    tags: ["Ciudad", "Cultural", "Shopping"],
    image: "https://images.unsplash.com/photo-1583680093447-2acef3f67f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBuaWdodCUyMGxpZ2h0c3xlbnwxfHx8fDE3NjM2ODcwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1546436836-07a91091f160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMHNreWxpbmV8ZW58MXx8fHwxNzYzNjg2OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3N0b24lMjBjaXR5fGVufDF8fHx8MTc2MzY4Njk5OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5ndG9uJTIwZGMlMjBtb251bWVudHN8ZW58MXx8fHwxNzYzNjg2OTk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "7 días / 6 noches",
    price: 35000,
    priceText: "desde $35,000 MXN",
    cities: ["Nueva York", "Boston", "Washington DC"],
    description: "Descubre la Costa Este de Estados Unidos en un recorrido por tres de sus ciudades más emblemáticas. Desde el bullicio de Nueva York hasta la historia de Boston y los monumentos de Washington DC. Perfecto para amantes de las grandes ciudades, la historia y las compras.",
    highlights: [
      "Estatua de la Libertad y Times Square",
      "Central Park y Empire State Building",
      "Freedom Trail en Boston",
      "Universidad de Harvard y MIT",
      "Monumentos de Washington DC",
      "Broadway show incluido"
    ],
    included: [
      "Vuelo redondo Ciudad de México - Nueva York",
      "6 noches de hospedaje en hoteles céntricos",
      "Desayunos diarios",
      "Traslados entre ciudades en autocar de lujo",
      "Tours guiados en cada ciudad",
      "Entrada a Estatua de la Libertad",
      "Show de Broadway",
      "Guía acompañante en español"
    ],
    notIncluded: [
      "Almuerzos y cenas",
      "Propinas",
      "Entradas a museos opcionales",
      "City Pass",
      "Compras personales",
      "Seguro de viaje (recomendado)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Nueva York",
        description: "Bienvenido a la ciudad que nunca duerme.",
        activities: [
          "Llegada al aeropuerto JFK o Newark",
          "Traslado al hotel en Manhattan",
          "Check-in",
          "Tarde libre para adaptarse al horario",
          "Caminata por Times Square de noche"
        ]
      },
      {
        day: 2,
        title: "Manhattan - Lower y Midtown",
        description: "Explora el corazón de Manhattan.",
        activities: [
          "Ferry a la Estatua de la Libertad",
          "Wall Street y Toro de Wall Street",
          "Memorial del 9/11",
          "Empire State Building",
          "Tarde libre para compras en Macy's"
        ]
      },
      {
        day: 3,
        title: "Nueva York - Upper Manhattan",
        description: "Arte, cultura y naturaleza urbana.",
        activities: [
          "Central Park - paseo en bicicleta",
          "Metropolitan Museum of Art (opcional)",
          "Quinta Avenida - compras",
          "Rockefeller Center",
          "Show de Broadway por la noche"
        ]
      },
      {
        day: 4,
        title: "Nueva York - Boston",
        description: "Viaje a la cuna de la independencia.",
        activities: [
          "Desayuno y check-out",
          "Viaje en autocar a Boston (4 horas)",
          "Llegada y check-in",
          "Freedom Trail walking tour",
          "Cena en Quincy Market"
        ]
      },
      {
        day: 5,
        title: "Boston y Cambridge",
        description: "Historia y academia.",
        activities: [
          "Tour por Universidad de Harvard",
          "MIT campus",
          "Boston Common",
          "USS Constitution",
          "Tarde libre en Back Bay"
        ]
      },
      {
        day: 6,
        title: "Boston - Washington DC",
        description: "La capital de Estados Unidos.",
        activities: [
          "Desayuno y check-out",
          "Viaje a Washington DC",
          "Tour panorámico: Casa Blanca, Capitolio",
          "Lincoln Memorial",
          "Check-in en hotel"
        ]
      },
      {
        day: 7,
        title: "Washington DC - Regreso",
        description: "Último día y vuelo de regreso.",
        activities: [
          "Visita a Smithsonian Museums (a elección)",
          "National Mall",
          "Check-out y traslado al aeropuerto",
          "Vuelo de regreso a México"
        ]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Nueva York", lat: 40.7128, lng: -74.0060, type: "stop" },
      { name: "Boston", lat: 42.3601, lng: -71.0589, type: "stop" },
      { name: "Washington DC", lat: 38.9072, lng: -77.0369, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Visa americana vigente",
      "Ropa cómoda para caminar mucho",
      "Adaptador de corriente",
      "Dólares en efectivo",
      "Tarjetas de crédito internacionales"
    ]
  },
  "5": {
    id: "5",
    name: "Riviera Maya Aventura Maya",
    subtitle: "Descubre las maravillas arqueológicas del mundo maya",
    destination: "Caribe",
    category: "Cultural",
    tags: ["Cultural", "Aventura", "Historia"],
    image: "https://images.unsplash.com/photo-1645557180229-98bfc29dbdbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWx1bSUyMG1heWFuJTIwcnVpbnN8ZW58MXx8fHwxNzY0MTc5MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gallery: [
      "https://images.unsplash.com/photo-1645557180229-98bfc29dbdbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWx1bSUyMG1heWFuJTIwcnVpbnN8ZW58MXx8fHwxNzY0MTc5MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "8 días / 7 noches",
    price: 22900,
    priceText: "desde $22,900 MXN",
    cities: ["Cancún", "Tulum", "Cobá", "Chichén Itzá"],
    description: "Sumérgete en la fascinante cultura maya explorando las ruinas más impresionantes de la Riviera Maya. Visita Tulum frente al mar, el místico Chichén Itzá y las pirámides de Cobá.",
    highlights: [
      "Chichén Itzá - Maravilla del Mundo Moderno",
      "Tulum - Ruinas frente al mar Caribe",
      "Cobá - Escalada a la pirámide más alta",
      "Cenotes sagrados y nado en aguas cristalinas",
      "Guías arqueólogos especializados",
      "Hospedaje boutique en Playa del Carmen"
    ],
    included: [
      "Vuelo redondo Ciudad de México - Cancún",
      "7 noches en hotel boutique 4 estrellas",
      "Desayunos diarios",
      "Todas las excursiones arqueológicas",
      "Entradas a zonas arqueológicas",
      "Guía arqueólogo certificado",
      "Transporte privado"
    ],
    notIncluded: [
      "Almuerzos y cenas",
      "Propinas",
      "Actividades opcionales",
      "Seguro de viaje"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Cancún",
        description: "Bienvenida y traslado a Playa del Carmen",
        activities: ["Llegada al aeropuerto", "Traslado a hotel boutique", "Check-in", "Tarde libre"]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Cancún", lat: 21.1619, lng: -86.8515, type: "stop" },
      { name: "Tulum", lat: 20.2114, lng: -87.4654, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Zapatos cómodos para caminar",
      "Protector solar biodegradable",
      "Sombrero y ropa ligera",
      "Cámara fotográfica"
    ]
  },
  "6": {
    id: "6",
    name: "Tailandia Exótica",
    subtitle: "Templos, playas paradisíacas y cultura tailandesa",
    destination: "Asia",
    category: "Aventura",
    tags: ["Playa", "Cultural", "Exótico"],
    image: "https://images.unsplash.com/photo-1650767013373-05afce907c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpbGFuZCUyMGJlYWNoJTIwaXNsYW5kfGVufDF8fHx8MTc2NDE3OTMyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1650767013373-05afce907c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpbGFuZCUyMGJlYWNoJTIwaXNsYW5kfGVufDF8fHx8MTc2NDE3OTMyMnww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "12 días / 11 noches",
    price: 52900,
    priceText: "desde $52,900 MXN",
    cities: ["Bangkok", "Chiang Mai", "Phuket", "Phi Phi"],
    description: "Descubre la magia de Tailandia desde los templos dorados de Bangkok hasta las playas de ensueño de Phuket. Una experiencia única que combina cultura, naturaleza y relajación.",
    highlights: [
      "Gran Palacio de Bangkok",
      "Templos de Chiang Mai",
      "Santuario de elefantes",
      "Islas Phi Phi",
      "Playa de Phuket",
      "Masaje tailandés tradicional"
    ],
    included: [
      "Vuelos internacionales",
      "11 noches de hospedaje",
      "Desayunos diarios",
      "Tours y excursiones mencionadas",
      "Traslados internos",
      "Guía en español"
    ],
    notIncluded: [
      "Visa (si aplica)",
      "Almuerzos y cenas",
      "Propinas",
      "Actividades opcionales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Bangkok",
        description: "Bienvenida a la capital de Tailandia",
        activities: ["Llegada al aeropuerto", "Traslado al hotel", "Check-in", "Tarde libre"]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Bangkok", lat: 13.7563, lng: 100.5018, type: "stop" },
      { name: "Chiang Mai", lat: 18.7883, lng: 98.9853, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Pasaporte con 6 meses de validez",
      "Ropa modesta para templos",
      "Repelente de mosquitos",
      "Adaptador de corriente"
    ]
  },
  "7": {
    id: "7",
    name: "Japón Milenario",
    subtitle: "De Tokio a Kioto: tradición y modernidad",
    destination: "Asia",
    category: "Cultural",
    tags: ["Cultural", "Exótico", "Tecnología"],
    image: "https://images.unsplash.com/photo-1729864881494-d96345092845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGt5b3RvJTIwdGVtcGxlfGVufDF8fHx8MTc2NDE2NjIzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1729864881494-d96345092845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGt5b3RvJTIwdGVtcGxlfGVufDF8fHx8MTc2NDE2NjIzNXww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "10 días / 9 noches",
    price: 68900,
    priceText: "desde $68,900 MXN",
    cities: ["Tokio", "Kioto", "Osaka", "Nara"],
    description: "Sumérgete en la fascinante cultura japonesa, desde la metrópoli futurista de Tokio hasta los antiguos templos de Kioto. Experimenta la perfecta armonía entre tradición y modernidad.",
    highlights: [
      "Tokio: Shibuya, Asakusa, Harajuku",
      "Monte Fuji",
      "Templos de Kioto",
      "Ceremonia del té tradicional",
      "Tren bala (Shinkansen)",
      "Parque de los ciervos en Nara"
    ],
    included: [
      "Vuelos internacionales",
      "9 noches de hospedaje",
      "Desayunos diarios",
      "Japan Rail Pass (7 días)",
      "Tours guiados",
      "Traslados"
    ],
    notIncluded: [
      "Almuerzos y cenas",
      "Propinas",
      "Entradas a atracciones opcionales",
      "Seguro de viaje"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Tokio",
        description: "Bienvenida a la capital de Japón",
        activities: ["Llegada al aeropuerto Narita", "Traslado al hotel", "Check-in"]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Tokio", lat: 35.6762, lng: 139.6503, type: "stop" },
      { name: "Kioto", lat: 35.0116, lng: 135.7681, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Pasaporte vigente",
      "Efectivo en yenes",
      "Zapatos fáciles de quitar",
      "Pocket WiFi"
    ]
  },
  "8": {
    id: "8",
    name: "Dubai Luxury Experience",
    subtitle: "Lujo y modernidad en el desierto árabe",
    destination: "Asia",
    category: "Ciudad",
    tags: ["Lujo", "Moderno", "Shopping"],
    image: "https://images.unsplash.com/photo-1738260530641-f945fa20a6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGx1eHVyeSUyMGhvdGVsfGVufDF8fHx8MTc2NDE3OTMyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1738260530641-f945fa20a6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGx1eHVyeSUyMGhvdGVsfGVufDF8fHx8MTc2NDE3OTMyMnww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "6 días / 5 noches",
    price: 45900,
    priceText: "desde $45,900 MXN",
    cities: ["Dubai", "Abu Dhabi"],
    description: "Vive la experiencia del lujo en la ciudad más moderna del mundo. Desde el edificio más alto hasta el centro comercial más grande, Dubai te sorprenderá en cada esquina.",
    highlights: [
      "Burj Khalifa - Piso 124",
      "Safari en el desierto",
      "Dubai Mall y fuentes danzantes",
      "Mezquita Sheikh Zayed en Abu Dhabi",
      "Palm Jumeirah",
      "Cena de lujo en hotel 5 estrellas"
    ],
    included: [
      "Vuelos internacionales",
      "5 noches en hotel 5 estrellas",
      "Desayunos diarios",
      "Safari en el desierto",
      "Tours mencionados",
      "Traslados privados"
    ],
    notIncluded: [
      "Visa",
      "Almuerzos y cenas (excepto safari)",
      "Propinas",
      "Compras personales"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Dubai",
        description: "Bienvenida a la ciudad del futuro",
        activities: ["Llegada al aeropuerto", "Traslado al hotel de lujo", "Check-in"]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Dubai", lat: 25.2048, lng: 55.2708, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Ropa modesta para mezquitas",
      "Protector solar",
      "Tarjeta de crédito internacional",
      "Adaptador de corriente"
    ]
  },
  "9": {
    id: "9",
    name: "Perú Imperial",
    subtitle: "Machu Picchu y el Valle Sagrado de los Incas",
    destination: "Sudamérica",
    category: "Cultural",
    tags: ["Cultural", "Historia", "Aventura"],
    image: "https://images.unsplash.com/photo-1707153836200-0438203c5358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwbWFjaHUlMjBwaWNjaHV8ZW58MXx8fHwxNzY0MTU4MTExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1707153836200-0438203c5358?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwbWFjaHUlMjBwaWNjaHV8ZW58MXx8fHwxNzY0MTU4MTExfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "7 días / 6 noches",
    price: 32900,
    priceText: "desde $32,900 MXN",
    cities: ["Lima", "Cusco", "Machu Picchu", "Valle Sagrado"],
    description: "Descubre la grandeza del Imperio Inca en un viaje que te llevará desde Lima hasta la misteriosa ciudadela de Machu Picchu, una de las 7 Maravillas del Mundo Moderno.",
    highlights: [
      "Machu Picchu - Maravilla del Mundo",
      "Cusco - Capital del Imperio Inca",
      "Valle Sagrado de los Incas",
      "Mercado de Pisac",
      "Tren panorámico a Machu Picchu",
      "Gastronomía peruana"
    ],
    included: [
      "Vuelos internacionales y domésticos",
      "6 noches de hospedaje",
      "Desayunos diarios",
      "Tren a Machu Picchu",
      "Entradas a sitios arqueológicos",
      "Guías especializados"
    ],
    notIncluded: [
      "Almuerzos y cenas",
      "Propinas",
      "Huayna Picchu (montaña adicional)",
      "Seguro de viaje"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Lima",
        description: "Bienvenida a la capital peruana",
        activities: ["Llegada al aeropuerto", "Traslado al hotel", "City tour Lima"]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Lima", lat: -12.0464, lng: -77.0428, type: "stop" },
      { name: "Cusco", lat: -13.5319, lng: -71.9675, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Ropa en capas para diferentes altitudes",
      "Pastillas para el mal de altura",
      "Bloqueador solar",
      "Botas de trekking"
    ]
  },
  "10": {
    id: "10",
    name: "Grecia Clásica y Islas",
    subtitle: "Atenas, Santorini y Mykonos",
    destination: "Europa",
    category: "Playa",
    tags: ["Playa", "Cultural", "Romántico"],
    image: "https://images.unsplash.com/photo-1446822679794-fbd084d10491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlY2UlMjBzYW50b3JpbmklMjBpc2xhbmR8ZW58MXx8fHwxNzY0MTc5MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1446822679794-fbd084d10491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlY2UlMjBzYW50b3JpbmklMjBpc2xhbmR8ZW58MXx8fHwxNzY0MTc5MzIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "11 días / 10 noches",
    price: 58900,
    priceText: "desde $58,900 MXN",
    cities: ["Atenas", "Santorini", "Mykonos"],
    description: "Vive el romance griego entre ruinas antiguas y puestas de sol en Santorini. Un viaje perfecto que combina historia milenaria con las playas más hermosas del Mediterráneo.",
    highlights: [
      "Acrópolis y Partenón",
      "Puesta de sol en Oia, Santorini",
      "Caldera de Santorini",
      "Playas de Mykonos",
      "Crucero por las islas",
      "Gastronomía griega auténtica"
    ],
    included: [
      "Vuelos internacionales",
      "10 noches de hospedaje",
      "Desayunos diarios",
      "Ferries entre islas",
      "Tours guiados",
      "Traslados"
    ],
    notIncluded: [
      "Almuerzos y cenas",
      "Propinas",
      "Actividades opcionales",
      "Seguro de viaje"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Atenas",
        description: "Bienvenida a la cuna de la civilización occidental",
        activities: ["Llegada al aeropuerto", "Traslado al hotel", "Tarde libre"]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Atenas", lat: 37.9838, lng: 23.7275, type: "stop" },
      { name: "Santorini", lat: 36.3932, lng: 25.4615, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Ropa ligera y traje de baño",
      "Zapatos cómodos",
      "Protector solar",
      "Euros en efectivo"
    ]
  },
  "11": {
    id: "11",
    name: "Costa Rica Pura Vida",
    subtitle: "Selvas, volcanes y playas del Pacífico",
    destination: "Centroamérica",
    category: "Aventura",
    tags: ["Aventura", "Naturaleza", "Ecoturismo"],
    image: "https://images.unsplash.com/photo-1698871741610-11e817f934e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3N0YSUyMHJpY2ElMjByYWluZm9yZXN0fGVufDF8fHx8MTc2NDA1NjQzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1698871741610-11e817f934e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3N0YSUyMHJpY2ElMjByYWluZm9yZXN0fGVufDF8fHx8MTc2NDA1NjQzOHww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "8 días / 7 noches",
    price: 28900,
    priceText: "desde $28,900 MXN",
    cities: ["San José", "Arenal", "Monteverde", "Manuel Antonio"],
    description: "Sumérgete en la biodiversidad de Costa Rica. Desde el volcán Arenal hasta las playas vírgenes de Manuel Antonio, experimenta el verdadero significado de Pura Vida.",
    highlights: [
      "Volcán Arenal y aguas termales",
      "Puentes colgantes Monteverde",
      "Observación de fauna exótica",
      "Tirolesa en el bosque nuboso",
      "Playas de Manuel Antonio",
      "Santuario de perezosos"
    ],
    included: [
      "Vuelo redondo",
      "7 noches de hospedaje",
      "Desayunos diarios",
      "Todas las excursiones",
      "Entradas a parques nacionales",
      "Traslados privados"
    ],
    notIncluded: [
      "Almuerzos y cenas",
      "Propinas",
      "Actividades opcionales",
      "Seguro de viaje"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a San José",
        description: "Bienvenida a Costa Rica",
        activities: ["Llegada al aeropuerto", "Traslado al hotel", "Briefing del tour"]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "San José", lat: 9.9281, lng: -84.0907, type: "stop" },
      { name: "Arenal", lat: 10.4631, lng: -84.7034, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Ropa para climas cálidos y lluvia",
      "Repelente de mosquitos",
      "Binoculares",
      "Cámara resistente al agua"
    ]
  },
  "12": {
    id: "12",
    name: "Londres y Escocia",
    subtitle: "Historia británica de Londres a Edimburgo",
    destination: "Europa",
    category: "Ciudad",
    tags: ["Cultural", "Historia", "Ciudad"],
    image: "https://images.unsplash.com/photo-1745016176874-cd3ed3f5bfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBiaWclMjBiZW58ZW58MXx8fHwxNzY0MDg1MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1745016176874-cd3ed3f5bfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBiaWclMjBiZW58ZW58MXx8fHwxNzY0MDg1MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    duration: "9 días / 8 noches",
    price: 48900,
    priceText: "desde $48,900 MXN",
    cities: ["Londres", "Edimburgo", "Glasgow"],
    description: "Descubre la rica historia del Reino Unido desde los palacios de Londres hasta los castillos medievales de Escocia. Un viaje perfecto para amantes de la historia y la cultura británica.",
    highlights: [
      "Palacio de Buckingham",
      "Tower of London",
      "Castillo de Edimburgo",
      "Stonehenge",
      "Highlands escoceses",
      "Musical de West End"
    ],
    included: [
      "Vuelos internacionales",
      "8 noches de hospedaje",
      "Desayunos diarios",
      "Tren Londres-Edimburgo",
      "Tours guiados",
      "Entradas principales"
    ],
    notIncluded: [
      "Almuerzos y cenas",
      "Propinas",
      "Museo Británico (entrada libre)",
      "Seguro de viaje"
    ],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Londres",
        description: "Bienvenida a la capital británica",
        activities: ["Llegada al aeropuerto Heathrow", "Traslado al hotel", "Tarde libre"]
      }
    ],
    mapRoute: [
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "start" },
      { name: "Londres", lat: 51.5074, lng: -0.1278, type: "stop" },
      { name: "Edimburgo", lat: 55.9533, lng: -3.1883, type: "stop" },
      { name: "Ciudad de México", lat: 19.4326, lng: -99.1332, type: "end" }
    ],
    recommendations: [
      "Ropa abrigada e impermeable",
      "Adaptador de corriente UK",
      "Libras esterlinas",
      "Paraguas"
    ]
  }
};
