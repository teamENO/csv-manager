// Service Worker登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('SW登録完了'));
}

// 通知許可取得
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    console.log('通知許可OK');
  }
});

// 通知を送る関数
function sendNotification(title, body) {
  new Notification(title, { body });
}

// 例：服薬時間に通知
document.getElementById('notifyBtn').addEventListener('click', () => {
  sendNotification("服薬の時間です", "朝の薬を忘れずに！");
});
