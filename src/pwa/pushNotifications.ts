export const subscribeUser = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      if (existingSubscription) {
        // 取消现有订阅
        await existingSubscription.unsubscribe();
        console.log('Existing subscription unsubscribed');
      }

      // const response = await fetch('http://localhost:5000/vapidPublicKey');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch VAPID public key');
      // }
      // const data = await response.json();

      const data = {
        publicKey: 'BH5GPho1RYRX5zjQeBf_8rBISv0Tf0IwROL1yHmfOdi2v5SHEbrsygbjYkS0VHT3m-8ifJYyjqsdhIJCTOo1J6s',
        privateKey: 'UG188tXc-11WNUNmaSBQFfqsnZH9Qkyzgu_8aqb9a28'
      }

      const publicKey = data.publicKey;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });

      await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('New subscription created');
    } catch (error) {
      console.error('Error during subscription:', error);
    }
  }
};


// Helper function to convert the base64 public key to a Uint8Array
const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
