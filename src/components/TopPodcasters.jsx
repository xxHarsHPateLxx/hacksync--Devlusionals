import React, { useState, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { Mic, Heart, Star, User, Twitter, Link } from 'lucide-react';

const withRenderLogger = (WrappedComponent) => {
  return (props) => {
    console.log(`Rendering ${WrappedComponent.name}`);
    return <WrappedComponent {...props} />;
  };
};

function PodcasterItem({ name }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleDetails = () => setShowDetails(prev => !prev);
  const handleFollow = (e) => {
    e.stopPropagation();
    setIsFollowing(prev => !prev);
  };

  return (
    <li 
      className="hover:bg-gray-700/50 cursor-pointer rounded-md p-2 transition-all group"
      onClick={toggleDetails}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => e.key === 'Enter' && toggleDetails()}
      aria-expanded={showDetails}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Mic className="w-4 h-4 mr-2 text-purple-400" />
          <span className="group-hover:text-purple-300 transition-colors">{name}</span>
        </div>
        <button 
          onClick={handleFollow}
          className="p-1 hover:bg-gray-600/30 rounded-full"
          aria-label={isFollowing ? `Unfollow ${name}` : `Follow ${name}`}
        >
          <Heart 
            className={`w-4 h-4 ${isFollowing ? 'fill-red-500 stroke-red-500' : 'stroke-gray-400'}`}
          />
        </button>
      </div>
      
      {showDetails && (
        <Fragment>
          <div className="ml-6 mt-2 space-y-1 animate-fadeIn">
            <div className="flex items-center text-sm gap-4 text-gray-300">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>25.4k</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                <span>4.9</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-2">
              <a href="#" className="hover:text-blue-400" onClick={(e) => e.stopPropagation()}>
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-400" onClick={(e) => e.stopPropagation()}>
                <Link className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Fragment>
      )}
    </li>
  );
}

PodcasterItem.propTypes = {
  name: PropTypes.string.isRequired,
};

const MemoizedPodcasterItem = memo(PodcasterItem);
const PodcasterItemWithLogger = withRenderLogger(MemoizedPodcasterItem);

function TopPodcasters() {
  const topPodcasters = [
    { name: 'Anna Johnson' },
    { name: 'Benjamin Thompson' },
    { name: 'Noah Diaz' },
  ];

  return (
    <section className="bg-gray-800 rounded-lg p-4 flex-1 space-y-4">
      <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Top Podcasters
      </h2>
      <ul className="space-y-2">
        {topPodcasters.map((podcaster, index) => (
          <PodcasterItemWithLogger key={index} name={podcaster.name} />
        ))}
      </ul>
    </section>
  );
}

export default TopPodcasters;
