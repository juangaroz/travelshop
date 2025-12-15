import { Home, Package, Calendar, FolderOpen, GraduationCap, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import logoImage from "../assets/b0068d10880ef77f72866c01e1cd0f92ea3daf5f.png";

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