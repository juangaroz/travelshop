import { Button } from "./ui/button";
import {
  Calendar,
  FolderOpen,
  GraduationCap,
  Image,
  LogOut,
  Settings,
  Map
} from "lucide-react";
import logoImage from "../assets/b0068d10880ef77f72866c01e1cd0f92ea3daf5f.png";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { role, signOut, session } = useAuth();

  // 🔒 Sin sesión → no sidebar
  if (!session) return null;

  const adminNavigation = [
    { id: "dashboard", label: "Dashboard", icon: Map },
    { id: "tours", label: "Tours", icon: Map },
    { id: "bookings", label: "Reservas", icon: Calendar },
    { id: "training-hub", label: "Training", icon: GraduationCap },
    { id: "resources", label: "Media", icon: Image },
  ];

  const agentNavigation = [
    { id: "tours", label: "Tours", icon: Map },
    { id: "bookings", label: "Mis Reservas", icon: Calendar },
    { id: "training-hub", label: "Training", icon: GraduationCap },
    { id: "resources", label: "Media", icon: Image },
  ];

  const navigation = role === "admin" ? adminNavigation : agentNavigation;

  return (
    <div className="w-64 h-screen bg-white border-r border-neutral-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200">
        <img src={logoImage} alt="TravelShop" className="h-10 w-auto" />
        <p className="text-sm text-neutral-600 mt-1">
          Rol: {role}
        </p>
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
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-neutral-600"
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
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="w-5 h-5" />
          Configuración
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600"
          onClick={async () => {
            await signOut();
            onNavigate("landing");
          }}
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}