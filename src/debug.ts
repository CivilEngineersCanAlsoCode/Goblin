enum Level {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

interface LogEntry {
  ts: string;
  level: Level;
  module: string;
  msg: string;
}

const buffer: LogEntry[] = [];

export function log(level: Level, module: string, msg: string): void {
  const entry: LogEntry = { ts: new Date().toISOString(), level, module, msg };
  console[level.toLowerCase() as 'log'](JSON.stringify(entry));
  buffer.push(entry);
}

export function flush(): LogEntry[] {
  const copy = [...buffer];
  buffer.length = 0;
  return copy;
}

export { Level };
