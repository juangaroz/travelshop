import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Download, Share2, FileText, Calendar } from "lucide-react";

interface ResourceDetailPageProps {
  resourceId?: string;
  onNavigate: (page: string) => void;
}

const relatedResources = [
  { id: "2", title: "Tarifario Europa 2025", type: "Tarifas" },
  { id: "3", title: "Manual de Ventas", type: "Manual" },
  { id: "4", title: "Promociones Diciembre", type: "Promoción" },
];

export function ResourceDetailPage({ onNavigate }: ResourceDetailPageProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => onNavigate("resources")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a recursos
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                Brochure
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full">
                Caribe
              </span>
            </div>
            <h1 className="text-3xl text-neutral-900 mb-3">
              Brochure Verano 2025 - Caribe
            </h1>
            <div className="flex items-center gap-4 text-neutral-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Actualizado: 18 Nov 2024</span>
              </div>
              <span>•</span>
              <span>4.2 MB</span>
              <span>•</span>
              <span>24 páginas</span>
            </div>
          </div>

          {/* Preview */}
          <Card>
            <CardContent className="p-8">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-20 h-20 text-primary-500 mx-auto mb-4" />
                  <p className="text-neutral-600">Vista previa del documento</p>
                  <p className="text-neutral-500 mt-2">
                    Descarga el archivo para ver el contenido completo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl text-neutral-900">Descripción</h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-600">
                  Brochure completo de la temporada Verano 2025 para destinos del Caribe. Incluye todos los paquetes turísticos, hoteles, servicios y promociones especiales para la temporada alta.
                </p>
                <h3 className="text-neutral-900 mt-4 mb-2">Contenido incluido:</h3>
                <ul className="text-neutral-600 space-y-1">
                  <li>Cancún y Riviera Maya - 8 paquetes diferentes</li>
                  <li>Punta Cana - Todo incluido y selección de hoteles</li>
                  <li>Jamaica - Montego Bay y Negril</li>
                  <li>Aruba - Hoteles boutique y resorts</li>
                  <li>Tarifas especiales para grupos</li>
                  <li>Políticas de cancelación y cambios</li>
                </ul>
                <h3 className="text-neutral-900 mt-4 mb-2">Uso recomendado:</h3>
                <p className="text-neutral-600">
                  Material ideal para presentaciones con clientes, envío por correo electrónico y publicación en redes sociales. Disponible en formato digital optimizado para impresión.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-neutral-900 mb-4">Acciones</h3>
              <Button className="w-full bg-primary-500 hover:bg-primary-600">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Copiar enlace
              </Button>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-neutral-900">Detalles del archivo</h3>
              <div className="space-y-3 text-neutral-600">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Formato:</span>
                  <span>PDF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Tamaño:</span>
                  <span>4.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Páginas:</span>
                  <span>24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Idioma:</span>
                  <span>Español</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Versión:</span>
                  <span>2.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Vigencia:</span>
                  <span>Hasta Ago 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Content */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-neutral-900">Contenido relacionado</h3>
              <div className="space-y-3">
                {relatedResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-900 truncate">{resource.title}</p>
                      <p className="text-neutral-500">{resource.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
