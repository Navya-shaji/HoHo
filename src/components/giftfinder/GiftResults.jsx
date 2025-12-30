import { useState } from 'react';
import { Star, Smile, Frown, Gift, RefreshCw, Share2, Snowflake, Check, DollarSign, Meh, Heart } from 'lucide-react';
import './GiftResults.css';

function GiftResults({ results, onRestart }) {
    const [selectedGift, setSelectedGift] = useState(null);
    const { gifts, naughtyNice, santaMessage, userProfile } = results;

    const getNiceStatusColor = (status) => {
        switch (status) {
            case 'very-nice': return '#FFD700';
            case 'nice': return '#90EE90';
            case 'mixed': return '#FFA500';
            case 'naughty': return '#FF6B6B';
            default: return '#FFD700';
        }
    };

    const GetNiceStatusIcon = ({ status }) => {
        switch (status) {
            case 'very-nice': return <Star size={40} color="#FFD700" fill="#FFD700" />;
            case 'nice': return <Smile size={40} color="#90EE90" />;
            case 'mixed': return <Meh size={40} color="#FFA500" />;
            case 'naughty': return <Frown size={40} color="#FF6B6B" />;
            default: return <Star size={40} color="#FFD700" />;
        }
    };

    return (
        <div className="gift-results">
            {/* Naughty/Nice Score Card */}
            <div className="nice-score-card">
                <div className="nice-score-header">
                    <h2>Your Nice List Status</h2>
                    <span className="nice-emoji"><GetNiceStatusIcon status={naughtyNice.status} /></span>
                </div>

                <div className="score-display">
                    {/* ... (SVG progress circle stays same) ... */}
                    <div className="score-circle">
                        <svg viewBox="0 0 200 200" className="score-svg">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="12" />
                            <circle
                                cx="100" cy="100" r="90" fill="none"
                                stroke={getNiceStatusColor(naughtyNice.status)}
                                strokeWidth="12"
                                strokeDasharray={`${2 * Math.PI * 90}`}
                                strokeDashoffset={`${2 * Math.PI * 90 * (1 - naughtyNice.score / 100)}`}
                                strokeLinecap="round" transform="rotate(-90 100 100)"
                                className="score-progress"
                            />
                        </svg>
                        <div className="score-number">
                            <span className="score-value">{naughtyNice.score}</span>
                            <span className="score-percent">%</span>
                        </div>
                    </div>
                    <p className="score-message">{naughtyNice.message}</p>
                </div>
            </div>

            {/* Santa's Message */}
            <div className="santa-message-card">
                <div className="santa-avatar">
                    <Snowflake size={40} color="#fff" />
                </div>
                <div className="message-content">
                    <h3>Message from Santa</h3>
                    <p className="santa-text">{santaMessage}</p>
                </div>
            </div>

            {/* Gift Recommendations */}
            <div className="recommendations-section">
                <h2 className="section-title">
                    <Gift className="inline-icon" size={28} /> Your Personalized Gift Recommendations
                </h2>
                <p className="section-subtitle">
                    Based on your interests in {userProfile.interests.slice(0, 2).join(' and ')}
                    and your {userProfile.personality} personality!
                </p>

                <div className="gifts-grid">
                    {gifts.map((gift) => (
                        <div
                            key={gift.id}
                            className={`gift-card ${selectedGift?.id === gift.id ? 'selected' : ''}`}
                            onClick={() => setSelectedGift(gift)}
                        >
                            <div className="gift-emoji">
                                <Gift size={32} color={getNiceStatusColor(naughtyNice.status)} />
                            </div>
                            <h3 className="gift-name">{gift.name}</h3>
                            <p className="gift-description">{gift.description}</p>

                            <div className="gift-meta">
                                <span className="gift-category">
                                    {gift.category.charAt(0).toUpperCase() + gift.category.slice(1)}
                                </span>
                                <span className="gift-price">
                                    {gift.priceRange === 'low' && <DollarSign size={16} />}
                                    {gift.priceRange === 'medium' && <div style={{ display: 'flex' }}><DollarSign size={16} /><DollarSign size={16} /></div>}
                                    {gift.priceRange === 'high' && <div style={{ display: 'flex' }}><DollarSign size={16} /><DollarSign size={16} /><DollarSign size={16} /></div>}
                                </span>
                            </div>

                            <div className="match-score">
                                <div className="match-bar">
                                    <div
                                        className="match-fill"
                                        style={{ width: `${(gift.matchScore / 30) * 100}%` }}
                                    />
                                </div>
                                <span className="match-text">
                                    {Math.round((gift.matchScore / 30) * 100)}% Match
                                </span>
                            </div>

                            {selectedGift?.id === gift.id && (
                                <div className="selected-indicator">
                                    <span className="checkmark-icon"><Check size={16} /></span>
                                    Selected
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Gift Details */}
            {selectedGift && (
                <div className="selected-gift-details">
                    <div className="details-header">
                        <span className="details-emoji"><Gift size={32} /></span>
                        <h3>{selectedGift.name}</h3>
                    </div>
                    <p className="details-description">{selectedGift.description}</p>
                    <div className="details-info">
                        <div className="info-item">
                            <span className="info-label">Category:</span>
                            <span className="info-value">
                                {selectedGift.category.charAt(0).toUpperCase() + selectedGift.category.slice(1)}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Age Group:</span>
                            <span className="info-value">
                                {selectedGift.ageGroup.split('-').map(age =>
                                    age.charAt(0).toUpperCase() + age.slice(1)
                                ).join(' - ')}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Price Range:</span>
                            <span className="info-value">
                                {selectedGift.priceRange === 'low' && 'Under $50'}
                                {selectedGift.priceRange === 'medium' && '$50 - $150'}
                                {selectedGift.priceRange === 'high' && 'Over $150'}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Perfect For:</span>
                            <span className="info-value">
                                {selectedGift.personality.map(p =>
                                    p.charAt(0).toUpperCase() + p.slice(1)
                                ).join(', ')}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="results-actions">
                <button className="action-button restart-button" onClick={onRestart}>
                    <RefreshCw className="inline-icon" size={18} /> Take Quiz Again
                </button>
                <button
                    className="action-button share-button"
                    onClick={() => {
                        const shareText = `I got a ${naughtyNice.score}% Nice Score from Santa! My top gift recommendation is ${gifts[0].name}`;
                        if (navigator.share) {
                            navigator.share({
                                title: 'My Santa Gift Results',
                                text: shareText
                            });
                        } else {
                            navigator.clipboard.writeText(shareText);
                            alert('Results copied to clipboard!');
                        }
                    }}
                >
                    <Share2 className="inline-icon" size={18} /> Share Results
                </button>
            </div>

            {/* Decorative Snowflakes */}
            <div className="results-decorations">
                {[...Array(8)].map((_, i) => (
                    <span key={i} className={`snowflake snowflake-${i + 1}`}><Snowflake size={24} color="rgba(255,255,255,0.3)" /></span>
                ))}
            </div>
        </div>
    );
}

export default GiftResults;
