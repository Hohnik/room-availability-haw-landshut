# Raumverfügbarkeit – HAW Landshut

Eine kleine Web-App, mit der sich die Belegung von Hörsälen und Räumen der [HAW Landshut](https://www.haw-landshut.de) übersichtlich abfragen lässt.

## Wie es funktioniert

1. **Interaktiver Campusplan**  
   Auf der Startseite wird ein SVG-Overlay über den offiziellen Campusplan gelegt. Jedes Gebäude ist als klickbares Polygon hinterlegt.

2. **Gebäude → Raum → Timeline**  
   Nach der Auswahl eines Gebäudes werden die dazugehörigen Räume angezeigt. Wählt man einen Raum aus, lädt die App die Belegungsdaten für den aktuellen Tag und zeigt sie als visuelle Timeline (06:00–22:00 Uhr).

3. **Datenquelle**  
   Die Belegungsdaten kommen vom offiziellen [Raumplan-Portal](https://if-portal.haw-landshut.de/public/raumplan/) der Hochschule. Das Portal stellt für jeden Raum eine `.ics`-Datei (iCalendar-Format) bereit.

4. **CORS-Proxy**  
   Da das Hochschul-Portal keine `Access-Control-Allow-Origin`-Header sendet, werden die Anfragen über einen öffentlichen CORS-Proxy (`corsproxy.io`) geleitet.

5. **ICS-Parsing**  
   Die Kalenderdateien werden client-seitig mit einem kleinen, eigenen Parser zerlegt (keine externe Bibliothek). Daraus werden Start-/Endzeiten und Veranstaltungstitel extrahiert.

## Projektstruktur

| Datei | Zweck |
|-------|-------|
| `index.html` | Hauptseite mit Karte, Raum-Auswahl und Timeline |
| `script.js` | Komplette Anwendungslogik: Karte, Fetching, ICS-Parser, Rendering |
| `style.css` | Styling der drei Ansichten (Karte, Räume, Verfügbarkeit) |
| `annotate.html` | **Werkzeug zur Pflege der Karte:** Hilft dabei, die Gebäude-Polygone und Label-Positionen für `script.js` zu aktualisieren |

## Wichtige Hinweise

- **Kein Build-Step:** Das Projekt ist reines HTML/CSS/JS. Es kann lokal einfach durch Öffnen von `index.html` im Browser gestartet werden (z. B. mit `python -m http.server` oder `npx serve`).
- **Hardcodierte Daten:** Die Raumliste (`ROOMS`) und die Gebäude-Polygone (`BUILDING_POLYS`) sind direkt in `script.js` hinterlegt. Wenn sich Räume ändern oder der Campusplan aktualisiert wird, müssen diese Werte angepasst werden.
- **Abhängigkeit vom Proxy:** Falls `corsproxy.io` nicht erreichbar ist oder Rate-Limits einführt, funktioniert das Laden der Belegungsdaten nicht mehr. In `script.js` lässt sich die Proxy-Liste (`CORS_PROXIES`) erweitern.
- **annotate.html verwenden:** Um neue Gebäude-Polygone zu zeichnen oder bestehende anzupassen, öffne `annotate.html`. Dort kann auf dem Campusplan per Klick ein Polygon erstellt und anschließend der generierte Code in `script.js` eingefügt werden.
