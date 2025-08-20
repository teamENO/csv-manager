fetch("https://script.google.com/macros/s/【exec URL】/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Kenzo",
    medicine: "アセトアミノフェン",
    time: "08:00"
  })
})
.then(res => res.text())
.then(msg => console.log("✅ 通信成功:", msg))
.catch(err => console.error("❌ 通信失敗:", err));
