import './StoryPanel.css';

function StoryPanel({ story }) {
    if (!story) {
        return (
            <div className="story-panel">
                <div className="story-placeholder">
                    <span className="placeholder-icon">📖</span>
                    <p>Select a location to see its festive story!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="story-panel">
            <div className="story-header">
                <span className="story-emoji">{story.emoji}</span>
                <h3 className="story-title">{story.title}</h3>
            </div>

            <div className="story-content">
                <div className="santa-note">
                    <p className="story-text">"{story.story}"</p>
                    <span className="santa-signature">- Santa Claus 🎅</span>
                </div>
            </div>
        </div>
    );
}

export default StoryPanel;
