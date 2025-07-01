import { getActions } from './storage';

export async function render(): Promise<void> {
  const actions = await getActions();
  const lines = ['graph TD'];
  actions.forEach((a, i) => {
    const next = actions[i + 1];
    if (next) lines.push(`${i}[${a.type}] --> ${i + 1}[${next.type}]`);
  });
  const pre = document.createElement('pre');
  pre.textContent = lines.join('\n');
  document.body.appendChild(pre);
}
