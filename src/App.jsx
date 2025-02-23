import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PodcastContext from './context/PodcastContext';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ProfileDashboard from './components/ProfileDashboard';
import Downloads from './components/Downloads';
import Playlist from './components/Playlists';
import AIGenerator from './components/AIGenerator';
import Genre from './components/Genre';

function App() {
  const [podcasts, setPodcasts] = useState([
    { id: 1, title: 'Healthy lifestyle: The search for harmony', author: 'Liam Carter', episodes: 12 },
    { id: 2, title: 'Investing in yourself', author: 'Sara Gold', episodes: 8 },
    { id: 3, title: 'How modern gadgets are changing our lives', author: 'John Brown', episodes: 14 },
  ]);

  return (
    <PodcastContext.Provider value={{ podcasts, setPodcasts }}>
      <Router>
        <div className="flex min-h-screen bg-gray-900 text-white">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content with Routes */}
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/profile" element={<ProfileDashboard />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/trending" element={<AIGenerator />} />
              <Route path="/genre" element={<Genre />} /> 
            </Routes>
          </div>
        </div>
      </Router>
    </PodcastContext.Provider>
  );
}

export default App;
