chrome.runtime.onInstalled.addListener(async () => {
  console.log("Enhanced Ad Blocker installed.");
  try {
      const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
      const existingIds = existingRules.map(rule => rule.id);
      await chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: existingIds,
          addRules: [
              {
                  "id": 1,
                  "priority": 1,
                  "action": { "type": "block" },
                  "condition": { "urlFilter": "*://*.doubleclick.net/*", "resourceTypes": ["script", "xmlhttprequest", "sub_frame"] }
              }
          ]
      });
      console.log("Default rules applied.");
  } catch (error) {
      console.error("Error applying rules:", error);
  }
});
