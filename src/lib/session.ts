export interface SessionUser {
  id_user?: string | number;
  nama_UMKM?: string;
  nama_lengkap?: string;
  username?: string;
  email?: string;
  nomor_telepon?: string;
  kategori_usaha?: string;
  alamat?: string;
}

const SESSION_USER_KEY = "cuanku_user";
const SESSION_TOKEN_KEY = "cuanku_token";

export function saveSession(token: string, user: SessionUser | null, rememberMe = false) {
  if (typeof window === "undefined") return;
  clearSession();
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(SESSION_TOKEN_KEY, token);
  if (user) storage.setItem(SESSION_USER_KEY, JSON.stringify(user));
}

export function getSessionToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_TOKEN_KEY) ?? sessionStorage.getItem(SESSION_TOKEN_KEY);
}

export function saveSessionUser(user: SessionUser | null) {
  if (typeof window === "undefined") return;
  const storage = localStorage.getItem(SESSION_TOKEN_KEY) ? localStorage : sessionStorage;
  if (user) storage.setItem(SESSION_USER_KEY, JSON.stringify(user));
  else {
    localStorage.removeItem(SESSION_USER_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
  }
}

export function getSessionUser(): SessionUser {
  if (typeof window === "undefined") return {};
  try {
    const value = localStorage.getItem(SESSION_USER_KEY) ?? sessionStorage.getItem(SESSION_USER_KEY);
    return value ? (JSON.parse(value) as SessionUser) : {};
  } catch {
    return {};
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_TOKEN_KEY);
  localStorage.removeItem(SESSION_USER_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_USER_KEY);
}
