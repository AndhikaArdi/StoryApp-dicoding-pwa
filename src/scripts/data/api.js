import CONFIG from '../config';
import { getToken } from './auth-token';

const ENDPOINTS = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
  SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

export async function getStories() {
  const token = getToken();
  const response = await fetch(ENDPOINTS.STORIES, {
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
  const response = await fetch(STORIES, {
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
    const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
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
    console.error(`Subscribe error at ${ENDPOINTS.SUBSCRIBE}:`, error);
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
    console.error(`Unsubscribe error at ${ENDPOINTS.UNSUBSCRIBE}:`, error);
  }
}