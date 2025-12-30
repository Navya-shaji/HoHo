import { useState } from 'react';
import './QuizForm.css';

function QuizForm({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        name: '',
        ageGroup: '',
        interests: [],
        personality: '',
        budget: '',
        helpingOthers: '',
        sharing: '',
        chores: '',
        kindness: ''
    });

    const questions = [
        {
            id: 'name',
            type: 'text',
            question: "What's your name?",
            subtitle: "So Santa knows who to address! 🎅",
            placeholder: "Enter your name..."
        },
        {
            id: 'ageGroup',
            type: 'single',
            question: "What's your age group?",
            subtitle: "This helps Santa pick age-appropriate gifts! 🎂",
            options: [
                { value: 'child', label: '👶 Child (5-12)', emoji: '👶' },
                { value: 'teen', label: '🧒 Teen (13-17)', emoji: '🧒' },
                { value: 'adult', label: '👨 Adult (18+)', emoji: '👨' }
            ]
        },
        {
            id: 'interests',
            type: 'multiple',
            question: "What are your interests?",
            subtitle: "Pick all that apply! ✨",
            options: [
                { value: 'technology', label: 'Technology', emoji: '💻' },
                { value: 'sports', label: 'Sports', emoji: '⚽' },
                { value: 'reading', label: 'Reading', emoji: '📚' },
                { value: 'arts', label: 'Arts & Crafts', emoji: '🎨' },
                { value: 'music', label: 'Music', emoji: '🎵' },
                { value: 'gaming', label: 'Gaming', emoji: '🎮' },
                { value: 'fashion', label: 'Fashion', emoji: '👗' },
                { value: 'cooking', label: 'Cooking', emoji: '🍳' },
                { value: 'outdoor', label: 'Outdoor Activities', emoji: '🏕️' }
            ]
        },
        {
            id: 'personality',
            type: 'single',
            question: "Which describes you best?",
            subtitle: "Choose the one that fits you most! 🌟",
            options: [
                { value: 'creative', label: 'Creative & Artistic', emoji: '🎨' },
                { value: 'adventurous', label: 'Adventurous & Bold', emoji: '🚀' },
                { value: 'thoughtful', label: 'Thoughtful & Caring', emoji: '💝' },
                { value: 'active', label: 'Active & Energetic', emoji: '⚡' },
                { value: 'curious', label: 'Curious & Learning', emoji: '🔍' },
                { value: 'organized', label: 'Organized & Practical', emoji: '📋' },
                { value: 'social', label: 'Social & Outgoing', emoji: '🎉' }
            ]
        },
        {
            id: 'budget',
            type: 'single',
            question: "What's your budget range?",
            subtitle: "Santa works with all budgets! 💰",
            options: [
                { value: 'low', label: 'Under $50', emoji: '💵' },
                { value: 'medium', label: '$50 - $150', emoji: '💴' },
                { value: 'high', label: 'Over $150', emoji: '💎' }
            ]
        },
        {
            id: 'helpingOthers',
            type: 'single',
            question: "How often do you help others?",
            subtitle: "This affects your Nice List status! 😇",
            options: [
                { value: 'always', label: 'Always!', emoji: '⭐' },
                { value: 'sometimes', label: 'Sometimes', emoji: '✨' },
                { value: 'rarely', label: 'Rarely', emoji: '💫' }
            ]
        },
        {
            id: 'sharing',
            type: 'single',
            question: "Do you share with others?",
            subtitle: "Sharing is caring! 🤝",
            options: [
                { value: 'yes', label: 'Yes, I love sharing!', emoji: '💖' },
                { value: 'no', label: 'Not really...', emoji: '😅' }
            ]
        },
        {
            id: 'chores',
            type: 'single',
            question: "Do you do your chores without being asked?",
            subtitle: "Santa's elves are watching! 👀",
            options: [
                { value: 'always', label: 'Always!', emoji: '🌟' },
                { value: 'sometimes', label: 'Sometimes', emoji: '⭐' },
                { value: 'never', label: 'Never', emoji: '😬' }
            ]
        },
        {
            id: 'kindness',
            type: 'single',
            question: "Are you kind to everyone?",
            subtitle: "Even when it's hard? 💕",
            options: [
                { value: 'always', label: 'Always!', emoji: '💝' },
                { value: 'sometimes', label: 'Most of the time', emoji: '💗' },
                { value: 'rarely', label: 'Sometimes I struggle', emoji: '💔' }
            ]
        }
    ];

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    const handleAnswer = (questionId, value) => {
        if (currentQuestion.type === 'multiple') {
            // Handle multiple choice (checkboxes)
            const currentAnswers = answers[questionId] || [];
            const newAnswers = currentAnswers.includes(value)
                ? currentAnswers.filter(v => v !== value)
                : [...currentAnswers, value];

            setAnswers(prev => ({
                ...prev,
                [questionId]: newAnswers
            }));
        } else {
            // Handle single choice or text
            setAnswers(prev => ({
                ...prev,
                [questionId]: value
            }));
        }
    };

    const canProceed = () => {
        const answer = answers[currentQuestion.id];

        if (currentQuestion.type === 'text') {
            return answer && answer.trim().length > 0;
        } else if (currentQuestion.type === 'multiple') {
            return answer && answer.length > 0;
        } else {
            return answer !== '';
        }
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Quiz complete!
            onComplete(answers);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <div className="quiz-form">
            {/* Progress Bar */}
            <div className="quiz-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="progress-text">
                    Question {currentStep + 1} of {questions.length}
                </div>
            </div>

            {/* Question Card */}
            <div className="question-card">
                <div className="question-header">
                    <h2 className="question-title">{currentQuestion.question}</h2>
                    <p className="question-subtitle">{currentQuestion.subtitle}</p>
                </div>

                <div className="question-content">
                    {currentQuestion.type === 'text' && (
                        <input
                            type="text"
                            className="text-input"
                            placeholder={currentQuestion.placeholder}
                            value={answers[currentQuestion.id] || ''}
                            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                            autoFocus
                        />
                    )}

                    {currentQuestion.type === 'single' && (
                        <div className="options-grid">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.value}
                                    className={`option-button ${answers[currentQuestion.id] === option.value ? 'selected' : ''
                                        }`}
                                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                                >
                                    <span className="option-emoji">{option.emoji}</span>
                                    <span className="option-label">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === 'multiple' && (
                        <div className="options-grid">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.value}
                                    className={`option-button ${(answers[currentQuestion.id] || []).includes(option.value)
                                            ? 'selected'
                                            : ''
                                        }`}
                                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                                >
                                    <span className="option-emoji">{option.emoji}</span>
                                    <span className="option-label">{option.label}</span>
                                    {(answers[currentQuestion.id] || []).includes(option.value) && (
                                        <span className="checkmark">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="question-navigation">
                    <button
                        className="nav-button back-button"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                    >
                        ← Back
                    </button>

                    <button
                        className="nav-button next-button"
                        onClick={handleNext}
                        disabled={!canProceed()}
                    >
                        {currentStep === questions.length - 1 ? '🎁 Get Recommendations' : 'Next →'}
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="quiz-decorations">
                <span className="decoration-emoji snowflake">❄️</span>
                <span className="decoration-emoji star">⭐</span>
                <span className="decoration-emoji gift">🎁</span>
            </div>
        </div>
    );
}

export default QuizForm;
