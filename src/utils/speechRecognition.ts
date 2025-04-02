
const startSpeechRecognition = (onResult: (text: string) => void, onEnd: () => void) => {
  // Check if browser supports speech recognition
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.error('Speech recognition not supported in this browser');
    onEnd();
    return null;
  }

  // Initialize speech recognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Configure the recognition
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US'; // Default to English, could be made dynamic

  // Event handlers
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    onEnd();
  };

  recognition.onend = () => {
    onEnd();
  };

  // Start recognition
  recognition.start();
  
  return recognition;
};

export { startSpeechRecognition };
