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
  recognition.continuous = true;  // Allow for longer recordings
  recognition.interimResults = true;
  
  // Try to detect language from the user's preferences
  const storedLanguage = localStorage.getItem("preferredLanguage");
  let langCode = 'en-US'; // Default to English
  
  // Map our app languages to speech recognition language codes
  switch (storedLanguage) {
    case 'hindi':
      langCode = 'hi-IN';
      break;
    case 'tamil':
      langCode = 'ta-IN';
      break;
    case 'telugu':
      langCode = 'te-IN';
      break;
    case 'bengali':
      langCode = 'bn-IN';
      break;
    case 'marathi':
      langCode = 'mr-IN';
      break;
    case 'gujarati':
      langCode = 'gu-IN';
      break;
    case 'punjabi':
      langCode = 'pa-IN';
      break;
    default:
      langCode = 'en-US';
  }
  
  recognition.lang = langCode;

  // Keep track of the final transcript
  let finalTranscript = '';

  // Event handlers
  recognition.onresult = (event) => {
    let interimTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    
    // Call the callback with the combined transcript
    onResult(finalTranscript + interimTranscript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    
    // Special handling for common errors
    if (event.error === 'no-speech') {
      console.log('No speech detected');
    } else if (event.error === 'aborted') {
      console.log('Speech recognition aborted');
    } else if (event.error === 'network') {
      console.log('Network error occurred during speech recognition');
    } else if (event.error === 'not-allowed') {
      console.log('Speech recognition permission was denied');
    }
    
    onEnd();
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
    onEnd();
  };

  // Start recognition
  try {
    recognition.start();
    console.log('Speech recognition started');
  } catch (error) {
    console.error('Error starting speech recognition:', error);
    onEnd();
    return null;
  }
  
  return recognition;
};

export { startSpeechRecognition };
