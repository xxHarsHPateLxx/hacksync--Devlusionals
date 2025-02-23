import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Music, 
  Search, 
  List, 
  User, 
  Mic, 
  Download, 
  Settings,
  LogOut,
  Bell,
} from 'lucide-react';

function Sidebar() {
  const [activeItem, setActiveItem] = useState('Home');
  const [notifications, setNotifications] = useState(3);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate(); // For navigation

  const MenuItem = ({ icon: Icon, text, notificationCount, path }) => (
    <li 
      className={`
        flex items-center gap-3 p-3 cursor-pointer
        rounded-lg transition-all duration-200 
        ${activeItem === text 
          ? 'bg-blue-500 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }
      `}
      onClick={() => {
        setActiveItem(text);
        if (path) navigate(path); // Navigate if path exists
      }}
    >
      <Icon size={20} />
      {isExpanded && (
        <div className="flex items-center justify-between flex-1">
          <span>{text}</span>
          {notificationCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {notificationCount}
            </span>
          )}
        </div>
      )}
    </li>
  );

  return (
    <aside 
      className={`
        h-max bg-gray-800 transition-all duration-300 
        ${isExpanded ? 'w-64' : 'w-20'} 
        flex flex-col shadow-xl 
      `}
    >
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGbUgmdy-VsfuP6P6s9V-9DGL9F33CryULQ&s"
              alt="User Avatar"
              className="w-12 h-12 rounded-full ring-2 ring-blue-500 p-1"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          {isExpanded && (
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Ethan Anderson</h3>
              <p className="text-sm text-gray-400">example@domain.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <MenuItem icon={Home} text="Home" path="/" />
          <MenuItem icon={Mic} text="AI generator"  path="/trending" />
          <MenuItem icon={Music} text="Genre" path="/genre" />
          <MenuItem icon={TrendingUp} text="Trending" path="/trending" />
          <MenuItem icon={List} text="Playlist" notificationCount={2} path="/playlist" />
        </div>

        {/* Library Section */}
        {isExpanded && (
          <div className="mt-8">
            <h4 className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Library
            </h4>
            <div className="space-y-1">
              <MenuItem icon={User} text="Profile" path="/profile" />
              <MenuItem icon={Mic} text="My Podcast" path="/mypodcast" />
              <MenuItem icon={Download} text="Downloads" notificationCount={2} path="/downloads" />
            </div>
          </div>
        )}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-700">
        <div className="space-y-1">
          <MenuItem icon={Settings} text="Settings" path="/settings" />
          <MenuItem icon={LogOut} text="Logout" />
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2
          bg-gray-700 text-white p-1 rounded-full shadow-lg
          hover:bg-gray-600 transition-colors duration-200"
      >
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>
  );
}

export default Sidebar;
