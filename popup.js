// popup.js

function updateUI(enabled) {
  const statusEl = document.getElementById('status');
  const toggleBtn = document.getElementById('toggleBtn');

  // Update text
  statusEl.textContent = enabled ? 'Enabled' : 'Disabled';
  toggleBtn.textContent = enabled ? 'Disable Ad Blocker' : 'Enable Ad Blocker';

  // Change colors based on state
  if (enabled) {
    // When enabled, use a green background
    toggleBtn.style.backgroundColor = "#dc3545";
    toggleBtn.style.color = "#fff";
  } else {
    // When disabled, use a red background
    toggleBtn.style.backgroundColor = "#28a745";
    toggleBtn.style.color = "#fff";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Get current status and update the UI
  chrome.storage.sync.get({ adBlockEnabled: true }, (data) => {
    updateUI(data.adBlockEnabled);
  });

  // Options button: open options page
  const optionsBtn = document.getElementById('optionsBtn');
  if (optionsBtn) {
    optionsBtn.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  }

  // Toggle button: flip the ad blocker status and update dynamic rules
  document.getElementById('toggleBtn').addEventListener('click', () => {
    chrome.storage.sync.get({ adBlockEnabled: true, ruleSettings: { "1": true, "2": true } }, (data) => {
      const newStatus = !data.adBlockEnabled;
      chrome.storage.sync.set({ adBlockEnabled: newStatus }, () => {
        // Send a message to background.js to update the rules accordingly
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
