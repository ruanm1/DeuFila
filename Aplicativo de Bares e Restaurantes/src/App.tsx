import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import MapScreen from './components/MapScreen';
import ProfileScreen from './components/ProfileScreen';
import VenueDetailScreen from './components/VenueDetailScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'map' | 'profile'>('home');
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  if (selectedVenueId !== null) {
    return (
      <>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <VenueDetailScreen
            venueId={selectedVenueId}
            isPremium={isPremium}
            isDarkMode={isDarkMode}
            onBack={() => setSelectedVenueId(null)}
          />
        </motion.div>
        <Toaster position="top-center" richColors closeButton />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 w-full transition-colors">
        <div className="max-w-md mx-auto min-h-screen flex flex-col w-full">
          <div className="flex-1 overflow-auto pb-20">
            <AnimatePresence mode="wait">
              {currentScreen === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <HomeScreen 
                    isPremium={isPremium} 
                    onSelectVenue={setSelectedVenueId}
                    isDarkMode={isDarkMode}
                    onToggleTheme={toggleTheme}
                  />
                </motion.div>
              )}
              {currentScreen === 'map' && (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapScreen 
                    onSelectVenue={setSelectedVenueId} 
                    isPremium={isPremium}
                    isDarkMode={isDarkMode}
                    onToggleTheme={toggleTheme}
                  />
                </motion.div>
              )}
              {currentScreen === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProfileScreen 
                    isPremium={isPremium} 
                    onUpgrade={() => setIsPremium(true)}
                    isDarkMode={isDarkMode}
                    onToggleTheme={toggleTheme}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} isDarkMode={isDarkMode} />
        </div>
      </div>
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}