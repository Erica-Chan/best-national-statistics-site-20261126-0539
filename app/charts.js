// Small SVG charts, drawn by hand from the data — no chart library, so the
// first load stays tiny and every pixel on screen is our own code.
import { esc, fmt } from './format.js';

const INK = '#1d2a4a';
const GRID = '#e3e0d8';
const RED = '#b3402a';
const BLUE = '#2f5d8a';
const TEAL = '#2e7d6b';
const GOLD = '#c08a1e';

// Line chart with a filled area, labelled end value and gridlines.
export function lineChart({ labels, values, unit = '', color = BLUE, height = 220, min = null, max = null }) {
  const w = 640; const h = height; const padL = 44; const padR = 14; const padT = 14; const padB = 28;
  const lo = min ?? Math.min(...values) * 0.92;
  const hi = max ?? Math.max(...values) * 1.04;
  const x = (i) => padL + (i * (w - padL - padR)) / (labels.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * (h - padT - padB);
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${padL},${y(lo)} ${pts} ${x(labels.length - 1)},${y(lo)}`;
  const ticks = [0, 1, 2, 3].map((k) => lo + ((hi - lo) * k) / 3);
  const grid = ticks.map((t) => `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}"/><text x="${padL - 6}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#6b6f7a">${fmt(t, t < 10 ? 1 : 0)}${unit}</text>`).join('');
  const xlabels = labels.map((l, i) => (i % 2 === 0 || i === labels.length - 1 ? `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#6b6f7a">${esc(l)}</text>` : '')).join('');
  const lastVal = values[values.length - 1];
  const lastDec = Math.abs(lastVal) < 10 ? 1 : 0;
  const dots = values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3" fill="${color}"/>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart" class="chart">${grid}<polygon points="${area}" fill="${color}" opacity="0.12"/><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5"/>${dots}${xlabels}<text x="${w - padR}" y="${y(values[values.length - 1]) - 10}" text-anchor="end" font-size="13" font-weight="700" fill="${color}">${fmt(lastVal, lastDec)}${unit}</text></svg>`;
}

// Grouped bars (two series) with a legend and value labels.
export function groupedBars({ labels, a, b, aLabel, bLabel, height = 240 }) {
  const w = 640; const h = height; const padL = 52; const padR = 10; const padT = 26; const padB = 28;
  const max = Math.max(...a, ...b) * 1.08;
  const slot = (w - padL - padR) / labels.length;
  const y = (v) => padT + (1 - v / max) * (h - padT - padB);
  const bw = Math.min(26, slot * 0.32);
  let bars = '';
  labels.forEach((l, i) => {
    const cx = padL + slot * i + slot / 2;
    bars += `<rect x="${cx - bw - 3}" y="${y(a[i])}" width="${bw}" height="${h - padB - y(a[i])}" fill="${TEAL}" rx="2"/><rect x="${cx + 3}" y="${y(b[i])}" width="${bw}" height="${h - padB - y(b[i])}" fill="${RED}" rx="2"/>`;
    bars += `<text x="${cx}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#6b6f7a">${esc(l)}</text>`;
    bars += `<text x="${cx - bw / 2 - 3}" y="${y(a[i]) - 5}" text-anchor="middle" font-size="10" fill="${TEAL}">${fmt(a[i] / 1000, 0)}k</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Births and deaths chart" class="chart"><text x="${padL}" y="14" font-size="12" fill="${TEAL}">● ${esc(aLabel)}</text><text x="${padL + 130}" y="14" font-size="12" fill="${RED}">● ${esc(bLabel)}</text>${bars}</svg>`;
}

// Horizontal bars, ranked, with values at the end of each bar.
export function hbars({ rows, valueFmt = (v) => fmt(v, 2), color = BLUE, height = null }) {
  const w = 640; const rowH = 30; const h = height ?? rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => r.value));
  const padL = 92; const padR = 64;
  const body = rows.map((r, i) => {
    const bw = ((w - padL - padR) * r.value) / max;
    const yy = 8 + i * rowH;
    return `<text x="${padL - 8}" y="${yy + 15}" text-anchor="end" font-size="12" fill="${INK}">${esc(r.label)}</text><rect x="${padL}" y="${yy + 3}" width="${bw.toFixed(1)}" height="16" rx="3" fill="${r.color || color}"/><text x="${padL + bw + 6}" y="${yy + 15}" font-size="12" font-weight="600" fill="${INK}">${valueFmt(r.value)}</text>${r.sub ? `<text x="${padL + bw + 6}" y="${yy + 15}" font-size="11" fill="#6b6f7a"> ${esc(r.sub)}</text>` : ''}`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Ranked bar chart" class="chart">${body}</svg>`;
}

// Donut chart with a centre label and a legend list.
export function donut({ parts, centre, height = 220 }) {
  const size = 200; const cx = 100; const cy = 100; const r = 78; const ir = 52;
  let acc = 0; let arcs = '';
  const cols = [RED, BLUE, TEAL, GOLD, '#7a5a9e', '#4a7a3a'];
  parts.forEach((p, i) => {
    const a0 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((acc + p.share) / 100) * Math.PI * 2 - Math.PI / 2;
    acc += p.share;
    const large = p.share > 50 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0); const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1); const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + ir * Math.cos(a1); const yi1 = cy + ir * Math.sin(a1);
    const xi0 = cx + ir * Math.cos(a0); const yi0 = cy + ir * Math.sin(a0);
    arcs += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${ir} ${ir} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${cols[i % cols.length]}"/>`;
  });
  const legend = parts.map((p, i) => `<li><span class="swatch" style="background:${cols[i % cols.length]}"></span>${esc(p.label)} <b>${fmt(p.share, 1)}%</b></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 200 200" role="img" aria-label="Donut chart" class="donut">${arcs}<text x="100" y="96" text-anchor="middle" font-size="15" font-weight="700" fill="${INK}">${esc(centre)}</text><text x="100" y="114" text-anchor="middle" font-size="11" fill="#6b6f7a">share</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Simple vertical bars for a single series (growth rates).
export function vbarChart({ labels, values, height = 200 }) {
  const w = 640; const h = height; const padL = 40; const padR = 8; const padT = 18; const padB = 26;
  const max = Math.max(...values.map(Math.abs)) * 1.15;
  const zero = padT + (max / (2 * max)) * (h - padT - padB);
  const slot = (w - padL - padR) / labels.length;
  const bw = Math.min(34, slot * 0.55);
  let bars = '';
  labels.forEach((l, i) => {
    const v = values[i];
    const bh = (Math.abs(v) / (2 * max)) * (h - padT - padB);
    const x = padL + slot * i + (slot - bw) / 2;
    const y = v >= 0 ? zero - bh : zero;
    bars += `<rect x="${x}" y="${y}" width="${bw}" height="${Math.max(bh, 2)}" rx="2" fill="${v >= 0 ? TEAL : RED}"/><text x="${x + bw / 2}" y="${v >= 0 ? y - 5 : y + bh + 13}" text-anchor="middle" font-size="11" font-weight="600" fill="${v >= 0 ? TEAL : RED}">${v > 0 ? '+' : ''}${v.toFixed(1)}%</text><text x="${x + bw / 2}" y="${h - 6}" text-anchor="middle" font-size="11" fill="#6b6f7a">${esc(l)}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Growth chart" class="chart"><line x1="${padL}" y1="${zero}" x2="${w - padR}" y2="${zero}" stroke="${GRID}"/>${bars}</svg>`;
}
