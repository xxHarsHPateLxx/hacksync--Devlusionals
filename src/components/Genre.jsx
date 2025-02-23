import React from 'react';

function Genre() {
  return (
    <div className="p-6 text-white flex-1">
      <h2 className="text-2xl font-bold mb-4">Genre</h2>
      <p className="text-gray-400 mb-4">Browse podcasts by genre.</p>
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg w-290">
          <h3 className="font-semibold">Technology</h3>
          <p>Latest trends and updates in the tech world.</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Health & Wellness</h3>
          <p>Tips for a balanced and healthy lifestyle.</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Business</h3>
          <p>Insights and advice from industry leaders.</p>
        </div>
      </div>
    </div>
  );
}

export default Genre;
