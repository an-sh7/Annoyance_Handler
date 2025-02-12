document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggleBlocking");
    const statusText = document.getElementById("statusText");

    chrome.storage.local.get("isEnabled", (data) => {
        toggle.checked = data.isEnabled ?? true;
        statusText.textContent = toggle.checked ? "Blocking: ON" : "Blocking: OFF";
    });

    toggle.addEventListener("change", () => {
        chrome.storage.local.set({ isEnabled: toggle.checked });
        statusText.textContent = toggle.checked ? "Blocking: ON" : "Blocking: OFF";
    });
});
