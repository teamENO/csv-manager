function showInPageNotification(message) {
  const notifyDiv = document.getElementById('inPageNotify');
  notifyDiv.textContent = message;
  notifyDiv.classList.remove('hidden');

  // 3秒後に非表示
  setTimeout(() => {
    notifyDiv.classList.add('hidden');
  }, 3000);
}
