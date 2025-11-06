import React, { useState } from 'react';
import Modal from './Modal';
import AudioPlayer from './AudioPlayer';
import { useLocation } from '../contexts/LocationContext';


interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

const WEATHER_BY_LOCATION: { [key: string]: WeatherData[] } = {
    default: [
        { main: { temp: 25, humidity: 65 }, weather: [{ description: 'clear sky', icon: '01d' }], wind: { speed: 10.5 } },
        { main: { temp: 18, humidity: 80 }, weather: [{ description: 'light rain', icon: '10d' }], wind: { speed: 15.2 } },
    ],
    mumbai: [
        { main: { temp: 32, humidity: 85 }, weather: [{ description: 'haze', icon: '50d' }], wind: { speed: 12.0 } },
        { main: { temp: 28, humidity: 90 }, weather: [{ description: 'heavy rain', icon: '10d' }], wind: { speed: 20.5 } },
    ],
    delhi: [
        { main: { temp: 38, humidity: 40 }, weather: [{ description: 'sunny', icon: '01d' }], wind: { speed: 8.0 } },
        { main: { temp: 25, humidity: 60 }, weather: [{ description: 'smoke', icon: '50d' }], wind: { speed: 5.0 } },
    ],
    punjab: [
        { main: { temp: 35, humidity: 50 }, weather: [{ description: 'clear sky', icon: '01d' }], wind: { speed: 7.5 } },
        { main: { temp: 15, humidity: 80 }, weather: [{ description: 'fog', icon: '50d' }], wind: { speed: 3.0 } },
    ]
};

const SOIL_TIPS_BY_TYPE = {
  Clay: [
    "Aerate clay soil regularly to improve drainage and root growth.",
    "Add organic matter like compost or aged manure to lighten heavy clay soil.",
    "Use raised beds for planting to prevent waterlogging in clay soils.",
  ],
  Sandy: [
    "Incorporate rich organic matter to improve water and nutrient retention in sandy soil.",
    "Apply mulch on the surface to reduce water evaporation and keep the soil cool.",
    "Water sandy soil more frequently but with less volume each time.",
  ],
  Loamy: [
    "Loamy soil is ideal; maintain its health with regular additions of compost.",
    "Avoid excessive tilling to protect the excellent structure of loamy soil.",
    "Practice crop rotation to keep your loamy soil balanced and nutrient-rich.",
  ],
  Silty: [
      "Silty soil is fertile but can compact easily; minimize foot traffic on garden beds.",
      "Add compost to improve structure and prevent the soil from becoming dense.",
      "Ensure good drainage as silty soil can retain a lot of water."
  ],
  Peaty: [
      "Peaty soil is acidic; you may need to add lime to raise the pH for certain crops.",
      "Improve drainage by mixing in compost and coarse sand, as peaty soil can be boggy.",
      "It's rich in organic matter but may be low in other key nutrients, so test and amend accordingly."
  ]
};

type SoilType = keyof typeof SOIL_TIPS_BY_TYPE;

const WeatherCard: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const { location } = useLocation();

    const getWeatherUpdate = () => {
        window.speechSynthesis.cancel();
        
        let locationKey = 'default';
        const lowerCaseLocation = location.toLowerCase();
        for (const key in WEATHER_BY_LOCATION) {
            if (lowerCaseLocation.includes(key)) {
                locationKey = key;
                break;
            }
        }
        
        const weatherOptions = WEATHER_BY_LOCATION[locationKey];
        const randomIndex = Math.floor(Math.random() * weatherOptions.length);
        setWeather(weatherOptions[randomIndex]);
    };

    const weatherText = weather 
        ? `The weather in ${location} is ${weather.weather[0].description}, with a temperature of ${Math.round(weather.main.temp)} degrees Celsius. Humidity is at ${weather.main.humidity} percent, and wind speed is ${weather.wind.speed.toFixed(1)} kilometers per hour.`
        : '';

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-primary-green mb-1">Weather Updates</h3>
                        <p className="text-sm text-gray-600 font-semibold">{location}</p>
                    </div>
                    {weather && <AudioPlayer textToSpeak={weatherText} />}
                </div>
                
                {!weather ? (
                    <p className="mt-4">Click the button to get a weather update for your selected location.</p>
                ) : (
                    <div className="mt-4">
                        <div className="flex items-center mb-4">
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" className="w-16 h-16"/>
                            <div>
                                <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
                                <p className="capitalize">{weather.weather[0].description}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                            <p><strong>Wind Speed:</strong> {weather.wind.speed.toFixed(1)} km/h</p>
                        </div>
                    </div>
                )}
            </div>
             <button onClick={getWeatherUpdate} className="bg-secondary-green text-white font-bold py-2 px-4 rounded-full w-full hover:bg-primary-green transition-colors mt-4">
                Get Info
            </button>
        </div>
    );
};

