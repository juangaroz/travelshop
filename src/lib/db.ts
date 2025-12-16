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
