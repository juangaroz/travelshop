import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Sparkles, 
  Globe, 
  DollarSign, 
  Users, 
  Palmtree,
  Mountain,
  Building2,
  Utensils,
  ShoppingBag,
  Moon,
  Trees,
  Camera,
  Waves,
  Footprints,
  Baby,
  CheckCircle2,
  Heart
} from "lucide-react";

interface SmartSearchWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  countries: string[];
  budget: string;
  ages: string;
  activities: string[];
  tourType: string;
}

const getActivityIcon = (activity: string) => {
  const icons: Record<string, any> = {
    "Playas y descanso": Palmtree,
    "Aventura y deportes extremos": Mountain,
    "Cultura e historia": Building2,
    "Gastronomía": Utensils,
    "Compras": ShoppingBag,
    "Vida nocturna": Moon,
    "Naturaleza y ecoturismo": Trees,
    "Fotografía": Camera,
    "Deportes acuáticos": Waves,
    "Senderismo": Footprints
  };
  return icons[activity] || Trees;
};

const countries = [
  "México", "Estados Unidos", "Canadá", "Francia", "Italia", 
  "España", "Reino Unido", "Alemania", "Argentina", "Brasil", 
  "Perú", "Chile", "Japón", "Tailandia", "Australia"
];

const activities = [
  "Playas y descanso",
  "Aventura y deportes extremos",
  "Cultura e historia",
  "Gastronomía",
  "Compras",
  "Vida nocturna",
  "Naturaleza y ecoturismo",
  "Fotografía",
  "Deportes acuáticos",
  "Senderismo"
];

const budgetOptions = [
  { value: "low", label: "Económico", description: "Hasta $20,000 MXN" },
  { value: "medium", label: "Moderado", description: "$20,000 - $50,000 MXN" },
  { value: "high", label: "Premium", description: "$50,000 - $100,000 MXN" },
  { value: "luxury", label: "Lujo", description: "Más de $100,000 MXN" }
];

const ageOptions = [
  { value: "young", label: "Jóvenes", description: "18-30 años" },
  { value: "adult", label: "Adultos", description: "30-55 años" },
  { value: "senior", label: "Adultos mayores", description: "55+ años" },
  { value: "family", label: "Familia con niños", description: "Todas las edades" }
];

const tourTypes = [
  { value: "all-inclusive", label: "Todo Incluido", description: "Comidas, bebidas y actividades incluidas" },
  { value: "cultural", label: "Cultural", description: "Museos, monumentos e historia" },
  { value: "adventure", label: "Aventura", description: "Actividades extremas y naturaleza" },
  { value: "relaxation", label: "Relajación", description: "Spa, playas y descanso" },
  { value: "city", label: "Ciudad", description: "Tours urbanos y cosmopolitas" },
  { value: "family", label: "Familiar", description: "Ideal para toda la familia" }
];

