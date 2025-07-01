import { startRecording, stopRecording } from './recorder';
import { replay, stop as stopReplay } from './replayer';

const btn = document.getElementById('btn-activate') as HTMLButtonElement;
let active = false;

btn.addEventListener('click', () => {
  if (!active) {
    startRecording();
    btn.textContent = 'Stop';
  } else {
    stopRecording();
    stopReplay();
    replay();
    btn.textContent = 'Activate';
  }
  active = !active;
});
