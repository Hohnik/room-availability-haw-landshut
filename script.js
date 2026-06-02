const PORTAL_BASE = 'https://if-portal.haw-landshut.de/public/raumplan';

const CORS_PROXIES = [
  url => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

const ROOMS = ["A001", "A002", "A003", "A004", "A005", "A006", "A007", "BSU02", "C001", "C002", "C003", "C005", "C007", "C009", "C011", "C013", "C015", "C017", "C019", "C022", "C024", "C025", "C028", "C036", "C040", "C101", "C102", "C103", "C105", "C107", "C109", "C111", "C113", "C115", "C117", "C119", "C120", "C130", "C138", "D001", "D002", "D003", "D004", "D005", "D008", "D030", "D102", "D104", "D105", "D106", "D107", "D108", "D111", "D113", "D114", "D115", "D116", "D201", "D202", "D203", "D204", "D207", "DU02", "DU03", "E009", "E011", "E013", "F008", "F022", "F024", "F025", "F027", "F031", "F042", "F043", "F045", "F101", "F102", "F104", "F107", "G003", "G004", "G005", "G007", "G012", "G013", "G017", "G018", "H001", "H004", "H013", "H018", "H027", "H029", "H031", "H101", "H102", "H103", "H107", "H108", "H111", "J001", "J002", "J004", "J005", "J009", "J011", "J017", "J018", "J022", "J023", "J029", "J101", "J103", "J105", "J107", "J109", "J119", "J121", "J123", "J201", "K001", "K003", "K006", "K007", "K008", "K009", "K010", "K011", "K013", "K016", "K018", "K019", "K020", "L007", "Labor F109", "Labor F112", "LW028", "Mensa", "R001", "R002", "SC001", "SC002", "T002", "T003", "T004", "T102", "T103", "T104", "T107", "TZ PULS", "TZ PULS T003", "TZ PULS T020", "TZ PULS T030", "TZ PULS T031", "TZ PULS T032", "ZE 03", "ZE 04", "ZU 04", "ZU 07"];

const HOUR_START = 6;
const HOUR_END = 22;

const BUILDING_POLYS = {
  N: [[1341, 393], [1587, 393], [1587, 494], [1554, 494], [1554, 480], [1501, 480], [1494, 700], [1541, 700], [1541, 807], [1467, 807], [1467, 667], [1434, 667], [1441, 487], [1341, 487]],
  D: [[954, 794], [954, 740], [1014, 740], [1007, 560], [1127, 560], [1127, 667], [1354, 667], [1354, 714], [1281, 707], [1281, 727], [1274, 727], [1274, 747], [1281, 754], [1281, 847], [1227, 854], [1220, 794]],
  E: [[952, 821], [1149, 821], [1149, 893], [952, 893]],
  B: [[1461, 954], [1541, 974], [1541, 927], [1654, 927], [1654, 1000], [1621, 1007], [1621, 987], [1614, 987], [1574, 1120], [1434, 1080]],
  M: [[1730, 897], [2042, 897], [2042, 1030], [1960, 1157], [1730, 1020]],
  C: [[1234, 907], [1294, 907], [1294, 894], [1334, 894], [1334, 1294], [1581, 1294], [1581, 1220], [1634, 1220], [1667, 1227], [1667, 1381], [1427, 1387], [1427, 1407], [1314, 1407], [1314, 1394], [1234, 1394], [1234, 1314], [1220, 1314], [1220, 1214], [1241, 1214], [1241, 1167], [1220, 1167], [1220, 1047], [1234, 1047]],
  F: [[920, 980], [1174, 974], [1174, 1354], [1160, 1354], [1160, 1394], [920, 1394], [914, 1347], [927, 1347], [927, 1287], [1080, 1287], [1080, 1234], [927, 1234], [934, 1134], [1080, 1134], [1080, 1080], [927, 1080]],
  A: [[1754, 1227], [1927, 1227], [1927, 1379], [1754, 1379]],
  Z: [[2336, 1252], [2479, 1252], [2479, 1354], [2337, 1354]],
  R: [[567, 1454], [774, 1454], [774, 1487], [714, 1487], [714, 1521], [727, 1521], [727, 1567], [614, 1567], [614, 1487], [567, 1487]],
  G: [[1127, 1667], [1107, 1667], [1100, 1727], [1054, 1727], [1054, 1754], [947, 1754], [947, 1727], [900, 1727], [900, 1427], [1054, 1427], [1054, 1447], [1160, 1447], [1160, 1461], [1241, 1461], [1241, 1514], [1140, 1514], [1140, 1534], [1194, 1534], [1200, 1627], [1127, 1634]],
  H: [[1241, 1461], [1514, 1447], [1514, 1607], [1407, 1601], [1401, 1534], [1347, 1534], [1347, 1601], [1241, 1607]],
  J: [[1461, 1781], [1514, 1781], [1507, 1674], [1107, 1674], [1100, 1781]],
  K: [[1074, 1834], [1507, 1834], [1514, 1947], [1074, 1947]],
  L: [[867, 1847], [1034, 1847], [1034, 1941], [1020, 1941], [1020, 1967], [980, 1967], [980, 1947], [847, 1941], [847, 1894], [880, 1894], [880, 1881], [867, 1881]],
  T: [[1093, 2040], [1199, 2040], [1199, 2158], [1093, 2158]],
};

const BUILDING_LABEL_POS = {
  N: [1470, 439], D: [1136, 730], E: [1055, 856], B: [1530, 1037], M: [1893, 992],
  C: [1295, 1328], F: [1124, 1178], A: [1845, 1304], Z: [2410, 1304], R: [670, 1512],
  G: [1025, 1578], H: [1295, 1515], J: [1292, 1722], K: [1292, 1890], L: [950, 1896], T: [1148, 2095],
};

const BUILDINGS = [
  { id: 'N', label: 'Gebäude N', desc: 'Hochschulleitung & Verwaltung' },
  { id: 'D', label: 'Gebäude D', desc: 'Soziale Arbeit' },
  { id: 'E', label: 'Gebäude E', desc: '' },
  { id: 'B', label: 'Gebäude B', desc: 'Bibliothek · Kaffeebar' },
  { id: 'M', label: 'Mensa', desc: '' },
  { id: 'C', label: 'Gebäude C', desc: 'Informatik · ISt. · MB' },
  { id: 'F', label: 'Gebäude F', desc: '' },
  { id: 'A', label: 'Gebäude A', desc: 'Betriebswirtschaft' },
  { id: 'Z', label: 'CampusNest', desc: '' },
  { id: 'R', label: 'Gebäude R', desc: '' },
  { id: 'G', label: 'Gebäude G', desc: 'Cafeteria' },
  { id: 'H', label: 'Gebäude H', desc: '' },
  { id: 'J', label: 'Gebäude J', desc: 'Elektrotechnik & WI' },
  { id: 'K', label: 'Gebäude K', desc: 'IT · KI · BMT' },
  { id: 'L', label: 'Gebäude L', desc: '' },
  { id: 'T', label: 'TZ PULS', desc: 'Technologiezentrum' },
];

/* ── State ─────────────────────────────────────────────────────── */
let rooms = ROOMS;
let selectedRoom = null;
let dayOffset = 0;

/* ── Fetch ─────────────────────────────────────────────────────── */
async function fetchViaProxy(url) {
  for (const proxy of CORS_PROXIES) {
    try {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(proxy(url), { signal: ctrl.signal });
      if (res.ok) return res.text();
    } catch (_) { }
  }
  throw new Error(`fetch failed: ${url}`);
}

/* ── ICS parser ────────────────────────────────────────────────── */
function parseICS(text) {
  const events = [];
  for (const block of text.split('BEGIN:VEVENT').slice(1)) {
    const get = key => {
      const m = block.match(new RegExp(`${key}[^:]*:([^\\r\\n]+(?:\\r?\\n[ \\t][^\\r\\n]+)*)`));
      return m ? m[1].replace(/\r?\n[ \t]/g, '').trim() : '';
    };
    const parseDate = s => {
      if (!s) return null;
      const [y, mo, d, h, mi, sc] = [+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8), +s.slice(9, 11), +s.slice(11, 13), +s.slice(13, 15)];
      return s.endsWith('Z') ? new Date(Date.UTC(y, mo, d, h, mi, sc)) : new Date(y, mo, d, h, mi, sc);
    };
    const dedup = s => { const h = Math.floor(s.length / 2), a = s.slice(0, h).trim(); return s.slice(h).trim().startsWith(a) ? a : s; };
    const start = parseDate(get('DTSTART'));
    const end = parseDate(get('DTEND'));
    if (start && end) events.push({ start, end, title: dedup(get('SUMMARY')) });
  }
  return events;
}

