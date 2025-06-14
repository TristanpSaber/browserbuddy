document.addEventListener('DOMContentLoaded', () => {
  const refreshInput = document.getElementById('refreshTime');
  const saveBtn = document.getElementById('saveBtn');

  chrome.storage.local.get(['refreshTime'], (result) => {
    if (result.refreshTime) refreshInput.value = result.refreshTime;
  });

  saveBtn.addEventListener('click', () => {
    const time = parseInt(refreshInput.value);
    chrome.storage.local.set({ refreshTime: time }, () => {
      alert('Settings saved!');
    });
  });
});
