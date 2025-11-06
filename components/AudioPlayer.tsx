import React, { useState, useEffect } from 'react';
import SpeakerIcon from './icons/SpeakerIcon';
import StopIcon from './icons/StopIcon';

interface AudioPlayerProps {
  textToSpeak: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ textToSpeak }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Effect to cancel speech synthesis on component unmount or when text changes
  useEffect(() => {
    // This function is returned and will be called on cleanup
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [textToSpeak]); // Rerun effect if textToSpeak changes

  const handleToggleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent clicks (e.g., closing a modal)
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // Ensure any previously playing speech is stopped before starting a new one
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Callbacks to sync state with the speech synthesis engine
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={handleToggleSpeech}
      className="p-2 rounded-full bg-cream hover:bg-amber-100 text-primary-green transition-colors flex-shrink-0"
      aria-label={isSpeaking ? 'Stop audio' : 'Play audio for this tip'}
    >
      {isSpeaking ? <StopIcon /> : <SpeakerIcon />}
    </button>
  );
};

export default AudioPlayer;
