import React, { useState, useEffect } from 'react';
import { Play, Heart, Clock, Star, Share2, Headphones } from 'lucide-react';

function YouMightLike() {
  // Mock podcast data - in real app, this could come from props or API
  const [podcasts] = useState([
    {
      id: 1,
      title: "Tech Talks Daily",
      author: "Neil Thompson",
      episodes: 245,
      duration: 45,
      rating: 4.8,
      category: "Technology",
    },
    {
      id: 2,
      title: "Business Insights",
      author: "Sarah Chen",
      episodes: 189,
      duration: 30,
      rating: 4.6,
      category: "Business",
    },
    {
      id: 3,
      title: "Mind Matters",
      author: "Dr. Emily Brooks",
      episodes: 156,
      duration: 50,
      rating: 4.9,
      category: "Psychology",
    },
    {
      id: 4,
      title: "Startup Stories",
      author: "Alex Rivera",
      episodes: 120,
      duration: 40,
      rating: 4.7,
      category: "Business",
    },
    {
      id: 5,
      title: "AI Revolution",
      author: "Mark Zhang",
      episodes: 89,
      duration: 35,
      rating: 4.8,
      category: "Technology",
    },
    {
      id: 6,
      title: "Behavioral Science",
      author: "Dr. Lisa Carter",
      episodes: 167,
      duration: 45,
      rating: 4.5,
      category: "Psychology",
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('New podcasts');
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);
  const [likedPodcasts, setLikedPodcasts] = useState(new Set());

  const categories = [
    { name: 'New podcasts', color: 'bg-blue-600' },
    { name: 'Business', color: 'bg-gray-700' },
    { name: 'Technology', color: 'bg-gray-700' },
    { name: 'Psychology', color: 'bg-gray-700' }
  ];

  useEffect(() => {
    // Filter podcasts based on selected category
    const filtered = podcasts.filter(podcast => 
      selectedCategory === 'New podcasts' ? true : podcast.category === selectedCategory
    );
    setFilteredPodcasts(filtered);
  }, [selectedCategory, podcasts]);

  const toggleLike = (podcastId) => {
    setLikedPodcasts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(podcastId)) {
        newLiked.delete(podcastId);
      } else {
        newLiked.add(podcastId);
      }
      return newLiked;
    });
  };

  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m`;
  };

  const PodcastCard = ({ podcast }) => (
    <div className="bg-gray-700 rounded-lg p-4 transition-all duration-300 hover:transform hover:scale-[1.02] group">
      <div className="relative mb-3">
        <img
          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkmdL8nHtF4oA_HXPM4JtaWOnZTlLxi7ie5w&s`}
          alt={podcast.title}
          className="w-full h-32 object-cover rounded-lg"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white" fill="white" />
        </button>
      </div>

      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold line-clamp-1">{podcast.title}</h4>
          <p className="text-sm text-gray-400">By: {podcast.author}</p>
        </div>
        <button 
          onClick={() => toggleLike(podcast.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${likedPodcasts.has(podcast.id) ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
        <div className="flex items-center gap-1">
          <Headphones className="w-4 h-4" />
          <span>{podcast.episodes} eps</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{formatDuration(podcast.duration)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span>{podcast.rating}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs px-2 py-1 bg-gray-600 rounded-full">
          {podcast.category}
        </span>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">You Might Like</h2>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 ${
              selectedCategory === category.name ? 'bg-blue-600' : category.color
            } text-white rounded transition-colors hover:bg-opacity-90`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Podcasts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </section>
  );
}

export default YouMightLike;