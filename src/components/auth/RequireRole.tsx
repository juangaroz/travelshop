import { ReactNode, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

interface RequireRoleProps {
  role: "admin" | "agent";
  children: ReactNode;
  onDeny: () => void;
}

export function RequireRole({ role, children, onDeny }: RequireRoleProps) {
  const { role: myRole, loading } = useAuth();

  useEffect(() => {
    if (!loading && myRole && myRole !== role) {
      onDeny();
    }
  }, [loading, myRole, role, onDeny]);

  if (loading) return null;
  if (myRole !== role) return null;

  return <>{children}</>;
}
