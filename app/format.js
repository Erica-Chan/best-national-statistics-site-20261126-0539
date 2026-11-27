// Number and text formatting helpers, used by every view and chart.
export function fmt(n, decimals = 0) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
export function signed(n, decimals = 1) {
  const v = Number(n).toFixed(decimals);
  return (Number(n) > 0 ? '+' : '') + v;
}
export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
export function sourceNote(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}
