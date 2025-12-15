import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, MapPin, Calendar, DollarSign, Users, Plane, Sparkles } from "lucide-react";
import { SmartSearchWizard, SearchFilters } from "../components/SmartSearchWizard";

interface ToursListPageProps {
  onNavigate: (page: string, tourId?: string) => void;
  searchQuery?: string;
}

const tours = [
  {
    id: "1",
    name: "Cancún Todo Incluido Premium",
    destination: "Caribe",
    region: "México",
    cities: ["Cancún", "Playa del Carmen"],
    category: "Playa",
    duration: "6 días / 5 noches",
    price: 18500,
    priceText: "desde $18,500 MXN",
    includeFlight: true,
    image: "https://images.unsplash.com/photo-1653959747793-c7c3775665f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhcmFkaXNlJTIwYmVhY2glMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjg2OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    departures: ["15 Dic", "22 Dic", "29 Dic"],
    available: 8
  },
  {
    id: "2",
    name: "Europa Clásica 15 Días",
    destination: "Europa",
    region: "Europa Occidental",
    cities: ["París", "Roma", "Barcelona", "Ámsterdam"],
    category: "Cultural",
    duration: "15 días / 14 noches",
    price: 85000,
    priceText: "desde $85,000 MXN",
    includeFlight: true,
    image: "https://images.unsplash.com/photo-1704301123672-929bec118be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBibHVlJTIwZG9tZXxlbnwxfHx8fDE3NjM1Nzk5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    departures: ["20 Dic", "10 Ene", "25 Ene"],
    available: 4
  },
  {
    id: "3",
    name: "Patagonia Aventura",
    destination: "Sudamérica",
    region: "América del Sur",
    cities: ["Buenos Aires", "El Calafate", "Ushuaia"],
    category: "Aventura",
    duration: "10 días / 9 noches",
    price: 65000,
    priceText: "desde $65,000 MXN",
    includeFlight: true,
    image: "https://images.unsplash.com/photo-1729476266005-b14af8894f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBnbGFjaWVyJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2MzY4Njk5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    departures: ["10 Ene", "05 Feb", "20 Feb"],
    available: 12
  },
  {
    id: "4",
    name: "Nueva York y Boston Express",
    destination: "Norteamérica",
    region: "Estados Unidos",
    cities: ["Nueva York", "Boston", "Washington DC"],
    category: "Ciudad",
    duration: "7 días / 6 noches",
    price: 35000,
    priceText: "desde $35,000 MXN",
    includeFlight: false,
    image: "https://images.unsplash.com/photo-1583680093447-2acef3f67f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBuaWdodCUyMGxpZ2h0c3xlbnwxfHx8fDE3NjM2ODcwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    departures: ["18 Dic", "28 Dic", "15 Ene"],
    available: 6
  },
  {
    id: "5",
    name: "Riviera Maya Todo Incluido",
    destination: "Caribe",
    region: "México",
    cities: ["Cancún", "Tulum", "Cozumel"],
    category: "Playa",
    duration: "7 días / 6 noches",
    price: 22500,
    priceText: "desde $22,500 MXN",
    includeFlight: true,
    image: "https://images.unsplash.com/photo-1637576308588-6647bf80944d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMG92ZXJ3YXRlciUyMGJ1bmdhbG93JTIwc3Vuc2V0fGVufDF8fHx8MTc2MzY4Njk5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    departures: ["12 Dic", "19 Dic", "02 Ene"],
    available: 10
  },
  {
    id: "6",
    name: "París y Ámsterdam Romántico",
    destination: "Europa",
    region: "Europa Occidental",
    cities: ["París", "Ámsterdam"],
    category: "Cultural",
    duration: "8 días / 7 noches",
    price: 58000,
    priceText: "desde $58,000 MXN",
    includeFlight: false,
    image: "https://images.unsplash.com/photo-1600623751202-59d68eb53d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwc3Vuc2V0JTIwYXNpYXxlbnwxfHx8fDE3NjM2ODY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    departures: ["14 Ene", "28 Ene", "14 Feb"],
    available: 5
  }
];

