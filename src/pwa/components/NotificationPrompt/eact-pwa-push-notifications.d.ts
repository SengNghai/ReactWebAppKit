// react-pwa-push-notifications.d.ts
declare module "react-pwa-push-notifications" {
    interface SubscribeOptions {
      publicKey: string;
    }
  
    export function useSubscribe(options: SubscribeOptions): {
      getSubscription: () => void;
    };
  }
  