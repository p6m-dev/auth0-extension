export const fetchRemote = async <T>(
  method: 'GET',
  url: URL,
  authorization?: string,
): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authorization) {
    headers['Authorization'] = authorization;
  }

  return await fetch(url, {
    method,
    headers,
  }).then((r) => r.json() as Promise<T>);
};
