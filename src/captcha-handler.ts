import { toastInfo } from './notify';
import { log, Level } from './debug';

export async function waitForCaptcha(): Promise<void> {
  const captcha = document.querySelector('.captcha');
  if (captcha) {
    toastInfo('E02', 'Solve captcha & press Continue');
    log(Level.WARN, 'captcha', 'Captcha detected, pausing');
    await new Promise<void>(resolve => {
      const btn = document.createElement('button');
      btn.textContent = 'Continue';
      btn.style.position = 'fixed';
      btn.style.top = '10px';
      btn.style.right = '10px';
      btn.onclick = () => {
        btn.remove();
        resolve();
      };
      document.body.appendChild(btn);
    });
  }
}
