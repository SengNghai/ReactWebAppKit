import { useEffect, useState } from 'react';
import ModalPWA from '../ModalPWA';
import usePWAInstallPrompt from '../../hooks/usePWAInstallPrompt';
import NotificationPrompt from '../NotificationPrompt';
export default function MyPwaApps() {
    const { showInstallPrompt, handleInstallClick } = usePWAInstallPrompt();
    const [showModal, setShowModal] = useState<boolean>(showInstallPrompt);


    // 显示安装提示
    useEffect(() => {
        setShowModal(showInstallPrompt);
    }, [showInstallPrompt]);


    const [isInStandaloneMode, setIsInStandaloneMode] = useState<boolean>(false);

    useEffect(() => {
        // Check if page is opened in PWA mode
        const isInStandaloneMode = () =>
            (window.matchMedia('(display-mode: standalone)').matches) ||
            ('standalone' in window.navigator && (window.navigator as any).standalone) ||
            document.referrer.includes('android-app://');
        if (isInStandaloneMode()) {
            //   document.body.innerHTML = "是在pwa中打开的"
            setIsInStandaloneMode(true);
        } else {
            //   document.body.innerHTML = "请在pwa中打开"
            setIsInStandaloneMode(false);
        }
    }, []);

    // 发送测试通知

    return (
        <>
            <div>
                <h1>isInStandaloneMode: {isInStandaloneMode ? '是在pwa中打开的!!!' : '请在pwa中打开!!!'}</h1>
                <NotificationPrompt />
            </div>
            <ModalPWA
                show={showModal}
                onClose={() => setShowModal(false)}
                onInstall={handleInstallClick}
            />
        </>
    );
}