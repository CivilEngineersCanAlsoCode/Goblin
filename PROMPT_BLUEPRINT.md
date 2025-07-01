# Blueprint: Anatomy of `AUTOAPPLY_CODEX_PROMPT.md`

1. **Meta-Role & Global Directives**  
   *Why?* Orient Codex in one shot; prevents drift.

2. **Glossary** (Taleo, toast, Excel config…)  
   *Why?* Codex token disambiguation.

3. **High-Level Spec Recap** (links back to REQ IDs)  
   *Why?* Traceability.

4. **File/Folder Structure** (tree)  
   *Why?* Guides Codex output paths.

5. **Coding Standards** (TypeScript, ESLint, free libs only)  
   *Why?* Enforce consistency.

6. **Notification + Debug Contract** (import from NOTIFY_SCHEMA & DEBUG_SPEC)  
   *Why?* Single source of truth.

7. **Module-by-Module Instructions**  
   *Each module block*: purpose, inputs, outputs, references, future stubs.

8. **Commenting Mandate**  
   Reference COMMENT_GUIDE.

9. **Edge-Case Handling**  
   Pull text from ERROR_CATALOG.

10. **Future-Stub Tags**  
    e.g. `/* --- FUTURE:MOUSE_REPLAY --- */`

11. **Self-QC Reminder**  
    Point Codex to QC_CHECKLIST.

12. **“Begin Code Generation” Marker**  
    Explicit boundary where Codex starts emitting files.
