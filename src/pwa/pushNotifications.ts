async function subscribeUserToPush() {
  try {
    // 获取现有订阅
    const registration = await navigator.serviceWorker.ready;
    console.log('Service Worker is ready:', registration);

    const existingSubscription = await registration.pushManager.getSubscription();
    console.log('Existing subscription:', existingSubscription);

    // 检查是否存在订阅
    if (existingSubscription) {
      console.log('User is already subscribed:', existingSubscription);
      // 取消现有订阅
      await existingSubscription.unsubscribe();
      console.log('Existing subscription cancelled');
    }

    //////////////////////////////
     const response = await fetch('http://localhost:5000/vapidPublicKey');
     if (!response.ok) {
       throw new Error('Failed to fetch VAPID public key');
     }
     const data = await response.json();
     window.localStorage.setItem('vapidPublicKey', JSON.stringify(data));
     console.log('vapidPublicKey', data);
     const publicKey = data.publicKey;
    //////////////////////////////
    
    // 进行新的订阅
    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    });

    console.log('New subscription:', newSubscription);
    // 在服务器端保存新的订阅
    await sendSubscriptionToServer(newSubscription);
    console.log('New subscription sent to server');
  } catch (error) {
    console.error('Failed to subscribe user:', error);
  }
}

// 假设 sendSubscriptionToServer 是一个异步函数，用于将订阅发送到服务器
async function sendSubscriptionToServer(subscription: PushSubscription) {
  try {
    // 你的代码，用于将订阅发送到服务器
    console.log('Sending subscription to server:', subscription);
    const res =await fetch('http://localhost:5000/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('New subscription created', res);
  } catch (error) {
    console.error('Failed to send subscription to server:', error);
  }
}




export const subscribeUser = async () => {
 if ('serviceWorker' in navigator && 'PushManager' in window) {
   subscribeUserToPush();
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
