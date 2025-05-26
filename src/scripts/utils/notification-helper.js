import { convertBase64ToUint8Array } from './index';
import { VAPID_PUBLIC_KEY } from '../config';
import { subscribePushNotification } from '../data/api';

export function isNotificationAvailable() {
  return 'Notification' in window;
}
 
export function isNotificationGranted() {
  return Notification.permission === 'granted';
}
 
export async function requestNotificationPermission() {
  console.log('masuk request .. 1');
  if (!isNotificationAvailable()) {
    console.error('Notification API unsupported.');
    return false;
  }
  console.log('masuk request .. 2');
  if (isNotificationGranted()) {
    return true;
  }
  console.log('masuk request .. 3');
  const status = await Notification.requestPermission();
  console.log('masuk request .. 4 .. jawaban');
  if (status === 'denied') {
    alert('Izin notifikasi ditolak.');
    return false;
  }
 
  if (status === 'default') {
    alert('Izin notifikasi ditutup atau diabaikan.');
    return false;
  }
 
  return true;
}
 
export async function getPushSubscription() {
  const registration = await navigator.serviceWorker.getRegistration();
  return await registration.pushManager.getSubscription();
}
 
export async function isCurrentPushSubscriptionAvailable() {
  return !!(await getPushSubscription());
}
 
export function generateSubscribeOptions() {
  return {
    userVisibleOnly: true,
    applicationServerKey: convertBase64ToUint8Array(VAPID_PUBLIC_KEY),
  };
}

export async function subscribe() {
  console.log('mulai masuk fungsi');
  if (!(await requestNotificationPermission())) {
    console.log('return pertama');
    return;
  }
 
  if (await isCurrentPushSubscriptionAvailable()) {
    alert('Sudah berlangganan push notification.');
    return;
  }
 
  console.log('Mulai berlangganan push notification...');

  const failureSubscribeMessage = 'Langganan push notification gagal diaktifkan.';
  const successSubscribeMessage = 'Langganan push notification berhasil diaktifkan.';
  let pushSubscription;
  try {
    console.log('mulai nunggu');
    const registration = await navigator.serviceWorker.getRegistration();
    pushSubscription = await registration.pushManager.subscribe(generateSubscribeOptions());
    const { endpoint, keys } = pushSubscription.toJSON();
    
    console.log('masih nunggu');
    const response = await subscribePushNotification({ endpoint, keys });
    console.log('hasil');
    if (!response.ok) {
      console.error('subscribe: response:', response);
      alert(failureSubscribeMessage);
      // Undo subscribe to push notification
      await pushSubscription.unsubscribe();
      return;
    }
    
    console.log({ endpoint, keys });
    alert(successSubscribeMessage);
  } catch (error) {
    console.error('subscribe: error:', error);
    alert(failureSubscribeMessage);

    // Undo subscribe to push notification
    await pushSubscription.unsubscribe();
  }
}