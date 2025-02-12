document.addEventListener("DOMContentLoaded", () => {
    const enableBlocking = document.getElementById("enableBlocking");
    chrome.storage.local.get("isEnabled", (data) => {
        enableBlocking.checked = data.isEnabled ?? true;
    });

    document.getElementById("saveSettings").addEventListener("click", () => {
        chrome.storage.local.set({ isEnabled: enableBlocking.checked }, () => {
            alert("Settings saved!");
        });
    });
});
