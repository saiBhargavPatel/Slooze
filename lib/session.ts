import { Session } from "@/lib/types";

export const SESSION_COOKIE = "slooze_session";

export const serializeSession = (session: Session): string => {
  return encodeURIComponent(JSON.stringify(session));
};

export const parseSession = (value?: string | null): Session | null => {
  if (!value) return null;

  try {
    return JSON.parse(decodeURIComponent(value)) as Session;
  } catch {
    return null;
  }
};
