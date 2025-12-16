import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";

interface ToursListPageProps {
  onNavigate: (page: string, id?: string) => void;
  searchQuery: string;
}

type Tour = {
  id: string;
  title: string;
  description: string | null;
  destination: string | null;
  duration_text: string | null;
  highlights: string | null;
  includes: string | null;
  excludes: string | null;
  meeting_point: string | null;
  itinerary: string | null;
  cancellation_policy: string | null;
  terms: string | null;
  price: number | null;
  currency: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  created_at: string;
};

export function ToursListPage({ onNavigate, searchQuery }: ToursListPageProps) {
  const { role, session } = useAuth();
  const isAdmin = role === "admin";

  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState<Tour[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Admin: form
  const [creating, setCreating] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newShortDesc, setNewShortDesc] = useState("");

  const [newHighlights, setNewHighlights] = useState("");
  const [newIncludes, setNewIncludes] = useState("");
  const [newExcludes, setNewExcludes] = useState("");
  const [newMeetingPoint, setNewMeetingPoint] = useState("");
  const [newItinerary, setNewItinerary] = useState("");
  const [newCancellation, setNewCancellation] = useState("");
  const [newTerms, setNewTerms] = useState("");

  const [newPrice, setNewPrice] = useState<string>("");
  const [newCurrency, setNewCurrency] = useState("MXN");
  const [newPublished, setNewPublished] = useState(false);
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);

  const loadTours = async () => {
    setLoading(true);
    setError(null);

    try {
      let q = supabase
        .from("tours")
        .select(
          "id,title,description,destination,duration_text,highlights,includes,excludes,meeting_point,itinerary,cancellation_policy,terms,price,currency,cover_image_url,is_published,created_at"
        )
        .order("created_at", { ascending: false });

      if (role === "agent") q = q.eq("is_published", true);

      const { data, error: err } = await q;
      if (err) throw err;

      setTours((data ?? []) as Tour[]);
    } catch (e: any) {
      setError(e?.message ?? "Error cargando tours");
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!role) return;
    loadTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const filtered = useMemo(() => {
    const q = (searchQuery ?? "").trim().toLowerCase();
    if (!q) return tours;

    return tours.filter((t) => {
      const hay = `${t.title ?? ""} ${t.description ?? ""} ${t.destination ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [tours, searchQuery]);

  const uploadCoverIfAny = async (): Promise<string | null> => {
    if (!newCoverFile) return null;

    const ext = newCoverFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
    const filename = `${crypto.randomUUID()}.${safeExt}`;
    const path = `covers/${filename}`;

    const { error: uploadErr } = await supabase.storage
      .from("tours")
      .upload(path, newCoverFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: newCoverFile.type || undefined,
      });

    if (uploadErr) throw uploadErr;

    const { data } = supabase.storage.from("tours").getPublicUrl(path);
    return data.publicUrl ?? null;
  };

  const createTour = async () => {
    if (!session?.user) {
      setError("No hay sesión activa");
      return;
    }
    if (!newTitle.trim()) {
      setError("El título es obligatorio");
      return;
    }

    setCreating(true);
    setError(null);

    try {
      const priceNumber = newPrice.trim() === "" ? null : Number(newPrice.replace(",", "."));
      const coverUrl = await uploadCoverIfAny();

      const payload = {
        title: newTitle.trim(),
        description: newShortDesc.trim() || null,
        destination: newDestination.trim() || null,
        duration_text: newDuration.trim() || null,
        highlights: newHighlights.trim() || null,
        includes: newIncludes.trim() || null,
        excludes: newExcludes.trim() || null,
        meeting_point: newMeetingPoint.trim() || null,
        itinerary: newItinerary.trim() || null,
        cancellation_policy: newCancellation.trim() || null,
        terms: newTerms.trim() || null,
        price: Number.isFinite(priceNumber as any) ? priceNumber : null,
        currency: newCurrency.trim() || "MXN",
        cover_image_url: coverUrl,
        is_published: newPublished,
        created_by: session.user.id,
      };

      const { error: err } = await supabase.from("tours").insert(payload);
      if (err) throw err;

      // reset
      setNewTitle("");
      setNewDestination("");
      setNewDuration("");
      setNewShortDesc("");
      setNewHighlights("");
      setNewIncludes("");
      setNewExcludes("");
      setNewMeetingPoint("");
      setNewItinerary("");
      setNewCancellation("");
      setNewTerms("");
      setNewPrice("");
      setNewCurrency("MXN");
      setNewPublished(false);
      setNewCoverFile(null);

      await loadTours();
    } catch (e: any) {
      setError(e?.message ?? "Error creando tour");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tours</h1>
          <p className="text-sm text-neutral-500">
            {isAdmin ? "Admin: crea y publica tours." : "Agente: solo ves tours publicados."}
          </p>
        </div>

        <Button onClick={() => onNavigate("dashboard")}>Ir a Dashboard</Button>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Crear tour (formulario completo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Básico */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newTitle">Título</Label>
                <Input id="newTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newDestination">Destino</Label>
                <Input
                  id="newDestination"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="Ej. Cancún / CDMX / Riviera Maya"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newDuration">Duración</Label>
                <Input
                  id="newDuration"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  placeholder="Ej. 1 día / 3 noches / 5 horas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newCover">Imagen (cover)</Label>
                <Input
                  id="newCover"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewCoverFile(e.target.files?.[0] ?? null)}
                />
                {newCoverFile && <p className="text-xs text-neutral-500">Seleccionada: {newCoverFile.name}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="newShortDesc">Descripción corta</Label>
                <Textarea
                  id="newShortDesc"
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  placeholder="Resumen del tour…"
                  rows={3}
                />
              </div>
            </div>

            {/* Detalle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newHighlights">Highlights</Label>
                <Textarea
                  id="newHighlights"
                  value={newHighlights}
                  onChange={(e) => setNewHighlights(e.target.value)}
                  placeholder="• Punto 1\n• Punto 2\n• Punto 3"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newItinerary">Itinerario</Label>
                <Textarea
                  id="newItinerary"
                  value={newItinerary}
                  onChange={(e) => setNewItinerary(e.target.value)}
                  placeholder="Día 1: ...\nDía 2: ..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newIncludes">Incluye</Label>
                <Textarea
                  id="newIncludes"
                  value={newIncludes}
                  onChange={(e) => setNewIncludes(e.target.value)}
                  placeholder="• Transporte\n• Guía\n• Entradas…"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newExcludes">No incluye</Label>
                <Textarea
                  id="newExcludes"
                  value={newExcludes}
                  onChange={(e) => setNewExcludes(e.target.value)}
                  placeholder="• Propinas\n• Comidas…"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newMeetingPoint">Punto de encuentro</Label>
                <Textarea
                  id="newMeetingPoint"
                  value={newMeetingPoint}
                  onChange={(e) => setNewMeetingPoint(e.target.value)}
                  placeholder="Dirección / indicaciones…"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newCancellation">Política de cancelación</Label>
                <Textarea
                  id="newCancellation"
                  value={newCancellation}
                  onChange={(e) => setNewCancellation(e.target.value)}
                  placeholder="Reglas de cancelación…"
                  rows={3}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="newTerms">Términos</Label>
                <Textarea
                  id="newTerms"
                  value={newTerms}
                  onChange={(e) => setNewTerms(e.target.value)}
                  placeholder="Términos y condiciones…"
                  rows={3}
                />
              </div>
            </div>

            {/* Precio + publicar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="newPrice">Precio</Label>
                <Input id="newPrice" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Ej. 1890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newCurrency">Moneda</Label>
                <Input id="newCurrency" value={newCurrency} onChange={(e) => setNewCurrency(e.target.value)} placeholder="MXN" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={newPublished} onChange={(e) => setNewPublished(e.target.checked)} />
                <span className="text-sm text-neutral-700">Publicado</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={createTour} disabled={creating}>
                {creating ? "Creando..." : "Crear tour"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* LISTADO */}
      {loading ? (
        <p className="text-sm text-neutral-500">Cargando tours…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <Card
              key={t.id}
              className="cursor-pointer hover:shadow-sm transition"
              onClick={() => onNavigate("tour-detail", t.id)}
            >
              <div className="w-full h-40 overflow-hidden rounded-t-xl bg-neutral-100">
                {t.cover_image_url ? (
                  <img src={t.cover_image_url} alt={t.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-neutral-400">
                    Sin imagen
                  </div>
                )}
              </div>

              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{t.title}</CardTitle>
                  {!t.is_published && isAdmin && <Badge variant="secondary">Borrador</Badge>}
                </div>
                {t.destination && <p className="text-sm text-neutral-500">{t.destination}</p>}
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-neutral-600 line-clamp-3">{t.description ?? ""}</p>
                <p className="font-medium">
                  {t.currency ?? "MXN"} {t.price ?? ""}
                </p>
                <div className="pt-2">
                  <Button variant="secondary" className="w-full">
                    Ver detalle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
