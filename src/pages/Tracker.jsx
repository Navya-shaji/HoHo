import { useState, useEffect } from 'react';
import SantaMap from '../components/tracker/SantaMap';
import StoryPanel from '../components/tracker/StoryPanel';
import CountdownTimer from '../components/tracker/CountdownTimer';
import StatsPanel from '../components/tracker/StatsPanel';
import santaRouteData from '../data/santaRoute.json';
import storiesData from '../data/stories.json';
import {
    getCurrentSantaLocation,
    getTotalGiftsDelivered,
    getDistanceTraveled,
    getNextLocation,
    isChristmasTime
} from '../utils/santaMovement';
import './Tracker.css';

function Tracker() {
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const [totalGiftsDelivered, setTotalGiftsDelivered] = useState(0);
    const [distanceTraveled, setDistanceTraveled] = useState(0);
    const [santaStatus, setSantaStatus] = useState(null);

    const route = santaRouteData.route;
    const currentLocation = route[currentLocationIndex];
    const nextLocation = getNextLocation(currentLocationIndex);
    const currentStory = storiesData.stories[currentLocation.country];

    // Update Santa's position based on real-time
    useEffect(() => {
        const updateSantaPosition = () => {
            const santaData = getCurrentSantaLocation();
            setCurrentLocationIndex(santaData.locationIndex);
            setSantaStatus(santaData);

            // Update stats
            const gifts = getTotalGiftsDelivered(santaData.locationIndex);
            const distance = getDistanceTraveled(santaData.locationIndex);
            setTotalGiftsDelivered(gifts);
            setDistanceTraveled(distance);
        };

        // Update immediately
        updateSantaPosition();

        // Update every 30 seconds to check for location changes
        const interval = setInterval(updateSantaPosition, 30000);

        return () => clearInterval(interval);
    }, []);

    const handleLocationClick = (index) => {
        setCurrentLocationIndex(index);
        const gifts = getTotalGiftsDelivered(index);
        const distance = getDistanceTraveled(index);
        setTotalGiftsDelivered(gifts);
        setDistanceTraveled(distance);
    };

    return (
        <>
            <div className="tracker-container">
                <div className="tracker-header">
                    <h1 className="tracker-title">🌟 Santa's Magical Journey Around the World 🌍</h1>
                    <p className="tracker-subtitle">
                        Watch the magic unfold as Santa spreads joy across every corner of the globe!
                    </p>
                    {santaStatus && santaStatus.message && (
                        <div className="status-message">
                            {santaStatus.isDemoMode ? '🎮 ' : '🎄 '}
                            {santaStatus.message}
                        </div>
                    )}
                    {isChristmasTime() && (
                        <div className="christmas-badge">
                            🎅 LIVE: Santa is delivering gifts right now! 🎁
                        </div>
                    )}
                </div>

                {/* Countdown Timer */}
                <div className="countdown-section">
                    <CountdownTimer />
                </div>

                {/* Main Content: Map and Story Panel */}




                <div className="journey-log-section">
                    <h2 className="log-title">📜 Santa's Travel Log ({route.slice(0, currentLocationIndex + 1).length} Stops)</h2>
                    <div className="journey-log-grid">
                        {route.slice(0, currentLocationIndex + 1).reverse().map((location, index) => {
                            const story = storiesData.stories[location.country];
                            // If no story found for country, skip
                            if (!story) return null;
                            const isCurrent = index === 0; // Since we reversed it
                            return (
                                <div key={index} className={`log-entry ${isCurrent ? 'current-stop' : ''}`}>
                                    <div className="log-header">
                                        <div className="log-location">
                                            <span className="log-emoji">{story.emoji}</span>
                                            <h3 className="log-city-name">{location.city}, {location.country}</h3>
                                        </div>
                                        {isCurrent && <span className="live-badge">JUST LANDED</span>}
                                    </div>
                                    <div className="santa-note">
                                        <p className="log-story-text">"{story.story}"</p>
                                        <span className="santa-signature">- Santa Claus 🎅</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tracker;
