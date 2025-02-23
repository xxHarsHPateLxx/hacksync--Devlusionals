import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, Clock, X } from 'lucide-react';

function QuickSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['Tech Talk', 'True Crime', 'Daily News']);
  const [trendingSearches] = useState(['Business Weekly', 'Science Hour', 'Health & Wellness']);
  const searchRef = useRef(null);

  // Popular categories for quick access
  const popularCategories = [
    { name: 'Technology', color: 'bg-blue-500' },
    { name: 'Business', color: 'bg-green-500' },
    { name: 'Health', color: 'bg-purple-500' },
    { name: 'News', color: 'bg-red-500' },
    { name: 'Education', color: 'bg-yellow-500' },
    { name: 'Travel', color: 'bg-pink-500' },
    { name: 'Sports', color: 'bg-indigo-500' },
    { name: 'Entertainment', color: 'bg-orange-500' },
    { name: 'Science', color: 'bg-cyan-500' },
    { name: 'Finance', color: 'bg-emerald-500' },
    { name: 'History', color: 'bg-slate-500' },
    { name: 'Music', color: 'bg-lime-500' },
    { name: 'Arts', color: 'bg-rose-500' },
    { name: 'Lifestyle', color: 'bg-teal-500' },
    { name: 'Culture', color: 'bg-yellow-600' },
    { name: 'Comedy', color: 'bg-violet-500' },
    { name: 'Food', color: 'bg-amber-500' }
  ];
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term) => {
    if (term.trim()) {
      setSearchTerm(term);
      setRecentSearches(prev => {
        const updated = [term, ...prev.filter(item => item !== term)].slice(0, 3);
        return updated;
      });
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const removeFromHistory = (term) => {
    setRecentSearches(prev => prev.filter(item => item !== term));
  };

  return (
    <section className="bg-gray-800 rounded-lg p-4 w-full lg:w-80">
      <h2 className="text-xl font-semibold mb-4">Quick Search</h2>
      
      {/* Search Input with Icon */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search podcasts..."
            className="w-full p-2 pl-9 pr-8 rounded bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute w-full mt-2 bg-gray-900 rounded-lg shadow-lg z-10 border border-gray-700">
            {/* Trending Searches */}
            <div className="p-3 border-b border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <TrendingUp size={16} />
                <span>Trending</span>
              </div>
              {trendingSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(term)}
                  className="block w-full text-left px-2 py-1.5 text-gray-300 hover:bg-gray-800 rounded"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-3">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Clock size={16} />
                  <span>Recent Searches</span>
                </div>
                {recentSearches.map((term, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group px-2 py-1.5 hover:bg-gray-800 rounded"
                  >
                    <button
                      onClick={() => handleSearch(term)}
                      className="text-gray-300"
                    >
                      {term}
                    </button>
                    <button
                      onClick={() => removeFromHistory(term)}
                      className="text-gray-500 hover:text-gray-400 opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popular Categories */}
      <div className="mt-4">
        <h3 className="text-sm text-gray-400 mb-2">Popular Categories</h3>
        <div className="flex flex-wrap gap-2">
          {popularCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleSearch(category.name)}
              className={`${category.color} text-white text-sm px-3 py-1 rounded-full hover:opacity-90 transition-opacity`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickSearch;