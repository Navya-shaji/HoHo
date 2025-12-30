import { useState } from 'react';
import { Gift } from 'lucide-react';
import { useUser } from '../context/UserContext';
import QuizForm from '../components/giftfinder/QuizForm';
import GiftResults from '../components/giftfinder/GiftResults';
import { getGiftRecommendations } from '../utils/giftRecommendation';
import { saveGiftPreference } from '../services/firebase';



function GiftFinder() {
    const { userId, userName } = useUser();
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [results, setResults] = useState(null);

    const handleQuizComplete = (answers) => {
        // Get recommendations from the rule-based engine
        const recommendations = getGiftRecommendations(answers);
        setResults(recommendations);
        setQuizCompleted(true);

        // Save to Firebase
        if (userId && userName) {
            saveGiftPreference(answers, recommendations, userId, userName);
        }
    };

    const handleRestart = () => {
        setQuizCompleted(false);
        setResults(null);
    };

    return (
        <div className="page-container">

            <div className="content-wrapper">
                <header className="page-header">
                    <h1 className="page-title">
                        Find My <span className="highlight-text">Gift</span> <Gift className="inline-icon" size={48} color="#FF6B6B" />
                    </h1>
                    <p className="page-subtitle">
                        Answer a few questions and let Santa recommend the perfect gifts for you!
                    </p>
                </header>

                <div className="finder-content">
                    {!quizCompleted ? (
                        <QuizForm onComplete={handleQuizComplete} />
                    ) : (
                        <GiftResults results={results} onRestart={handleRestart} />
                    )}
                </div>
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
                    max-width: 100%;
                    padding: 0 4rem;
                    margin: 0 auto;
                    position: relative;
                    z-index: 2;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    animation: fadeInDown 0.8s ease-out;
                }

                .page-title {
                    font-size: 3.5rem;
                    margin-bottom: 1rem;
                    font-weight: 800;
                    letter-spacing: -1px;
                }

                .highlight-text {
                    background: linear-gradient(45deg, #FF6B6B, #e94560);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .page-subtitle {
                    font-size: 1.2rem;
                    color: rgba(255, 255, 255, 0.7);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .finder-content {
                    animation: fadeInUp 0.8s ease-out 0.2s backwards;
                }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .page-title {
                        font-size: 2.5rem;
                    }
                    .page-container {
                        padding: 1rem;
                    }
                }
            `}} />
        </div>
    );
}

export default GiftFinder;
