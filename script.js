function showInPageNotification(message) {
  const notifyDiv = document.getElementById('inPageNotify');
  notifyDiv.textContent = message;
  notifyDiv.classList.remove('hidden');

  setTimeout(() => {
    notifyDiv.classList.add('hidden');
  }, 3000);
}

function handleCSVUpload() {
  const input = document.getElementById('csvFileInput');
  const file = input.files[0];

  if (!file) {
    showInPageNotification('ファイルが選択されていません');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    displayCSV(text);
    showInPageNotification('CSVファイルを読み込みました');
  };
  reader.onerror = function () {
    showInPageNotification('CSVの読み込みに失敗しました');
  };
  reader.readAsText(file);
}

function displayCSV(csvText) {
  const rows = csvText.split('\n').map(row => row.split(','));
  const table = document.getElementById('csvTable');
  table.innerHTML = '';

  rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement(rowIndex === 0 ? 'th' : 'td');
      td.textContent = cell.trim();
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}
