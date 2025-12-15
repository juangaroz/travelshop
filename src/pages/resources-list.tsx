import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { FileText, Download, Search, Filter, Eye } from "lucide-react";

interface ResourcesListPageProps {
  onNavigate: (page: string, resourceId?: string) => void;
}

const resources = [
  { id: "1", title: "Brochure Verano 2025 - Caribe", type: "Brochure", destination: "Caribe", updated: "18 Nov 2024", size: "4.2 MB", preview: true },
  { id: "2", title: "Tarifario Europa Circuitos 2025", type: "Tarifas", destination: "Europa", updated: "17 Nov 2024", size: "2.1 MB", preview: true },
  { id: "3", title: "Manual de Ventas Actualizado", type: "Manual", destination: "General", updated: "15 Nov 2024", size: "8.5 MB", preview: true },
  { id: "4", title: "Promociones Diciembre 2024", type: "Promoción", destination: "General", updated: "14 Nov 2024", size: "1.8 MB", preview: true },
  { id: "5", title: "Brochure Patagonia Premium", type: "Brochure", destination: "Sudamérica", updated: "12 Nov 2024", size: "5.3 MB", preview: true },
  { id: "6", title: "Guía de Destinos Asia 2025", type: "Guía", destination: "Asia", updated: "10 Nov 2024", size: "12.4 MB", preview: true },
  { id: "7", title: "Tarifario Todo Incluido Cancún", type: "Tarifas", destination: "Caribe", updated: "08 Nov 2024", size: "1.5 MB", preview: true },
  { id: "8", title: "Manual de Políticas y Procedimientos", type: "Manual", destination: "General", updated: "05 Nov 2024", size: "3.2 MB", preview: true },
  { id: "9", title: "Brochure Nueva York y Boston", type: "Brochure", destination: "Norteamérica", updated: "03 Nov 2024", size: "4.8 MB", preview: true },
];

export function ResourcesListPage({ onNavigate }: ResourcesListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDestination = selectedDestination === "all" || resource.destination === selectedDestination;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesDestination && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-neutral-900 mb-2">Recursos y Materiales</h1>
        <p className="text-neutral-600">
          Accede a brochures, tarifarios, manuales y material promocional actualizado
        </p>
      </div>

      {/* Filters Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Buscar recursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Destination Filter */}
            <Select value={selectedDestination} onValueChange={setSelectedDestination}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Destino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los destinos</SelectItem>
                <SelectItem value="Caribe">Caribe</SelectItem>
                <SelectItem value="Europa">Europa</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Sudamérica">Sudamérica</SelectItem>
                <SelectItem value="Norteamérica">Norteamérica</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="Brochure">Brochures</SelectItem>
                <SelectItem value="Tarifas">Tarifarios</SelectItem>
                <SelectItem value="Manual">Manuales</SelectItem>
                <SelectItem value="Promoción">Promociones</SelectItem>
                <SelectItem value="Guía">Guías</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Más filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-neutral-600">
          Mostrando {filteredResources.length} de {resources.length} recursos
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Vista cuadrícula
          </Button>
          <Button variant="outline" size="sm">
            Vista lista
          </Button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Preview Area */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center border-b border-neutral-200">
                <FileText className="w-16 h-16 text-primary-500" />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-neutral-900 mb-1 line-clamp-2">{resource.title}</h3>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <span className="px-2 py-1 bg-neutral-100 rounded text-xs">{resource.type}</span>
                    <span>•</span>
                    <span className="text-xs">{resource.destination}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-neutral-500 pt-3 border-t border-neutral-200">
                  <span className="text-xs">{resource.updated}</span>
                  <span className="text-xs">{resource.size}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onNavigate("resource-detail", resource.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-primary-500 hover:bg-primary-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
