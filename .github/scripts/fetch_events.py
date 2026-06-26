#!/usr/bin/env python3
import json, re, os, urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta

with open('script.js') as f:
    ROOMS = json.loads(re.search(r'const ROOMS = (\[.*?\]);', f.read(), re.DOTALL).group(1))

BASE = 'https://if-portal.haw-landshut.de/public/raumplan/ics/de'

def fetch_ics(room):
    for name in [f'SS26_{room}', room, f'SS26_{room}_']:
        try:
            url = f'{BASE}/{urllib.parse.quote(name)}.ics'
            with urllib.request.urlopen(url, timeout=10) as r:
                if r.status == 200:
                    return r.read().decode('utf-8', errors='replace')
        except Exception:
            pass
    return None

def parse_dt(s):
    if not s: return None
    try:
        y,mo,d,h,mi,sc = int(s[0:4]),int(s[4:6]),int(s[6:8]),int(s[9:11]),int(s[11:13]),int(s[13:15])
        return datetime(y,mo,d,h,mi,sc, tzinfo=timezone.utc) if s.endswith('Z') else datetime(y,mo,d,h,mi,sc)
    except Exception:
        return None

def parse_ics(text):
    events = []
    for block in text.split('BEGIN:VEVENT')[1:]:
        def get(key, b=block):
            m = re.search(rf'{key}[^:]*:([^\r\n]+(?:\r?\n[ \t][^\r\n]+)*)', b)
            return re.sub(r'\r?\n[ \t]', '', m.group(1)).strip() if m else ''
        start, end = parse_dt(get('DTSTART')), parse_dt(get('DTEND'))
        if start and end:
            events.append({'start': start.isoformat(), 'end': end.isoformat(), 'title': get('SUMMARY')})
    return events

now = datetime.now(timezone.utc)
mon = now - timedelta(days=now.weekday())
window_start = mon.replace(hour=0, minute=0, second=0, microsecond=0)
window_end = window_start + timedelta(days=14)
ws, we = window_start.isoformat()[:10], window_end.isoformat()[:10]

result = {}
for room in ROOMS:
    ics = fetch_ics(room)
    if not ics:
        continue
    events = [e for e in parse_ics(ics) if e['end'][:10] >= ws and e['start'][:10] <= we]
    if events:
        result[room] = events

os.makedirs('data', exist_ok=True)
with open('data/events.json', 'w') as f:
    json.dump({'generated': now.isoformat(), 'events': result}, f, separators=(',', ':'))

print(f'Wrote {len(result)}/{len(ROOMS)} rooms to data/events.json')
