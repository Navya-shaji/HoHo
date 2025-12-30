import { db } from '../firebase/config';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';

// User Management
export const saveUser = async (userName) => {
    console.log('🔄 Attempting to save user:', userName);
    console.log('📊 Firebase DB object:', db);

    try {
        const userId = `user_${Date.now()}`;
        console.log('🆔 Generated user ID:', userId);

        const userDoc = {
            name: userName,
            createdAt: new Date(),
            lastActive: new Date()
        };
        console.log('📝 User document to save:', userDoc);

        await setDoc(doc(db, 'users', userId), userDoc);
        console.log('✅ User saved successfully! ID:', userId);
        return userId;
    } catch (e) {
        console.error("❌ Error saving user: ", e);
        console.error("❌ Error code:", e.code);
        console.error("❌ Error message:", e.message);
        console.error("❌ Full error:", JSON.stringify(e, null, 2));
        return null;
    }
};

export const updateUserActivity = async (userId) => {
    try {
        await setDoc(doc(db, 'users', userId), {
            lastActive: new Date()
        }, { merge: true });
    } catch (e) {
        console.error("Error updating user activity: ", e);
    }
};

export const getUser = async (userId) => {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (e) {
        console.error("Error getting user: ", e);
        return null;
    }
};

// Game Score Management
export const saveGameScore = async (gameId, score, userId, userName) => {
    console.log('🎮 Attempting to save game score:', { gameId, score, userId, userName });

    try {
        const docRef = await addDoc(collection(db, 'scores'), {
            gameId,
            score,
            userId,
            userName,
            timestamp: new Date()
        });
        console.log('✅ Score saved successfully! Document ID:', docRef.id);
        await updateUserActivity(userId);
    } catch (e) {
        console.error("❌ Error adding score: ", e);
        console.error("Error details:", e.message);
    }
};

export const saveQuizResult = async (result, userId, userName) => {
    console.log('📝 Attempting to save quiz result:', result);

    try {
        const docRef = await addDoc(collection(db, 'quiz_results'), {
            resultType: result.type,
            score: result.score,
            userId,
            userName,
            timestamp: new Date()
        });
        console.log('✅ Quiz result saved! Document ID:', docRef.id);
        await updateUserActivity(userId);
    } catch (e) {
        console.error("❌ Error saving quiz result: ", e);
    }
};

export const saveGiftPreference = async (answers, recommendations, userId, userName) => {
    console.log('🎁 Attempting to save gift preference');

    try {
        const docRef = await addDoc(collection(db, 'gift_preferences'), {
            answers,
            recommendations: recommendations.map(r => r.name),
            userId,
            userName,
            timestamp: new Date()
        });
        console.log('✅ Gift preference saved! Document ID:', docRef.id);
        await updateUserActivity(userId);
    } catch (e) {
        console.error("❌ Error saving gift preference: ", e);
    }
};

export const saveStreak = async (streak, userId, userName) => {
    console.log('🔥 Attempting to save streak:', streak);

    try {
        const docRef = await addDoc(collection(db, 'streaks'), {
            streak,
            userId,
            userName,
            timestamp: new Date()
        });
        console.log('✅ Streak saved! Document ID:', docRef.id);
        await updateUserActivity(userId);
    } catch (e) {
        console.error("❌ Error saving streak: ", e);
    }
};
