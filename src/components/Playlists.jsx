import React from 'react';

function Playlist() {
  return (
    <div className="p-6 text-white flex-1 w-300">
      <h2 className="text-2xl font-bold mb-4">Playlist</h2>
      <p className="text-gray-400 mb-4">Your saved playlists will appear here.</p>
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Morning Motivation</h3>
          <p>Episodes: 10</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Tech Innovations</h3>
          <p>Episodes: 7</p>
        </div>
      </div>
    </div>
  );
}

export default Playlist;
