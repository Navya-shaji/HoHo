import { useState } from 'react';
import { ClipboardList, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { saveQuizResult } from '../../services/firebase';
import './NaughtyNiceQuiz.css';

const QUESTIONS = [
    {
        id: 1,
        question: "Did you help your parents with chores without being asked?",
        options: [
            { text: "Always!", points: 2 },
            { text: "Sometimes", points: 1 },
            { text: "Oops, I forgot...", points: 0 }
        ]
    },
    {
        id: 2,
        question: "Did you share your toys with your siblings or friends?",
        options: [
            { text: "Yes, sharing is caring!", points: 2 },
            { text: "Only when I wasn't playing with them", points: 1 },
            { text: "They're MINE!", points: 0 }
        ]
    },
    {
        id: 3,
        question: "Did you eat all your vegetables?",
        options: [
            { text: "Yummy! Every bite!", points: 2 },
            { text: "Most of them...", points: 1 },
            { text: "I fed them to the dog", points: 0 }
        ]
    },
    {
        id: 4,
        question: "Did you say 'Please' and 'Thank You'?",
        options: [
            { text: "All the time!", points: 2 },
            { text: "When mom reminded me", points: 1 },
            { text: "Why should I?", points: -1 }
        ]
    },
    {
        id: 5,
        question: "Did you keep your room clean?",
        options: [
            { text: "Spotless!", points: 2 },
            { text: "It's a creative mess", points: 1 },
            { text: "Where IS the floor?", points: 0 }
        ]
    }
];

const NaughtyNiceQuiz = () => {
    const { userId, userName } = useUser();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answers, setAnswers] = useState([]);

    const handleAnswer = (points, answerText) => {
        const newScore = score + points;
        const newAnswers = [...answers, { question: QUESTIONS[currentQuestion].question, answer: answerText }];

        setScore(newScore);
        setAnswers(newAnswers);

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Determine result type to save
            const maxScore = QUESTIONS.length * 2;
            const percentage = (newScore / maxScore) * 100;
            let resultType = 'NAUGHTY';
            if (percentage >= 80) resultType = 'NICE';
            else if (percentage >= 50) resultType = 'OKAY';

            if (userId && userName) {
                saveQuizResult({ type: resultType, score: newScore }, userId, userName);
            }
            setShowResult(true);
        }
    };

    const getResult = () => {
        const maxScore = QUESTIONS.length * 2;
        const percentage = (score / maxScore) * 100;

        if (percentage >= 80) return { type: 'NICE', message: "You made the Nice List! Santa is proud!", color: '#4ecdc4', icon: CheckCircle };
        if (percentage >= 50) return { type: 'OKAY', message: "You've been good, but keep trying to be even better!", color: '#ffd700', icon: ClipboardList };
        return { type: 'NAUGHTY', message: "Uh oh... You might be on the Naughty List. Time to be extra good!", color: '#ff6b6b', icon: XCircle };
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setAnswers([]);
    };

    const result = showResult ? getResult() : null;

    return (
        <div className="quiz-container">
            {!showResult ? (
                <div className="question-card">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="question-header">
                        <span className="question-number">Question {currentQuestion + 1}/{QUESTIONS.length}</span>
                        <h2>{QUESTIONS[currentQuestion].question}</h2>
                    </div>
                    <div className="options-grid">
                        {QUESTIONS[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className="option-btn"
                                onClick={() => handleAnswer(option.points, option.text)}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="result-card">
                    <div className="result-icon">
                        <result.icon size={80} color={result.color} />
                    </div>
                    <h2 style={{ color: result.color }}>{result.type} LIST</h2>
                    <p className="result-message">{result.message}</p>

                    <div className="score-circle">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="circle"
                                strokeDasharray={`${Math.max(0, (score / (QUESTIONS.length * 2)) * 100)}, 100`}
                                stroke={result.color}
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" className="percentage">{Math.round((score / (QUESTIONS.length * 2)) * 100)}%</text>
                        </svg>
                    </div>

                    <button className="restart-btn" onClick={resetQuiz}>
                        <RotateCcw size={20} /> Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default NaughtyNiceQuiz;
