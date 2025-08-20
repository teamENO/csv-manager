fetch("https://script.google.com/macros/s/【GASのexec URL】/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ test: "hello" })
})
.then(res => res.text())
.then(msg => console.log("✅ 通信成功:", msg))
.catch(err => console.error("❌ 通信失敗:", err));
