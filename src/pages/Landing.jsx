import { Link } from 'react-router-dom';
import { Map, Gift, Gamepad2, Clock, BarChart2, Sparkles, Snowflake } from 'lucide-react';
import './Landing.css';

function Landing() {
    return (
        <>
            <div className="landing-container">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-wrapper">
                        <div className="hero-content">

                            <h1 className="hero-title">
                                Welcome to <span className="gradient-text">HOHO</span>
                            </h1>
                            <p className="hero-subtitle">
                                Experience the magic of Christmas with real-time Santa tracking and personalized gift recommendations
                            </p>

                            {/* CTA Buttons */}
                            <div className="cta-buttons">
                                <Link to="/tracker" className="cta-button primary">
                                    <div className="button-content">
                                        <Map className="button-icon" size={48} />
                                    </div>
                                    <div className="button-label">Santa's Journey</div>
                                    <div className="button-glow"></div>
                                </Link>

                                <Link to="/gift-finder" className="cta-button secondary">
                                    <div className="button-content">
                                        <Gift className="button-icon" size={48} />
                                    </div>
                                    <div className="button-label">Find Gifts</div>
                                    <div className="button-glow"></div>
                                </Link>

                                <Link to="/games" className="cta-button tertiary">
                                    <div className="button-content">
                                        <Gamepad2 className="button-icon" size={48} />
                                    </div>
                                    <div className="button-label">Play Games</div>
                                    <div className="button-glow"></div>
                                </Link>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <img src="/assets/santa_hero.png" alt="Santa Claus" className="santa-hero-image" />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2 className="section-title">
                        <Sparkles className="inline-icon" size={32} color="#0072ff" /> Magical Features <Sparkles className="inline-icon" size={32} color="#0072ff" />
                    </h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80" alt="Mini Games" className="feature-image" />
                            </div>
                            <h3 className="feature-title">Mini Games</h3>
                            <p className="feature-description">
                                Catch falling presents, avoid coal, and maintain your daily play streak
                            </p>
                            <div className="feature-shine"></div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80" alt="Story Mode" className="feature-image" />
                            </div>
                            <h3 className="feature-title">Story Mode</h3>
                            <p className="feature-description">
                                Discover festive stories and cultural traditions from every country Santa visits
                            </p>
                            <div className="feature-shine"></div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80" alt="Smart Gifts" className="feature-image" />
                            </div>
                            <h3 className="feature-title">Smart Gifts</h3>
                            <p className="feature-description">
                                AI-powered gift recommendations tailored just for you and your loved ones
                            </p>
                            <div className="feature-shine"></div>
                        </div>

                        <div className="feature-card">
                            <Clock className="feature-icon" size={48} color="#4ecdc4" />
                            <h3 className="feature-title">Countdown Timer</h3>
                            <p className="feature-description">
                                Live countdown to Christmas with days, hours, minutes, and seconds
                            </p>
                            <div className="feature-shine"></div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">195+</div>
                            <div className="stat-label">Countries Visited</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">2B+</div>
                            <div className="stat-label">Gifts Delivered</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">24hrs</div>
                            <div className="stat-label">Christmas Eve</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">∞</div>
                            <div className="stat-label">Christmas Magic</div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Footer */}
                <section className="cta-footer">
                    <div className="cta-footer-content">
                        <h2 className="cta-footer-title">Ready to Experience the Magic? 🎄</h2>
                        <p className="cta-footer-text">
                            Join millions around the world tracking Santa's journey this Christmas
                        </p>
                        <Link to="/tracker" className="cta-footer-button">
                            Start Tracking Now 🎅
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Landing;
