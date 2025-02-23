import React from 'react';

function TrendingSection() {
  return (
    <section className="bg-gray-800 rounded-lg p-4 flex-1">
      <h2 className="text-xl font-semibold mb-4">Trending Podcast</h2>
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold">How we can save this world</h3>
        <p className="text-sm italic text-gray-400 mb-4">People's Favorite</p>
        <img
          src="https://img.freepik.com/premium-photo/young-people-interviewed-podcast-3d-character-illustration_839035-159537.jpg"
          alt="Trending"
          className="w-full rounded-lg"
        />
      </div>
    </section>
  );
}

export default TrendingSection;
