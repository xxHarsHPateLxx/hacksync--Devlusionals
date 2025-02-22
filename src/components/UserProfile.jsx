import { useState, useEffect } from "react";
import { db, doc, getDoc, setDoc } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [topics, setTopics] = useState([]);
  const [length, setLength] = useState("");
  const [tone, setTone] = useState("Casual");
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
          setLength(data.length || "");
          setTone(data.tone || "Casual");
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

    try {
      await setDoc(doc(db, "users", user.uid), { name, topics, length, tone });
      alert("Profile saved!");
      navigate("/dashboard"); // Redirect to main dashboard
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold">🎙 Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <div>
          <p>Favorite Topics:</p>
          {["Tech", "Health", "Business", "Comedy", "Sports"].map((topic) => (
            <button
              key={topic}
              type="button"
              className={`px-3 py-1 m-1 rounded ${topics.includes(topic) ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              onClick={() => setTopics(topics.includes(topic) ? topics.filter((t) => t !== topic) : [...topics, topic])}
            >
              {topic}
            </button>
          ))}
        </div>

        <select value={length} onChange={(e) => setLength(e.target.value)} required>
          <option value="">Select Podcast Length</option>
          <option value="Short (10-20 min)">Short (10-20 min)</option>
          <option value="Medium (20-40 min)">Medium (20-40 min)</option>
          <option value="Long (40+ min)">Long (40+ min)</option>
        </select>

        <select value={tone} onChange={(e) => setTone(e.target.value)} required>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Humorous">Humorous</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
