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

export type SavedAccount = Pick<SessionUser, "id_user" | "nama_UMKM" | "nama_lengkap" | "email" | "username">;

const SESSION_USER_KEY = "cuanku_user";
const SESSION_TOKEN_KEY = "cuanku_token";
const SAVED_ACCOUNTS_KEY = "cuanku_accounts";
export const SESSION_CHANGE_EVENT = "cuanku-session-change";

export function saveSession(token: string, user: SessionUser | null, rememberMe = false) {
  if (typeof window === "undefined") return;
  clearSession();
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(SESSION_TOKEN_KEY, token);
  if (user) storage.setItem(SESSION_USER_KEY, JSON.stringify(user));
  if (user?.email) {
    const accounts = getSavedAccounts().filter((account) => account.email !== user.email);
    localStorage.setItem(SAVED_ACCOUNTS_KEY, JSON.stringify([{ id_user: user.id_user, nama_UMKM: user.nama_UMKM, nama_lengkap: user.nama_lengkap, email: user.email, username: user.username }, ...accounts]));
  }
  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
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
  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
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

export function getSavedAccounts(): SavedAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const value = localStorage.getItem(SAVED_ACCOUNTS_KEY);
    return value ? (JSON.parse(value) as SavedAccount[]) : [];
  } catch {
    return [];
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_TOKEN_KEY);
  localStorage.removeItem(SESSION_USER_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_USER_KEY);
  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}
