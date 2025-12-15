import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { StatusBadge, ReservationStatus } from "../components/status-badge";
import { Search, MoreVertical, Eye, Download, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface ReservationsListPageProps {
  onNavigate: (page: string, reservationId?: string) => void;
}

const reservations = [
  { id: "RES-2024-156", tour: "Cancún Todo Incluido Premium", passenger: "María García López", agency: "Agencia Viajes Global", status: "confirmed" as ReservationStatus, date: "2024-11-18", departure: "15 Dic 2024" },
  { id: "RES-2024-157", tour: "Europa Clásica 15 días", passenger: "Carlos Ruiz Martínez", agency: "Agencia Viajes Global", status: "pending" as ReservationStatus, date: "2024-11-19", departure: "20 Dic 2024" },
  { id: "RES-2024-158", tour: "Riviera Maya Todo Incluido", passenger: "Ana Martínez Sánchez", agency: "Agencia Viajes Global", status: "docs-pending" as ReservationStatus, date: "2024-11-20", departure: "12 Dic 2024" },
  { id: "RES-2024-159", tour: "Nueva York Express", passenger: "Luis Hernández", agency: "Agencia Viajes Global", status: "new" as ReservationStatus, date: "2024-11-20", departure: "18 Dic 2024" },
  { id: "RES-2024-160", tour: "Patagonia Aventura", passenger: "Sandra Torres", agency: "Agencia Viajes Global", status: "confirmed" as ReservationStatus, date: "2024-11-17", departure: "10 Ene 2025" },
  { id: "RES-2024-161", tour: "París Romántico", passenger: "Roberto Gómez", agency: "Agencia Viajes Global", status: "cancelled" as ReservationStatus, date: "2024-11-16", departure: "14 Ene 2025" },
  { id: "RES-2024-162", tour: "Cancún Todo Incluido", passenger: "Patricia Díaz", agency: "Agencia Viajes Global", status: "pending" as ReservationStatus, date: "2024-11-15", departure: "22 Dic 2024" },
];

export function ReservationsListPage({ onNavigate }: ReservationsListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         res.passenger.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         res.tour.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || res.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-neutral-900 mb-2">Gestión de Reservaciones</h1>
          <p className="text-neutral-600">
            Administra y da seguimiento a todas tus reservaciones
          </p>
        </div>
        <Button className="bg-primary-500 hover:bg-primary-600">
          Nueva Reservación
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedStatus("all")}
        >
          <CardContent className="pt-6 text-center">
            <div className="text-2xl text-neutral-900 mb-1">24</div>
            <p className="text-neutral-500">Total</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedStatus("new")}
        >
          <CardContent className="pt-6 text-center">
            <div className="text-2xl text-blue-600 mb-1">2</div>
            <p className="text-neutral-500">Nuevas</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedStatus("pending")}
        >
          <CardContent className="pt-6 text-center">
            <div className="text-2xl text-amber-600 mb-1">5</div>
            <p className="text-neutral-500">Pendientes</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedStatus("confirmed")}
        >
          <CardContent className="pt-6 text-center">
            <div className="text-2xl text-emerald-600 mb-1">14</div>
            <p className="text-neutral-500">Confirmadas</p>
          </CardContent>
        </Card>
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setSelectedStatus("docs-pending")}
        >
          <CardContent className="pt-6 text-center">
            <div className="text-2xl text-purple-600 mb-1">3</div>
            <p className="text-neutral-500">Docs Pendientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Buscar por ID, pasajero o tour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="new">Nuevas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="confirmed">Confirmadas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
                <SelectItem value="docs-pending">Docs Pendientes</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Fecha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las fechas</SelectItem>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-neutral-600">
          Mostrando {filteredReservations.length} de {reservations.length} reservaciones
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Reservations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Reservación</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Pasajero</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Registro</TableHead>
                <TableHead>Salida</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((res) => (
                <TableRow 
                  key={res.id}
                  className="cursor-pointer hover:bg-neutral-50"
                  onClick={() => onNavigate("booking-detail", res.id)}
                >
                  <TableCell className="text-primary-600">{res.id}</TableCell>
                  <TableCell>{res.date}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-neutral-900">{res.passenger}</div>
                      <div className="text-neutral-500">{res.tour}</div>
                    </div>
                  </TableCell>
                  <TableCell>{res.departure}</TableCell>
                  <TableCell>
                    <StatusBadge status={res.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onNavigate("booking-detail", res.id); }}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar correo
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Download className="w-4 h-4 mr-2" />
                          Descargar voucher
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}