export function SmartSearchWizard({ isOpen, onClose, onSearch }: SmartSearchWizardProps) {
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({
    countries: [],
    budget: "",
    ages: "",
    activities: [],
    tourType: ""
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onSearch(filters);
      handleClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFilters({
      countries: [],
      budget: "",
      ages: "",
      activities: [],
      tourType: ""
    });
    onClose();
  };

  const toggleCountry = (country: string) => {
    setFilters(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }));
  };

  const toggleActivity = (activity: string) => {
    setFilters(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return filters.countries.length > 0;
      case 2: return filters.budget !== "";
      case 3: return filters.ages !== "";
      case 4: return filters.activities.length > 0;
      case 5: return filters.tourType !== "";
      default: return false;
    }
  };

  const stepTitles = [
    { icon: Globe, title: "Destinos" },
    { icon: DollarSign, title: "Presupuesto" },
    { icon: Users, title: "Edades" },
    { icon: Palmtree, title: "Actividades" },
    { icon: Mountain, title: "Tipo de Tour" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-500" />
            <DialogTitle>Buscador Inteligente de Tours</DialogTitle>
          </div>
          <p className="text-neutral-500 text-sm">
            Responde algunas preguntas para encontrar el tour perfecto para tu cliente
          </p>
        </DialogHeader>

        {/* Horizontal Step Indicator */}
        <div className="flex items-center justify-between gap-2 px-4 py-4">
          {stepTitles.map((stepInfo, index) => {
            const StepIcon = stepInfo.icon;
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;
            
            return (
              <div key={stepNumber} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                    isActive 
                      ? 'bg-primary-500 text-white' 
                      : isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-neutral-200 text-neutral-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <p className={`text-xs text-center ${isActive ? 'text-primary-600' : 'text-neutral-600'}`}>
                    {stepInfo.title}
                  </p>
                </div>
                {index < stepTitles.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-1 mb-5 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Step 1: Countries */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg text-neutral-900 mb-1">¿Qué países le interesan a tu cliente?</h3>
                <p className="text-sm text-neutral-500">Selecciona uno o más destinos</p>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {countries.map((country) => (
                  <Card 
                    key={country}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      filters.countries.includes(country) 
                        ? 'border-2 border-primary-500 bg-primary-50' 
                        : 'border-2 border-transparent hover:border-primary-200'
                    }`}
                    onClick={() => toggleCountry(country)}
                  >
                    <CardContent className="p-3 text-center">
                      <Globe className={`w-5 h-5 mx-auto mb-1.5 ${
                        filters.countries.includes(country) ? 'text-primary-600' : 'text-neutral-400'
                      }`} />
                      <p className="text-xs text-neutral-900">{country}</p>
                      {filters.countries.includes(country) && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 mx-auto mt-1" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filters.countries.length > 0 && (
                <p className="text-sm text-primary-600">
                  ✓ {filters.countries.length} {filters.countries.length === 1 ? 'país seleccionado' : 'países seleccionados'}
                </p>
              )}
            </div>
          )}

          {/* Step 2: Budget */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg text-neutral-900 mb-1">¿Cuál es el presupuesto del cliente?</h3>
                <p className="text-sm text-neutral-500">Presupuesto aproximado por persona</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {budgetOptions.map((option) => (
                  <Card 
                    key={option.value}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      filters.budget === option.value 
                        ? 'border-2 border-primary-500 bg-primary-50' 
                        : 'border-2 border-transparent hover:border-primary-200'
                    }`}
                    onClick={() => setFilters({ ...filters, budget: option.value })}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        filters.budget === option.value ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-400'
                      }`}>
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-900">{option.label}</p>
                        <p className="text-xs text-neutral-500">{option.description}</p>
                      </div>
                      {filters.budget === option.value && (
                        <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Ages */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg text-neutral-900 mb-1">¿Cuál es el rango de edad de los viajeros?</h3>
                <p className="text-sm text-neutral-500">Esto nos ayuda a recomendar actividades adecuadas</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ageOptions.map((option) => (
                  <Card 
                    key={option.value}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      filters.ages === option.value 
                        ? 'border-2 border-secondary-500 bg-secondary-50' 
                        : 'border-2 border-transparent hover:border-secondary-200'
                    }`}
                    onClick={() => setFilters({ ...filters, ages: option.value })}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        filters.ages === option.value ? 'bg-secondary-500 text-white' : 'bg-neutral-100 text-neutral-400'
                      }`}>
                        {option.value === 'family' ? <Baby className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-900">{option.label}</p>
                        <p className="text-xs text-neutral-500">{option.description}</p>
                      </div>
                      {filters.ages === option.value && (
                        <CheckCircle2 className="w-5 h-5 text-secondary-600 shrink-0" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Activities */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg text-neutral-900 mb-1">¿Qué actividades le interesan?</h3>
                <p className="text-sm text-neutral-500">Selecciona las actividades que más disfrute tu cliente</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {activities.map((activity) => {
                  const Icon = getActivityIcon(activity);
                  return (
                    <Card 
                      key={activity}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        filters.activities.includes(activity) 
                          ? 'border-2 border-primary-500 bg-primary-50' 
                          : 'border-2 border-transparent hover:border-primary-200'
                      }`}
                      onClick={() => toggleActivity(activity)}
                    >
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          filters.activities.includes(activity) ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <p className="flex-1 text-sm text-neutral-900">{activity}</p>
                        {filters.activities.includes(activity) && (
                          <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              {filters.activities.length > 0 && (
                <p className="text-sm text-primary-600">
                  ✓ {filters.activities.length} {filters.activities.length === 1 ? 'actividad seleccionada' : 'actividades seleccionadas'}
                </p>
              )}
            </div>
          )}

          {/* Step 5: Tour Type */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg text-neutral-900 mb-1">¿Qué tipo de tour prefiere?</h3>
                <p className="text-sm text-neutral-500">Selecciona el estilo de viaje ideal</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {tourTypes.map((type) => {
                  const getIcon = (value: string) => {
                    const iconMap: Record<string, any> = {
                      "all-inclusive": Palmtree,
                      "cultural": Building2,
                      "adventure": Mountain,
                      "relaxation": Heart,
                      "city": Building2,
                      "family": Baby
                    };
                    return iconMap[value] || Mountain;
                  };
                  const Icon = getIcon(type.value);
                  
                  return (
                    <Card 
                      key={type.value}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        filters.tourType === type.value 
                          ? 'border-2 border-accent-500 bg-accent-50' 
                          : 'border-2 border-transparent hover:border-accent-200'
                      }`}
                      onClick={() => setFilters({ ...filters, tourType: type.value })}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          filters.tourType === type.value ? 'bg-accent-500 text-white' : 'bg-neutral-100 text-neutral-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900">{type.label}</p>
                          <p className="text-xs text-neutral-500">{type.description}</p>
                        </div>
                        {filters.tourType === type.value && (
                          <CheckCircle2 className="w-5 h-5 text-accent-600 shrink-0" />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons - Fixed at bottom */}
        <div className="flex items-center gap-3 px-6 py-4 border-t bg-white">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <div className="flex-1 text-center text-sm text-neutral-500">
            Paso {step} de {totalSteps}
          </div>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            size="lg"
            className="bg-primary-500 hover:bg-primary-600"
          >
            {step === totalSteps ? (
              <>
                <Search className="w-4 h-4 mr-2" />
                Buscar Tours
              </>
            ) : (
              <>
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
