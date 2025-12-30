/**
 * Santa Movement Logic
 * Calculates Santa's current location based on real-world time
 * Santa starts his journey on December 24th at 18:00 (6 PM) and visits each location
 * based on the estimated times in santaRoute.json
 */

import santaRouteData from '../data/santaRoute.json';

/**
 * Parse time string (HH:MM) and return total minutes
 */
function parseTimeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

/**
 * Get current Santa location based on real-world time
 * @returns {Object} { locationIndex, location, progress }
 */
export function getCurrentSantaLocation() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed (0 = January, 11 = December)
    const currentDate = now.getDate();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const route = santaRouteData.route;

    // Calculate current time in minutes since midnight
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;

    // Check if it's Christmas Eve (December 24) or Christmas Day (December 25)
    const isChristmasEve = currentMonth === 11 && currentDate === 24;
    const isChristmasDay = currentMonth === 11 && currentDate === 25;

    // If it's Christmas Eve or Christmas Day, calculate real position
    if (isChristmasEve || isChristmasDay) {
        // Adjust time if it's Christmas Day (add 24 hours worth of minutes)
        const adjustedTime = isChristmasDay
            ? currentTimeInMinutes + (24 * 60)
            : currentTimeInMinutes;

        // Find the current location based on estimated times
        for (let i = 0; i < route.length; i++) {
            const location = route[i];
            const locationTime = parseTimeToMinutes(location.estimatedTime);

            // Check if Santa is at or past this location
            if (adjustedTime >= locationTime) {
                // Check if there's a next location
                if (i < route.length - 1) {
                    const nextLocation = route[i + 1];
                    const nextLocationTime = parseTimeToMinutes(nextLocation.estimatedTime);

                    // If current time is before next location, Santa is at current location
                    if (adjustedTime < nextLocationTime) {
                        return {
                            locationIndex: i,
                            location: location,
                            progress: calculateProgress(i, route.length),
                            isActive: true,
                        };
                    }
                } else {
                    // Santa is at the last location
                    return {
                        locationIndex: i,
                        location: location,
                        progress: 100,
                        isActive: true,
                    };
                }
            }
        }

        // If we're before the first location, Santa hasn't started yet
        return {
            locationIndex: 0,
            location: route[0],
            progress: 0,
            isActive: false,
            message: "Santa's journey begins at 6:00 PM on Christmas Eve!",
        };
    }

    // For demo purposes on other days, simulate Santa's journey
    // Use a time-based rotation that cycles through locations every 2 minutes
    const minutesSinceMidnight = currentTimeInMinutes;
    const locationIndex = Math.floor((minutesSinceMidnight / 2) % route.length);

    return {
        locationIndex: locationIndex,
        location: route[locationIndex],
        progress: calculateProgress(locationIndex, route.length),
        isActive: false,
        isDemoMode: true,
        message: "Demo mode: Santa moves every 2 minutes. Visit on Christmas Eve for real-time tracking!",
    };
}

/**
 * Calculate journey progress percentage
 */
function calculateProgress(currentIndex, totalLocations) {
    return Math.round((currentIndex / (totalLocations - 1)) * 100);
}

/**
 * Calculate total gifts delivered up to current location
 */
export function getTotalGiftsDelivered(locationIndex) {
    const route = santaRouteData.route;
    return route
        .slice(0, locationIndex + 1)
        .reduce((sum, loc) => sum + loc.giftsDelivered, 0);
}

/**
 * Calculate distance traveled up to current location
 */
export function getDistanceTraveled(locationIndex) {
    const route = santaRouteData.route;
    const totalDistance = santaRouteData.totalDistance;

    // Calculate proportional distance based on location index
    return Math.floor((locationIndex / (route.length - 1)) * totalDistance);
}

/**
 * Get next location
 */
export function getNextLocation(currentIndex) {
    const route = santaRouteData.route;
    const nextIndex = (currentIndex + 1) % route.length;
    return route[nextIndex];
}

/**
 * Check if it's Christmas time (December 24-25)
 */
export function isChristmasTime() {
    const now = new Date();
    const month = now.getMonth();
    const date = now.getDate();

    return month === 11 && (date === 24 || date === 25);
}

/**
 * Get time until Christmas
 */
export function getTimeUntilChristmas() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25, 0, 0, 0);

    // If Christmas has passed, set to next year
    if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25, 0, 0, 0);
    }

    const difference = christmas - now;

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        totalMilliseconds: difference,
    };
}

export default {
    getCurrentSantaLocation,
    getTotalGiftsDelivered,
    getDistanceTraveled,
    getNextLocation,
    isChristmasTime,
    getTimeUntilChristmas,
};
