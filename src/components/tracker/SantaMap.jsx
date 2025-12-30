import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './SantaMap.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Santa icon
const santaIcon = L.divIcon({
    className: 'santa-marker',
    html: '<div class="santa-icon">🎅</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

// Map controller to handle zoom and center
function MapController({ center }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo(center, 5, {
                duration: 2,
            });
        }
    }, [center, map]);

    return null;
}

function SantaMap({ route, currentLocationIndex, onLocationClick }) {
    const currentLocation = route[currentLocationIndex];
    const visitedLocations = route.slice(0, currentLocationIndex + 1);

    // Create path for Santa's journey
    const pathCoordinates = visitedLocations.map(loc => loc.coordinates);

    return (
        <div className="santa-map-container">
            <MapContainer
                center={currentLocation.coordinates}
                zoom={3}
                className="santa-map"
                scrollWheelZoom={true}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController center={currentLocation.coordinates} />

                {/* Draw the path Santa has traveled */}
                {pathCoordinates.length > 1 && (
                    <Polyline
                        positions={pathCoordinates}
                        color="#ffd700"
                        weight={3}
                        opacity={0.8}
                        dashArray="10, 10"
                    />
                )}

                {/* Show all locations */}
                {route.map((location, index) => {
                    const isVisited = index <= currentLocationIndex;
                    const isCurrent = index === currentLocationIndex;

                    return (
                        <Marker
                            key={location.id}
                            position={location.coordinates}
                            icon={isCurrent ? santaIcon : L.Icon.Default.prototype}
                            eventHandlers={{
                                click: () => onLocationClick(index),
                            }}
                        >
                            <Popup>
                                <div className="map-popup">
                                    <h4>{location.city}, {location.country}</h4>
                                    <p>🎁 Gifts: {location.giftsDelivered.toLocaleString()}</p>
                                    <p>⏰ Time: {location.estimatedTime}</p>
                                    {isCurrent && <p className="current-badge">🎅 Santa is here!</p>}
                                    {!isVisited && <p className="upcoming-badge">⏳ Coming soon...</p>}
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            <div className="map-legend">
                <div className="legend-item">
                    <span className="legend-icon current">🎅</span>
                    <span>Current Location</span>
                </div>
                <div className="legend-item">
                    <span className="legend-icon visited">✅</span>
                    <span>Visited</span>
                </div>
                <div className="legend-item">
                    <span className="legend-icon upcoming">⏳</span>
                    <span>Upcoming</span>
                </div>
            </div>
        </div>
    );
}

export default SantaMap;
