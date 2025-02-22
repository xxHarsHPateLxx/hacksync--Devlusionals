import { useState, useEffect } from "react";
import { db, collection, doc, setDoc, getDoc } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FiSun, FiMoon } from "react-icons/fi";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [topics, setTopics] = useState([]);
  const [length, setLength] = useState("");
  const [tone, setTone] = useState("Casual");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const auth = getAuth();

  // Fetch logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadUserProfile(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Load user profile if exists
  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setName(data.name || "");
        setTopics(data.topics || []);
        setLength(data.length || "");
        setTone(data.tone || "Casual");
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  // Handle topic selection
  const handleTopicChange = (topic) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  // Save or update profile in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to save your profile.");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        topics,
        length,
        tone,
      });
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"} min-h-screen flex flex-col items-center justify-center`}>
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="absolute top-4 right-4">
        {isDarkMode ? <FiSun className="text-yellow-400 text-2xl" /> : <FiMoon className="text-gray-700 text-2xl" />}
      </button>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          🎙 Your Profile
        </h2>

        {!user ? (
          <p className="text-red-500 text-center mt-4">Please log in to set up your profile.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
                required
              />
            </div>

            {/* Favorite Topics */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300">Favorite Topics:</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Tech", "Health", "Business", "Comedy", "Sports"].map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className={`px-3 py-1 rounded-full text-sm ${
                      topics.includes(topic) ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                    }`}
                    onClick={() => handleTopicChange(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Podcast Length */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300">Preferred Podcast Length:</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Short (10-20 min)">Short (10-20 min)</option>
                <option value="Medium (20-40 min)">Medium (20-40 min)</option>
                <option value="Long (40+ min)">Long (40+ min)</option>
              </select>
            </div>

            {/* Preferred Tone */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300">Preferred Tone:</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              >
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Humorous">Humorous</option>
              </select>
            </div>

            {/* Submit */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg hover:opacity-90">
              Save Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
