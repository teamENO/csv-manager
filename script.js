fetch("https://script.google.com/macros/s/AKfycbwMfCL7szkgnqRLQ5o3vyoqlKSdKnPKP85pV3Mo_of_MUxRMctGmVQIm-P3a2dnOZt6Iw/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ test: "hello" })
})
.then(res => res.text())
.then(msg => console.log("✅ 通信成功:", msg))
.catch(err => console.error("❌ 通信失敗:", err));
