/* eslint-disable import/prefer-default-export */

export function formatDateTime(timestamp) {
  const date = new Date(timestamp * 1e3);
  return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US', { timeStyle: 'short' })}`;
}
