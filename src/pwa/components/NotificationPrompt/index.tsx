import { Button } from 'antd-mobile';
import React, { useState } from 'react';

const NotificationPrompt: React.FC = () => {
  const [messageCount, setMessageCount] = useState<number>(0);


  const onSubmitSubscribe = async (_e: React.FormEvent) => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      const publicKey = JSON.parse(window.localStorage.getItem('vapidPublicKey') || '{}').publicKey;
      console.log('vapidPublicKey', publicKey);
      
      if (existingSubscription) {
        console.log('User is already subscribed:', existingSubscription);
        await existingSubscription.unsubscribe();
        console.log('Existing subscription cancelled');
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey || ''
      });

      const res = await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription })
      });

      console.log('Subscribe success', res);
    } catch (e) {
      console.warn(e);
    }
  };

  const triggerNotification = () => {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('测试通知', {
        body: '这是一条测试通知消息。',
        icon: 'pwa-192x192.png',
        badge: 'badge-24x24.png',
      });
      setMessageCount(prevCount => prevCount + 1);
    });
  };


  return (
    <div className="page">
      <div>
        <Button color="danger" onClick={onSubmitSubscribe} className="button">
          打开受权订阅通知(Subscribe)
        </Button>
      </div>
      <div>
        <h1>推送通知示例</h1>
        <h1>messageCount: {messageCount}</h1>
        <Button color="warning" onClick={triggerNotification}>发送测试通知数数据提示🔔</Button>
      </div>
    </div>
  );
};

export default NotificationPrompt;
