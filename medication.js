document.addEventListener('DOMContentLoaded', () => {
  const medTimeSelect = document.getElementById('medTime');
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const option = document.createElement('option');
      option.value = time;
      option.textContent = time;
      medTimeSelect.appendChild(option);
    }
  }

  document.getElementById('medForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const medicine = document.getElementById('medicine').value.trim();
    const time = document.getElementById('medTime').value;

    if (!name || !medicine || !time) {
      alert("すべての項目を入力してください");
      return;
    }

    // 表に追加
    const table = document.getElementById('medTable').querySelector('tbody');
    const row = table.insertRow();
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = medicine;
    row.insertCell(2).textContent = time;

    // Googleスプレッドシートに送信
    sendToSheet(name, medicine, time);

    this.reset();
  });
});


//てすと
fetch("https://script.google.com/macros/s/AKfycbx8GgnNwkvQcNhZUCM4Pj_qyFzvJJ7x4KViYD-ec9iUudpp_mXAHnqLtlx200z0D2W6Jg/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "テスト太郎",
    medicine: "アセトアミノフェン",
    time: "08:00"
  })
})
.then(res => res.text())
.then(msg => console.log("送信結果:", msg))
.catch(err => console.error("送信エラー:", err));

// 通知表示（任意）
function showNotification(name, medicine, time) {
  const notification = document.getElementById('notification');
  notification.textContent = `${name}さん、${medicine}の服薬時間（${time}）です！`;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 5000);
}

// 毎分チェックして通知（任意）
setInterval(() => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const rows = document.querySelectorAll('#medTable tbody tr');
  rows.forEach(row => {
    const time = row.cells[2].textContent;
    if (time === currentTime) {
      const name = row.cells[0].textContent;
      const medicine = row.cells[1].textContent;
      showNotification(name, medicine, time);
    }
  });
}, 60000);
