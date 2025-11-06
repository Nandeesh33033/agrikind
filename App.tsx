import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Tools from './components/Tools';
import Community from './components/Community';
import Support from './components/Support';
import SuccessStories from './components/SuccessStories';
import MarketPrices from './components/MarketPrices';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LocationProvider } from './contexts/LocationContext';
import FloatingBottle from './components/FloatingBottle';

const App: React.FC = () => {
  return (
    <LocationProvider>
      <div className="bg-cream font-sans text-dark-text">
        <Header />
        <main>
          <Hero />
          <Tools />
          <Community />
          <Support />
          <SuccessStories />
          <MarketPrices />
          <Contact />
        </main>
        <FloatingBottle />
        <Footer />
      </div>
    </LocationProvider>
  );
};

export default App;