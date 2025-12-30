import { useState, useEffect } from 'react';
import { Gift, Cookie, Bell, Snowflake, Star, TreePine, Heart, Music, RefreshCw } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { saveGameScore } from '../../services/firebase';
import './MemoryMatch.css';

const CARD_ICONS = [
    { id: 1, icon: Gift, color: '#ff6b6b' },
    { id: 2, icon: Cookie, color: '#d4a373' },
    { id: 3, icon: Bell, color: '#ffd700' },
    { id: 4, icon: Snowflake, color: '#a8dadc' },
    { id: 5, icon: Star, color: '#fca311' },
    { id: 6, icon: TreePine, color: '#2d6a4f' },
    { id: 7, icon: Heart, color: '#e63946' },
    { id: 8, icon: Music, color: '#457b9d' },
];

const MemoryMatch = () => {
    const { userId, userName } = useUser();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setupGame();
    }, []);

    const setupGame = () => {
        const duplicatedIcons = [...CARD_ICONS, ...CARD_ICONS];
        const shuffledCards = duplicatedIcons
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, uniqueId: index }));

        setCards(shuffledCards);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setGameOver(false);
    };

    const handleCardClick = (id) => {
        if (flipped.length === 2 || matched.includes(id) || flipped.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            checkForMatch(newFlipped);
        }
    };

    const checkForMatch = (currentFlipped) => {
        const [id1, id2] = currentFlipped;
        const card1 = cards.find(card => card.uniqueId === id1);
        const card2 = cards.find(card => card.uniqueId === id2);

        if (card1.id === card2.id) {
            setMatched(prev => {
                const newMatched = [...prev, id1, id2];
                if (newMatched.length === cards.length) {
                    setGameOver(true);
                    // Save score to Firebase
                    if (userId && userName) {
                        saveGameScore('MEMORY_MATCH', moves + 1, userId, userName);
                    }
                }
                return newMatched;
            });
            setFlipped([]);
        } else {
            setTimeout(() => {
                setFlipped([]);
            }, 1000);
        }
    };

    return (
        <div className="memory-game-container">
            <div className="game-stats">
                <div className="stat-box">
                    <span>Moves</span>
                    <strong>{moves}</strong>
                </div>
                <div className="stat-box">
                    <span>Pairs Found</span>
                    <strong>{matched.length / 2} / {CARD_ICONS.length}</strong>
                </div>
                <button className="reset-btn" onClick={setupGame}>
                    <RefreshCw size={20} /> Restart
                </button>
            </div>

            <div className="cards-grid">
                {cards.map((card) => {
                    const isFlipped = flipped.includes(card.uniqueId) || matched.includes(card.uniqueId);
                    const IsMatched = matched.includes(card.uniqueId);

                    return (
                        <div
                            key={card.uniqueId}
                            className={`card ${isFlipped ? 'flipped' : ''} ${IsMatched ? 'matched' : ''}`}
                            onClick={() => handleCardClick(card.uniqueId)}
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                    <Snowflake size={32} color="rgba(255,255,255,0.3)" />
                                </div>
                                <div className="card-back" style={{ borderColor: card.color }}>
                                    <card.icon size={40} color={card.color} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {gameOver && (
                <div className="game-over-modal">
                    <div className="modal-content">
                        <h2>🎄 Merry Matching! 🎄</h2>
                        <p>You found all matches in {moves} moves!</p>
                        <button className="play-again-btn" onClick={setupGame}>Play Again</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryMatch;
