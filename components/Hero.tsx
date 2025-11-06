
import React from 'react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
          Empowering Farmers, <br /> Nurturing the Future.
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
          Your partner in sustainable agriculture. We provide the tools, knowledge, and community support for a bountiful harvest.
        </p>
        <button
          onClick={() => scrollToSection('tools')}
          className="bg-primary-green hover:bg-secondary-green text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 transform hover:scale-105"
        >
          Explore Our Tools
        </button>
      </div>
    </section>
  );
};

export default Hero;
