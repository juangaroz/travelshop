import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, Play, Clock, Award, BookOpen } from "lucide-react";
import { Progress } from "../components/ui/progress";

interface TrainingHubPageProps {
  onNavigate: (page: string, videoId?: string) => void;
}

const courses = [
  {
    id: "1",
    title: "Fundamentos de Ventas de Tours",
    description: "Aprende las técnicas básicas para vender paquetes turísticos de forma efectiva",
    category: "Ventas",
    duration: "2h 30min",
    lessons: 8,
    progress: 75,
    thumbnail: "https://images.unsplash.com/photo-1655981649945-cbd213e524c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBhZnJpY2ElMjB3aWxkbGlmZSUyMHN1bnNldHxlbnwxfHx8fDE3NjM2ODY5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "2",
    title: "Gestión de Reservaciones",
    description: "Manejo completo del sistema de reservaciones y seguimiento de clientes",
    category: "Operaciones",
    duration: "1h 45min",
    lessons: 6,
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1730800328179-3fb51d1e0438?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGNoZXJyeSUyMGJsb3Nzb20lMjBtb3VudCUyMGZ1aml8ZW58MXx8fHwxNzYzNjg3MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "3",
    title: "Destinos: Caribe Mexicano",
    description: "Conoce a profundidad los destinos de Cancún y Riviera Maya para vender mejor",
    category: "Destinos",
    duration: "3h 15min",
    lessons: 12,
    progress: 30,
    thumbnail: "https://images.unsplash.com/photo-1653959747793-c7c3775665f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhcmFkaXNlJTIwYmVhY2glMjBhZXJpYWx8ZW58MXx8fHwxNzYzNjg2OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "4",
    title: "Destinos: Europa Clásica",
    description: "Tour virtual por los principales destinos europeos y sus atractivos",
    category: "Destinos",
    duration: "4h 00min",
    lessons: 15,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1704301123672-929bec118be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBibHVlJTIwZG9tZXxlbnwxfHx8fDE3NjM1Nzk5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "5",
    title: "Atención al Cliente Excelente",
    description: "Técnicas de servicio al cliente para crear experiencias memorables",
    category: "Servicio",
    duration: "2h 00min",
    lessons: 7,
    progress: 0,
    thumbnail: "https://images.unsplash.com/photo-1747880385913-5d87e6ba6a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YW5kZXJsdXN0JTIwYWR2ZW50dXJlJTIwbW91bnRhaW5zJTIwZXBpY3xlbnwxfHx8fDE3NjM2ODY5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "6",
    title: "Manejo de Objeciones de Venta",
    description: "Estrategias para superar objeciones y cerrar más ventas",
    category: "Ventas",
    duration: "1h 30min",
    lessons: 5,
    progress: 60,
    thumbnail: "https://images.unsplash.com/photo-1729476266005-b14af8894f5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRhZ29uaWElMjBnbGFjaWVyJTIwbW91bnRhaW5zfGVufDF8fHx8MTc2MzY4Njk5OXww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const certificates = [
  { name: "Especialista en Caribe", date: "15 Oct 2024", category: "Destinos" },
  { name: "Gestión de Reservaciones", date: "22 Sep 2024", category: "Operaciones" },
];

export function TrainingHubPage({ onNavigate }: TrainingHubPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-neutral-900 mb-2">Centro de Capacitación</h1>
        <p className="text-neutral-600">
          Accede a cursos, videos y certificaciones para mejorar tus habilidades
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Cursos en progreso</p>
                <h3 className="text-3xl text-neutral-900">3</h3>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Cursos completados</p>
                <h3 className="text-3xl text-neutral-900">2</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Horas de capacitación</p>
                <h3 className="text-3xl text-neutral-900">12.5</h3>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-500 mb-1">Certificados obtenidos</p>
                <h3 className="text-3xl text-neutral-900">2</h3>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-accent-600" />
              </div>
            </div>
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
                placeholder="Buscar cursos y capacitaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Ventas">Ventas</SelectItem>
                <SelectItem value="Operaciones">Operaciones</SelectItem>
                <SelectItem value="Destinos">Destinos</SelectItem>
                <SelectItem value="Servicio">Servicio al Cliente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Continue Learning */}
      <div>
        <h2 className="text-2xl text-neutral-900 mb-4">Continuar aprendiendo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.filter(c => c.progress > 0 && c.progress < 100).map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 bg-neutral-200 relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button 
                    size="lg" 
                    className="bg-white text-neutral-900 hover:bg-neutral-100"
                    onClick={() => onNavigate("training-video", course.id)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Continuar
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-neutral-900">{course.title}</h3>
                <div className="flex items-center gap-4 text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lecciones</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-neutral-600">
                    <span>Progreso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Courses */}
      <div>
        <h2 className="text-2xl text-neutral-900 mb-4">Todos los cursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-40 bg-neutral-200 relative">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                {course.progress === 100 && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>Completado</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button 
                    size="lg" 
                    className="bg-white text-neutral-900 hover:bg-neutral-100"
                    onClick={() => onNavigate("training-video", course.id)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {course.progress === 0 ? "Comenzar" : course.progress === 100 ? "Revisar" : "Continuar"}
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-neutral-900">{course.title}</h3>
                <p className="text-neutral-600 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-4 text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lecciones</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl text-neutral-900">Tus Certificados</h2>
            <Award className="w-6 h-6 text-accent-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-neutral-900">{cert.name}</h3>
                  <p className="text-neutral-500">
                    {cert.category} • Obtenido el {cert.date}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Descargar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}