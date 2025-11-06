import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import { useLocation } from '../contexts/LocationContext';

const PRICES_BY_LOCATION: { [key: string]: { crop: string; icon: string; price: number }[] } = {
    default: [
        { crop: 'Wheat', icon: '🌾', price: 20500.50 },
        { crop: 'Corn', icon: '🌽', price: 14800.75 },
        { crop: 'Soybeans', icon: '🌱', price: 36100.20 },
        { crop: 'Rice', icon: '🍚', price: 25600.00 },
    ],
    mumbai: [
        { crop: 'Rice', icon: '🍚', price: 28000.00 },
        { crop: 'Mango', icon: '🥭', price: 60000.50 },
        { crop: 'Cotton', icon: '🟤', price: 55000.75 },
        { crop: 'Onion', icon: '🧅', price: 15000.00 },
    ],
    delhi: [
        { crop: 'Wheat', icon: '🌾', price: 21500.00 },
        { crop: 'Mustard', icon: '🌼', price: 45000.25 },
        { crop: 'Basmati Rice', icon: '🍚', price: 80000.00 },
        { crop: 'Potato', icon: '🥔', price: 12000.50 },
    ],
    punjab: [
        { crop: 'Wheat', icon: '🌾', price: 22000.50 },
        { crop: 'Rice', icon: '🍚', price: 26000.00 },
        { crop: 'Maize', icon: '🌽', price: 19000.75 },
        { crop: 'Sugarcane', icon: '🎋', price: 3500.00 },
    ],
};

const MarketPrices: React.FC = () => {
    const { location } = useLocation();
    const [prices, setPrices] = useState(PRICES_BY_LOCATION.default);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        let locationKey = 'default';
        const lowerCaseLocation = location.toLowerCase();

        for (const key in PRICES_BY_LOCATION) {
            if (lowerCaseLocation.includes(key)) {
                locationKey = key;
                break;
            }
        }
        setPrices(PRICES_BY_LOCATION[locationKey]);
    }, [location]);

    const refreshPrices = () => {
        setPrices(
            prices.map(item => ({
                ...item,
                price: parseFloat((item.price * (0.95 + Math.random() * 0.1)).toFixed(2)),
            }))
        );
        setShowToast(true);
    };

    return (
        <section className="py-20 px-4 bg-cream">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-2 text-primary-green">Daily Market Prices</h2>
                <p className="text-lg text-dark-text mb-8">
                    Showing prices for <span className="font-semibold">{location}</span> (per ton)
                </p>
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b-2 border-primary-green">
                                <th className="p-2">Crop</th>
                                <th className="p-2 text-right">Price (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices.map(item => (
                                <tr key={item.crop} className="border-b border-gray-200">
                                    <td className="p-2 font-semibold">{item.icon} {item.crop}</td>
                                    <td className="p-2 text-right">₹{item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={refreshPrices} className="mt-8 bg-primary-green hover:bg-secondary-green text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105">
                    Refresh Prices
                </button>
            </div>
            <Toast message="Prices updated successfully!" isVisible={showToast} onClose={() => setShowToast(false)} />
        </section>
    );
};

export default MarketPrices;