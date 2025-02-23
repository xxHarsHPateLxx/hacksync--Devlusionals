import React, { useState } from 'react';

function AIGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Formal');
  const [length, setLength] = useState('5 mins');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone, length }),
      });
      
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('🎙️ Generated Podcast Script:', data.script);
        console.log('🔗 Audio URL:', data.audioUrl);
        // Optional: Display script and audio link in the UI
        alert("✅ Podcast generated successfully!");
      } else {
        console.error('⚠️ Generation failed:', data.error);
        alert("❌ Podcast generation failed. Please try again.");
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert("🚨 An unexpected error occurred.");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white w-full pl-70 p-8 text-center flex-1">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">AI Episode Generator</h2>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter episode topic"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Formal</option>
            <option>Casual</option>
            <option>Humorous</option>
            <option>Inspirational</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Length</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>1 mins</option>
            <option>3 mins</option>
            <option>5 mins</option>
            <option>10 mins</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Episode
        </button>
      </form>
    </div>
  );
}

export default AIGenerator;
