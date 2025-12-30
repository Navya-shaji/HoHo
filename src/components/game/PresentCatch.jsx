import React, { useState, useEffect, useRef } from 'react';
import { Flame, ArrowLeft, ArrowRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { updateStreak, updateHighScore, getStreakData, getHighScore } from '../../utils/gameUtils';
import { saveGameScore } from '../../services/firebase';
import './PresentCatch.css';

const PresentCatch = () => {
    const { userId, userName } = useUser();
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(getHighScore());
    const [streak, setStreak] = useState(getStreakData().streak);
    const [level, setLevel] = useState(1);

    // Game constants
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;
    const PLAYER_WIDTH = 100;
    const PLAYER_HEIGHT = 60;
    const ITEM_SIZE = 40;

    // Refs for game loop state
    const playerX = useRef(CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2);
    const items = useRef([]);
    const scoreRef = useRef(0);
    const requestRef = useRef();
    const keys = useRef({});

    useEffect(() => {
        const handleKeyDown = (e) => keys.current[e.code] = true;
        const handleKeyUp = (e) => keys.current[e.code] = false;
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const startGame = () => {
        setGameState('PLAYING');
        setScore(0);
        scoreRef.current = 0;
        items.current = [];
        playerX.current = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
        setLevel(1);

        // Update streak on game start
        const result = updateStreak(userId, userName);
        setStreak(result.streak);

        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const endGame = () => {
        setGameState('GAMEOVER');
        cancelAnimationFrame(requestRef.current);
        const isNewHigh = updateHighScore(scoreRef.current);
        if (isNewHigh) setHighScore(scoreRef.current);

        // Save to Firebase with user info
        if (userId && userName) {
            saveGameScore('PRESENT_CATCH', scoreRef.current, userId, userName);
        }
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // 1. Update Player
        const speed = 8;
        if (keys.current['ArrowLeft'] && playerX.current > 0) {
            playerX.current -= speed;
        }
        if (keys.current['ArrowRight'] && playerX.current < CANVAS_WIDTH - PLAYER_WIDTH) {
            playerX.current += speed;
        }

        // 2. Spawn Items
        const spawnChance = 0.02 + (level * 0.005);
        if (Math.random() < spawnChance) {
            const types = ['GIFT', 'GIFT', 'GIFT', 'COAL', 'GOLD_GIFT'];
            const type = types[Math.floor(Math.random() * types.length)];
            items.current.push({
                x: Math.random() * (CANVAS_WIDTH - ITEM_SIZE),
                y: -ITEM_SIZE,
                type,
                speed: 3 + Math.random() * (2 + level * 0.5)
            });
        }

        // 3. Update Items
        for (let i = items.current.length - 1; i >= 0; i--) {
            const item = items.current[i];
            item.y += item.speed;

            // Collision Check
            if (
                item.y + ITEM_SIZE > CANVAS_HEIGHT - PLAYER_HEIGHT &&
                item.x + ITEM_SIZE > playerX.current &&
                item.x < playerX.current + PLAYER_WIDTH
            ) {
                if (item.type === 'COAL') {
                    endGame();
                    return;
                } else if (item.type === 'GOLD_GIFT') {
                    scoreRef.current += 50;
                } else {
                    scoreRef.current += 10;
                }
                setScore(scoreRef.current);
                items.current.splice(i, 1);

                // Level Up
                if (scoreRef.current > level * 500) {
                    setLevel(prev => prev + 1);
                }
                continue;
            }

            // Remove if off screen
            if (item.y > CANVAS_HEIGHT) {
                items.current.splice(i, 1);
            }
        }

        // 4. Draw
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw Background (Sky)
        const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        grad.addColorStop(0, '#1a1a2e');
        grad.addColorStop(1, '#16213e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw Stars
        ctx.fillStyle = '#fff';
        for (let i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.arc((i * 137.5) % CANVAS_WIDTH, (i * 153.2) % CANVAS_HEIGHT, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Player (Sleigh)
        ctx.fillStyle = '#e94560';
        // Base
        ctx.fillRect(playerX.current, CANVAS_HEIGHT - PLAYER_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT - 15);
        // Runners
        ctx.fillStyle = '#cc3c54';
        ctx.fillRect(playerX.current, CANVAS_HEIGHT - 10, PLAYER_WIDTH, 10);
        // Gold trim
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(playerX.current, CANVAS_HEIGHT - PLAYER_HEIGHT, PLAYER_WIDTH, 5);

        // Draw Items
        items.current.forEach(item => {
            if (item.type === 'GIFT' || item.type === 'GOLD_GIFT') {
                const color = item.type === 'GIFT' ? '#ff6b6b' : '#FFD700';
                const ribbon = item.type === 'GIFT' ? '#FFD700' : '#ff6b6b';

                // Box
                ctx.fillStyle = color;
                ctx.fillRect(item.x, item.y, ITEM_SIZE, ITEM_SIZE);

                // Ribbon Vertical
                ctx.fillStyle = ribbon;
                ctx.fillRect(item.x + ITEM_SIZE / 2 - 5, item.y, 10, ITEM_SIZE);
                // Ribbon Horizontal
                ctx.fillRect(item.x, item.y + ITEM_SIZE / 2 - 5, ITEM_SIZE, 10);
            } else if (item.type === 'COAL') {
                // Rock shape
                ctx.fillStyle = '#2d3436';
                ctx.beginPath();
                ctx.arc(item.x + ITEM_SIZE / 2, item.y + ITEM_SIZE / 2, ITEM_SIZE / 2, 0, Math.PI * 2);
                ctx.fill();
                // Shine
                ctx.fillStyle = '#636e72';
                ctx.beginPath();
                ctx.arc(item.x + ITEM_SIZE / 3, item.y + ITEM_SIZE / 3, ITEM_SIZE / 6, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Star / Powerup
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                const cx = item.x + ITEM_SIZE / 2;
                const cy = item.y + ITEM_SIZE / 2;
                const spikes = 5;
                const outerRadius = ITEM_SIZE / 2;
                const innerRadius = ITEM_SIZE / 4;
                let rot = Math.PI / 2 * 3;
                let x = cx;
                let y = cy;
                const step = Math.PI / spikes;

                ctx.moveTo(cx, cy - outerRadius);
                for (let i = 0; i < spikes; i++) {
                    x = cx + Math.cos(rot) * outerRadius;
                    y = cy + Math.sin(rot) * outerRadius;
                    ctx.lineTo(x, y);
                    rot += step;

                    x = cx + Math.cos(rot) * innerRadius;
                    y = cy + Math.sin(rot) * innerRadius;
                    ctx.lineTo(x, y);
                    rot += step;
                }
                ctx.lineTo(cx, cy - outerRadius);
                ctx.closePath();
                ctx.fill();
            }
        });

        // Loop
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const handleTouchControl = (key, active) => {
        if (gameState !== 'PLAYING') return;
        keys.current[key] = active;
    };

    return (
        <div className="game-wrapper">
            <div className="game-header">
                <div className="stat">Score: <span>{score}</span></div>
                <div className="stat">Level: <span>{level}</span></div>
                <div className="stat">Streak: <span>{streak} <Flame className="inline-icon" size={20} color="#ff6b6b" /></span></div>
                <div className="stat">Best: <span>{highScore}</span></div>
            </div>

            <div className="canvas-container">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="game-canvas"
                />

                {gameState === 'START' && (
                    <div className="game-overlay">
                        <h2>Santa's Present Catch</h2>
                        <p>Catch the presents! Avoid the coal!</p>
                        <p className="controls">Use Arrow Keys or Buttons below</p>
                        <button className="start-btn" onClick={startGame}>Start Game</button>
                    </div>
                )}

                {gameState === 'GAMEOVER' && (
                    <div className="game-overlay color-danger">
                        <h2>Ouch! You hit coal!</h2>
                        <p>Final Score: {score}</p>
                        <button className="start-btn" onClick={startGame}>Try Again</button>
                    </div>
                )}
            </div>

            <div className="mobile-controls">
                <button
                    className="control-btn left"
                    onMouseDown={() => handleTouchControl('ArrowLeft', true)}
                    onMouseUp={() => handleTouchControl('ArrowLeft', false)}
                    onMouseLeave={() => handleTouchControl('ArrowLeft', false)}
                    onTouchStart={(e) => { e.preventDefault(); handleTouchControl('ArrowLeft', true); }}
                    onTouchEnd={(e) => { e.preventDefault(); handleTouchControl('ArrowLeft', false); }}
                    aria-label="Move Left"
                >
                    <ArrowLeft size={32} color="white" />
                </button>
                <button
                    className="control-btn right"
                    onMouseDown={() => handleTouchControl('ArrowRight', true)}
                    onMouseUp={() => handleTouchControl('ArrowRight', false)}
                    onMouseLeave={() => handleTouchControl('ArrowRight', false)}
                    onTouchStart={(e) => { e.preventDefault(); handleTouchControl('ArrowRight', true); }}
                    onTouchEnd={(e) => { e.preventDefault(); handleTouchControl('ArrowRight', false); }}
                    aria-label="Move Right"
                >
                    <ArrowRight size={32} color="white" />
                </button>
            </div>
        </div>
    );
};

export default PresentCatch;
