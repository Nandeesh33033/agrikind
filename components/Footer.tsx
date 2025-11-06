
import React from 'react';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import YouTubeIcon from './icons/YouTubeIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-green text-cream py-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-cream hover:text-white transition-colors duration-200 transform hover:scale-110"><FacebookIcon /></a>
          <a href="#" className="text-cream hover:text-white transition-colors duration-200 transform hover:scale-110"><InstagramIcon /></a>
          <a href="#" className="text-cream hover:text-white transition-colors duration-200 transform hover:scale-110"><YouTubeIcon /></a>
        </div>
        <p>&copy; 2025 AgriKind | Made with ❤ for Farmers.</p>
      </div>
    </footer>
  );
};

export default Footer;
