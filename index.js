// Service Worker登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('SW登録完了'));
}

// 通知許可取得
function requestNotificationPermission() {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('通知許可OK');
    }
  });
}

// 通知を送る関数（例：5秒後）
function sendLocalNotification(title, body, delayMs) {
  setTimeout(() => {
    new Notification(title, { body });
  }, delayMs);
}