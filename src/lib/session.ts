export interface SessionUser {
  nama_UMKM?: string;
  nama_lengkap?: string;
  username?: string;
  email?: string;
  nomor_telepon?: string;
  kategori_usaha?: string;
  alamat?: string;
}

const SESSION_USER_KEY = "cuanku_user";

export function saveSessionUser(user: SessionUser | null) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_USER_KEY);
}

export function getSessionUser(): SessionUser {
  if (typeof window === "undefined") return {};
  try {
    const value = localStorage.getItem(SESSION_USER_KEY);
    return value ? (JSON.parse(value) as SessionUser) : {};
  } catch {
    return {};
  }
}
