import { saveStreak } from '../services/firebase';

const STREAK_KEY = 'santa_game_streak';
const LAST_PLAY_DATE_KEY = 'santa_game_last_play';

export const getStreakData = () => {
    const streak = parseInt(localStorage.getItem(STREAK_KEY) || '0');
    const lastPlayDate = localStorage.getItem(LAST_PLAY_DATE_KEY);

    return { streak, lastPlayDate };
};

export const updateStreak = (userId, userName) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const { streak, lastPlayDate } = getStreakData();

    if (lastPlayDate === today) {
        // Already played today, no change to streak
        return { streak, lastPlayDate, message: 'Today\'s game already counted!' };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    if (lastPlayDate === yesterdayStr) {
        newStreak = streak + 1;
    }

    localStorage.setItem(STREAK_KEY, newStreak.toString());
    localStorage.setItem(LAST_PLAY_DATE_KEY, today);

    // Save to Firebase with user info
    if (userId && userName) {
        saveStreak(newStreak, userId, userName);
    }

    return { streak: newStreak, lastPlayDate: today, message: 'Daily streak updated! 🎅' };
};

export const getHighScore = () => {
    return parseInt(localStorage.getItem('santa_game_highscore') || '0');
};

export const updateHighScore = (score) => {
    const currentHigh = getHighScore();
    if (score > currentHigh) {
        localStorage.setItem('santa_game_highscore', score.toString());
        return true;
    }
    return false;
};
