// rules.js
export const defaultRules = [
  {
    "id": 1,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "||pagead2.googlesyndication.com^",
      "resourceTypes": ["script", "image", "sub_frame"]
    }
  },
  {
    "id": 2,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "||doubleclick.net^",
      "resourceTypes": ["script", "image", "sub_frame"]
    }
  }
];