/* ── Date helpers ──────────────────────────────────────────────── */
const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function eventsForDay(events, day) {
  const nextDay = new Date(day.getTime() + 86400000);
  return events
    .filter(e => sameDay(e.start, day) || sameDay(e.end, day) || (e.start <= day && e.end >= nextDay))
    .sort((a, b) => a.start - b.start);
}

/* ── Building from room code ───────────────────────────────────── */
function buildingOf(room) {
  if (room.startsWith('SC')) return 'S';
  if (room.startsWith('TZ') || room.startsWith('LW')) return 'T';
  if (room.startsWith('Labor')) return 'F';
  if (/^(Mensa|Moodle|Live|ZE|ZU|BSU)/.test(room)) return 'Z';
  return room.match(/^([A-Z])/)?.[1] ?? 'Z';
}

/* ── UI helpers ────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const show = id => $(id).classList.remove('hidden');
const hide = id => $(id).classList.add('hidden');

/* ── Map overlay ───────────────────────────────────────────────── */
function initMap() {
  const svg = $('map-overlay');
  const tooltip = $('map-tooltip');
  const NS = 'http://www.w3.org/2000/svg';
  const available = new Set(rooms.map(buildingOf));

  BUILDINGS.forEach(building => {
    const points = BUILDING_POLYS[building.id];
    if (!points) return;

    const group = document.createElementNS(NS, 'g');
    group.classList.add('building-area');
    group.dataset.building = building.id;

    const poly = document.createElementNS(NS, 'polygon');
    poly.setAttribute('points', points.map(p => p.join(',')).join(' '));
    group.appendChild(poly);

    const lp = BUILDING_LABEL_POS[building.id];
    const cx = lp ? lp[0] : Math.round(points.reduce((s, p) => s + p[0], 0) / points.length);
    const cy = lp ? lp[1] : Math.round(points.reduce((s, p) => s + p[1], 0) / points.length);
    const txt = document.createElementNS(NS, 'text');
    txt.setAttribute('x', cx);
    txt.setAttribute('y', cy);
    txt.textContent = building.id;
    group.appendChild(txt);

    if (!available.has(building.id)) {
      group.classList.add('no-rooms');
      svg.appendChild(group);
      return;
    }

    group.addEventListener('mouseenter', e => {
      $('tooltip-label').textContent = building.label;
      $('tooltip-desc').textContent = building.desc;
      tooltip.classList.remove('hidden');
      positionTooltip(e);
    });
    group.addEventListener('mousemove', positionTooltip);
    group.addEventListener('mouseleave', () => tooltip.classList.add('hidden'));
    group.addEventListener('click', () => { tooltip.classList.add('hidden'); selectBuilding(building.id); });

    svg.appendChild(group);
  });

  function positionTooltip(e) {
    const rect = svg.closest('.map-container').getBoundingClientRect();
    tooltip.style.left = `${e.clientX - rect.left}px`;
    tooltip.style.top = `${e.clientY - rect.top}px`;
  }
}

