import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { FileText, Download, Search, Filter, Eye, Play, FileImage, Video } from "lucide-react";

interface ResourcesListPageProps {
  onNavigate: (page: string, resourceId?: string) => void;
}

const resources = [
  { 
    id: "1", 
    title: "Brochure Verano 2025 - Caribe", 
    type: "Brochure", 
    destination: "Caribe", 
    updated: "18 Nov 2024", 
    size: "4.2 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1653959747793-c7c3775665f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhcmFkaXNlJTIwYmVhY2glMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjg2OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "pdf"
  },
  { 
    id: "2", 
    title: "Video Tutorial: Cómo Vender Cancún", 
    type: "Video", 
    destination: "Caribe", 
    updated: "17 Nov 2024", 
    size: "52 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1740342075826-bbe0a3884a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNodSUyMHBpY2NodSUyMHN1bnJpc2UlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzYzNjg2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "video",
    duration: "12:45"
  },
  { 
    id: "3", 
    title: "Tarifario Europa Circuitos 2025", 
    type: "Tarifas", 
    destination: "Europa", 
    updated: "16 Nov 2024", 
    size: "2.1 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1704301123672-929bec118be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBibHVlJTIwZG9tZXxlbnwxfHx8fDE3NjM1Nzk5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "pdf"
  },
  { 
    id: "4", 
    title: "Manual de Ventas Actualizado", 
    type: "Manual", 
    destination: "General", 
    updated: "15 Nov 2024", 
    size: "8.5 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1726473039977-845a26101d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmljZSUyMHRlcnJhY2VzJTIwZ3JlZW58ZW58MXx8fHwxNzYzNjg2OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "pdf"
  },
  { 
    id: "5", 
    title: "Video: Destinos Europa 2025", 
    type: "Video", 
    destination: "Europa", 
    updated: "14 Nov 2024", 
    size: "85 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1600623751202-59d68eb53d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwc3Vuc2V0JTIwYXNpYXxlbnwxfHx8fDE3NjM2ODY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "video",
    duration: "18:30"
  },
  { 
    id: "6", 
    title: "Promociones Diciembre 2024", 
    type: "Promoción", 
    destination: "General", 
    updated: "13 Nov 2024", 
    size: "1.8 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1681834418277-b01c30279693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGljZWxhbmQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzYzNjg2OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "pdf"
  },
  { 
    id: "7", 
    title: "Brochure Patagonia Premium", 
    type: "Brochure", 
    destination: "Sudamérica", 
    updated: "12 Nov 2024", 
    size: "5.3 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1712479667983-9f2872d33fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBicm9jaHVyZSUyMGRvY3VtZW50fGVufDF8fHx8MTc2MzY4MTM5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "pdf"
  },
  { 
    id: "8", 
    title: "Video: Técnicas de Venta Efectivas", 
    type: "Video", 
    destination: "General", 
    updated: "10 Nov 2024", 
    size: "42 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1758272421578-840698d05a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHR1dG9yaWFsJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2MzYyNTk2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "video",
    duration: "9:20"
  },
  { 
    id: "9", 
    title: "Guía de Destinos Asia 2025", 
    type: "Guía", 
    destination: "Asia", 
    updated: "08 Nov 2024", 
    size: "12.4 MB", 
    preview: true,
    thumbnail: "https://images.unsplash.com/photo-1693045181676-57199422ee66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZGYlMjBkb2N1bWVudCUyMHBhZ2VzfGVufDF8fHx8MTc2MzY4MTM5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    mediaType: "pdf"
  }
];

export function ResourcesListPageNew({ onNavigate }: ResourcesListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDestination = selectedDestination === "all" || resource.destination === selectedDestination;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    return matchesSearch && matchesDestination && matchesType;
  });

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "video":
        return Video;
      case "image":
        return FileImage;
      default:
        return FileText;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-neutral-900 mb-2">Recursos y Materiales</h1>
        <p className="text-neutral-600">
          Accede a brochures, tarifarios, manuales, videos y material promocional actualizado
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Total Recursos</p>
                <h3 className="text-3xl text-neutral-900">{resources.length}</h3>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Videos</p>
                <h3 className="text-3xl text-neutral-900">
                  {resources.filter(r => r.mediaType === "video").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Documentos PDF</p>
                <h3 className="text-3xl text-neutral-900">
                  {resources.filter(r => r.mediaType === "pdf").length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Nuevos esta semana</p>
                <h3 className="text-3xl text-neutral-900">12</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Buscar recursos, videos, documentos..."
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
                <SelectItem value="Video">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-neutral-600">
          Mostrando {filteredResources.length} recursos
        </p>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            Lista
          </Button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}>
        {filteredResources.map((resource) => {
          const MediaIcon = getMediaIcon(resource.mediaType);

          if (viewMode === "grid") {
            return (
              <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                {/* Thumbnail */}
                <div className="aspect-[4/3] bg-neutral-200 relative overflow-hidden">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {resource.mediaType === "video" && (
                    <>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary-600 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                        {resource.duration}
                      </div>
                    </>
                  )}
                  <div className="absolute top-2 left-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                      <MediaIcon className="w-4 h-4 text-neutral-600" />
                      <span className="text-xs text-neutral-900">{resource.type}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="text-neutral-900 mb-1 line-clamp-2">{resource.title}</h3>
                    <p className="text-neutral-500">{resource.destination}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span>{resource.size}</span>
                    <span>{resource.updated}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onNavigate("resource-detail", resource.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary-500 hover:bg-primary-600">
                      <Download className="w-4 h-4 mr-1" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          } else {
            return (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="w-24 h-20 bg-neutral-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img 
                        src={resource.thumbnail} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      {resource.mediaType === "video" && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <MediaIcon className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-neutral-900 truncate">{resource.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-neutral-500 mt-1">
                            <span>{resource.type}</span>
                            <span>•</span>
                            <span>{resource.destination}</span>
                            <span>•</span>
                            <span>{resource.size}</span>
                            <span>•</span>
                            <span>{resource.updated}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate("resource-detail", resource.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver
                      </Button>
                      <Button size="sm" className="bg-primary-500 hover:bg-primary-600">
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
}