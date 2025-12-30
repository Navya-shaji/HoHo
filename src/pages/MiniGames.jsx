import React, { useState } from 'react';
import { Flame, Trophy, Gift, Gamepad2, Brain, ListChecks, ArrowLeft } from 'lucide-react';
import PresentCatch from '../components/game/PresentCatch';
import MemoryMatch from '../components/game/MemoryMatch';
import NaughtyNiceQuiz from '../components/game/NaughtyNiceQuiz';

function MiniGames() {
    const [activeGame, setActiveGame] = useState('MENU'); // MENU, CATCH, MEMORY, QUIZ

    const renderGame = () => {
        switch (activeGame) {
            case 'CATCH': return <PresentCatch />;
            case 'MEMORY': return <MemoryMatch />;
            case 'QUIZ': return <NaughtyNiceQuiz />;
            default: return null;
        }
    };

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <header className="page-header">
                    <h1 className="page-title">
                        Santa's Workshop <span className="highlight-text">Games</span> <Gamepad2 className="inline-icon" size={48} />
                    </h1>
                    {activeGame === 'MENU' ? (
                        <p className="page-subtitle">
                            Choose a game to play and earn your spot on the Nice List!
                        </p>
                    ) : (
                        <button className="back-btn" onClick={() => setActiveGame('MENU')}>
                            <ArrowLeft size={24} /> Back to Games
                        </button>
                    )}
                </header>

                {activeGame === 'MENU' ? (
                    <div className="games-grid">
                        {/* Gift Catcher Card */}
                        <div className="game-card bg-red" onClick={() => setActiveGame('CATCH')} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="card-shine"></div>
                            <div className="game-icon-wrapper">
                                <Gift size={64} color="#ffd700" />
                            </div>
                            <h2>Gift Catcher</h2>
                            <p>Catch the falling presents before they hit the ground!</p>
                            <div className="play-tag">Play Now</div>
                        </div>

                        {/* Memory Match Card */}
                        <div className="game-card bg-green" onClick={() => setActiveGame('MEMORY')} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="card-shine"></div>
                            <div className="game-icon-wrapper">
                                <Brain size={64} color="#ffd700" />
                            </div>
                            <h2>Memory Match</h2>
                            <p>Find all the matching Christmas pairs!</p>
                            <div className="play-tag">Play Now</div>
                        </div>

                        {/* Naughty or Nice Card */}
                        <div className="game-card bg-yellow" onClick={() => setActiveGame('QUIZ')} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="card-shine"></div>
                            <div className="game-icon-wrapper">
                                <ListChecks size={64} color="#fff" />
                            </div>
                            <h2>Naughty or Nice</h2>
                            <p>Take the quiz to see which list you're on!</p>
                            <div className="play-tag">Play Now</div>
                        </div>
                    </div>
                ) : (
                    <div className="active-game-container">
                        <div className="game-card-glass">
                            {renderGame()}
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .page-container {
                    min-height: 100vh;
                    padding: 2rem;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: white;
                    position: relative;
                }

                .content-wrapper {
                    max-width: 1200px;
                    padding: 0 2rem;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    animation: fadeInDown 0.8s ease-out;
                    position: relative;
                }

                .page-title {
                    font-size: 3rem;
                    margin-bottom: 0.5rem;
                    font-weight: 800;
                    letter-spacing: -1px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                }

                .highlight-text {
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .page-subtitle {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.7);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .back-btn {
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.8rem 1.5rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-left: auto;
                    margin-right: auto;
                }

                .back-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                /* Games Grid */
                .games-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    animation: fadeInUp 0.8s ease-out;
                }

                .game-card {
                    position: relative;
                    border-radius: 24px;
                    padding: 2.5rem 2rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 320px;
                }

                .game-card:hover {
                    transform: translateY(-10px) scale(1.02);
                }

                .bg-red { background: linear-gradient(135deg, #c0392b, #e74c3c); box-shadow: 0 20px 40px rgba(192, 57, 43, 0.3); }
                .bg-green { background: linear-gradient(135deg, #196f3d, #27ae60); box-shadow: 0 20px 40px rgba(39, 174, 96, 0.3); }
                .bg-yellow { background: linear-gradient(135deg, #f1c40f, #f39c12); box-shadow: 0 20px 40px rgba(241, 196, 15, 0.3); }

                .game-icon-wrapper {
                    background: rgba(255, 255, 255, 0.2);
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                    backdrop-filter: blur(5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }

                .game-card h2 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 800;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .game-card p {
                    font-size: 1.1rem;
                    line-height: 1.5;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 2rem;
                    flex-grow: 1;
                }

                .play-tag {
                    padding: 0.8rem 2rem;
                    background: rgba(255, 255, 255, 0.9);
                    color: #333;
                    border-radius: 50px;
                    font-weight: bold;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.3s ease;
                }

                .game-card:hover .play-tag {
                    opacity: 1;
                    transform: translateY(0);
                }

                .card-shine {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(125deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.0) 50%, transparent 100%);
                    transform: translateX(-100%);
                    transition: transform 0.6s;
                }

                .game-card:hover .card-shine {
                    transform: translateX(100%);
                }

                .active-game-container {
                    animation: fadeIn 0.5s ease-out;
                    display: flex;
                    justify-content: center;
                }

                .game-card-glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    border-radius: 24px;
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    width: 100%;
                    max-width: 900px;
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @media (max-width: 768px) {
                    .page-title { font-size: 2rem; }
                    .content-wrapper { padding: 0 1rem; }
                    .page-container { padding: 1rem; }
                    .game-card { min-height: auto; }
                }
            `}} />
        </div>
    );
}

export default MiniGames;
