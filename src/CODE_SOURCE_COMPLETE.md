# TRAVELSHOP PARTNER PORTAL - CÓDIGO FUENTE COMPLETO

Este documento contiene todo el código fuente del proyecto TravelShop Partner Portal.

---

## TABLA DE CONTENIDOS

1. [Archivos Principales](#archivos-principales)
2. [Componentes](#componentes)
3. [Páginas](#páginas)
4. [Data](#data)
5. [Estilos](#estilos)
6. [Componentes UI](#componentes-ui)

---

## ARCHIVOS PRINCIPALES

### `/App.tsx`

```tsx
import { useState } from "react";
import { Layout } from "./components/layout";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { ResourcesListPageNew } from "./pages/resources-list-new";
import { ResourceDetailPage } from "./pages/resource-detail";
import { ToursListPage } from "./pages/tours-list";
import { TourDetailPageNew } from "./pages/tour-detail-new";
import { ReservationsListPage } from "./pages/reservations-list";
import { ReservationDetailPageNew } from "./pages/reservation-detail-new";
import { TrainingHubPage } from "./pages/training-hub";
import { TrainingVideoPage } from "./pages/training-video";
import { BookingFormPage } from "./pages/booking-form";
import { Toaster } from "./components/ui/sonner";

type Page = 
  | "landing"
  | "login"
  | "dashboard"
  | "resources"
  | "resource-detail"
  | "tours"
  | "tour-detail"
  | "bookings"
  | "booking-detail"
  | "booking-form"
  | "training-hub"
  | "training-video";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Landing and Login pages don't use the layout
  if (currentPage === "landing") {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (currentPage === "login") {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  // All other pages use the layout
  return (
    <>
      <Layout currentPage={currentPage} onNavigate={handleNavigate} onSearch={handleSearch}>
        {currentPage === "dashboard" && (
          <DashboardPage onNavigate={handleNavigate} />
        )}
        {currentPage === "resources" && (
          <ResourcesListPageNew onNavigate={handleNavigate} />
        )}
        {currentPage === "resource-detail" && (
          <ResourceDetailPage resourceId={selectedId} onNavigate={handleNavigate} />
        )}
        {currentPage === "tours" && (
          <ToursListPage onNavigate={handleNavigate} searchQuery={searchQuery} />
        )}
        {currentPage === "tour-detail" && (
          <TourDetailPageNew tourId={selectedId} onNavigate={handleNavigate} />
        )}
        {currentPage === "bookings" && (
          <ReservationsListPage onNavigate={handleNavigate} />
        )}
        {currentPage === "booking-detail" && (
          <ReservationDetailPageNew reservationId={selectedId} onNavigate={handleNavigate} />
        )}
        {currentPage === "booking-form" && (
          <BookingFormPage tourId={selectedId} onNavigate={handleNavigate} />
        )}
        {currentPage === "training-hub" && (
          <TrainingHubPage onNavigate={handleNavigate} />
        )}
        {currentPage === "training-video" && (
          <TrainingVideoPage videoId={selectedId} onNavigate={handleNavigate} />
        )}
      </Layout>
      <Toaster />
    </>
  );
}
```

---

## COMPONENTES

### `/components/layout.tsx`

```tsx
import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { AITravelAssistant } from "./AITravelAssistant";

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearch?: (query: string) => void;
}

export function Layout({ children, currentPage, onNavigate, onSearch }: LayoutProps) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onNavigate={onNavigate} onSearch={onSearch} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <AITravelAssistant />
    </div>
  );
}
```

### `/components/sidebar.tsx`

```tsx
import { Home, Package, Calendar, FolderOpen, GraduationCap, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import logoImage from "figma:asset/b0068d10880ef77f72866c01e1cd0f92ea3daf5f.png";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navigation = [
  { id: "dashboard", label: "Inicio", icon: Home },
  { id: "tours", label: "Buscador", icon: Package },
  { id: "bookings", label: "Reservas", icon: Calendar },
  { id: "resources", label: "Recursos y Materiales", icon: FolderOpen },
  { id: "training-hub", label: "Centro de Capacitación", icon: GraduationCap },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-white border-r border-neutral-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex flex-col gap-2">
          <img src={logoImage} alt="TravelShop" className="h-10 w-auto object-contain" />
          <p className="text-sm text-neutral-600">Partner Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive ? "bg-primary-50 text-primary-600 hover:bg-primary-100" : "text-neutral-600 hover:text-neutral-900"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 text-neutral-600">
          <Settings className="w-5 h-5" />
          <span>Configuración</span>
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => onNavigate("login")}
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  );
}
```

### `/components/topbar.tsx`

```tsx
import { Bell, Search, User, Clock, Package, Calendar, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

interface TopbarProps {
  onNavigate: (page: string) => void;
  onSearch?: (query: string) => void;
}

const notifications = [
  {
    id: 1,
    type: "booking",
    icon: Calendar,
    title: "Nueva reservación confirmada",
    message: "Tu reservación RES-2025-156 ha sido confirmada exitosamente",
    time: "Hace 5 minutos",
    unread: true,
  },
  {
    id: 2,
    type: "tour",
    icon: Package,
    title: "Nuevo tour disponible",
    message: "Tokyo Imperial - Tour de 10 días ahora disponible para reservación",
    time: "Hace 2 horas",
    unread: true,
  },
  {
    id: 3,
    type: "message",
    icon: MessageSquare,
    title: "Mensaje del operador",
    message: "TravelShop respondió a tu consulta sobre Cancún Todo Incluido",
    time: "Hace 4 horas",
    unread: false,
  },
  {
    id: 4,
    type: "update",
    icon: Clock,
    title: "Actualización de horario",
    message: "La salida del tour 'Cancún Premium' cambió a las 08:00 AM",
    time: "Hace 1 día",
    unread: false,
  },
  {
    id: 5,
    type: "booking",
    icon: Calendar,
    title: "Recordatorio de pago",
    message: "El pago final de tu reservación RES-2025-134 vence en 3 días",
    time: "Hace 1 día",
    unread: false,
  },
];

export function Topbar({ onNavigate, onSearch }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
      onNavigate("tours"); // Navigate to tours page with search results
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Real-time search as user types
    if (onSearch) {
      onSearch(query);
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Buscar tours por nombre, destino..."
            className="pl-10 bg-neutral-50 border-neutral-200"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
        >
          <Bell className="w-5 h-5 text-neutral-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary-100 text-primary-700">
                  AG
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="text-neutral-900">Agencia Viajes Global</div>
                <div className="text-neutral-500">ID: AG-2024-001</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>Soporte</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onNavigate("login")}
            >
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notifications Dialog */}
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Notificaciones</DialogTitle>
            <DialogDescription>
              Tienes {unreadCount} {unreadCount === 1 ? 'notificación nueva' : 'notificaciones nuevas'}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`flex gap-4 p-4 rounded-lg border transition-colors hover:bg-neutral-50 cursor-pointer ${
                      notification.unread 
                        ? "bg-primary-50 border-primary-200" 
                        : "bg-white border-neutral-200"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.unread ? "bg-primary-100" : "bg-neutral-100"
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        notification.unread ? "text-primary-600" : "text-neutral-600"
                      }`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-neutral-900">
                          {notification.title}
                        </p>
                        {notification.unread && (
                          <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1"></span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={() => setNotificationsOpen(false)}>
              Cerrar
            </Button>
            <Button className="flex-1 bg-primary-500 hover:bg-primary-600">
              Marcar todas como leídas
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### `/components/status-badge.tsx`

```tsx
import { Badge } from "./ui/badge";

export type ReservationStatus = "confirmed" | "pending" | "docs-pending" | "cancelled";

interface StatusBadgeProps {
  status: ReservationStatus;
}

const statusConfig = {
  confirmed: {
    label: "Confirmada",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  pending: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
  "docs-pending": {
    label: "Docs Pendientes",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  },
  cancelled: {
    label: "Cancelada",
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
}
```

---

**NOTA:** Este archivo es muy extenso. Por limitaciones de espacio, voy a continuar con los archivos más importantes. ¿Te gustaría que:

1. **Complete este archivo** con TODOS los componentes y páginas (será muy largo)
2. **Cree archivos separados** para cada categoría (componentes, páginas, data, etc.)
3. **Te proporcione un enlace** para descargar todo el código

Por ahora, continuaré con los archivos críticos más importantes:

