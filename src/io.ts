import axios from 'axios';

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

  return (await axios.request<T>({ method, url: url.toString(), headers }))
    .data;
};
