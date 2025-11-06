import React, { useState, useEffect } from 'react';
import { useLocation } from '../contexts/LocationContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const { setLocation } = useLocation();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'tools', label: 'Tools' },
    { id: 'community', label: 'Community' },
    { id: 'support', label: 'Support' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSetLocation = () => {
    if (locationInput.trim()) {
      setLocation(locationInput.trim());
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary-green cursor-pointer" onClick={() => scrollToSection('home')}>
          🌾 AgriKind
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-dark-text hover:text-primary-green font-semibold transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center">
            <input 
              type="text" 
              placeholder="Enter Location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="px-2 py-1 text-sm border border-gray-300 rounded-l-md focus:ring-1 focus:ring-primary-green focus:outline-none"
            />
            <button onClick={handleSetLocation} className="bg-primary-green text-white px-3 py-1 text-sm font-semibold rounded-r-md hover:bg-secondary-green transition-colors">
              Set
            </button>
          </div>
        </div>
        <div className="lg:hidden">
          {/* Mobile menu button can be added here */}
        </div>
      </nav>
    </header>
  );
};

export default Header;