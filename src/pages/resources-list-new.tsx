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
