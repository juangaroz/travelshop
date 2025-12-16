set -euo pipefail

echo "==> 1) Creando capa de datos (Supabase CRUD)"

cat > src/lib/db.ts <<'EOF'
import { supabase } from "./supabase";
import type { AppRole } from "./auth";

export type Tour = {
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
  created_by: string | null;
  created_at: string;
  updated_at: string | null;
};

export type Resource = {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  is_published: boolean;
  created_at: string;
};

export type Media = {
  id: string;
  title: string;
  description: string | null;
  file_type: string | null;
  file_url: string | null;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string | null;
};

export type Training = {
  id: string;
  title: string;
  description: string | null;
  content_type: string | null;
  content_url: string | null;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string | null;
};

export type Reservation = {
  id: string;
  tour_id: string;
  agent_user_id: string;
  agency_id: string | null;
  status: string;
  pax: number | null;
  notes: string | null;
  created_at: string;
};

export async function getMyRole(): Promise<AppRole | null> {
  const { data: u } = await supabase.auth.getUser();
  const user = u.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;
  return (data?.role as AppRole) ?? null;
}

export async function getMyAgencyId(): Promise<string | null> {
  const { data: u } = await supabase.auth.getUser();
  const user = u.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("agency_id")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;
  return (data?.agency_id as string) ?? null;
}

// ---------- TOURS ----------
export async function listTours(role: AppRole): Promise<Tour[]> {
  let q = supabase
    .from("tours")
    .select("*")
    .order("created_at", { ascending: false });

  if (role === "agent") q = q.eq("is_published", true);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Tour[];
}

export async function getTour(role: AppRole, id: string): Promise<Tour | null> {
  let q = supabase.from("tours").select("*").eq("id", id).single();
  if (role === "agent") q = q.eq("is_published", true);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? null) as Tour | null;
}

export async function createTour(payload: Partial<Tour>) {
  const { error } = await supabase.from("tours").insert(payload);
  if (error) throw error;
}

export async function updateTour(id: string, patch: Partial<Tour>) {
  const { error } = await supabase.from("tours").update(patch).eq("id", id);
  if (error) throw error;
}

// ---------- RESOURCES ----------
export async function listResources(role: AppRole): Promise<Resource[]> {
  let q = supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (role === "agent") q = q.eq("is_published", true);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Resource[];
}

export async function createResource(payload: Partial<Resource>) {
  const { error } = await supabase.from("resources").insert(payload);
  if (error) throw error;
}

export async function updateResource(id: string, patch: Partial<Resource>) {
  const { error } = await supabase.from("resources").update(patch).eq("id", id);
  if (error) throw error;
}

// ---------- TRAINING ----------
export async function listTraining(role: AppRole): Promise<Training[]> {
  let q = supabase
    .from("training")
    .select("*")
    .order("created_at", { ascending: false });

  if (role === "agent") q = q.eq("is_published", true);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Training[];
}

export async function createTraining(payload: Partial<Training>) {
  const { error } = await supabase.from("training").insert(payload);
  if (error) throw error;
}

export async function updateTraining(id: string, patch: Partial<Training>) {
  const { error } = await supabase.from("training").update(patch).eq("id", id);
  if (error) throw error;
}

// ---------- MEDIA ----------
export async function listMedia(role: AppRole): Promise<Media[]> {
  let q = supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false });

  if (role === "agent") q = q.eq("is_published", true);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Media[];
}

export async function createMedia(payload: Partial<Media>) {
  const { error } = await supabase.from("media").insert(payload);
  if (error) throw error;
}

export async function updateMedia(id: string, patch: Partial<Media>) {
  const { error } = await supabase.from("media").update(patch).eq("id", id);
  if (error) throw error;
}

// ---------- RESERVATIONS ----------
export async function listReservations(role: AppRole): Promise<Reservation[]> {
  let q = supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });

  // RLS ya limita: agent solo las suyas
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Reservation[];
}