const SoilHealthCard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTip, setCurrentTip] = useState('');
    const [selectedSoilType, setSelectedSoilType] = useState<SoilType>('Clay');

    const showRandomTip = (soilType: SoilType) => {
        const tips = SOIL_TIPS_BY_TYPE[soilType];
        const randomIndex = Math.floor(Math.random() * tips.length);
        setCurrentTip(tips[randomIndex]);
    };
    
    const openModal = (soilType: SoilType) => {
        setSelectedSoilType(soilType);
        showRandomTip(soilType);
        setIsModalOpen(true);
    };
    
    const handleNextTip = () => {
        showRandomTip(selectedSoilType);
    };

    const handleCloseModal = () => {
        // Stop any currently playing audio when closing the modal
        window.speechSynthesis.cancel();
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
                <h3 className="text-xl font-bold text-primary-green mb-4">Soil Health Tips</h3>
                <p className="mb-4 flex-grow">Select your soil type to get targeted advice for improving its vitality and productivity.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                   {(Object.keys(SOIL_TIPS_BY_TYPE) as SoilType[]).map((type) => (
                       <button 
                           key={type}
                           onClick={() => openModal(type)} 
                           className="bg-secondary-green text-white text-sm font-bold py-2 px-3 rounded-full hover:bg-primary-green transition-colors"
                       >
                           {type}
                       </button>
                   ))}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-2xl font-bold text-primary-green mb-2">{selectedSoilType} Soil Tip</h2>
                <div className="flex items-start gap-4 mb-6">
                    <p className="text-lg text-dark-text flex-grow">{`"${currentTip}"`}</p>
                    {currentTip && <AudioPlayer textToSpeak={currentTip} />}
                </div>
                <button onClick={handleNextTip} className="bg-primary-green text-white font-bold py-2 px-6 rounded-full hover:bg-secondary-green transition-colors">
                    Next Tip
                </button>
            </Modal>
        </>
    );
};

interface AnalysisResult {
    disease: string;
    confidence: number;
    recommendation: string;
}

const MOCK_DISEASES: AnalysisResult[] = [
    { disease: 'Powdery Mildew', confidence: 95, recommendation: 'Increase air circulation and apply a fungicide. Remove infected leaves immediately.' },
    { disease: 'Iron Deficiency', confidence: 88, recommendation: 'The yellowing leaves suggest chlorosis. Apply a chelated iron supplement to the soil.' },
    { disease: 'Healthy Leaf', confidence: 98, recommendation: 'No significant disease detected. Continue standard care and monitoring.' },
    { disease: 'Bacterial Blight', confidence: 92, recommendation: 'Water-soaked spots are a key indicator. Avoid overhead watering and apply a copper-based bactericide.' },
];

const DiseaseDetectionCard: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            setResult(null);
            window.speechSynthesis.cancel(); // Stop audio from previous result
        }
    };

    const handleAnalyze = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const randomResult = MOCK_DISEASES[Math.floor(Math.random() * MOCK_DISEASES.length)];
            setResult(randomResult);
            setIsLoading(false);
        }, 2000);
    };

    const handleReset = () => {
        setImagePreview(null);
        setResult(null);
        window.speechSynthesis.cancel(); // Stop audio
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
            <h3 className="text-xl font-bold text-primary-green mb-4">Plant Disease Detection</h3>
            {!imagePreview && (
                <>
                    <p className="mb-4 flex-grow">Upload an image of a plant leaf to get an AI-powered disease diagnosis.</p>
                    <label className="w-full text-center bg-secondary-green text-white font-bold py-2 px-4 rounded-full hover:bg-primary-green transition-colors cursor-pointer">
                        Upload Leaf Image
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                </>
            )}

            {imagePreview && (
                <div className="flex flex-col flex-grow">
                    <div className="mb-4 flex-grow">
                        <img src={imagePreview} alt="Leaf preview" className="rounded-md max-h-40 w-full object-cover" />
                    </div>

                    {isLoading ? (
                        <div className="text-center p-4 bg-cream rounded-md">
                            <p className="font-semibold text-dark-text italic">Analyzing... Please wait.</p>
                        </div>
                    ) : result ? (
                        <div className="bg-cream p-4 rounded-md">
                            <div className="flex justify-between items-start gap-3">
                                <div className="flex-grow">
                                    <p><strong>Diagnosis:</strong> {result.disease} ({result.confidence}%)</p>
                                    <p className="mt-1"><strong>Recommendation:</strong> {result.recommendation}</p>
                                </div>
                                <AudioPlayer textToSpeak={`Diagnosis: ${result.disease} with ${result.confidence} percent confidence. Recommendation: ${result.recommendation}`} />
                            </div>
                        </div>
                    ) : (
                        <button onClick={handleAnalyze} className="bg-primary-green text-white font-bold py-2 px-4 rounded-full w-full hover:bg-secondary-green transition-colors">
                            Analyze
                        </button>
                    )}
                     <button onClick={handleReset} className="text-sm text-center text-gray-500 hover:text-dark-text mt-3">
                        Upload another image
                    </button>
                </div>
            )}
        </div>
    );
};

const Tools: React.FC = () => {
  return (
    <section id="tools" className="py-20 px-4 bg-secondary-green bg-opacity-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2 text-primary-green">Smart Farming Tools</h2>
        <p className="text-lg text-dark-text mb-12">Leverage technology and wisdom for a better harvest.</p>
        <div className="grid md:grid-cols-3 gap-8">
            <WeatherCard />
            <SoilHealthCard />
            <DiseaseDetectionCard />
        </div>
      </div>
    </section>
  );
};

export default Tools;