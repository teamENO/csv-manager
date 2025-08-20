// 🔽 1. スプレッドシートからデータ読み込み（ページ訪問時）
fetch("https://script.google.com/macros/s/AKfycbwPl0YY0Gfyt0s5ajiVYCFazu_O-m4vraj-HGLPZ_z8nL6E16NV6G60iWe605xSt-asXw/exec")
  .then(res => res.text())
  .then(json => {
    const data = JSON.parse(json);
    const tbody = document.querySelector("#medTable tbody");
    data.slice(1).forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td>`;
      tbody.appendChild(tr);
    });
  });

// 🔽 2. フォーム送信 → スプレッドシートに登録
document.getElementById("medForm").addEventListener("submit", (e) => {
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
    location.reload(); // 登録後に再読み込みして表を更新
  });
});
