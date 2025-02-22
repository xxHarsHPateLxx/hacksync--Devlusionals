import React, { useState } from "react";
import { Headphones, Play, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import image from "../assets/images.jpeg";
import PodcastGenerator from "../components/PodcastGenerator";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [podcastLength, setPodcastLength] = useState(15);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("casual");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Headphones className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">PodcastAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                  Log in
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Register
                </button>
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-2 space-y-1">
              <button className="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                Log in
              </button>
              <button className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Register
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <div className="min-h-screen pt-16 px-4 flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text and Controls */}
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Generate Your Perfect Podcast Instantly
              </h1>

              <p className="text-xl text-gray-600">
                Transform any topic into an engaging podcast using AI. Just
                describe what you want to hear about.
              </p>

              {/* Interactive Prompt Section */}
              <PodcastGenerator
                topic={topic}
                setTopic={setTopic}
                tone={tone}
                setTone={setTone}
                podcastLength={podcastLength}
                setPodcastLength={setPodcastLength}
              />
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
              <img
                src={image}
                alt="Podcast Visual"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Volume2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-blue-600/20 rounded-full">
                      <div className="h-2 w-2/3 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Podcasts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tech Insights Daily",
                image: "/api/placeholder/400/300",
                duration: "15 mins",
                category: "Technology",
              },
              {
                title: "Science Explained",
                image: "/api/placeholder/400/300",
                duration: "20 mins",
                category: "Science",
              },
              {
                title: "Business Trends",
                image: "/api/placeholder/400/300",
                duration: "25 mins",
                category: "Business",
              },
            ].map((podcast, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {podcast.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-white/80">
                    <span>{podcast.duration}</span>
                    <span>•</span>
                    <span>{podcast.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Personalized Podcast Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of listeners who've discovered the future of
            podcasting.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Headphones className="h-6 w-6 text-blue-500" />
                <span className="ml-2 text-lg font-bold text-white">
                  PodcastAI
                </span>
              </div>
              <p className="text-sm">
                Revolutionizing the way you consume audio content.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Use Cases"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className="hover:text-white cursor-pointer"
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
