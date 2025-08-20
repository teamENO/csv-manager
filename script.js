// 時間プルダウン生成
const select = document.getElementById("medTime");
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 5) {
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    select.innerHTML += `<option value="${time}">${time}</option>`;
  }
}

// 通知チェック（1分ごと）
setInterval(() => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  // CSVデータと照合して一致する時間があれば通知表示
}, 60000);
}

