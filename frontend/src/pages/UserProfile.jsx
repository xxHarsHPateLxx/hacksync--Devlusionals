import { useState, useEffect } from "react";
import { db, doc, getDoc, setDoc } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [topics, setTopics] = useState([]);
  const [genres, setGenres] = useState([]);
  const [length, setLength] = useState("");
  const [tone, setTone] = useState("Casual");
  const [voiceGender, setVoiceGender] = useState("Male");
  const [voiceAccent, setVoiceAccent] = useState("American");
  const [location, setLocation] = useState("");
  const [activity, setActivity] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || "");
          setTopics(data.topics || []);
          setGenres(data.genres || []);
          setLength(data.preferredLength || "");
          setTone(data.tone || "Casual");
          setVoiceGender(data.voicePreferences?.gender || "Male");
          setVoiceAccent(data.voicePreferences?.accent || "American");
          setLocation(data.location || "");
          setActivity(data.activity || "");
        }
      };
      fetchUserProfile();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to save your profile.");
      return;
    }

    const userProfile = {
      name,
      email: user.email || "",
      topics,
      genres,
      preferredLength: length ? parseInt(length) : 0,
      tone,
      voicePreferences: { gender: voiceGender, accent: voiceAccent },
      location,
      activity,
      listeningHistory: [],
      trendingTopics: []
    };

    try {
      await setDoc(doc(db, "users", user.uid), userProfile, { merge: true });
      alert("Profile saved!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-violet-600 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">🎙 Edit Your Profile</h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-4">
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="p-3 border rounded-md w-full" />
          
          <div>
            <p className="font-medium">Favorite Topics:</p>
            <div className="flex flex-wrap gap-2">
              {["Tech", "Health", "Business", "Comedy", "Sports"].map((topic) => (
                <button key={topic} type="button" className={`px-4 py-2 rounded-md ${topics.includes(topic) ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTopics(topics.includes(topic) ? topics.filter((t) => t !== topic) : [...topics, topic])}>{topic}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium">Select Genres:</p>
            <div className="flex flex-wrap gap-2">
              {["News", "Comedy", "Education", "Tech", "Sports"].map((genre) => (
                <button key={genre} type="button" className={`px-4 py-2 rounded-md ${genres.includes(genre) ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setGenres(genres.includes(genre) ? genres.filter((g) => g !== genre) : [...genres, genre])}>{genre}</button>
              ))}
            </div>
          </div>

          <select value={length} onChange={(e) => setLength(e.target.value)} required className="p-3 border rounded-md w-full">
            <option value="">Select Podcast Length</option>
            <option value="10">Short (10-20 min)</option>
            <option value="20">Medium (20-40 min)</option>
            <option value="40">Long (40+ min)</option>
          </select>

          <select value={tone} onChange={(e) => setTone(e.target.value)} required className="p-3 border rounded-md w-full">
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Humorous">Humorous</option>
          </select>

          <input type="text" placeholder="Your Location" value={location} onChange={(e) => setLocation(e.target.value)} className="p-3 border rounded-md w-full" />
          
          <input type="text" placeholder="Activity (e.g., commuting)" value={activity} onChange={(e) => setActivity(e.target.value)} className="p-3 border rounded-md w-full" />

          <button type="submit" className="bg-gradient-to-r from-blue-500 to-violet-600 text-white p-3 rounded-md w-full font-semibold">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
