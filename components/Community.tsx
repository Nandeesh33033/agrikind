
import React, { useState, useEffect } from 'react';
import HeartIcon from './icons/HeartIcon';

const initialStories = [
  { id: 'story1', name: 'Maria Santos', location: 'Philippines', story: 'AgriKind helped me connect with other organic farmers. Sharing knowledge has doubled my yield!', image: 'https://picsum.photos/seed/maria/400/400' },
  { id: 'story2', name: 'Kwame Addo', location: 'Ghana', story: 'The soil health tips transformed my land. I now grow healthier crops and use less water.', image: 'https://picsum.photos/seed/kwame/400/400' },
  { id: 'story3', name: 'Priya Patel', location: 'India', story: 'With the community\'s support, I started a small cooperative. We are stronger together!', image: 'https://picsum.photos/seed/priya/400/400' },
];

const FarmerStoryCard: React.FC<{ story: typeof initialStories[0] }> = ({ story }) => {
    const [likes, setLikes] = useState(() => {
        const savedLikes = localStorage.getItem(`likes_${story.id}`);
        return savedLikes ? parseInt(savedLikes, 10) : 0;
    });

    const handleLike = () => {
        const newLikes = likes + 1;
        setLikes(newLikes);
        localStorage.setItem(`likes_${story.id}`, newLikes.toString());
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-6 flex flex-col items-center">
            <img src={story.image} alt={story.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-secondary-green"/>
            <h3 className="text-xl font-bold text-primary-green">{story.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{story.location}</p>
            <p className="text-dark-text mb-4 flex-grow">{`"${story.story}"`}</p>
            <button onClick={handleLike} className="flex items-center space-x-2 bg-cream px-4 py-2 rounded-full hover:bg-amber-100 transition-colors">
                <HeartIcon />
                <span>{likes}</span>
            </button>
        </div>
    );
};

const Community: React.FC = () => {
  return (
    <section id="community" className="py-20 px-4 bg-cream">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2 text-primary-green">Farmer Voices</h2>
        <p className="text-lg text-dark-text mb-12">Stories of growth, resilience, and kindness from our community.</p>
        <div className="grid md:grid-cols-3 gap-8">
            {initialStories.map(story => (
                <FarmerStoryCard key={story.id} story={story} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
