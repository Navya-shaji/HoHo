import React, { useState } from 'react';
import { User, Sparkles } from 'lucide-react';
import './WelcomeModal.css';

const WelcomeModal = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() && !isSubmitting) {
            setIsSubmitting(true);
            await onSubmit(name.trim());
            // If we're still here, submission failed
            setIsSubmitting(false);
        }
    };

    return (
        <div className="welcome-modal-overlay">
            <div className="welcome-modal">
                <div className="welcome-header">
                    <Sparkles size={48} color="#ffd700" className="sparkle-icon" />
                    <h1>Welcome to HOHO! 🎅</h1>
                    <p>Santa's magical Christmas experience</p>
                </div>

                <form onSubmit={handleSubmit} className="welcome-form">
                    <div className="input-group">
                        <User size={24} color="#ffd700" />
                        <input
                            type="text"
                            placeholder="What's your name?"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            required
                            maxLength={50}
                            disabled={isSubmitting}
                        />
                    </div>

                    <button
                        type="submit"
                        className="welcome-submit-btn"
                        disabled={isSubmitting || !name.trim()}
                    >
                        {isSubmitting ? 'Saving...' : 'Start My Christmas Journey 🎄'}
                    </button>
                </form>

                <p className="welcome-note">
                    Your name will be used to personalize your experience and save your progress!
                </p>
            </div>
        </div>
    );
};

export default WelcomeModal;
