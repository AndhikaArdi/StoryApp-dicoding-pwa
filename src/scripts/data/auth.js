const BASE_URL = 'https://story-api.dicoding.dev/v1';

export async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}

export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}
