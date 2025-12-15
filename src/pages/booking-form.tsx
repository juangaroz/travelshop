import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, Users, CreditCard, Check } from "lucide-react";

interface BookingFormPageProps {
  onNavigate: (page: string) => void;
  tourId?: string;
}

export function BookingFormPage({ onNavigate, tourId }: BookingFormPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [departureDate, setDepartureDate] = useState("");
  const [formData, setFormData] = useState({
    passengers: 1,
    mainPassengerName: "",
    mainPassengerEmail: "",
    mainPassengerPhone: "",
    mainPassengerPassport: "",
    specialRequests: "",
    roomType: "",
    paymentMethod: "",
  });

  const tourDetails = {
    id: tourId || "1",
    name: "Cancún Todo Incluido - 7 días",
    image: "https://images.unsplash.com/photo-1660315247626-12267f8d68db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwZGVzdGluYXRpb258ZW58MXx8fHwxNzYzNTgwNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    pricePerPerson: 18500,
  };

  const handleSubmit = () => {
    // Aquí iría la lógica de envío
    setCurrentStep(4);
  };

  const totalPrice = formData.passengers * tourDetails.pricePerPerson;

  const steps = [
    { number: 1, title: "Fecha y Pasajeros" },
    { number: 2, title: "Información" },
    { number: 3, title: "Pago" },
    { number: 4, title: "Confirmación" },
  ];

  if (currentStep === 4) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12 space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl text-neutral-900 mb-2">¡Reservación Exitosa!</h1>
              <p className="text-neutral-600 text-lg">
                Tu reservación ha sido creada exitosamente
              </p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Número de reservación:</span>
                  <span className="text-neutral-900">RES-2024-{Math.floor(Math.random() * 1000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tour:</span>
                  <span className="text-neutral-900">{tourDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Fecha de salida:</span>
                  <span className="text-neutral-900">
                    {departureDate ? departureDate : "Por definir"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Pasajeros:</span>
                  <span className="text-neutral-900">{formData.passengers}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-3">
                  <span className="text-neutral-900">Total:</span>
                  <span className="text-neutral-900">${totalPrice.toLocaleString()} MXN</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onNavigate("bookings")}
              >
                Ver mis reservaciones
              </Button>
              <Button
                className="flex-1 bg-primary-500 hover:bg-primary-600"
                onClick={() => onNavigate("dashboard")}
              >
                Volver al inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate("tour-detail")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl text-neutral-900">Nueva Reservación</h1>
          <p className="text-neutral-600">{tourDetails.name}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? "bg-primary-500 text-white"
                        : "bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span className="text-sm text-neutral-600 mt-2">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      currentStep > step.number ? "bg-primary-500" : "bg-neutral-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Selecciona fecha y número de pasajeros</CardTitle>
                <CardDescription>Elige cuándo quieres viajar y con cuántas personas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Fecha de salida</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? (
                          departureDate
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={departureDate ? new Date(departureDate) : undefined}
                        onSelect={(date) => setDepartureDate(date ? date.toISOString().split('T')[0] : "")}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Número de pasajeros</Label>
                  <Select
                    value={formData.passengers.toString()}
                    onValueChange={(value) =>
                      setFormData({ ...formData, passengers: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "pasajero" : "pasajeros"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de habitación</Label>
                  <Select
                    value={formData.roomType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, roomType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de habitación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Estándar</SelectItem>
                      <SelectItem value="superior">Superior</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full bg-primary-500 hover:bg-primary-600"
                  onClick={() => setCurrentStep(2)}
                  disabled={!departureDate || !formData.roomType}
                >
                  Continuar
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Información del pasajero principal</CardTitle>
                <CardDescription>
                  Ingresa los datos del contacto principal de la reservación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    placeholder="Juan Pérez García"
                    value={formData.mainPassengerName}
                    onChange={(e) =>
                      setFormData({ ...formData, mainPassengerName: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.mainPassengerEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, mainPassengerEmail: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      placeholder="+52 55 1234 5678"
                      value={formData.mainPassengerPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, mainPassengerPhone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passport">Número de pasaporte</Label>
                  <Input
                    id="passport"
                    placeholder="A12345678"
                    value={formData.mainPassengerPassport}
                    onChange={(e) =>
                      setFormData({ ...formData, mainPassengerPassport: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">Peticiones especiales (opcional)</Label>
                  <Textarea
                    id="requests"
                    placeholder="Dieta especial, alergias, accesibilidad, etc."
                    rows={4}
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({ ...formData, specialRequests: e.target.value })
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep(1)}
                  >
                    Atrás
                  </Button>
                  <Button
                    className="flex-1 bg-primary-500 hover:bg-primary-600"
                    onClick={() => setCurrentStep(3)}
                    disabled={
                      !formData.mainPassengerName ||
                      !formData.mainPassengerEmail ||
                      !formData.mainPassengerPhone
                    }
                  >
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Información de pago</CardTitle>
                <CardDescription>Selecciona tu método de pago preferido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Método de pago</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, paymentMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deposit">Depósito bancario</SelectItem>
                      <SelectItem value="transfer">Transferencia</SelectItem>
                      <SelectItem value="card">Tarjeta de crédito</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.paymentMethod === "card" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Vencimiento</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800">
                    <strong>Nota:</strong> Esta es una demo. No se procesará ningún pago real.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep(2)}
                  >
                    Atrás
                  </Button>
                  <Button
                    className="flex-1 bg-primary-500 hover:bg-primary-600"
                    onClick={handleSubmit}
                    disabled={!formData.paymentMethod}
                  >
                    Confirmar reservación
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Resumen de reservación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-neutral-200 rounded-lg overflow-hidden">
                <img
                  src={tourDetails.image}
                  alt={tourDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-neutral-900 mb-1">{tourDetails.name}</h3>
                <p className="text-neutral-600">7 días / 6 noches</p>
              </div>
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                {departureDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Fecha de salida:</span>
                    <span className="text-neutral-900">
                      {departureDate}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Pasajeros:</span>
                  <span className="text-neutral-900">{formData.passengers}</span>
                </div>
                {formData.roomType && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Habitación:</span>
                    <span className="text-neutral-900 capitalize">{formData.roomType}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">
                    ${tourDetails.pricePerPerson.toLocaleString()} × {formData.passengers}
                  </span>
                  <span className="text-neutral-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                  <span className="text-neutral-900">Total:</span>
                  <span className="text-neutral-900 text-2xl">
                    ${totalPrice.toLocaleString()} MXN
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}