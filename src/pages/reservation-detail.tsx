import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { StatusBadge, ReservationStatus } from "../components/status-badge";
import { ArrowLeft, Download, Mail, Upload, MessageSquare, User, Calendar, MapPin, DollarSign, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { ReservationPDFPreview } from "../components/ReservationPDFPreview";

interface ReservationDetailPageProps {
  reservationId?: string;
  onNavigate: (page: string) => void;
}

const timeline = [
  { date: "2024-11-20 14:30", user: "Sistema", action: "Reservación creada", type: "system" },
  { date: "2024-11-20 14:35", user: "Agente María López", action: "Documentos del pasajero cargados", type: "action" },
  { date: "2024-11-20 15:00", user: "Coordinador TravelShop", action: "Reservación verificada", type: "action" },
  { date: "2024-11-20 16:20", user: "Agente María López", action: "Comentario: Cliente solicita habitación con vista al mar", type: "comment" },
];

// Mock reservation data
const mockReservation = {
  id: "RES-2024-156",
  tour: "Cancún Todo Incluido Premium",
  passenger: "María García López",
  agency: "Viajes Globales Express",
  departure: "15 Dic 2024",
  duration: "5 días / 4 noches",
  passengers: 2,
  totalPrice: "$37,000 MXN"
};

export function ReservationDetailPage({ onNavigate }: ReservationDetailPageProps) {
  const [newComment, setNewComment] = useState("");
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedNewStatus, setSelectedNewStatus] = useState<ReservationStatus>("confirmed");
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("");
    }
  };

  const handleUpdateStatus = () => {
    // Update status logic here
    setStatusDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => onNavigate("reservations")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a reservaciones
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl text-neutral-900">RES-2024-158</h1>
            <StatusBadge status="docs-pending" />
          </div>
          <p className="text-neutral-600">
            Registrada el 20 Nov 2024 a las 14:30
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Enviar correo
          </Button>
          <Button variant="outline" onClick={() => setPdfPreviewOpen(true)}>
            <Download className="w-4 h-4 mr-2" />
            Generar PDF
          </Button>
          <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-500 hover:bg-primary-600">
                Actualizar Estado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Actualizar Estado de Reservación</DialogTitle>
                <DialogDescription>
                  Cambia el estado de la reservación RES-2024-158
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nuevo estado</Label>
                  <Select value={selectedNewStatus} onValueChange={(value) => setSelectedNewStatus(value as ReservationStatus)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nueva</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="confirmed">Confirmada</SelectItem>
                      <SelectItem value="cancelled">Cancelada</SelectItem>
                      <SelectItem value="docs-pending">Docs Pendientes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Comentario (opcional)</Label>
                  <Textarea placeholder="Añade una nota sobre este cambio..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-primary-500 hover:bg-primary-600" onClick={handleUpdateStatus}>
                  Actualizar Estado
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Passenger Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Información del Pasajero
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-500 mb-1">Nombre completo</p>
                  <p className="text-neutral-900">Ana Martínez Sánchez</p>
                </div>
                <div>
                  <p className="text-neutral-500 mb-1">Fecha de nacimiento</p>
                  <p className="text-neutral-900">15 Marzo 1985</p>
                </div>
                <div>
                  <p className="text-neutral-500 mb-1">Email</p>
                  <p className="text-neutral-900">ana.martinez@email.com</p>
                </div>
                <div>
                  <p className="text-neutral-500 mb-1">Teléfono</p>
                  <p className="text-neutral-900">+52 55 1234 5678</p>
                </div>
                <div>
                  <p className="text-neutral-500 mb-1">Pasaporte</p>
                  <p className="text-neutral-900">G12345678</p>
                </div>
                <div>
                  <p className="text-neutral-500 mb-1">Nacionalidad</p>
                  <p className="text-neutral-900">Mexicana</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tour Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Información del Tour
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-neutral-500 mb-1">Tour seleccionado</p>
                <h3 className="text-xl text-neutral-900">Riviera Maya Todo Incluido</h3>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-neutral-500 mb-1">Fecha de salida</p>
                    <p className="text-neutral-900">12 Diciembre 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-neutral-500 mb-1">Fecha de regreso</p>
                    <p className="text-neutral-900">19 Diciembre 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-neutral-500 mb-1">Número de pasajeros</p>
                    <p className="text-neutral-900">2 adultos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-neutral-400 mt-0.5" />
                  <div>
                    <p className="text-neutral-500 mb-1">Precio total</p>
                    <p className="text-neutral-900">$45,000 MXN</p>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-neutral-500 mb-1">Detalles adicionales</p>
                <p className="text-neutral-600">
                  Habitación doble, plan todo incluido, traslados incluidos desde/hacia aeropuerto de Cancún.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Documentos
                </span>
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Subir documento
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-neutral-900">Pasaporte_AnaMartinez.pdf</p>
                      <p className="text-neutral-500">Subido el 20 Nov 2024</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-neutral-900">ComprobantePago.pdf</p>
                      <p className="text-neutral-500">Subido el 20 Nov 2024</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Historial y Comentarios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Timeline */}
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        item.type === 'system' ? 'bg-neutral-400' :
                        item.type === 'action' ? 'bg-primary-500' :
                        'bg-secondary-500'
                      }`} />
                      {index < timeline.length - 1 && (
                        <div className="w-px h-full bg-neutral-200 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-neutral-900">{item.action}</p>
                      <p className="text-neutral-500 mt-1">
                        {item.user} • {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Add Comment */}
              <div className="space-y-3">
                <Label>Añadir comentario</Label>
                <Textarea
                  placeholder="Escribe un comentario sobre esta reservación..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  Agregar Comentario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agency Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Agencia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-neutral-500 mb-1">Agencia</p>
                <p className="text-neutral-900">Agencia Viajes Global</p>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">ID Agencia</p>
                <p className="text-neutral-900">AG-2024-001</p>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">Agente responsable</p>
                <p className="text-neutral-900">María López</p>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">Email agencia</p>
                <p className="text-neutral-900">contacto@viajesglobal.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Precio total</span>
                <span className="text-neutral-900">$45,000 MXN</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Anticipo (30%)</span>
                <span className="text-emerald-600">$13,500 MXN ✓</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Saldo pendiente</span>
                <span className="text-amber-600">$31,500 MXN</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Fecha límite de pago</span>
                <span className="text-neutral-900">05 Dic 2024</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Enviar confirmación
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Generar voucher
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Ver calendario
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PDF Preview Dialog */}
      <ReservationPDFPreview 
        reservation={mockReservation}
        isOpen={pdfPreviewOpen}
        onClose={() => setPdfPreviewOpen(false)}
      />
    </div>
  );
}