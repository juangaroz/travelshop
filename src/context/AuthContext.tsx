import { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { AppRole } from "../lib/auth";

interface AuthState {
  loading: boolean;
  session: Session | null;
  role: AppRole | null;
  error: string | null;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refreshRole = async () => {
    setError(null);
    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;
      const user = userData.user;
      if (!user) {
        setRole(null);
        return;
      }

      const { data, error: roleErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (roleErr) throw roleErr;
      setRole((data?.role as AppRole) ?? null);
    } catch (e: any) {
      setRole(null);
      setError(e?.message ?? "Error cargando rol");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: sessErr } = await supabase.auth.getSession();
        if (sessErr) throw sessErr;

        setSession(sessErr ? null : data.session);

        if (data.session) {
          await refreshRole();
        } else {
          setRole(null);
        }
      } catch (e: any) {
        setSession(null);
        setRole(null);
        setError(e?.message ?? "Error cargando sesión");
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);

      if (newSession) {
        await refreshRole();
      } else {
        setRole(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ loading, session, role, error, signOut, refreshRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
