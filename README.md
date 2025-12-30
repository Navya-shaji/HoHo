# 🎅 HOHO - Experience the Magic of Christmas

Welcome to **HOHO**, the ultimate Christmas companion web application! This app is designed to bring holiday joy to users of all ages with real-time Santa tracking, festive mini-games, and personalized gift recommendations.

## ✨ Features

### 🌍 Santa Tracker & Journey Log
- **Live Map:** Track Santa's sleigh as he visits countries around the world.
- **Santa's Travel Log:** A personal diary style log where you can read unique stories about Christmas traditions in every city Santa visits, signed by Santa himself!
- **Real-time Stats:** Monitor gifts delivered, distance traveled, and upcoming stops.

### 🎮 Mini Games ("Santa's Workshop")
- **Gift Catcher:** A fun game to catch falling presents.
- **Memory Match:** Test your memory with festive holiday cards.
- **Naughty or Nice Quiz:** Find out which list you made it to this year!

### 🎁 Gift Finder
- **Smart Recommendations:** Get curated gift ideas based on age, interests, and budget.
- **Wishlist:** (Coming soon) Save your favorite gift ideas to send to Santa.

### 🎨 Premium Design
- **Festive UI:** A beautiful, responsive interface featuring snowy landscapes, smooth animations, and a cohesive "Santa Red & Gold" color palette.
- **Real Imagery:** High-quality holiday photography used throughout for an immersive experience.

---

## 🛠️ Technology Stack

- **Frontend:** React.js (Vite)
- **Styling:** Vanilla CSS with responsive design and CSS animations.
- **Routing:** React Router DOM.
- **State Management:** React Hooks (`useState`, `useEffect`).
- **Icons:** Lucide React.
- **Fonts:** Poppins & Roboto (via Google Fonts) and Handlee (for Santa's handwriting).
- **Backend/Services:** Firebase (for authentication and data persistence).

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository** (if applicable) or download the source code.
2. **Navigate to the project directory:**
   ```bash
   cd App-For-Santa
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```
The app will typically be available at `http://localhost:5173`.

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── game/         # Components for Mini Games
│   └── tracker/      # Components for the Tracker (Map, Stats, StoryPanel)
├── data/            # JSON data files (stories, route coordinates)
├── pages/           # Main page views (Landing, Tracker, MiniGames)
├── services/        # Firebase and other service configurations
├── utils/           # Helper functions (Santa movement logic)
└── App.jsx          # Main application component
```

## 🎅 Credits & Assets

- **Images:** High-quality visuals provided by Unsplash.
- **Icons:** Lucide React icon library.
- **Fonts:** Google Fonts.

---

**Merry Christmas and Happy Coding!** 🎄✨
