// Gift Recommendation Engine - Rule-based Logic

// Gift database with categories and attributes
const giftDatabase = [
    // Tech & Gadgets
    {
        id: 1,
        name: "Smart Watch",
        category: "tech",
        ageGroup: "teen-adult",
        personality: ["active", "organized"],
        priceRange: "medium",
        emoji: "⌚",
        description: "Track your fitness goals and stay connected on the go!"
    },
    {
        id: 2,
        name: "Wireless Earbuds",
        category: "tech",
        ageGroup: "teen-adult",
        personality: ["creative", "active"],
        priceRange: "medium",
        emoji: "🎧",
        description: "Immerse yourself in crystal-clear audio wherever you are."
    },
    {
        id: 3,
        name: "Gaming Console",
        category: "tech",
        ageGroup: "teen-adult",
        personality: ["adventurous", "creative"],
        priceRange: "high",
        emoji: "🎮",
        description: "Experience next-gen gaming with stunning graphics and performance."
    },
    {
        id: 4,
        name: "Tablet for Kids",
        category: "tech",
        ageGroup: "child",
        personality: ["creative", "curious"],
        priceRange: "medium",
        emoji: "📱",
        description: "Educational games and apps designed for young learners."
    },
    {
        id: 5,
        name: "E-Reader",
        category: "tech",
        ageGroup: "all",
        personality: ["thoughtful", "curious"],
        priceRange: "medium",
        emoji: "📚",
        description: "Carry thousands of books in your pocket!"
    },

    // Toys & Games
    {
        id: 6,
        name: "LEGO Creator Set",
        category: "toys",
        ageGroup: "child",
        personality: ["creative", "curious"],
        priceRange: "medium",
        emoji: "🧱",
        description: "Build amazing creations with endless possibilities."
    },
    {
        id: 7,
        name: "Board Game Collection",
        category: "toys",
        ageGroup: "all",
        personality: ["thoughtful", "social"],
        priceRange: "low",
        emoji: "🎲",
        description: "Bring family and friends together for game night!"
    },
    {
        id: 8,
        name: "Remote Control Car",
        category: "toys",
        ageGroup: "child",
        personality: ["adventurous", "active"],
        priceRange: "low",
        emoji: "🚗",
        description: "Race around with this high-speed RC vehicle."
    },
    {
        id: 9,
        name: "Art Supply Kit",
        category: "toys",
        ageGroup: "child-teen",
        personality: ["creative", "thoughtful"],
        priceRange: "low",
        emoji: "🎨",
        description: "Everything you need to create masterpieces!"
    },
    {
        id: 10,
        name: "Science Experiment Kit",
        category: "toys",
        ageGroup: "child-teen",
        personality: ["curious", "organized"],
        priceRange: "medium",
        emoji: "🔬",
        description: "Discover the wonders of science with hands-on experiments."
    },

    // Sports & Outdoor
    {
        id: 11,
        name: "Bicycle",
        category: "sports",
        ageGroup: "all",
        personality: ["active", "adventurous"],
        priceRange: "high",
        emoji: "🚴",
        description: "Explore the outdoors on two wheels!"
    },
    {
        id: 12,
        name: "Skateboard",
        category: "sports",
        ageGroup: "teen",
        personality: ["adventurous", "active"],
        priceRange: "medium",
        emoji: "🛹",
        description: "Master tricks and cruise in style."
    },
    {
        id: 13,
        name: "Camping Gear Set",
        category: "sports",
        ageGroup: "adult",
        personality: ["adventurous", "organized"],
        priceRange: "high",
        emoji: "⛺",
        description: "Everything you need for your next outdoor adventure."
    },
    {
        id: 14,
        name: "Yoga Mat & Accessories",
        category: "sports",
        ageGroup: "adult",
        personality: ["thoughtful", "active"],
        priceRange: "low",
        emoji: "🧘",
        description: "Find your zen with premium yoga equipment."
    },
    {
        id: 15,
        name: "Soccer Ball",
        category: "sports",
        ageGroup: "child-teen",
        personality: ["active", "social"],
        priceRange: "low",
        emoji: "⚽",
        description: "Perfect for practice or playing with friends!"
    },

    // Books & Learning
    {
        id: 16,
        name: "Fantasy Novel Collection",
        category: "books",
        ageGroup: "teen-adult",
        personality: ["creative", "curious"],
        priceRange: "low",
        emoji: "📖",
        description: "Escape to magical worlds with epic adventures."
    },
    {
        id: 17,
        name: "Cookbook",
        category: "books",
        ageGroup: "adult",
        personality: ["creative", "organized"],
        priceRange: "low",
        emoji: "👨‍🍳",
        description: "Master new recipes and cooking techniques."
    },
    {
        id: 18,
        name: "Children's Picture Books",
        category: "books",
        ageGroup: "child",
        personality: ["curious", "thoughtful"],
        priceRange: "low",
        emoji: "📚",
        description: "Colorful stories that spark imagination."
    },
    {
        id: 19,
        name: "Language Learning Course",
        category: "books",
        ageGroup: "teen-adult",
        personality: ["curious", "organized"],
        priceRange: "medium",
        emoji: "🗣️",
        description: "Learn a new language at your own pace."
    },

    // Fashion & Accessories
    {
        id: 20,
        name: "Designer Backpack",
        category: "fashion",
        ageGroup: "teen-adult",
        personality: ["organized", "creative"],
        priceRange: "medium",
        emoji: "🎒",
        description: "Stylish and functional for everyday use."
    },
    {
        id: 21,
        name: "Cozy Winter Sweater",
        category: "fashion",
        ageGroup: "all",
        personality: ["thoughtful", "social"],
        priceRange: "medium",
        emoji: "🧶",
        description: "Stay warm and fashionable this winter."
    },
    {
        id: 22,
        name: "Sneakers",
        category: "fashion",
        ageGroup: "all",
        personality: ["active", "creative"],
        priceRange: "medium",
        emoji: "👟",
        description: "Comfortable and trendy footwear."
    },
    {
        id: 23,
        name: "Jewelry Set",
        category: "fashion",
        ageGroup: "teen-adult",
        personality: ["thoughtful", "creative"],
        priceRange: "high",
        emoji: "💎",
        description: "Elegant pieces to complement any outfit."
    },

    // Home & Lifestyle
    {
        id: 24,
        name: "Coffee Maker",
        category: "home",
        ageGroup: "adult",
        personality: ["organized", "thoughtful"],
        priceRange: "medium",
        emoji: "☕",
        description: "Brew the perfect cup every morning."
    },
    {
        id: 25,
        name: "Scented Candle Set",
        category: "home",
        ageGroup: "adult",
        personality: ["thoughtful", "creative"],
        priceRange: "low",
        emoji: "🕯️",
        description: "Create a relaxing atmosphere at home."
    },
    {
        id: 26,
        name: "Plant Growing Kit",
        category: "home",
        ageGroup: "all",
        personality: ["curious", "thoughtful"],
        priceRange: "low",
        emoji: "🌱",
        description: "Grow your own herbs or flowers indoors."
    },
    {
        id: 27,
        name: "Smart Home Speaker",
        category: "home",
        ageGroup: "adult",
        personality: ["organized", "tech-savvy"],
        priceRange: "medium",
        emoji: "🔊",
        description: "Control your home with voice commands."
    },

    // Music & Entertainment
    {
        id: 28,
        name: "Guitar",
        category: "music",
        ageGroup: "teen-adult",
        personality: ["creative", "adventurous"],
        priceRange: "high",
        emoji: "🎸",
        description: "Start your musical journey today!"
    },
    {
        id: 29,
        name: "Vinyl Record Player",
        category: "music",
        ageGroup: "adult",
        personality: ["creative", "thoughtful"],
        priceRange: "high",
        emoji: "🎵",
        description: "Experience music the classic way."
    },
    {
        id: 30,
        name: "Karaoke Machine",
        category: "music",
        ageGroup: "all",
        personality: ["social", "creative"],
        priceRange: "medium",
        emoji: "🎤",
        description: "Sing your heart out with friends and family!"
    },
];

