import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUser, getUser } from '../services/firebase';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        // Check if user exists in localStorage
        const storedUserId = localStorage.getItem('hoho_user_id');
        const storedUserName = localStorage.getItem('hoho_user_name');

        if (storedUserId && storedUserName) {
            setUserId(storedUserId);
            setUserName(storedUserName);
            setIsLoading(false);
        } else {
            setShowWelcome(true);
            setIsLoading(false);
        }
    }, []);

    const registerUser = async (name) => {
        try {
            const newUserId = await saveUser(name);
            if (newUserId) {
                setUserId(newUserId);
                setUserName(name);
                localStorage.setItem('hoho_user_id', newUserId);
                localStorage.setItem('hoho_user_name', name);
                setShowWelcome(false);
                console.log('✅ User registered successfully:', name);
            } else {
                console.error('❌ Failed to register user');
                alert('Failed to save user. Please try again.');
            }
        } catch (error) {
            console.error('❌ Error registering user:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const value = {
        userId,
        userName,
        isLoading,
        showWelcome,
        registerUser
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
