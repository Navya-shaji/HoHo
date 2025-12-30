import React from 'react';
import { Star, Gift } from 'lucide-react';
import './BigChristmasTree.css';

const BigChristmasTree = () => {
    return (
        <div className="tree-container">
            <div className="star">
                <Star size={48} fill="#FFD700" color="#FFD700" />
            </div>
            <div className="tree-layer top-layer"></div>
            <div className="tree-layer middle-layer"></div>
            <div className="tree-layer bottom-layer"></div>
            <div className="trunk"></div>
            <div className="ornament o1"></div>
            <div className="ornament o2"></div>
            <div className="ornament o3"></div>
            <div className="ornament o4"></div>
            <div className="ornament o5"></div>
            <div className="ornament o6"></div>
            <div className="gift-box g1">
                <Gift size={32} color="#ff6b6b" fill="#ff6b6b" />
            </div>
            <div className="gift-box g2">
                <Gift size={32} color="#ffd700" fill="#ffd700" />
            </div>
            <div className="gift-box g3">
                <Gift size={40} color="#4ecdc4" fill="#4ecdc4" />
            </div>
        </div>
    );
};

export default BigChristmasTree;
