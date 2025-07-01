### Line-by-Line Pedagogical Comment Standard

```ts
// 🔹 STEP 1: Query the button that submits the job application.
// We use a CSS attribute selector because Taleo renders
// dynamic IDs but stable `data-apply-btn` attributes.
const submitBtn = document.querySelector('[data-apply-btn]') as HTMLButtonElement;

/*
 *  WHY THIS MATTERS:
 *  Non-tech readers: selectors let the script "see" the HTML element.
 *  Future change: if Taleo alters attribute names, adjust here.
 */
submitBtn?.click();  // 🔸 ACTION: simulate user click.
```

**Rules**

1. **Emoji bullets** (`🔹`, `🔸`, `⚠️`) → quick visual scanning.
2. **Blank line** between logical blocks.
3. **Caps “WHY THIS MATTERS”** section for every non-trivial line.
4. Comment stubs:
   `/* --- FUTURE:MOUSE_REPLAY: captureMove(event) --- */`
