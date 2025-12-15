import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowRight, FileText, Calendar, MapPin, TrendingUp } from "lucide-react";
import { StatusBadge, ReservationStatus } from "../components/status-badge";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

const recentReservations = [
  { id: "RES-2024-156", tour: "Tour Cancún Premium", passenger: "María García", status: "confirmed" as ReservationStatus, date: "2024-11-18" },
  { id: "RES-2024-157", tour: "Europa Clásica 15 días", passenger: "Carlos Ruiz", status: "pending" as ReservationStatus, date: "2024-11-19" },
  { id: "RES-2024-158", tour: "Riviera Maya Todo Incluido", passenger: "Ana Martínez", status: "docs-pending" as ReservationStatus, date: "2024-11-20" },
];

const newResources = [
  { title: "Brochure Verano 2025", type: "PDF", updated: "Hace 2 días", icon: FileText },
  { title: "Tarifario Europa 2025", type: "PDF", updated: "Hace 3 días", icon: FileText },
  { title: "Manual de Ventas Actualizado", type: "Documento", updated: "Hace 1 semana", icon: FileText },
];

const upcomingTours = [
  { name: "Cancún Todo Incluido", departure: "15 Dic 2024", available: 8, image: "https://images.unsplash.com/photo-1660315247626-12267f8d68db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwZGVzdGluYXRpb258ZW58MXx8fHwxNzYzNTgwNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Europa Clásica", departure: "20 Dic 2024", available: 4, image: "https://images.unsplash.com/photo-1690310456730-0a3a81d8a3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjM2NzYwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Patagonia Aventura", departure: "10 Ene 2025", available: 12, image: "https://images.unsplash.com/photo-1713959989861-2425c95e9777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjM2Njk3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl mb-2">Bienvenido, Agencia Viajes Global</h1>
        <p className="text-white/90 text-lg">
          Gestiona tus tours, recursos y reservaciones desde tu panel central
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("bookings")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Reservaciones Activas</p>
                <h3 className="text-3xl text-neutral-900">24</h3>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("tours")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Tours Disponibles</p>
                <h3 className="text-3xl text-neutral-900">87</h3>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
            <div className="mt-4 text-neutral-600">
              <span>45 destinos activos</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("resources")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Recursos Nuevos</p>
                <h3 className="text-3xl text-neutral-900">12</h3>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent-600" />
              </div>
            </div>
            <div className="mt-4 text-neutral-600">
              <span>Esta semana</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onNavigate("bookings")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Pendientes de Docs</p>
                <h3 className="text-3xl text-neutral-900">3</h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 text-neutral-600">
              <span>Requieren atención</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tus Reservaciones Recientes</CardTitle>
                <CardDescription>Últimas reservaciones registradas</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => onNavigate("reservations")}>
                Ver todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReservations.map((res) => (
              <div key={res.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-neutral-900">{res.id}</span>
                    <StatusBadge status={res.status} />
                  </div>
                  <p className="text-neutral-600">{res.tour}</p>
                  <p className="text-neutral-500">Pasajero: {res.passenger}</p>
                </div>
                <div className="text-right text-neutral-500">
                  {res.date}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* New Resources */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recursos Nuevos Esta Semana</CardTitle>
                <CardDescription>Material actualizado para tus ventas</CardDescription>
              </div>
              <Button variant="ghost" onClick={() => onNavigate("resources")}>
                Ver todos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {newResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-neutral-900">{resource.title}</h4>
                    <p className="text-neutral-500">{resource.type} • {resource.updated}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Descargar
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tours */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tours con Salidas Próximas</CardTitle>
              <CardDescription>Aprovecha las últimas plazas disponibles</CardDescription>
            </div>
            <Button variant="ghost" onClick={() => onNavigate("tours")}>
              Ver catálogo completo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingTours.map((tour, index) => (
              <div key={index} className="border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 bg-neutral-200 relative">
                  <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full">
                    <span className="text-emerald-600">{tour.available} plazas</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-neutral-900 mb-2">{tour.name}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-neutral-500">Salida: {tour.departure}</p>
                    <Button size="sm" variant="outline">Ver detalles</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-20 flex-col gap-2"
          onClick={() => onNavigate("tours")}
        >
          <Calendar className="w-6 h-6" />
          Explorar Tours
        </Button>
        <Button 
          variant="outline" 
          className="h-20 flex-col gap-2"
          onClick={() => onNavigate("reservations")}
        >
          <FileText className="w-6 h-6" />
          Nueva Reservación
        </Button>
        <Button 
          variant="outline" 
          className="h-20 flex-col gap-2"
          onClick={() => onNavigate("resources")}
        >
          <FileText className="w-6 h-6" />
          Descargar Materiales
        </Button>
        <Button 
          variant="outline" 
          className="h-20 flex-col gap-2"
          onClick={() => onNavigate("training")}
        >
          <FileText className="w-6 h-6" />
          Ver Capacitaciones
        </Button>
      </div>
    </div>
  );
}