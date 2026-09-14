export default function inspect(obj: unknown): string {
  try {
    if (typeof obj === 'bigint') return `${obj.toString()}n`;
    if (typeof obj === 'symbol') return obj.toString();
    if (obj instanceof Error) return obj.stack || obj.message;
    return typeof obj === 'object' ? JSON.stringify(obj) : String(obj);
  } catch {
    return String(obj);
  }
}
