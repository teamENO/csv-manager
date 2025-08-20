const medForm = document.getElementById("medForm");
const medTableBody = document.querySelector("#medTable tbody");
const notification = document.getElementById("notification");
const medTimeSelect = document.getElementById("medTime");

const medList = [];

// 🔽 時間プルダウン生成（5分刻み）
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 5) {
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    medTimeSelect.appendChild(option);
  }
}

// 🔽 スプレッドシートからデータ読み込み
fetch("https://script.google.com/macros/s/AKfycbwPl0YY0Gfyt0s5ajiVYCFazu_O-m4vraj-HGLPZ_z8nL6E16NV6G60iWe605xSt-asXw/exec")
  .then(res => res.text())
  .then(json => {
    const data = JSON.parse(json);
    data.slice(1).forEach(row => {
      const [name, medicine, time] = row;
      medList.push({ name, medicine, time });
      addRowToTable(name, medicine, time);
    });
  });

// 🔽 表に行追加
function addRowToTable(name, medicine, time) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${name}</td><td>${medicine}</td><td>${time}</td>`;
  medTableBody.appendChild(row);
}

// 🔽 通知表示
function showNotification(message) {
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 5000);
}

// 🔽 時間チェック（1分ごと）
setInterval(() => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  medList.forEach(entry => {
    if (entry.time === currentTime) {
      showNotification(`${entry.name}さん、${entry.time}に${entry.medicine}を服薬してください`);
    }
  });
}, 60000);

// 🔽 フォーム送信 → スプレッドシートに登録
medForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const medicine = document.getElementById("medicine").value;
  const time = document.getElementById("medTime").value;

  fetch("https://script.google.com/macros/s/AKfycbwPl0YY0Gfyt0s5ajiVYCFazu_O-m4vraj-HGLPZ_z8nL6E16NV6G60iWe605xSt-asXw/exec", {
    method: "POST",
    body: new URLSearchParams({ name, medicine, time })
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);
    location.reload(); // 登録後に再読み込み
  });
});