/* ── Select building ───────────────────────────────────────────── */
function selectBuilding(buildingId) {
  selectedRoom = null;
  dayOffset = 0;

  document.querySelectorAll('.building-area').forEach(g =>
    g.classList.toggle('active', g.dataset.building === buildingId)
  );

  const building = BUILDINGS.find(b => b.id === buildingId);
  const buildingRooms = rooms.filter(r => buildingOf(r) === buildingId).sort();

  $('selected-building-label').textContent = building?.label ?? `Gebäude ${buildingId}`;
  $('room-grid').innerHTML = buildingRooms.map(r =>
    `<button class="room-btn" onclick="selectRoom('${r}')">${r}</button>`
  ).join('');

  hide('availability-section');
  show('room-section');
  $('room-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Select room ───────────────────────────────────────────────── */
async function selectRoom(room) {
  selectedRoom = room;
  dayOffset = 0;

  document.querySelectorAll('.room-btn').forEach(b =>
    b.classList.toggle('active', b.textContent === room)
  );

  $('selected-room-label').textContent = room;
  show('availability-section');
  $('availability-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  await loadAvailability();
}

/* ── Load availability ─────────────────────────────────────────── */
async function loadAvailability() {
  $('timeline').innerHTML = '<div class="loading-spinner">Lädt Belegung…</div>';
  $('status-badge').className = 'status-badge';
  $('status-badge').innerHTML = '';

  const day = new Date();
  day.setHours(0, 0, 0, 0);
  day.setDate(day.getDate() + dayOffset);
  $('day-label').textContent = day.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  let events;
  for (const name of [`SS26_${selectedRoom}`, selectedRoom, `SS26_${selectedRoom}_`]) {
    try { events = parseICS(await fetchViaProxy(`${PORTAL_BASE}/ics/de/${name}.ics`)); break; }
    catch (_) { }
  }

  if (!events) {
    $('timeline').innerHTML = '<p class="no-events">Belegungsdaten konnten nicht geladen werden.</p>';
    return;
  }

  const dayEvents = eventsForDay(events, day);
  renderTimeline(dayEvents);
  renderStatusBadge(dayEvents);
}

/* ── Timeline ──────────────────────────────────────────────────── */
function renderTimeline(events) {
  const totalMin = (HOUR_END - HOUR_START) * 60;
  const pct = (min, base = totalMin) => (min / base * 100).toFixed(2);

  const ticks = [];
  for (let h = HOUR_START; h <= HOUR_END; h += 2)
    ticks.push(`<span class="time-tick" data-h="${h}">${String(h).padStart(2, '0')}:00</span>`);

  const slots = [];
  let prev = 0;
  for (const e of events) {
    const s = Math.max((e.start.getHours() - HOUR_START) * 60 + e.start.getMinutes(), 0);
    const end = Math.min((e.end.getHours() - HOUR_START) * 60 + e.end.getMinutes(), totalMin);
    if (end <= 0 || s >= totalMin) continue;
    slots.push(`<div class="time-slot busy" style="left:${pct(s)}%;width:${pct(end - s)}%" title="${e.title}"></div>`);
    prev = end;
  }

  const fmt = d => d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const cards = events.map(e => `
    <div class="event-card">
      <div class="event-time">${fmt(e.start)} – ${fmt(e.end)}</div>
      <div class="event-title">${e.title}</div>
    </div>`).join('');

  $('timeline').innerHTML = `
    <div class="time-axis">${ticks.join('')}</div>
    <div class="timeline-track">${slots.join('')}</div>
    <div class="event-list">${events.length ? cards : '<p class="no-events">Keine Belegungen an diesem Tag</p>'}</div>`;
}

/* ── Status badge ──────────────────────────────────────────────── */
function renderStatusBadge(events) {
  const now = new Date();
  const fmt = d => d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const active = events.find(e => e.start <= now && e.end > now);
  const next = events.find(e => e.start > now);
  const busy = !!active;
  const text = active ? `Belegt bis ${fmt(active.end)}`
    : next ? `Frei · nächste Belegung ${fmt(next.start)}`
      : 'Frei – keine weiteren Belegungen heute';
  $('status-badge').className = `status-badge ${busy ? 'busy' : 'free'}`;
  $('status-badge').innerHTML = `<span class="status-dot"></span> ${text}`;
}

/* ── Navigation ────────────────────────────────────────────────── */
$('prev-day').addEventListener('click', () => { dayOffset--; loadAvailability(); });
$('next-day').addEventListener('click', () => { dayOffset++; loadAvailability(); });

$('back-to-buildings').addEventListener('click', () => {
  hide('room-section');
  hide('availability-section');
  document.querySelectorAll('.building-area').forEach(g => g.classList.remove('active'));
  $('map-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$('back-to-rooms').addEventListener('click', () => {
  hide('availability-section');
  $('room-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ── Init ──────────────────────────────────────────────────────── */
initMap();
