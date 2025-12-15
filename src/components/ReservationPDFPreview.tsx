import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Mail, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ReservationPDFPreviewProps {
  reservation: {
    id: string;
    tour: string;
    passenger: string;
    agency: string;
    departure: string;
    duration: string;
    passengers: number;
    totalPrice: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationPDFPreview({ reservation, isOpen, onClose }: ReservationPDFPreviewProps) {
  const handleDownload = () => {
    // Simulate PDF download
    alert(`PDF descargado: Confirmación ${reservation.id}.pdf`);
  };

  const handleSendEmail = () => {
    // Simulate email sending
    alert(`Confirmación enviada por email al cliente y agencia: ${reservation.agency}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vista previa - Confirmación de Reserva</DialogTitle>
        </DialogHeader>

        {/* PDF Preview */}
        <div className="bg-white border-2 border-neutral-200 rounded-lg p-8 space-y-6">
          {/* Header with Agency Logo */}
          <div className="flex items-start justify-between border-b-2 border-primary-500 pb-6">
            <div>
              <div className="w-40 h-16 bg-neutral-100 rounded flex items-center justify-center mb-3">
                <span className="text-neutral-400">Logo Agencia</span>
              </div>
              <p className="text-neutral-600">{reservation.agency}</p>
              <p className="text-neutral-500">Agencia de Viajes Certificada</p>
            </div>
            <div className="text-right">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200" 
                alt="TravelShop Logo" 
                className="w-32 h-12 object-contain mb-2"
              />
              <p className="text-neutral-600">TravelShop Partner Portal</p>
              <p className="text-neutral-500">Tour Operador</p>
            </div>
          </div>

          {/* Confirmation Title */}
          <div className="text-center py-4 bg-primary-50 rounded-lg">
            <h2 className="text-2xl text-primary-600 mb-2">Confirmación de Reserva</h2>
            <p className="text-neutral-600">Número de confirmación: <span className="text-primary-600">{reservation.id}</span></p>
          </div>

          {/* Tour Information */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl text-neutral-900">Información del Tour</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-500">Tour</p>
                  <p className="text-neutral-900">{reservation.tour}</p>
                </div>
                <div>
                  <p className="text-neutral-500">Fecha de salida</p>
                  <p className="text-neutral-900">{reservation.departure}</p>
                </div>
                <div>
                  <p className="text-neutral-500">Duración</p>
                  <p className="text-neutral-900">{reservation.duration}</p>
                </div>
                <div>
                  <p className="text-neutral-500">Número de pasajeros</p>
                  <p className="text-neutral-900">{reservation.passengers} personas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Information */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl text-neutral-900">Información del Pasajero</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-500">Nombre completo</p>
                  <p className="text-neutral-900">{reservation.passenger}</p>
                </div>
                <div>
                  <p className="text-neutral-500">Agencia</p>
                  <p className="text-neutral-900">{reservation.agency}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="bg-primary-50 border-primary-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl text-neutral-900">Total a pagar</h3>
                <p className="text-3xl text-primary-600">{reservation.totalPrice}</p>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl text-neutral-900">Información importante</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Esta confirmación debe ser presentada el día de la salida</li>
                <li>• Favor de llegar 30 minutos antes de la hora de salida</li>
                <li>• Documentos de identificación son requeridos</li>
                <li>• Para cambios o cancelaciones contactar a su agencia</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Footer */}
          <div className="text-center pt-6 border-t border-neutral-200">
            <p className="text-neutral-600 mb-2">
              Operado por: <span className="text-primary-600">TravelShop</span>
            </p>
            <p className="text-neutral-500">
              Atención al cliente: soporte@travelshop.com | +52 55 1234 5678
            </p>
            <p className="text-neutral-400 mt-2">
              Documento generado el {new Date().toLocaleDateString('es-MX', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button 
            onClick={handleDownload}
            className="flex-1 bg-primary-500 hover:bg-primary-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
          <Button 
            onClick={handleSendEmail}
            className="flex-1 bg-secondary-500 hover:bg-secondary-600"
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar por Email
          </Button>
          <Button 
            onClick={onClose}
            variant="outline"
          >
            <X className="w-4 h-4 mr-2" />
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}