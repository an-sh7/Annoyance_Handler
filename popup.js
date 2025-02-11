// popup.js
function updateUI(enabled) {
    document.getElementById('status').textContent = enabled ? 'Enabled' : 'Disabled';
    document.getElementById('toggleBtn').textContent = enabled ? 'Disable Ad Blocker' : 'Enable Ad Blocker';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({ adBlockEnabled: true }, (data) => {
      updateUI(data.adBlockEnabled);
    });
  
    document.getElementById('toggleBtn').addEventListener('click', () => {
      chrome.storage.sync.get({ adBlockEnabled: true, ruleSettings: { "1": true, "2": true } }, (data) => {
        const newStatus = !data.adBlockEnabled;
        chrome.storage.sync.set({ adBlockEnabled: newStatus }, () => {
          // Send a message to background.js to update the rules
          chrome.runtime.sendMessage({
            action: 'updateRules',
            adBlockEnabled: newStatus,
            ruleSettings: data.ruleSettings
          }, (response) => {
            if (response && response.status === 'success') {
              updateUI(newStatus);
            } else {
              console.error('Error updating rules:', response && response.error);
            }
          });
        });
      });
    });
  });
  