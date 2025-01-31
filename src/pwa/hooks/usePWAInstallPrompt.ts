import { useState, useEffect } from 'react';

interface UsePWAInstallPromptResult {
  showInstallPrompt: boolean;
  handleInstallClick: () => void;
  isPromptVisible: boolean;
  requestNotificationPermission: () => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const usePWAInstallPrompt = (): UsePWAInstallPromptResult => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState<boolean>(false);
  const [isPromptVisible, setIsPromptVisible] = useState<boolean>(true); // 授权通知提示


  // 
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA installation prompt');
      } else {
        console.log('User dismissed the PWA installation prompt');
      }
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  // 授权通知提示
  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setIsPromptVisible(false);
    }
  };

  // 安装提示
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);


  return {
    showInstallPrompt,
    isPromptVisible,
    handleInstallClick,
    requestNotificationPermission
  };
};

export default usePWAInstallPrompt;
