# UK Interactive Bus Map

An open-source proof of concept for visualising UK bus routes from multiple operators on a single interactive map.

The project was created to explore a simple idea: instead of using separate operator websites and route maps, bus route data from multiple sources can be displayed together in one consistent geographic view.

## Live Demo

https://ukinteractivebusmap.github.io/

## Current Coverage

The current static demo includes route data for:

- Stagecoach Midlands
- Stagecoach Oxfordshire
- Arriva Beds and Bucks
- Arriva Herts and Essex
- Redline
- Red Rose Travel

Coverage is currently focused primarily on the Midlands and surrounding areas.

## How It Works

The website is intentionally simple.

Route data is stored as GeoJSON and loaded directly in the browser. Leaflet renders the route geometry over an OpenStreetMap basemap.

The current version is entirely static and requires no backend server.

```text
Public transport data
        ↓
     GeoJSON
        ↓
   JavaScript
        ↓
     Leaflet
        ↓
Interactive route map
