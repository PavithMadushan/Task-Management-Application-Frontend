const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

const getToken = () => {
  const stored = localStorage.getItem('auth');
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored) as { token: string };
    return parsed.token;
  } catch {
    return null;
  }
};

export async function http(path: string, options: RequestOptions = {}) {
  const { auth = true, headers, ...rest } = options;
  const token = auth ? getToken() : null;

  const res = await fetch(`${baseUrl}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body.error || body.message || `Request failed with ${res.status}`;
    throw new Error(message);
  }

  return res;
}