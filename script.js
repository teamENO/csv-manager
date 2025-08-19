// 通知許可をリクエスト
Notification.requestPermission().then(permission => {
  console.log("通知許可:", permission);
});

// 通知を送る関数
function sendTestNotification() {
  if (Notification.permission === "granted") {
    new Notification("服薬通知テスト", {
      body: "これは通知機能のテストです。実際の服薬時間に合わせて通知できます。",
      icon: "icon-192.png" // 任意のアイコン画像
    });
  } else {
    alert("通知が許可されていません。ブラウザの設定を確認してください。");
  }
}

// ボタンにイベントを設定
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("testNotifyBtn");
  if (btn) {
    btn.addEventListener("click", sendTestNotification);
  }
});
