function handleCSVUpload() {
  const input = document.getElementById('csvFileInput');
  const file = input.files[0];

  if (!file) {
    showInPageNotification('ファイルが選択されていません');
    return;
  }

  // ファイル名チェック
  if (file.name !== 'med_log.csv') {
    showInPageNotification(`ファイル名が「med_log.csv」ではありません（現在: ${file.name}）`);
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    displayCSV(text);
    showInPageNotification('med_log.csv を正常に読み込みました');
  };
  reader.onerror = function () {
    showInPageNotification('CSVの読み込みに失敗しました');
  };
  reader.readAsText(file);
}
