// import { useState, useEffect } from 'react';
// import './StatsPanel.css';

// function StatsPanel({ currentLocation, nextStop, giftsDelivered, distance }) {
//     const [animatedGifts, setAnimatedGifts] = useState(0);

//     useEffect(() => {
//         // Animate the gifts counter
//         const duration = 2000; // 2 seconds
//         const steps = 60;
//         const increment = giftsDelivered / steps;
//         let current = 0;

//         const timer = setInterval(() => {
//             current += increment;
//             if (current >= giftsDelivered) {
//                 setAnimatedGifts(giftsDelivered);
//                 clearInterval(timer);
//             } else {
//                 setAnimatedGifts(Math.floor(current));
//             }
//         }, duration / steps);

//         return () => clearInterval(timer);
//     }, [giftsDelivered]);

//     const formatNumber = (num) => {
//         return num.toLocaleString();
//     };

//     return (
//         <div className="stats-panel">
//             <h3 className="stats-title">🎅 Santa's Journey Stats</h3>

//             <div className="stats-grid">
//                 <div className="stat-item">
//                     <div className="stat-icon">📍</div>
//                     <div className="stat-content">
//                         <div className="stat-label">Current Location</div>
//                         <div className="stat-value">{currentLocation}</div>
//                     </div>
//                 </div>

//                 <div className="stat-item">
//                     <div className="stat-icon">🗺️</div>
//                     <div className="stat-content">
//                         <div className="stat-label">Next Stop</div>
//                         <div className="stat-value">{nextStop}</div>
//                     </div>
//                 </div>

//                 <div className="stat-item highlight">
//                     <div className="stat-icon">🎁</div>
//                     <div className="stat-content">
//                         <div className="stat-label">Gifts Delivered</div>
//                         <div className="stat-value big">{formatNumber(animatedGifts)}</div>
//                     </div>
//                 </div>

//                 <div className="stat-item">
//                     <div className="stat-icon">✈️</div>
//                     <div className="stat-content">
//                         <div className="stat-label">Distance Traveled</div>
//                         <div className="stat-value">{formatNumber(distance)} km</div>
//                     </div>
//                 </div>
//             </div>

//             <div className="progress-bar">
//                 <div className="progress-label">Journey Progress</div>
//                 <div className="progress-track">
//                     <div
//                         className="progress-fill"
//                         style={{ width: `${(distance / 510000) * 100}%` }}
//                     ></div>
//                 </div>
//                 <div className="progress-percentage">
//                     {Math.round((distance / 510000) * 100)}% Complete
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default StatsPanel;
