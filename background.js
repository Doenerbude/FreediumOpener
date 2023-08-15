// background.js

const CONTEXT_MENU_ID = "openWithPrefix";

function createContextMenu() {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Open page with freedium",
    contexts: ["page"],
    documentUrlPatterns: [
      "https://towardsdatascience.com/*",
      "https://medium.com/*"
    ]
  });
}

function removeContextMenu() {
  chrome.contextMenus.remove(CONTEXT_MENU_ID);
}

chrome.runtime.onInstalled.addListener(function() {
  createContextMenu();
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === CONTEXT_MENU_ID) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const originalUrl = tabs[0].url;
      const prefix = "https://freedium.cfd/"; // Hier den gewünschten Präfix eintragen
      const modifiedUrl = prefix + originalUrl;
      chrome.tabs.create({ url: modifiedUrl });
    });
  }
});
