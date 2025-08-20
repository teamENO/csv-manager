const scriptURL = "https://script.google.com/macros/s/AKfycbylEu-RoOJL6IF-EXDoUCv0yK3L3icCxlRrdlpJbCpSYkGYrNEcKsEHoV8JAnFw_y75/exec"; // 実際のURLに置き換えてください

document.getElementById("medForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById("name").value,
    medicine: document.getElementById("medicine").value,
    time: document.getElementById("time").value
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById("message").textContent = "登録完了しました！";
  })
  .catch(error => {
    document.getElementById("message").textContent = "エラーが発生しました";
  });
});
