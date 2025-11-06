
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      alert('Thank you for your message! We will get back to you soon.');
      setFormState({ name: '', email: '', message: '' });
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-2 text-primary-green">Get in Touch</h2>
        <p className="text-lg text-dark-text mb-8">
          Have questions, suggestions, or want to collaborate? We'd love to hear from you.
        </p>
        <form onSubmit={handleSubmit} className="bg-cream p-8 rounded-lg shadow-md text-left space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
            <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input type="email" id="email" name="email" value={formState.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold mb-1">Message</label>
            <textarea id="message" name="message" value={formState.message} onChange={handleInputChange} rows={5} className="w-full p-2 border border-gray-300 rounded" required></textarea>
          </div>
          <button type="submit" className="w-full bg-primary-green hover:bg-secondary-green text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
