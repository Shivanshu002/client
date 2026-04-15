export const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api/';

const TIMEOUT_MS = 50000;

const buildHeaders = (extraHeaders: Record<string, string> = {}): Record<string, string> => ({
  'Content-Type': 'application/json',
  ...extraHeaders,
});

const withTimeout = (promise: Promise<unknown>, ms: number) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject({ status: 504 }), ms)),
  ]);

const parseResponse = async (res: Response) => {
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : await res.text();
  if (res.ok) return Array.isArray(data) ? data : { status: res.status, ...data };
  return Promise.reject({ status: res.status, ...(Array.isArray(data) ? {} : data) });
};

const request = (url: string, options: RequestInit = {}, urlPrefix = BASE_URL) =>
  withTimeout(fetch(urlPrefix + url, options), TIMEOUT_MS).then(res =>
    parseResponse(res as Response)
  );

export const doGet = (url: string, headers: Record<string, string> = {}) =>
  request(url, { method: 'GET', headers: buildHeaders(headers) });

export const doPost = (url: string, body?: unknown, headers: Record<string, string> = {}) =>
  request(url, {
    method: 'POST',
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  });

export const doPut = (url: string, body?: unknown, headers: Record<string, string> = {}) =>
  request(url, {
    method: 'PUT',
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  });

export const doDelete = (url: string, body?: unknown, headers: Record<string, string> = {}) =>
  request(url, {
    method: 'DELETE',
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
  });


