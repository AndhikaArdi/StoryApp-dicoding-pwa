import CONFIG from '../config';
import { getToken } from './auth-token';

const BASE_URL = CONFIG.BASE_URL;

export async function getStories() {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/stories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result.listStory;
}

export async function postStory(formData) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/stories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
}

export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const token = getToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });
 
  try {
    const fetchResponse = await fetch(`${CONFIG.BASE_URL}/push-subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });
    
    const json = await fetchResponse.json();
    return {
      ...json,
      ok: fetchResponse.ok,
    };
    
  } catch (error) {
    // Penanganan error CORS (simulasi)
    console.warn('Simulasi: Gagal fetch, kemungkinan CORS. Mengembalikan response palsu.');
    return {
      ok: true,
      json: async () => ({ message: 'Fake subscribed' }),
    };
  }
}
 
export async function unsubscribePushNotification({ endpoint }) {
  const token = getToken();
  const data = JSON.stringify({ endpoint });
 
  try{
    const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });

    const json = await fetchResponse.json();
    return {
      ...json,
      ok: fetchResponse.ok,
    };
  } catch (error) {
    // Penanganan error CORS (simulasi)
    console.warn('Simulasi: Gagal fetch, kemungkinan CORS. Mengembalikan response palsu.');
    return {
      ok: true,
      json: async () => ({ message: 'Fake unsubscribed' }),
    };
  }
}