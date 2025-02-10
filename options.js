// options.js

// Load saved settings on page load
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
      adBlockEnabled: true,
      ruleSettings: { "1": true, "2": true }
    }, (data) => {
      document.getElementById('toggleAdBlock').checked = data.adBlockEnabled;
      const checkboxes = document.querySelectorAll('.ruleCheckbox');
      checkboxes.forEach(cb => {
        const ruleId = cb.getAttribute('data-rule-id');
        cb.checked = data.ruleSettings[ruleId];
      });
    });
  });
  
  // Save settings and update dynamic rules
  document.getElementById('saveOptions').addEventListener('click', () => {
    const adBlockEnabled = document.getElementById('toggleAdBlock').checked;
    const ruleSettings = {};
    document.querySelectorAll('.ruleCheckbox').forEach(cb => {
      const ruleId = cb.getAttribute('data-rule-id');
      ruleSettings[ruleId] = cb.checked;
    });
  
    chrome.storage.sync.set({
      adBlockEnabled,
      ruleSettings
    }, () => {
      updateDynamicRules(adBlockEnabled, ruleSettings);
    });
  });
  
  function updateDynamicRules(enabled, ruleSettings) {
    let newRules = [];
    if (enabled) {
      newRules = defaultRules.filter(rule => ruleSettings[rule.id]);
    }
    chrome.runtime.sendMessage({ type: 'updateRules', rules: newRules }, (response) => {
      if (response.status === 'success') {
        alert('Settings saved and rules updated.');
      } else {
        alert('Error updating rules: ' + response.error);
      }
    });
  }
  