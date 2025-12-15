import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { 
  ArrowLeft, Mail, MessageSquare, Phone, User, Calendar, 
  MapPin, DollarSign, FileText, Send, Plus, Check, Download
} from "lucide-react";
import { StatusBadge } from "../components/status-badge";
import { Separator } from "../components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner@2.0.3";
import { ReservationPDFPreview } from "../components/ReservationPDFPreview";

interface ReservationDetailPageProps {
  reservationId?: string;
  onNavigate: (page: string) => void;
}

const mockReservation = {
  id: "RES-2024-156",
  status: "confirmed",
  tour: "Cancún Todo Incluido Premium",
  departure: "15 Dic 2024",
  duration: "5 días / 4 noches",
  passengers: 2,
  price: 37000,
  created: "18 Nov 2024",
  mainPassenger: {
    name: "María García López",
    email: "maria.garcia@email.com",
    phone: "+52 55 1234 5678",
    passport: "M12345678"
  },
  payment: {
    method: "Transferencia bancaria",
    status: "Pagado",
    amount: 37000,
    deposit: 10000,
    balance: 0
  }
};

const mockComments = [
  {
    id: "1",
    author: "Agente - Tú",
    date: "18 Nov 2024 14:30",
    text: "Cliente solicitó habitación con vista al mar. Confirmado con hotel."
  },
  {
    id: "2",
    author: "Sistema",
    date: "18 Nov 2024 15:00",
    text: "Reservación confirmada por el proveedor. Voucher generado automáticamente."
  }
];

export function ReservationDetailPageNew({ reservationId, onNavigate }: ReservationDetailPageProps) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: mockReservation.mainPassenger.email,
    subject: `Confirmación de Reservación ${mockReservation.id}`,
    body: ""
  });
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  // Data for PDF preview
  const pdfReservationData = {
    id: mockReservation.id,
    tour: mockReservation.tour,
    passenger: mockReservation.mainPassenger.name,
    agency: "Viajes Globales Express",
    departure: mockReservation.departure,
    duration: mockReservation.duration,
    passengers: mockReservation.passengers,
    totalPrice: `$${mockReservation.price.toLocaleString()} MXN`
  };

  const handleSendEmail = () => {
    // Simular envío de correo
    toast.success("Correo enviado exitosamente", {
      description: `Enviado a ${emailForm.to}`
    });
    setShowEmailDialog(false);
    setEmailForm({ ...emailForm, body: "" });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: String(comments.length + 1),
        author: "Agente - Tú",
        date: new Date().toLocaleString('es-MX', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        text: newComment
      };
      setComments([...comments, comment]);
      setNewComment("");
      setShowCommentDialog(false);
      toast.success("Comentario agregado exitosamente");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate("bookings")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl text-neutral-900">{mockReservation.id}</h1>
            <p className="text-neutral-600">{mockReservation.tour}</p>
          </div>
        </div>
        <StatusBadge status={mockReservation.status as any} />
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            {/* Email Dialog */}
            <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
              <DialogTrigger asChild>
                <Button className="bg-primary-500 hover:bg-primary-600">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar correo a pasajero
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Enviar correo a tu cliente</DialogTitle>
                  <DialogDescription>
                    Comunícate con tu pasajero sobre los detalles de su reservación
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-to">Para</Label>
                    <Input
                      id="email-to"
                      type="email"
                      value={emailForm.to}
                      onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Asunto</Label>
                    <Input
                      id="email-subject"
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-body">Mensaje</Label>
                    <Textarea
                      id="email-body"
                      rows={10}
                      placeholder="Escribe tu mensaje aquí..."
                      value={emailForm.body}
                      onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
                    />
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800 text-sm">
                      <strong>Sugerencia:</strong> Puedes adjuntar automáticamente el voucher y los detalles de la reservación.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    className="bg-primary-500 hover:bg-primary-600"
                    onClick={handleSendEmail}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar correo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add Comment Dialog */}
            <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Agregar comentario
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar comentario interno</DialogTitle>
                  <DialogDescription>
                    Este comentario es solo visible para tu equipo
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Textarea
                    rows={6}
                    placeholder="Escribe tu comentario aquí..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowCommentDialog(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    className="bg-primary-500 hover:bg-primary-600"
                    onClick={handleAddComment}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar comentario
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Llamar cliente
            </Button>

            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Descargar voucher
            </Button>

            <Button variant="outline" onClick={() => setPdfPreviewOpen(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Generar PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tour Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Tour</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Tour</p>
                    <p className="text-neutral-900">{mockReservation.tour}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Fecha de salida</p>
                    <p className="text-neutral-900">{mockReservation.departure}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Duración</p>
                    <p className="text-neutral-900">{mockReservation.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-neutral-500">Pasajeros</p>
                    <p className="text-neutral-900">{mockReservation.passengers} personas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Pasajero Principal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-neutral-500">Nombre completo</Label>
                  <p className="text-neutral-900 mt-1">{mockReservation.mainPassenger.name}</p>
                </div>
                <div>
                  <Label className="text-neutral-500">Correo electrónico</Label>
                  <p className="text-neutral-900 mt-1">{mockReservation.mainPassenger.email}</p>
                </div>
                <div>
                  <Label className="text-neutral-500">Teléfono</Label>
                  <p className="text-neutral-900 mt-1">{mockReservation.mainPassenger.phone}</p>
                </div>
                <div>
                  <Label className="text-neutral-500">Pasaporte</Label>
                  <p className="text-neutral-900 mt-1">{mockReservation.mainPassenger.passport}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments & Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Comentarios y Actividad</CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowCommentDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo comentario
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={comment.id}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {comment.author.includes("Sistema") ? (
                          <Check className="w-4 h-4 text-primary-600" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-primary-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-neutral-900">{comment.author}</span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-500 text-sm">{comment.date}</span>
                        </div>
                        <p className="text-neutral-600">{comment.text}</p>
                      </div>
                    </div>
                    {index < comments.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Precio total:</span>
                  <span className="text-neutral-900">${mockReservation.payment.amount.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Anticipo:</span>
                  <span className="text-emerald-600">-${mockReservation.payment.deposit.toLocaleString()} MXN</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-neutral-900">Saldo pendiente:</span>
                  <span className="text-neutral-900 text-xl">
                    ${mockReservation.payment.balance.toLocaleString()} MXN
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800">Pagado completamente</span>
                </div>
              </div>

              <div>
                <Label className="text-neutral-500">Método de pago</Label>
                <p className="text-neutral-900 mt-1">{mockReservation.payment.method}</p>
              </div>
            </CardContent>
          </Card>

          {/* Reservation Info */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Reservación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-neutral-500">ID de Reservación</Label>
                <p className="text-neutral-900 mt-1">{mockReservation.id}</p>
              </div>
              <div>
                <Label className="text-neutral-500">Fecha de creación</Label>
                <p className="text-neutral-900 mt-1">{mockReservation.created}</p>
              </div>
              <div>
                <Label className="text-neutral-500">Estado</Label>
                <div className="mt-1">
                  <StatusBadge status={mockReservation.status as any} />
                </div>
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
                Enviar itinerario
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Enviar voucher
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="w-4 h-4 mr-2" />
                Recordatorio de pago
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                Cancelar reservación
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PDF Preview Dialog */}
      <ReservationPDFPreview 
        reservation={pdfReservationData}
        isOpen={pdfPreviewOpen}
        onClose={() => setPdfPreviewOpen(false)}
      />
    </div>
  );
}