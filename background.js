// background.js
import { defaultRules } from './rules.js';

// Helper function to update dynamic rules based on current settings
async function updateDynamicRules(enabled, ruleSettings = { "1": true, "2": true }) {
  let rulesToAdd = [];
  if (enabled) {
    rulesToAdd = defaultRules.filter(rule => ruleSettings[rule.id]);
  }
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const existingIds = existingRules.map(rule => rule.id);
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingIds,
    addRules: rulesToAdd
  });
  console.log(`Dynamic rules updated. Ad blocker is now ${enabled ? "enabled" : "disabled"}.`);
}

// On installation, initialize settings (default: enabled)
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Enhanced Ad Blocker installed.');
  chrome.storage.sync.get({ adBlockEnabled: true, ruleSettings: { "1": true, "2": true } }, async (data) => {
    await updateDynamicRules(data.adBlockEnabled, data.ruleSettings);
  });
});

// Listen for keyboard commands (e.g. Ctrl+Shift+Y)
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-adblock") {
    chrome.storage.sync.get({ adBlockEnabled: true, ruleSettings: { "1": true, "2": true } }, async (data) => {
      const newStatus = !data.adBlockEnabled;
      chrome.storage.sync.set({ adBlockEnabled: newStatus }, async () => {
        await updateDynamicRules(newStatus, data.ruleSettings);
        console.log(`Ad blocker toggled via keyboard. New status: ${newStatus ? "enabled" : "disabled"}.`);
      });
    });
  }
});

// Listen for messages from popup or options page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateRules') {
    updateDynamicRules(message.adBlockEnabled, message.ruleSettings)
      .then(() => sendResponse({ status: 'success' }))
      .catch(err => sendResponse({ status: 'error', error: err }));
    return true; // Indicates asynchronous response.
  }
});
