### Log Levels
| Level | Color | Example |
|-------|-------|---------|
| INFO  | grey  | "Tab delay applied: 374 ms" |
| WARN  | yellow| "Selector '.foo' not found, retry 1/3" |
| ERROR | red   | "Unhandled promise rejection in recorder.ts:42" |

*Format*  
```json
{"ts":"2025-07-01T10:21:34.123Z","level":"INFO","module":"replayer","msg":"Waited 9.1s for navigation"}
```

*Store first in IndexedDB; batch-flush to CSV/Sheets when replayer stops.*