/**
 * Calculate naughty/nice score based on quiz answers
 * @param {Object} answers - Quiz answers
 * @returns {Object} Score and status
 */
export function calculateNaughtyNiceScore(answers) {
    let nicePoints = 0;
    let totalPoints = 0;

    // Question 1: Helping others
    if (answers.helpingOthers === 'always') {
        nicePoints += 3;
        totalPoints += 3;
    } else if (answers.helpingOthers === 'sometimes') {
        nicePoints += 2;
        totalPoints += 3;
    } else {
        totalPoints += 3;
    }

    // Question 2: Sharing
    if (answers.sharing === 'yes') {
        nicePoints += 2;
        totalPoints += 2;
    } else {
        totalPoints += 2;
    }

    // Question 3: Chores
    if (answers.chores === 'always') {
        nicePoints += 3;
        totalPoints += 3;
    } else if (answers.chores === 'sometimes') {
        nicePoints += 1;
        totalPoints += 3;
    } else {
        totalPoints += 3;
    }

    // Question 4: Kindness
    if (answers.kindness === 'always') {
        nicePoints += 2;
        totalPoints += 2;
    } else if (answers.kindness === 'sometimes') {
        nicePoints += 1;
        totalPoints += 2;
    } else {
        totalPoints += 2;
    }

    const percentage = Math.round((nicePoints / totalPoints) * 100);

    let status = 'nice';
    let message = "You've been wonderful this year!";

    if (percentage >= 80) {
        status = 'very-nice';
        message = "You've been exceptionally nice! Santa is very proud! 🌟";
    } else if (percentage >= 60) {
        status = 'nice';
        message = "You've been nice this year! Keep up the good work! ✨";
    } else if (percentage >= 40) {
        status = 'mixed';
        message = "You've had your moments! There's still time to be nicer! 💫";
    } else {
        status = 'naughty';
        message = "You've been a bit naughty, but Santa believes you can improve! 🎯";
    }

    return {
        score: percentage,
        status,
        message,
        nicePoints,
        totalPoints
    };
}

