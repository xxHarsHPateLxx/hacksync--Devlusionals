
import React from 'react';

function Downloads() {
  return (
    <div className="p-6 text-white flex-1">
      <h2 className="text-2xl font-bold mb-4">Downloads</h2>
      <p className="text-gray-400 mb-4">Here are your downloaded podcasts.</p>
      <div className="space-y-4 w-280">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">The Future of AI</h3>
          <p>Downloaded Episodes: 5/10</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold">Mindfulness and Meditation</h3>
          <p>Downloaded Episodes: 7/7</p>
        </div>
      </div>
    </div>
  );
}

export default Downloads;
