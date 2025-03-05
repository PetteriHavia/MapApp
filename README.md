# MapApp

MapApp is a web application built using React, Leaflet, React-Leaflet, TypeScript, and Tailwind CSS. This app allows users to search for locations, get their current device location, and plan routes.

## Tech Stack Overview
- React: Frontend framework for building UI components.
- Leaflet & React-Leaflet: For interactive mapping features
- TypeScript: Ensures type safety and better code maintainability.
- Tailwind CSS: Provides a responsive and modern design.
- Nominatim API: Used for geocoding and address lookups.
- Leaflet Router Machine: Handles route planning and navigation.

## Features
### 🌍Location Search
User can search for locations using different tabs in the slider menu:

- Find Device: Retrieves and displays the current device's location on the map.

- Search Location: Type address, and the app fetches its location using the Nominatim API.

- Route Planner: Takes start and end location. The app fetches their locations using Nominatim API and then utilizes Leaflet Router Machine to display the route along with step-by-step navigation instructions.

### 📌Interactive Map

- When searching for an address, the map will automatically fly to the location.

- Users can toggle between different map views:
    - Standard OpenStreetMap View
    - Topo Map
    - Hot Map
  
Happy mapping! 🗺️