export function ToursListPage({ onNavigate, searchQuery: initialSearchQuery }: ToursListPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedFlight, setSelectedFlight] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [smartSearchOpen, setSmartSearchOpen] = useState(false);

  const handleSmartSearch = (filters: SearchFilters) => {
    // Apply filters from smart search
    if (filters.tourType === "all-inclusive") setSelectedCategory("Playa");
    if (filters.tourType === "cultural") setSelectedCategory("Cultural");
    if (filters.tourType === "adventure") setSelectedCategory("Aventura");
    if (filters.tourType === "city") setSelectedCategory("Ciudad");
    
    if (filters.budget === "low") setSelectedPriceRange("low");
    if (filters.budget === "medium") setSelectedPriceRange("medium");
    if (filters.budget === "high" || filters.budget === "luxury") setSelectedPriceRange("high");
    
    // Show notification
    alert(`Buscador inteligente aplicado. Filtros: ${filters.countries.length} países, ${filters.activities.length} actividades seleccionadas`);
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.cities.some(city => city.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDestination = selectedDestination === "all" || tour.destination === selectedDestination;
    const matchesCategory = selectedCategory === "all" || tour.category === selectedCategory;
    const matchesRegion = selectedRegion === "all" || tour.region === selectedRegion;
    const matchesFlight = selectedFlight === "all" || 
                         (selectedFlight === "with" && tour.includeFlight) ||
                         (selectedFlight === "without" && !tour.includeFlight);
    
    let matchesPrice = true;
    if (selectedPriceRange === "low") matchesPrice = tour.price < 30000;
    else if (selectedPriceRange === "medium") matchesPrice = tour.price >= 30000 && tour.price < 60000;
    else if (selectedPriceRange === "high") matchesPrice = tour.price >= 60000;
    
    return matchesSearch && matchesDestination && matchesCategory && matchesRegion && matchesFlight && matchesPrice;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-neutral-900 mb-2">Catálogo de Tours y Productos</h1>
        <p className="text-neutral-600">
          Explora nuestra selección completa de tours y paquetes turísticos
        </p>
      </div>

      {/* Filters Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Buscar tours por nombre o destino..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Destination Filter */}
            <Select value={selectedDestination} onValueChange={setSelectedDestination}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Destino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los destinos</SelectItem>
                <SelectItem value="Caribe">Caribe</SelectItem>
                <SelectItem value="Europa">Europa</SelectItem>
                <SelectItem value="Sudamérica">Sudamérica</SelectItem>
                <SelectItem value="Norteamérica">Norteamérica</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Playa">Playa</SelectItem>
                <SelectItem value="Cultural">Cultural</SelectItem>
                <SelectItem value="Aventura">Aventura</SelectItem>
                <SelectItem value="Ciudad">Ciudad</SelectItem>
              </SelectContent>
            </Select>

            {/* Region Filter */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las regiones</SelectItem>
                <SelectItem value="México">México</SelectItem>
                <SelectItem value="Europa Occidental">Europa Occidental</SelectItem>
                <SelectItem value="América del Sur">América del Sur</SelectItem>
                <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
              </SelectContent>
            </Select>

            {/* Flight Filter */}
            <Select value={selectedFlight} onValueChange={setSelectedFlight}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Vuelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los vuelos</SelectItem>
                <SelectItem value="with">Con vuelo</SelectItem>
                <SelectItem value="without">Sin vuelo</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="low">Bajo ($0 - $30,000)</SelectItem>
                <SelectItem value="medium">Medio ($30,000 - $60,000)</SelectItem>
                <SelectItem value="high">Alto ($60,000+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-neutral-600">
          Mostrando {filteredTours.length} tours disponibles
        </p>
        <div className="flex gap-2">
          <Button 
            variant="default"
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            onClick={() => setSmartSearchOpen(true)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Buscador Inteligente
          </Button>
          <Button variant="outline">
            <DollarSign className="w-4 h-4 mr-2" />
            Ordenar por precio
          </Button>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/3 h-64 md:h-auto bg-neutral-200 relative flex-shrink-0">
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-lg">
                  <span className="text-emerald-600">{tour.available} plazas</span>
                </div>
              </div>

              {/* Content */}
              <CardContent className="flex-1 p-6 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                      {tour.category}
                    </span>
                    <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs">
                      {tour.destination}
                    </span>
                  </div>

                  <h3 className="text-xl text-neutral-900 mb-3">{tour.name}</h3>

                  <div className="space-y-2 text-neutral-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                      <span>Salidas: {tour.departures.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-neutral-400" />
                      <span>{tour.available} espacios disponibles</span>
                    </div>
                    {tour.includeFlight && (
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-neutral-400" />
                        <span>Incluye vuelo</span>
                      </div>
                    )}
                  </div>

                  <div className="text-2xl text-primary-600 mb-4">
                    {tour.priceText}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => onNavigate("tour-detail", tour.id)}
                  >
                    Ver detalles
                  </Button>
                  <Button 
                    className="flex-1 bg-primary-500 hover:bg-primary-600"
                    onClick={() => onNavigate("booking-form", tour.id)}
                  >
                    Solicitar reservación
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Smart Search Wizard */}
      <SmartSearchWizard 
        isOpen={smartSearchOpen}
        onClose={() => setSmartSearchOpen(false)}
        onSearch={handleSmartSearch}
      />
    </div>
  );
}