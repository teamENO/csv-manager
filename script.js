const medForm = document.getElementById("medForm");
const medTableBody = document.querySelector("#medTable tbody");
const notification = document.getElementById("notification");
const medTimeSelect = document.getElementById("medTime");

const medList = [];

// 時間プルダウン生成（5分刻み）
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 5) {
    const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    medTimeSelect.appendChild(option);
  }
}

// 服薬データ追加
medForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const medicine = document.getElementById("medicine").value;
  const time = document.getElementById("medTime").value;

  medList.push({ name, medicine, time });
  addRowToTable(name, medicine, time);

  medForm.reset();
});

// 表に行追加
function addRowToTable(name, medicine, time) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${name}</td><td>${medicine}</td><td>${time}</td>`;
  medTableBody.appendChild(row);
}

// 通知表示
function showNotification(message) {
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 5000);
}

// 時間チェック（1分ごと）
setInterval(() => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  medList.forEach(entry => {
    if (entry.time === currentTime) {
      showNotification(`${entry.name}さん、${entry.time}に${entry.medicine}を服薬してください`);
    }
  });
}, 60000);
