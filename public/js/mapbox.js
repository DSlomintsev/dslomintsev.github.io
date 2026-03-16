const ACCESS_TOKEN = '';
const OFF_ROUTE_THRESHOLD = 50;
export const state = {
  userLocation: null,
  route: null,
  isRerouting: false,
  rerouteTimer: null,
  map: null,
  target: null
};

export function initMapbox(){
  mapboxgl.accessToken = ACCESS_TOKEN;
  var map=new mapboxgl.Map({
        container: 'map', // container ID
        center: [32.2308, 51.5211], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 14 // starting zoom
    });
    map.on('load', () => {
      // Route line source + layer
      map.addSource('route', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        paint: { 'line-color': '#3b82f6', 'line-width': 5, 'line-cap': 'round' }
      });

      // User dot source + layer
      map.addSource('user', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      });
      map.addLayer({
        id: 'user',
        type: 'circle',
        source: 'user',
        paint: {
          'circle-radius': 8,
          'circle-color': '#3b82f6',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff'
        }
      });
      startTracking();
});

function startTracking() {
  if (!navigator.geolocation) return alert('Geolocation not supported');

  navigator.geolocation.watchPosition(
    onLocationUpdate,
    (err) => console.error('GPS error:', err),
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
  );
}

function onLocationUpdate(position) {
  const { longitude, latitude } = position.coords;
  state.userLocation = [longitude, latitude];

  // Move user dot
  map.getSource('user').setData({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: state.userLocation }
  });

  // Center map on user
  map.easeTo({ center: state.userLocation, duration: 500 });

  // Initial route fetch
  if (!state.route && !state.isRerouting) {
    fetchAndSetRoute();
    return;
  }

  // Trim passed portion
  if (state.route) {
    const trimmed = trimRoute(state.route, state.userLocation);
    map.getSource('route').setData(trimmed);
  }

  // Check off-route
  if (state.route && !state.isRerouting && isOffRoute(state.userLocation, state.route)) {
    scheduleReroute();
  }
}
state.map = map;
  return map;
}

export function addMarker(items, lat, lon){
  const poiCoords = [lat, lon];
  return new mapboxgl.Marker()
      .setLngLat(poiCoords)
      .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello POI!</h1>")) // Add a popup
      .addTo(items.map);
}

async function fetchAndSetRoute() {
  const target = state.target;
  if (target == null) return;

  if (state.isRerouting || !state.userLocation) return;
  state.isRerouting = true;

  const map = state.map;

  try {
    const origin = state.userLocation.join(',');
    const dest   = target.join(',');
    const url    = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin};${dest}`
                 + `?geometries=geojson&overview=full&access_token=${ACCESS_TOKEN}`;

    const res  = await fetch(url);
    const data = await res.json();

    if (!data.routes?.length) throw new Error('No routes returned');

    state.route = data.routes[0];
    map.getSource('route').setData({
      type: 'Feature',
      geometry: state.route.geometry
    });
  } catch (err) {
    console.error('Route fetch failed:', err);
  } finally {
    state.isRerouting = false;
  }
}

function scheduleReroute() {
  clearTimeout(state.rerouteTimer);
  state.rerouteTimer = setTimeout(fetchAndSetRoute, 2000);
}

function isOffRoute(userCoord, route) {
  const line = turf.lineString(route.geometry.coordinates);
  const pt   = turf.point(userCoord);
  const snapped = turf.nearestPointOnLine(line, pt, { units: 'meters' });
  return snapped.properties.dist > OFF_ROUTE_THRESHOLD;
}

function trimRoute(route, userCoord) {
  const line    = turf.lineString(route.geometry.coordinates);
  const pt      = turf.point(userCoord);
  const snapped = turf.nearestPointOnLine(line, pt);
  const total   = turf.length(line);                          // km
  const from    = snapped.properties.location;                // km along line

  if (from >= total) return { type: 'Feature', geometry: route.geometry };
  return turf.lineSliceAlong(line, from, total);
}

//getRoute(items,[pos.y,pos.x],[pos.y+0.01,pos.x])
  //items.playerMarker.setLngLat([pos.y+0.01,pos.x]);
  //items.map.flyTo({center: [pos.y+0.01,pos.x], zoom: 18});