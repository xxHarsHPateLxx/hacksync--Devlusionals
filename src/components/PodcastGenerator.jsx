import React from "react";
import { Play } from "lucide-react"; // Import Play icon

const PodcastGenerator = ({ topic, setTopic, tone, setTone, podcastLength, setPodcastLength }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          What would you like to hear about?
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The history of space exploration, Latest tech trends..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="casual">Casual & Friendly</option>
            <option value="professional">Professional</option>
            <option value="educational">Educational</option>
            <option value="entertaining">Entertaining</option>
            <option value="news">News Style</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Length: {podcastLength} minutes
          </label>
          <input
            type="range"
            min="5"
            max="60"
            value={podcastLength}
            onChange={(e) => setPodcastLength(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
        Generate Podcast <Play className="ml-2 h-5 w-5" />
      </button>
    </div>
  );
};

export default PodcastGenerator;
