const BASE_URL = import.meta.env.VITE_API_URL || '/api';
const REQUEST_TIMEOUT_MS = 60_000;

const fetchWithTimeout = async (
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const get = async <T>(endpoint: string): Promise<T> => {
  const res = await fetchWithTimeout(`${BASE_URL}${endpoint}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
};

const post = async <T>(endpoint: string, body: unknown): Promise<T> => {
  const res = await fetchWithTimeout(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to post ${endpoint}`);
  return res.json();
};

export const api = {
  projects:      { getAll: () => get('/projects') },
  skills:        { getAll: ()  => get('/skills') },
  certification: { getAll: ()  => get('/certification') },
  education:     { getAll: ()  => get('/education') },
  testimonials:  { getAll: ()  => get('/testimonials') },
  community:     { getAll: ()  => get('/communities') },
  settings:      { get: ()     => get('/settings') },
  contact:       { send: (body: unknown) => post('/contact', body) },
};
