"use client";

import {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useMemo,
  useState
} from "react";

import { loginRequest } from "@/lib/auth";
import { parseSession, serializeSession, SESSION_COOKIE } from "@/lib/session";
import { Role, Session } from "@/lib/types";

type AuthContextType = {
  session: Session | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<Session>;
  logout: () => void;
  role: Role | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readSessionFromCookie = () => {
  if (typeof document === "undefined") return null;

  const cookieString = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SESSION_COOKIE}=`));

  const cookieValue = cookieString?.split("=")[1] ?? null;
  return parseSession(cookieValue);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(readSessionFromCookie());
  }, []);

  const login = async (email: string, password: string) => {
    const nextSession = await loginRequest({ email, password });
    document.cookie = `${SESSION_COOKIE}=${serializeSession(nextSession)}; path=/; max-age=86400; SameSite=Lax`;
    setSession(nextSession);
    return nextSession;
  };

  const logout = () => {
    document.cookie = `${SESSION_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    setSession(null);
  };

  const value = useMemo(
    () => ({
      session,
      role: session?.user.role ?? null,
      isLoggedIn: Boolean(session),
      login,
      logout
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
