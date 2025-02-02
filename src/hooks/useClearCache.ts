import { useCallback } from 'react';

const useClearCache = () => {
  const clearCache = useCallback(() => {
    // 清除本地存储
    localStorage.clear();

    // 清除会话存储
    sessionStorage.clear();

    // 清除所有cookie
    document.cookie.split(";").forEach(cookie => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
    });

    // 清除所有缓存
    caches.keys().then(cacheNames => {
      cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
      });
    });

    // 清除浏览历史
    window.history.go(-(window.history.length - 1));
    window.location.href = "about:blank";
  }, []);

  return clearCache;
};

export default useClearCache;
