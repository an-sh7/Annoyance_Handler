// background.js
import { defaultRules } from './rules.js';

// On installation, set the default dynamic rules
chrome.runtime.onInstalled.addListener(async () => {
    console.log('Enhanced Ad Blocker installed and running.');
    try {
      const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
      const existingIds = existingRules.map(rule => rule.id);
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingIds,
        addRules: defaultRules
      });
      console.log('Default blocking rules applied.');
    } catch (error) {
      console.error('Error applying dynamic rules:', error);
    }
  });
  
  // Listen for messages to update dynamic rules
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'updateRules') {
      updateRules(message.rules)
        .then(() => sendResponse({ status: 'success' }))
        .catch(err => sendResponse({ status: 'error', error: err }));
      return true; // Keep the message channel open for async response
    }
  });
  
  // Function to update dynamic rules based on user settings
  async function updateRules(rules) {
    const currentRules = await chrome.declarativeNetRequest.getDynamicRules();
    const currentIds = currentRules.map(rule => rule.id);
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: currentIds,
      addRules: rules
    });
  }
  