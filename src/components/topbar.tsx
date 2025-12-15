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