export async function createReservation(payload: Partial<Reservation>) {
  const { error } = await supabase.from("reservations").insert(payload);
  if (error) throw error;
}

export async function updateReservation(id: string, patch: Partial<Reservation>) {
  const { error } = await supabase.from("reservations").update(patch).eq("id", id);
  if (error) throw error;
}

// ---------- Storage helpers ----------
export async function uploadToBucket(bucket: string, path: string, file: File) {
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
EOF

echo "==> 2) Parches mínimos para que páginas existentes sean dinámicas"
# Nota: no reescribimos TODO tu UI, solo conectamos a DB para que no se pierda el diseño.

# Tours list ya lo tienes con form; solo aseguramos que NO tenga basura (cat/EOF) y que use db.ts si quieres más adelante.
# Resources list new: lo dejamos igual pero lo conectamos a Supabase.
cat > src/pages/resources-list-new.tsx <<'EOF'
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { listResources, createResource, updateResource, uploadToBucket, type Resource } from "../lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";

interface Props {
  onNavigate: (page: string, id?: string) => void;
}

export function ResourcesListPageNew({ onNavigate }: Props) {
  const { role, session } = useAuth();
  const isAdmin = role === "admin";

  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!role) return;
    setLoading(true);
    setErr(null);
    try {
      const data = await listResources(role);
      setItems(data);
    } catch (e: any) {
      setErr(e?.message ?? "Error cargando recursos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [role]);

  const filtered = useMemo(() => items, [items]);

  const onCreate = async () => {
    if (!session?.user) return setErr("Sin sesión");
    if (!title.trim()) return setErr("Título requerido");
    setSaving(true);
    setErr(null);
    try {
      let file_url: string | null = null;
      if (file) {
        const ext = (file.name.split(".").pop() || "pdf").toLowerCase();
        const path = `resources/${crypto.randomUUID()}.${ext}`;
        file_url = await uploadToBucket("resources", path, file);
      }
      await createResource({
        title: title.trim(),
        description: description.trim() || null,
        file_url,
        is_published: published,
      });
      setTitle(""); setDescription(""); setPublished(false); setFile(null);
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Error creando recurso");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (id: string, next: boolean) => {
    setErr(null);
    try {
      await updateResource(id, { is_published: next });
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Error actualizando");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Recursos y Materiales</h1>
          <p className="text-sm text-neutral-500">{isAdmin ? "Admin: sube y publica materiales." : "Agente: descarga lo publicado."}</p>
        </div>
        <Button onClick={() => onNavigate("dashboard")}>Ir a Dashboard</Button>
      </div>

      {err && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}

      {isAdmin && (
        <Card>
          <CardHeader><CardTitle>Nuevo recurso</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Archivo</Label>
                <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Descripción</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                Publicado
              </label>
            </div>
            <div className="flex justify-end">
              <Button onClick={onCreate} disabled={saving}>{saving ? "Guardando..." : "Crear"}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-sm text-neutral-500">Cargando…</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <Card key={r.id}>
              <CardHeader className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{r.title}</CardTitle>
                  {!r.is_published && isAdmin && <Badge variant="secondary">Borrador</Badge>}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {r.description && <p className="text-sm text-neutral-600 line-clamp-3">{r.description}</p>}
                {r.file_url ? (
                  <a className="text-sm underline" href={r.file_url} target="_blank" rel="noreferrer">Abrir archivo</a>
                ) : (
                  <p className="text-xs text-neutral-400">Sin archivo</p>
                )}

                {isAdmin && (
                  <Button variant="secondary" className="w-full" onClick={() => togglePublish(r.id, !r.is_published)}>
                    {r.is_published ? "Pasar a borrador" : "Publicar"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
EOF

echo "==> 3) Terminado (no tocamos sidebar/layout ahora para no romper UI)."
echo "Listo."
