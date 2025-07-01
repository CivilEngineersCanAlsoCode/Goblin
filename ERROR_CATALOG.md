| Code | Trigger | Toast Message | Debug Action |
|------|---------|---------------|--------------|
| E01  | Selector missing | "Element not found → halted" | Log last-5 steps JSON |
| E02  | Captcha present | "Solve captcha & press Continue" | Pause replayer |
| E03  | Excel read fail | "config.xlsx unreadable" | Bubble up & stop |
