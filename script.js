fetch("https://script.google.com/macros/s/AKfycbw8WM7fygS2JdeeiJkhX9gYgkG-XXjFI4NqiXZPO3Itm1WppP3LClJ8R6kBjzRwFhH9mA/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ test: "hello" })
})
.then(res => res.text())
.then(msg => console.log("✅ 通信成功:", msg))
.catch(err => console.error("❌ 通信失敗:", err));
