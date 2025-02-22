import { useState } from "react";
import { FiSearch, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"} h-screen flex`}>
      {/* Sidebar */}
      <aside className={`${isDarkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-500 to-purple-600"} w-64 p-6 flex flex-col justify-between`}>
        <div>
          {/* Profile */}
          <div className="flex items-center space-x-3 mb-6">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="text-lg font-semibold text-white">Ethan Anderson</h2>
              <p className="text-gray-200 text-sm">Anderson@gmail.com</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-4 text-white">
            <a href="#" className="block">Discover</a>
            <a href="#" className="block">Trending</a>
            <a href="#" className="block">Genre</a>
            <a href="#" className="block">Speaker</a>
          </nav>

          {/* Library */}
          <h3 className="mt-6 text-gray-300 text-sm">Library</h3>
          <nav className="space-y-2 mt-2 text-white">
            <a href="#" className="block">Recent</a>
            <a href="#" className="block">Playlist</a>
            <a href="#" className="block">Favorites</a>
          </nav>
        </div>

        {/* Night Mode Toggle & Logout */}
        <div className="flex justify-between items-center">
          
          <button className="flex items-center space-x-2 text-red-400">
            <FiLogOut />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Search & Top Podcasters */}
        <div className="flex justify-between items-center">
          <div className="relative w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search podcasts"
              className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none`}
            />
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="flex items-center space-x-2">
            {isDarkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
            <span>{isDarkMode ? "Light Mode" : "Night Mode"}</span>
          </button>
        </div>

        {/* Trending Podcast */}
        <div className="mt-6">
          <h2 className={`${isDarkMode ? "text-white" : "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"} text-2xl font-bold`}>
            🔥 Trending Podcast
          </h2>
          <div className="bg-blue-600 p-6 mt-4 rounded-lg text-white">
            <h3 className="text-lg font-semibold">How we can save this world</h3>
            <p className="text-sm">People's favorite</p>
          </div>
        </div>

        {/* Podcast Suggestions */}
        <div className="mt-6">
          <h2 className={`${isDarkMode ? "text-white" : "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"} text-xl font-semibold`}>
            You Might Like
          </h2>
          <div className="flex space-x-4 mt-4">
            <button className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-400 text-white"} px-4 py-2 rounded-lg`}>New</button>
            <button className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-400 text-white"} px-4 py-2 rounded-lg`}>Popular</button>
            <button className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-400 text-white"} px-4 py-2 rounded-lg`}>Tech</button>
            <button className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-blue-400 text-white"} px-4 py-2 rounded-lg`}>Business</button>
          </div>
        </div>

        {/* Now Playing */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg flex justify-between items-center text-white">
          <div>
            <h3 className="font-semibold">Psychological approaches to stress reduction</h3>
            <p className="text-gray-400 text-sm">Liam Martinez</p>
          </div>
          <button onClick={() => setPlaying(!playing)} className="text-white text-2xl">
            {playing ? "⏸" : <BsPlayFill />}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
