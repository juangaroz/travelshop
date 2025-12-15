import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft } from "lucide-react";
import logoImage from "../assets/b0068d10880ef77f72866c01e1cd0f92ea3daf5f.png";
import travelBgImage from "../assets/f26b5e98c54a7fd01cdf73f5978aef86db4c0cd4.png";
import { supabase } from "../lib/supabase";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    onNavigate("dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        {/* Back to Home Button */}
        <Button
          variant="ghost"
          className="absolute top-6 left-6"
          onClick={() => onNavigate("landing")}
          type="button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>

        <Card className="w-full max-w-md border-0 shadow-none">
          <CardHeader className="space-y-6">
            <img src={logoImage} alt="TravelShop" className="h-14 w-auto" />
            <div>
              <CardTitle className="text-3xl text-secondary-700">Partner Portal</CardTitle>
              <CardDescription className="mt-2">
                Accede a tu portal de agente de viajes
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="agente@agencia.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              {errorMsg && (
                <div className="text-sm text-red-600">
                  {errorMsg}
                </div>
              )}

              <Button
                type="button"
                variant="link"
                className="px-0 text-primary-600 hover:text-primary-700"
                onClick={() => alert("Luego conectamos recuperación de contraseña.")}
              >
                ¿Olvidaste tu contraseña?
              </Button>

              <Button
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600"
                disabled={loading}
              >
                {loading ? "Accediendo..." : "Acceder al Portal"}
              </Button>
            </form>

            <div className="mt-6 text-center text-neutral-500">
              <p>¿Necesitas ayuda? Contacta a soporte</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src={travelBgImage}
          alt="Travel planning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-700/95 to-primary-600/95 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-lg">
            <h2 className="text-4xl mb-4">Conectando agentes con experiencias inolvidables</h2>
            <p className="text-xl opacity-90">
              Gestiona tours, recursos y reservaciones desde una sola plataforma profesional
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
