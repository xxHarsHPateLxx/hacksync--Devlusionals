import React, { useContext } from 'react';

const ProfileDashboard = () => {
    return (
      <div className="w-full h-full bg-gray-800 p-8 text-white">
        <div className="flex items-center gap-6 mb-8">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="rounded-full w-20 h-20"
          />
          <div>
            <h1 className="text-3xl font-bold">Ethan Anderson</h1>
            <p className="text-gray-400">example@domain.com</p>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-8">
          {/* Account Details */}
          <div className="bg-gray-700 p-6 rounded-lg col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
            <p><strong>Name:</strong> Ethan Anderson</p>
            <p><strong>Email:</strong> example@domain.com</p>
            <p><strong>Joined:</strong> January 2024</p>
          </div>
  
          {/* My Podcasts */}
          <div className="bg-gray-700 p-6 rounded-lg col-span-2">
            <h2 className="text-2xl font-semibold mb-4">My Podcasts</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-600 p-4 rounded-md">
                <h3 className="font-semibold">Healthy lifestyle: The search for harmony</h3>
                <p>Author: Liam Carter</p>
                <p>Episodes: 12</p>
              </div>
              <div className="bg-gray-600 p-4 rounded-md">
                <h3 className="font-semibold">Investing in yourself</h3>
                <p>Author: Sara Gold</p>
                <p>Episodes: 8</p>
              </div>
              <div className="bg-gray-600 p-4 rounded-md">
                <h3 className="font-semibold">How modern gadgets are changing our lives</h3>
                <p>Author: John Brown</p>
                <p>Episodes: 14</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileDashboard;
  
