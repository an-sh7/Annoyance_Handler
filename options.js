// options.js
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({ adBlockEnabled: true, ruleSettings: { "1": true, "2": true } }, (data) => {
    document.getElementById('globalToggle').checked = data.adBlockEnabled;
    document.querySelectorAll('.ruleCheckbox').forEach(cb => {
      const ruleId = cb.getAttribute('data-rule-id');
      cb.checked = data.ruleSettings[ruleId];
    });
  });
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const adBlockEnabled = document.getElementById('globalToggle').checked;
  const ruleSettings = {};
  document.querySelectorAll('.ruleCheckbox').forEach(cb => {
    const ruleId = cb.getAttribute('data-rule-id');
    ruleSettings[ruleId] = cb.checked;
  });
  chrome.storage.sync.set({ adBlockEnabled, ruleSettings }, () => {
    chrome.runtime.sendMessage({
      action: 'updateRules',
      adBlockEnabled,
      ruleSettings
    }, (response) => {
      if (response && response.status === 'success') {
        alert('Settings saved and rules updated.');
      } else {
        alert('Error updating rules: ' + (response && response.error));
      }
    });
  });
});
