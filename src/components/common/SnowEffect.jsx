import { useEffect, useState } from 'react';
import './SnowEffect.css';

function SnowEffect() {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        // Generate 50 snowflakes with random properties
        const flakes = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100, // Random horizontal position (0-100%)
            animationDuration: 5 + Math.random() * 10, // 5-15 seconds
            opacity: 0.3 + Math.random() * 0.7, // 0.3-1.0 opacity
            size: 5 + Math.random() * 10, // 5-15px size
            delay: Math.random() * 5, // 0-5 seconds delay
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="snow-container">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.delay}s`,
                        opacity: flake.opacity,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
}

export default SnowEffect;
