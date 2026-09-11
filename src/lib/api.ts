import { getSessionToken } from "./session";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getSessionToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    let message = `Request gagal (${response.status})`;
    if (body && typeof body === "object") {
      if ("message" in body) message = String(body.message);
      else if ("error" in body) message = String(body.error);
    }
    // Kirim event global untuk ToastProvider
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cuanku-error", { detail: { message } })
      );
    }
    throw new Error(message);
  }

  return body as T;
}

export function unwrapList<T>(body: unknown, keys: string[]): T[] {
  if (Array.isArray(body)) return body as T[];
  if (!body || typeof body !== "object") return [];

  const record = body as Record<string, unknown>;
  for (const key of keys) {
    if (Array.isArray(record[key])) return record[key] as T[];
  }

  if (record.data && typeof record.data === "object") {
    return unwrapList<T>(record.data, keys);
  }

  return [];
}

export function unwrapObject(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== "object") return {};
  const record = body as Record<string, unknown>;
  if (record.data && typeof record.data === "object" && !Array.isArray(record.data)) {
    return record.data as Record<string, unknown>;
  }
  return record;
}