import { useState, useEffect } from 'react';
import './CountdownTimer.css';

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const currentYear = now.getFullYear();

            // Set Christmas date (December 25)
            let christmas = new Date(currentYear, 11, 25); // Month is 0-indexed

            // If Christmas has passed this year, set it to next year
            if (now > christmas) {
                christmas = new Date(currentYear + 1, 11, 25);
            }

            const difference = christmas - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        // Calculate immediately
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="countdown-timer">
            <h3 className="countdown-title">🎄 Countdown to Christmas 🎄</h3>
            <div className="countdown-display">
                <div className="time-unit">
                    <div className="time-value">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="time-label">Days</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                    <div className="time-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="time-label">Hours</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                    <div className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="time-label">Minutes</div>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                    <div className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="time-label">Seconds</div>
                </div>
            </div>
        </div>
    );
}

export default CountdownTimer;
