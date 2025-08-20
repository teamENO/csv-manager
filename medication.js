// 時間選択肢の生成
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

// データ追加処理
document.getElementById('medForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const medicine = document.getElementById('medicine').value;
  const time = document.getElementById('medTime').value;

  const table = document.getElementById('medTable').querySelector('tbody');
  const row = table.insertRow();
  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = medicine;
  row.insertCell(2).textContent = time;

  this.reset();
});

// 通知表示関数
function showNotification(name, medicine, time) {
  const notification = document.getElementById('notification');
  notification.textContent = `${name}さん、${medicine}の服薬時間（${time}）です！`;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 5000);
}

// 時間チェック（毎分）
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
