import { useState, useEffect } from "react";
import { FiSearch, FiEdit2, FiMoon, FiSun } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useTheme } from "../context/ThemeContext";
import Logout from "../components/Logout";
import PodcastGenerator from "../components/PodcastGenerator"; // Import Podcast Generator
import UserImg from "../assets/download.png";

const Dashboard = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showPodcastGenerator, setShowPodcastGenerator] = useState(false);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("casual");
  const [podcastLength, setPodcastLength] = useState(10);

  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          navigate("/user-profile");
        }
      }
    };

    fetchUserProfile();
  }, [user, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"} h-screen flex`}>
      {/* Sidebar */}
      <aside className={`${isDarkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-500 to-purple-600"} w-64 p-6 flex flex-col justify-between`}>
        <div>
          {/* Profile */}
          <div className="flex items-center space-x-3 mb-6">
            <img
              src={UserImg}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="text-lg font-semibold text-white">{userData?.name || "User"}</h2>
              <p className="text-gray-200 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => navigate("/user-profile")}
            className="flex items-center space-x-2 text-white bg-gray-700 px-4 py-2 rounded-lg mt-4"
          >
            <FiEdit2 />
            <span>Edit Profile</span>
          </button>

          {/* Menu */}
          <nav className="space-y-4 text-white mt-6">
            <a href="#" className="block">Discover</a>
            <a href="#" className="block">Trending</a>
            <a href="#" className="block">Genre</a>
            <a href="#" className="block">Speaker</a>
          </nav>

          {/* Generate Podcast Button */}
          <button
            onClick={() => setShowPodcastGenerator(!showPodcastGenerator)}
            className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {showPodcastGenerator ? "Close Podcast Generator" : "Generate Podcast"}
          </button>
        </div>

        {/* Logout */}
        <Logout />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 relative">
        {/* Night Mode Toggle */}
        <div className="absolute top-6 right-6">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="flex items-center space-x-2">
            {isDarkMode ? <FiSun className="text-yellow-400 text-2xl" /> : <FiMoon className="text-2xl" />}
            <span>{isDarkMode ? "Light Mode" : "Night Mode"}</span>
          </button>
        </div>

        {/* Show Podcast Generator if toggled */}
        {showPodcastGenerator && (
          <div className="mt-6">
            <PodcastGenerator
              topic={topic}
              setTopic={setTopic}
              tone={tone}
              setTone={setTone}
              podcastLength={podcastLength}
              setPodcastLength={setPodcastLength}
            />
          </div>
        )}

        {/* Search & Trending */}
        <div className="flex justify-between items-center mt-12">
          <div className="relative w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search podcasts"
              className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none`}
            />
          </div>
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
