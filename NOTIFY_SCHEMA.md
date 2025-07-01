### 1-Sec Toast Contract (Chrome `notifications` API)

| Field | Type | Example |
|-------|------|---------|
| `id`  | string | `"autoapply-step-12"` |
| `title` | string | `"AutoApply • Step 12"` |
| `message` | string | `"Clicked ‘Apply’ button"` |
| `iconUrl` | string | `"icons/64.png"` |
| `silent` | boolean | `true` |

💡 *Codex must call `chrome.notifications.create()` with these fields every time it:*  
- clicks a CTA  
- fills a form section  
- waits for page navigation  
- throws an error (then duration = 5 s, red icon)
