import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Play, CheckCircle2, Circle, Clock, BookOpen, Award } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";

interface TrainingVideoPageProps {
  videoId?: string;
  onNavigate: (page: string) => void;
}

const lessons = [
  { id: 1, title: "Introducción a las ventas de tours", duration: "12:30", completed: true },
  { id: 2, title: "Conociendo a tu cliente ideal", duration: "18:45", completed: true },
  { id: 3, title: "Presentación efectiva de paquetes", duration: "22:15", completed: true },
  { id: 4, title: "Técnicas de cierre de ventas", duration: "20:00", completed: false },
  { id: 5, title: "Manejo de objeciones básicas", duration: "15:30", completed: false },
  { id: 6, title: "Seguimiento post-venta", duration: "16:20", completed: false },
  { id: 7, title: "Estrategias de upselling", duration: "19:10", completed: false },
  { id: 8, title: "Evaluación final", duration: "25:00", completed: false }
];

const keyTakeaways = [
  "Identifica las necesidades del cliente antes de presentar opciones",
  "Usa técnicas de storytelling para hacer la venta más emocional",
  "Presenta siempre 3 opciones: básica, intermedia y premium",
  "El seguimiento post-venta genera clientes recurrentes"
];

const relatedCourses = [
  { title: "Manejo de Objeciones de Venta", category: "Ventas", duration: "1h 30min" },
  { title: "Atención al Cliente Excelente", category: "Servicio", duration: "2h 00min" },
];

export function TrainingVideoPage({ onNavigate }: TrainingVideoPageProps) {
  const completedLessons = lessons.filter(l => l.completed).length;
  const progress = Math.round((completedLessons / lessons.length) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => onNavigate("training")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a capacitación
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 rounded-full w-20 h-20">
                <Play className="w-10 h-10 ml-1" />
              </Button>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between text-white mb-2">
                  <span>15:30</span>
                  <span>22:15</span>
                </div>
                <Progress value={70} className="h-1" />
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                  Lección 3 de 8
                </span>
              </div>
              <h1 className="text-3xl text-neutral-900">Presentación efectiva de paquetes</h1>
              <div className="flex items-center gap-6 text-neutral-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>22:15 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Fundamentos de Ventas de Tours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl text-neutral-900">Sobre esta lección</h2>
              <div className="prose prose-neutral max-w-none text-neutral-600">
                <p>
                  En esta lección aprenderás las técnicas más efectivas para presentar paquetes turísticos a tus clientes. Conocerás cómo estructurar tu presentación, qué información destacar, y cómo adaptar tu discurso según el perfil del cliente.
                </p>
                <p>
                  También veremos ejemplos reales de presentaciones exitosas y analizaremos los elementos clave que hacen que un cliente se decida por uno de nuestros tours.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl text-neutral-900">Puntos clave</h2>
              <ul className="space-y-3">
                {keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600">{index + 1}</span>
                    </div>
                    <span className="text-neutral-600">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Lección anterior
            </Button>
            <Button className="flex-1 bg-primary-500 hover:bg-primary-600">
              Siguiente lección
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progreso del curso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl text-primary-600 mb-2">{progress}%</div>
                <Progress value={progress} className="h-2" />
                <p className="text-neutral-600 mt-2">
                  {completedLessons} de {lessons.length} lecciones completadas
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-neutral-600">Tiempo estimado restante</p>
                <p className="text-2xl text-neutral-900">1h 38min</p>
              </div>
            </CardContent>
          </Card>

          {/* Lesson List */}
          <Card>
            <CardHeader>
              <CardTitle>Contenido del curso</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-neutral-200">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`p-4 hover:bg-neutral-50 transition-colors cursor-pointer ${
                      lesson.id === 3 ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-neutral-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-neutral-900 mb-1 ${lesson.id === 3 ? 'text-primary-600' : ''}`}>
                          {lesson.id}. {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 text-neutral-500">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certificate Info */}
          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-neutral-900 mb-2">Obtén tu certificado</h3>
                <p className="text-neutral-600">
                  Completa todas las lecciones y aprueba la evaluación final para recibir tu certificado oficial.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Cursos relacionados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedCourses.map((course, index) => (
                <div
                  key={index}
                  className="p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <h4 className="text-neutral-900 mb-1">{course.title}</h4>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                      {course.category}
                    </span>
                    <span>•</span>
                    <span className="text-xs">{course.duration}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}