import { Action } from './types';

const DB_NAME = 'autoapply';
const STORE_NAME = 'actions';
const VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'ts' });
      }
    };

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function saveAction(action: Action): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).add(action);
  return new Promise(resolve => {
    tx.oncomplete = () => resolve();
  });
}

export async function getActions(): Promise<Action[]> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const req = tx.objectStore(STORE_NAME).getAll();
  return new Promise((resolve, reject) => {
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result as Action[]);
  });
}

export async function clearActions(): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  tx.objectStore(STORE_NAME).clear();
  return new Promise(resolve => {
    tx.oncomplete = () => resolve();
  });
}

// 🔹 Stub for CSV/Sheets export
export async function exportCSV(): Promise<string> {
  const actions = await getActions();
  const header = 'ts,type,selector,value,url';
  const rows = actions.map(a => `${a.ts},${a.type},${a.selector},${a.value ?? ''},${a.url}`);
  return [header, ...rows].join('\n');
}
/* --- FUTURE:ENCRYPTION --- */
