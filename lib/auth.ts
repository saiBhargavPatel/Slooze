import { sampleUsers } from "@/lib/sample-data";
import { Session } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginRequest = async (payload: LoginPayload): Promise<Session> => {
  const endpoint = `${API_BASE}/api/auth/login`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return (await response.json()) as Session;
  } catch {
    const matchedUser = sampleUsers.find(
      (u) => u.email === payload.email && u.password === payload.password
    );

    if (!matchedUser) {
      throw new Error("Invalid credentials");
    }

    return {
      token: `fallback-token-${matchedUser.id}`,
      user: {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role
      }
    };
  }
};
