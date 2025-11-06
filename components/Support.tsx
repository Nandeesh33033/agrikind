import React, { useState } from 'react';
import Modal from './Modal';

const Support: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', amount: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.amount) {
      alert(`Thank you, ${formState.name}! Your generous donation of ₹${formState.amount} is deeply appreciated.`);
      setIsModalOpen(false);
      setFormState({ name: '', email: '', amount: '', message: '' });
    } else {
      alert('Please fill in all required fields (Name, Email, Amount).');
    }
  };

  const handleVolunteerClick = () => {
    alert('Thank you for your kindness! We will be in touch soon with volunteer opportunities.');
  };

  return (
    <>
      <section id="support" className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-2 text-primary-green">Support Our Mission</h2>
          <p className="text-lg text-dark-text mb-8">
            Your kindness helps us provide essential tools, training, and support to farmers worldwide. Every contribution, big or small, makes a tangible difference in creating a more sustainable and equitable future for agriculture.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-green hover:bg-secondary-green text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105"
            >
              Donate Now
            </button>
            <button
              onClick={handleVolunteerClick}
              className="bg-cream hover:bg-amber-100 text-dark-text font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105"
            >
              Volunteer
            </button>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold text-primary-green mb-4">Make a Donation</h2>
        <form onSubmit={handleDonateSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Your Name*" value={formState.name} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="email" name="email" placeholder="Your Email*" value={formState.email} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="number" name="amount" placeholder="Amount (INR)*" value={formState.amount} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <textarea name="message" placeholder="Message (Optional)" value={formState.message} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" rows={3}></textarea>
          <button type="submit" className="bg-primary-green text-white font-bold py-2 px-6 rounded-full w-full hover:bg-secondary-green transition-colors">
            Confirm Donation
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Support;