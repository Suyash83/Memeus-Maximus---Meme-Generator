import { useState, useRef, useEffect } from 'react';
import { memeTemplates } from '../data/memeTemplates';
import MemeDisplay from './MemeDisplay';
import logo from '../assets/images/logo.png';
import themeMusic from '../assets/sounds/theme.mp3';
import FloatingCandles from './FloatingCandles';

const THEME_KEY = 'hp-meme-dark';
const MUSIC_KEY = 'hp-meme-music';

const defaultTexts = {
  1: { top: 'Happiness can be found…', bottom: '…even in the darkest of times.' },
  2: { top: 'When the teacher asks a question', bottom: 'And you know the answer' },
  3: { top: 'When you see the homework', bottom: "And it's due tomorrow" },
  4: { top: 'When everyone gets the joke', bottom: "But you don't" },
  5: { top: 'When someone says', bottom: 'Potions is easy' },
};

const MemeGenerator = () => {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dark, setDark] = useState(() => {
    return localStorage.getItem(THEME_KEY) === 'true';
  });
  const [musicOn, setMusicOn] = useState(() => {
    const stored = localStorage.getItem(MUSIC_KEY);
    return stored === null ? true : stored === 'true';
  });
  const themeAudioRef = useRef(null);
  const [generatedMeme, setGeneratedMeme] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Toggle dark mode
  const toggleDark = () => {
    setDark((d) => {
      localStorage.setItem(THEME_KEY, !d);
      return !d;
    });
  };

  // Toggle music
  const toggleMusic = () => {
    setMusicOn((on) => {
      localStorage.setItem(MUSIC_KEY, !on);
      return !on;
    });
  };

  // Apply dark mode to html
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Handle theme music play/pause
  useEffect(() => {
    const audio = themeAudioRef.current;
    if (!audio) return;
    audio.volume = 0.18;
    audio.loop = true;
    if (musicOn) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [musicOn]);

  // Autoplay on mount if musicOn
  useEffect(() => {
    if (musicOn && themeAudioRef.current) {
      themeAudioRef.current.play().catch(() => {});
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTemplate) return;
    if (selectedTemplate.id === 6 && !uploadedImage) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedMeme({
        image: selectedTemplate.id === 6 ? uploadedImage : selectedTemplate.image,
        topText,
        bottomText,
      });
    }, 500);
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'harry-potter-meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    if (template.id !== 6) setUploadedImage(null);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="parchment-bg max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl bg-white/90 dark:bg-gradient-to-br dark:from-[#1a1a2e] dark:to-[#2c003e] dark:shadow-purple-900/40 transition-colors duration-500 relative overflow-hidden">
      {/* Floating Candles */}
      <FloatingCandles />
      {/* Audio for theme music */}
      <audio ref={themeAudioRef} src={themeMusic} preload="auto" loop />
      {/* Header with logo and toggles */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 z-10 relative">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
          <img src={logo} alt="Harry Potter Meme Generator" className="h-20 w-20 object-contain drop-shadow-lg" />
          <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#740001] dark:text-yellow-300 drop-shadow-md tracking-wide text-center">
            Harry Potter Meme Generator
          </h1>
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={toggleDark}
            className="bg-[#d3a625] dark:bg-[#740001] text-[#740001] dark:text-yellow-300 px-4 py-2 rounded-lg font-bold shadow-md hover:scale-105 transition-transform duration-200 border-2 border-[#d3a625] dark:border-yellow-300"
            aria-label="Toggle dark mode"
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            onClick={toggleMusic}
            className="bg-[#2a623d] dark:bg-yellow-300 text-white dark:text-[#2a623d] px-4 py-2 rounded-lg font-bold shadow-md hover:scale-105 transition-transform duration-200 border-2 border-[#2a623d] dark:border-yellow-300"
            aria-label="Toggle music"
          >
            {musicOn ? '🔊 Music On' : '🔇 Music Off'}
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-2">
          <label htmlFor="topText" className="block text-lg font-semibold text-[#2a623d]">
            Top Text:
          </label>
          <input
            type="text"
            id="topText"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="Enter top text..."
            className="w-full px-4 py-3 border-2 border-[#d3a625] rounded-lg focus:outline-none focus:border-[#740001] transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="bottomText" className="block text-lg font-semibold text-[#2a623d]">
            Bottom Text:
          </label>
          <input
            type="text"
            id="bottomText"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="Enter bottom text..."
            className="w-full px-4 py-3 border-2 border-[#d3a625] rounded-lg focus:outline-none focus:border-[#740001] transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-lg font-semibold text-[#2a623d]">
            Choose a Template:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {memeTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => {
                  setSelectedTemplate(template);
                  if (template.id !== 6) setUploadedImage(null);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTemplate?.id === template.id
                    ? 'border-[#740001] bg-[#740001]/10'
                    : 'border-[#d3a625] hover:border-[#740001]'
                }`}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="text-sm font-semibold text-[#2a623d]">{template.name}</p>
              </button>
            ))}
            {selectedTemplate?.id === 6 && (
              <div className="mt-4 flex flex-col items-center">
                <input type="file" accept="image/*" onChange={handleUpload} />
                {uploadedImage && (
                  <img src={uploadedImage} alt="Uploaded preview" className="mt-2 h-32 rounded shadow" />
                )}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#740001] text-white py-4 px-8 rounded-lg text-lg font-cinzel hover:bg-[#8b0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedTemplate || isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Meme'}
        </button>
      </form>
      <div className="mt-8 text-center">
        {generatedMeme && (
          <>
            <MemeDisplay
              image={generatedMeme.image}
              topText={generatedMeme.topText}
              bottomText={generatedMeme.bottomText}
              templateId={selectedTemplate?.id}
            />
            <button
              type="button"
              onClick={handleDownload}
              className="mt-6 bg-[#2a623d] dark:bg-yellow-300 text-white dark:text-[#2a623d] py-4 px-8 rounded-lg text-lg font-cinzel hover:bg-[#1a4a2d] dark:hover:bg-yellow-400 transition-colors shadow-md"
            >
              Download Meme
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MemeGenerator; 