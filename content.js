function removeAds() {
    const adSelectors = [
        "iframe[title='Advertisement']",
        ".ad-banner",
        ".adsbygoogle",
        "[data-ad-slot]",
        ".sponsored"
    ];
    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(ad => ad.remove());
    });
}

// Function to wait for document body to be available
function waitForBody(callback) {
    if (document.body) {
        callback();
    } else {
        new MutationObserver((mutations, observer) => {
            if (document.body) {
                observer.disconnect();
                callback();
            }
        }).observe(document.documentElement, { childList: true });
    }
}

// Wait for the body, then observe mutations
waitForBody(() => {
    const observer = new MutationObserver(removeAds);
    observer.observe(document.body, { childList: true, subtree: true });
    removeAds();
});
