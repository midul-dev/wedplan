const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
};