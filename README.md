# Raumverfügbarkeit – HAW Landshut

Web-App zur Abfrage der Raumbelegung an der [HAW Landshut](https://www.haw-landshut.de).

## Wie es funktioniert

1. **Interaktiver Campusplan** — SVG-Overlay über den Campusplan, jedes Gebäude ist ein klickbares Polygon.
2. **Gebäude → Raum → Timeline** — Raumauswahl zeigt eine Wochenansicht (06:00–22:00 Uhr) mit farbiger Belegungsleiste.
3. **Tägliche Datenbasis** — Ein GitHub Action (`update-events.yml`) lädt jeden Morgen um 7 Uhr alle ICS-Dateien vom [Raumplan-Portal](https://if-portal.haw-landshut.de/public/raumplan/) und schreibt sie als `data/events.json` ins Repo. Die App liest diese Datei beim Start — ein einziger Request, kein CORS-Problem.
4. **Fallback** — Ist `data/events.json` nicht verfügbar, werden ICS-Dateien direkt über `corsproxy.io` geladen.

## Projektstruktur

| Pfad | Zweck |
|------|-------|
| `index.html` | Einstiegspunkt |
| `script.js` | Komplette App-Logik: Karte, Fetch, ICS-Parser, Rendering |
| `style.css` | Styling |
| `annotate.html` | Hilfstool zum Einzeichnen neuer Gebäude-Polygone |
| `.github/workflows/update-events.yml` | Täglicher Cron-Job (07:00 CET) |
| `.github/scripts/fetch_events.py` | Fetcht alle ICS-Dateien parallel, schreibt `data/events.json` |

## Hinweise

- **Kein Build-Step** — reines HTML/CSS/JS, lokal mit `python -m http.server` oder `npx serve` startbar.
- **Räume hinzufügen** — `ROOMS` in `script.js` ergänzen; die GitHub Action liest die Liste automatisch daraus.
- **Polygone anpassen** — `annotate.html` öffnen, Polygon per Klick zeichnen, Code in `script.js` einfügen.
