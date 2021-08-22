/* eslint-disable import/prefer-default-export */

export function formatDateTime(timestamp: number | string): string {
  const timestampNum = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
  const date = new Date(timestampNum * 1e3);
  return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US', { timeStyle: 'short' })}`;
}
