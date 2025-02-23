import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase'; // Adjust the import path as needed
import { PlayCircle, Clock, User, LogOut } from 'lucide-react';


const PodcastDashboard = () => {
  const [user, setUser] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const podcastsRef = collection(db, 'podcasts');
        const querySnapshot = await getDocs(podcastsRef);
        
        const podcastData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPodcasts(podcastData);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    if (user) {
      fetchPodcasts();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Please log in to view podcasts</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Podcast Feed</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <span className="text-sm">{user.email}</span>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <div 
            key={podcast.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={podcast.coverImage || "/api/placeholder/400/320"}
                alt={podcast.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
                <PlayCircle className="h-8 w-8 text-blue-600" />
              </button>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{podcast.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {podcast.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{podcast.duration || '00:00'}</span>
                </div>
                <span>{podcast.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {podcasts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No podcasts found in your feed</p>
        </div>
      )}
    </div>
  );
};

export default PodcastDashboard;