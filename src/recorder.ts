import { saveAction } from './storage';
import { toastInfo } from './notify';
import { log, Level } from './debug';
import { Action } from './types';

let observer: MutationObserver | null = null;

function recordEvent(event: Event): void {
  const target = event.target as HTMLElement;
  if (!target) return;
  const action: Action = {
    ts: new Date().toISOString(),
    type: event.type,
    selector: getSelector(target),
    value: (target as HTMLInputElement).value,
    url: location.href,
  };
  saveAction(action).then(() => {
    toastInfo('record', `Recorded ${event.type}`);
    log(Level.INFO, 'recorder', `Recorded ${event.type}`);
  });
}

function getSelector(el: HTMLElement): string {
  if (el.id) return `#${el.id}`;
  const path = [] as string[];
  while (el && el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase();
    if (el.className) selector += `.${el.className.split(' ').join('.')}`;
    path.unshift(selector);
    el = el.parentElement as HTMLElement;
  }
  return path.join(' > ');
}

export function startRecording(): void {
  if (observer) return;
  observer = new MutationObserver(() => {/* dom changes not recorded yet */});
  observer.observe(document, { childList: true, subtree: true });
  document.addEventListener('click', recordEvent, true);
  document.addEventListener('input', recordEvent, true);
  toastInfo('start', 'Recording actions');
  log(Level.INFO, 'recorder', 'Started recording');
}

export function stopRecording(): void {
  if (!observer) return;
  document.removeEventListener('click', recordEvent, true);
  document.removeEventListener('input', recordEvent, true);
  observer.disconnect();
  observer = null;
  toastInfo('stop', 'Stopped recording');
  log(Level.INFO, 'recorder', 'Stopped recording');
}
/* --- FUTURE:MULTI_TAB --- */
