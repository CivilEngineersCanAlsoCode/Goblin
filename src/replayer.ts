import { getActions } from './storage';
import { toastInfo, toastError } from './notify';
import { log, Level } from './debug';
import { Action } from './types';
import { waitForCaptcha } from './captcha-handler';

let halted = false;

async function perform(action: Action): Promise<void> {
  const el = document.querySelector(action.selector) as HTMLElement;
  if (!el) {
    toastError('E01', 'Element not found → halted');
    log(Level.ERROR, 'replayer', `Selector missing ${action.selector}`);
    halted = true;
    return;
  }

  if (action.type === 'click') el.click();
  if (action.type === 'input') (el as HTMLInputElement).value = action.value ?? '';
}

export async function replay(): Promise<void> {
  const actions = await getActions();
  for (const [index, action] of actions.entries()) {
    if (halted) break;
    await waitForCaptcha();
    await perform(action);
    toastInfo(`step-${index}`, `Replayed ${action.type}`);
    log(Level.INFO, 'replayer', `Replayed ${action.type}`);
    await delay(500 + Math.random() * 500);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
}

export function stop(): void {
  halted = true;
  log(Level.WARN, 'replayer', 'Replay stopped');
}
/* --- FUTURE:ENCRYPTION --- */
