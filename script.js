const form = document.getElementById("medForm");
const messageEl = document.getElementById("message");
const historyList = document.getElementById("historyList");

// 履歴保存用（ローカル表示のみ）
let history = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    medicine: formData.get("medicine"),
    time: formData.get("time")
  };

  messageEl.textContent = "送信中...";

  fetch("https://script.google.com/macros/s/AKfycbw8WM7fygS2JdeeiJkhX9gYgkG-XXjFI4NqiXZPO3Itm1WppP3LClJ8R6kBjzRwFhH9mA/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(msg => {
    messageEl.textContent = "✅ " + msg;
    form.reset();

    // 履歴に追加（ローカル表示）
    const now = new Date().toLocaleString();
    history.unshift(`${now} - ${data.name} / ${data.medicine} / ${data.time}`);
    if (history.length > 5) history.pop();
    renderHistory();
  })
  .catch(err => {
    messageEl.textContent = "❌ 送信エラー: " + err;
  });
});

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}
