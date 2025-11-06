
import React, { useState } from 'react';

const stories = [
  {
    title: 'From Dust to Oasis',
    short: 'How a small community in Kenya used water conservation techniques to revive their arid land.',
    long: 'By implementing drip irrigation and rainwater harvesting systems introduced by AgriKind, the community not only secured their food supply but also started selling surplus produce to neighboring villages, boosting the local economy.'
  },
  {
    title: 'The Power of Heirloom Seeds',
    short: 'A group of farmers in Peru rediscovered and preserved native potato varieties, ensuring food security.',
    long: 'Through a seed-saving program facilitated by our network, these farmers are now guardians of biodiversity. Their heirloom potatoes are more resilient to climate change and fetch a premium price at local markets.'
  },
  {
    title: 'Tech for Sustainable Harvests',
    short: 'In Vietnam, young farmers are using mobile technology to monitor crop health and reduce pesticide use.',
    long: 'The AgriKind app provided them with real-time data on pest threats and soil conditions. This led to a 40% reduction in chemical inputs, resulting in healthier food and a cleaner environment.'
  }
];

const StoryCard: React.FC<{ story: typeof stories[0] }> = ({ story }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-primary-green mb-2">{story.title}</h3>
            <p className="text-dark-text mb-4">{story.short}</p>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-40' : 'max-h-0'}`}>
                <p className="text-dark-text pb-4">{story.long}</p>
            </div>
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-secondary-green font-semibold hover:text-primary-green">
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
        </div>
    );
};

const SuccessStories: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-secondary-green bg-opacity-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2 text-primary-green">Success Stories</h2>
        <p className="text-lg text-dark-text mb-12">Real-world impact of our collective efforts.</p>
        <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
                <StoryCard key={index} story={story} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