/**
 * Main recommendation engine
 * @param {Object} answers - All quiz answers
 * @returns {Object} Recommendations and analysis
 */
export function getGiftRecommendations(answers) {
    const recommendations = [];

    // Extract user preferences
    const ageGroup = answers.ageGroup;
    const interests = answers.interests || [];
    const personality = answers.personality;
    const budget = answers.budget;

    // Calculate naughty/nice score
    const naughtyNiceResult = calculateNaughtyNiceScore(answers);

    // Map interests to categories
    const categoryMapping = {
        'technology': 'tech',
        'sports': 'sports',
        'reading': 'books',
        'arts': 'toys',
        'music': 'music',
        'fashion': 'fashion',
        'cooking': 'home',
        'gaming': 'tech',
        'outdoor': 'sports'
    };

    // Score each gift based on matching criteria
    const scoredGifts = giftDatabase.map(gift => {
        let score = 0;

        // Age group matching (highest priority)
        if (gift.ageGroup === ageGroup || gift.ageGroup === 'all') {
            score += 10;
        } else if (gift.ageGroup.includes(ageGroup)) {
            score += 8;
        } else if (
            (ageGroup === 'child' && gift.ageGroup === 'child-teen') ||
            (ageGroup === 'teen' && (gift.ageGroup === 'child-teen' || gift.ageGroup === 'teen-adult')) ||
            (ageGroup === 'adult' && gift.ageGroup === 'teen-adult')
        ) {
            score += 5;
        }

        // Interest/Category matching
        interests.forEach(interest => {
            const mappedCategory = categoryMapping[interest];
            if (gift.category === mappedCategory) {
                score += 7;
            }
        });

        // Personality matching
        if (gift.personality.includes(personality)) {
            score += 5;
        }

        // Budget matching
        if (gift.priceRange === budget) {
            score += 4;
        } else if (
            (budget === 'medium' && (gift.priceRange === 'low' || gift.priceRange === 'high')) ||
            (budget === 'high' && gift.priceRange === 'medium')
        ) {
            score += 2;
        }

        // Bonus for nice children (more gifts!)
        if (naughtyNiceResult.status === 'very-nice') {
            score += 2;
        }

        return { ...gift, matchScore: score };
    });

    // Sort by score and get top recommendations
    const topGifts = scoredGifts
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6);

    // Generate personalized message from Santa
    const santaMessage = generateSantaMessage(answers, naughtyNiceResult);

    return {
        gifts: topGifts,
        naughtyNice: naughtyNiceResult,
        santaMessage,
        userProfile: {
            ageGroup,
            interests,
            personality,
            budget
        }
    };
}

/**
 * Generate personalized message from Santa
 * @param {Object} answers - Quiz answers
 * @param {Object} naughtyNiceResult - Naughty/nice calculation
 * @returns {string} Personalized message
 */
function generateSantaMessage(answers, naughtyNiceResult) {
    const name = answers.name || 'friend';
    const personality = answers.personality;
    const interests = answers.interests || [];

    let message = `Ho ho ho, ${name}! 🎅\n\n`;

    // Personalize based on naughty/nice status
    if (naughtyNiceResult.status === 'very-nice') {
        message += `You've been absolutely wonderful this year! Your kindness and good deeds have not gone unnoticed at the North Pole. `;
    } else if (naughtyNiceResult.status === 'nice') {
        message += `You've been quite nice this year! I'm pleased with your efforts. `;
    } else if (naughtyNiceResult.status === 'mixed') {
        message += `You've had some good moments and some not-so-good ones. But I believe in second chances! `;
    } else {
        message += `You've been a bit naughty, but everyone deserves a chance to improve. `;
    }

    // Personalize based on personality
    const personalityMessages = {
        'creative': "I can see you have a creative spirit! I've selected gifts that will help you express your imagination.",
        'adventurous': "Your adventurous nature reminds me of my travels around the world! These gifts will fuel your next adventure.",
        'thoughtful': "Your thoughtful nature warms my heart. I've chosen gifts that match your caring personality.",
        'active': "I love your energetic spirit! These gifts will keep you moving and having fun.",
        'curious': "Your curiosity is wonderful! I've picked gifts that will help you learn and explore.",
        'organized': "Your organized approach to life is admirable! These gifts will help you stay on track.",
        'social': "Your love for bringing people together is special! These gifts are perfect for sharing with others."
    };

    message += personalityMessages[personality] || "I've carefully selected these gifts just for you!";

    message += `\n\nBased on your interests in ${interests.slice(0, 2).join(' and ')}, I think you'll love these recommendations!\n\n`;
    message += `Keep being wonderful, and I'll see you on Christmas Eve! 🎄✨`;

    return message;
}

export default {
    getGiftRecommendations,
    calculateNaughtyNiceScore,
    giftDatabase
};
