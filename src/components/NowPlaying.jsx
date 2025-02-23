import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

function NowPlaying() {
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Psychological approaches to stress management',
    author: 'Liam Martin',
    progress: 42, // Start progress at 42%
  });
  const [isPlaying, setIsPlaying] = useState(true);

  // Update track progress every 3 seconds only if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTrack((prev) => {
        let newProgress = prev.progress + 1;
        if (newProgress > 100) newProgress = 100;
        return { ...prev, progress: newProgress };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSkipBack = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      progress: Math.max(prev.progress - 10, 0),
    }));
  };

  const handleSkipForward = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      progress: Math.min(prev.progress + 10, 100),
    }));
  };

  return (
    <section className="bg-gray-800 rounded-lg p-4 flex-1">
      <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
      <div className="bg-gray-700 p-4 rounded">
        <h4 className="font-semibold">{currentTrack.title}</h4>
        <p className="text-sm text-gray-400">{currentTrack.author}</p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-600 rounded mt-4">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${currentTrack.progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button onClick={handleSkipBack} aria-label="Skip Back">
            <SkipBack className="w-6 h-6 text-white hover:text-blue-400" />
          </button>
          <button onClick={togglePlay} aria-label="Play/Pause">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white hover:text-blue-400" />
            ) : (
              <Play className="w-8 h-8 text-white hover:text-blue-400" />
            )}
          </button>
          <button onClick={handleSkipForward} aria-label="Skip Forward">
            <SkipForward className="w-6 h-6 text-white hover:text-blue-400" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default NowPlaying;
