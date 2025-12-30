import { Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import WelcomeModal from './components/common/WelcomeModal';
import Landing from './pages/Landing';
import Tracker from './pages/Tracker';
import GiftFinder from './pages/GiftFinder';
import MiniGames from './pages/MiniGames';
import './App.css';

function AppContent() {
  const { showWelcome, registerUser } = useUser();

  return (
    <>
      {showWelcome && <WelcomeModal onSubmit={registerUser} />}
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/gift-finder" element={<GiftFinder />} />
            <Route path="/games" element={<MiniGames />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
