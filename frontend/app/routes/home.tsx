import { useState } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smart Naira Wallet - Africa's First Web3 NeoBank for Gen Z" },
    { name: "description", content: "Smart Naira revolutionizes digital finance by merging AI-powered banking with accessible Web3 tools for Nigeria's Gen Z population." },
  ];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("General");
  const [expandedQuestion, setExpandedQuestion] = useState(1);

  const toggleQuestion = (questionNumber: number) => {
    setExpandedQuestion(expandedQuestion === questionNumber ? 0 : questionNumber);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="w-full px-4 py-6 lg:px-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl md:text-2xl font-bold text-white hover:scale-105 transition-transform duration-300">Genz Wallet</div>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#features" className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105">Features</a>
            <a href="#about" className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105">About</a>
            <a href="#community" className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105">Community</a>
            <a href="#contact" className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105">Contact</a>
          </div>
          <div className="flex items-center space-x-3 md:space-x-4">
            <button className="px-3 py-2 md:px-4 md:py-2 text-white border border-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-sm md:text-base">
              Log in
            </button>
            <a href="/signup" className="px-3 py-2 md:px-4 md:py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-sm md:text-base inline-block">
              Sign up
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full px-4 py-8 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Digital banking made easy for <span className="text-blue-400">Gen Z</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
                Since 2024, we've guided millions of Nigerian Gen Z users on their digital assets journey. 
                Africa's first Web3 NeoBank combining AI-powered banking with accessible blockchain technology.
              </p>
              
              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                 <a href="/dashboard" className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105 font-semibold text-base md:text-lg shadow-lg hover:shadow-xl inline-block">
                   Try for Free
                 </a>
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <a href="#learn-more" className="text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 font-medium">
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Element */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm lg:max-w-md">
                {/* Dummy Box for Hero Section Image */}
                <div className="relative w-full aspect-[5/4] bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 rounded-2xl shadow-2xl transform rotate-3 lg:rotate-6 hover:scale-105 transition-all duration-500">
                  {/* Card Stack Effect */}
                  <div className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 w-full aspect-[5/4] bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl transform -rotate-2 lg:-rotate-3"></div>
                  <div className="absolute -top-4 -left-4 lg:-top-8 lg:-left-8 w-full aspect-[5/4] bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl transform rotate-6 lg:rotate-12"></div>
                  
                  {/* Card Content */}
                  <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="text-white font-bold text-base lg:text-lg">VISA</div>
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-full"></div>
                    </div>
                    <div className="text-white font-mono text-xs lg:text-sm">
                      <div className="mb-2">6037 9975 9598 3090</div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-300">CARD HOLDER</div>
                          <div className="font-semibold text-xs lg:text-sm">Aisha Bello</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-300">EXPIRES</div>
                          <div className="font-semibold text-xs lg:text-sm">09/24</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-300">CVV</div>
                          <div className="font-semibold text-xs lg:text-sm">341</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-6 h-6 lg:w-8 lg:h-8 bg-blue-400 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 w-4 h-4 lg:w-6 lg:h-6 bg-orange-400 rounded-full opacity-60"></div>
                <div className="absolute top-1/2 -right-6 lg:-right-12 w-3 h-3 lg:w-4 lg:h-4 bg-pink-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics/Social Proof Section */}
      <section className="w-full px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
            {/* Active Users */}
            <div className="flex items-center space-x-3 md:space-x-4 hover:scale-105 transition-transform duration-300">
              <div className="flex -space-x-1 md:-space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-400 rounded-full border-2 border-black"></div>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-400 rounded-full border-2 border-black"></div>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-400 rounded-full border-2 border-black"></div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">10.2k+</div>
                <div className="text-gray-400 text-xs md:text-sm">Active users across Nigeria</div>
              </div>
            </div>

            {/* Experience */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="text-xl md:text-2xl font-bold text-white">1y</div>
              <div className="text-gray-400 text-xs md:text-sm">Experience</div>
            </div>

            {/* Merchant Partners */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="text-xl md:text-2xl font-bold text-white">50+</div>
              <div className="text-gray-400 text-xs md:text-sm">Merchant Partners</div>
            </div>

            {/* Worldwide Clients */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="text-xl md:text-2xl font-bold text-white">10.2k+</div>
              <div className="text-gray-400 text-xs md:text-sm">Worldwide Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose Smart Naira?
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Revolutionizing digital finance for Nigeria's Gen Z population with AI-powered banking and Web3 technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* AI Finance Coach */}
            <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">AI Finance Coach</h3>
              <p className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                Multilingual voice chatbot supporting Pidgin and English for personalized financial advice.
              </p>
            </div>

            {/* Blockchain Credit */}
            <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">Blockchain Credit</h3>
              <p className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                Alternative credit scoring using verifiable on-chain activity and Soulbound tokens.
              </p>
            </div>

            {/* Web3 Investment */}
            <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">Web3 Investment</h3>
              <p className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors duration-300">
                Fractional asset ownership starting from ₦500 with AI-generated investment portfolios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full px-4 py-12 md:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently asked questions
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex space-x-1 md:space-x-2 bg-gray-800 rounded-lg p-1">
              <button 
                onClick={() => setActiveTab("General")}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium transition-all duration-300 ${
                  activeTab === "General" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                General
              </button>
              <button 
                onClick={() => setActiveTab("Banking")}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium transition-all duration-300 ${
                  activeTab === "Banking" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Banking
              </button>
              <button 
                onClick={() => setActiveTab("Web3")}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium transition-all duration-300 ${
                  activeTab === "Web3" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Web3
              </button>
              <button 
                onClick={() => setActiveTab("AI Coach")}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium transition-all duration-300 ${
                  activeTab === "AI Coach" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                AI Coach
              </button>
            </div>
          </div>

          {/* FAQ Questions */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Question 01 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(1)}
              >
                <div className="flex items-center space-x-4">
                  <span className={`text-sm md:text-base font-mono ${expandedQuestion === 1 ? 'text-blue-400' : 'text-gray-400'}`}>01</span>
                  <h3 className="text-white font-semibold text-base md:text-lg">How does Smart Naira Wallet work?</h3>
                </div>
                <svg className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 ${expandedQuestion === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedQuestion === 1 && (
                <div className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                  Smart Naira Wallet is Africa's first Web3 NeoBank designed specifically for Gen Z. It combines AI-powered banking with accessible blockchain technology, offering features like AI Finance Coach, Blockchain Credit System, and Web3 Investment Gateway. Simply download the app, create your account, and start managing your finances with cutting-edge technology.
                </div>
              )}
            </div>

            {/* Question 02 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(2)}
              >
                <div className="flex items-center space-x-4">
                  <span className={`text-sm md:text-base font-mono ${expandedQuestion === 2 ? 'text-blue-400' : 'text-gray-400'}`}>02</span>
                  <h3 className="text-white font-semibold text-base md:text-lg">How can I set up my account?</h3>
                </div>
                <svg className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 ${expandedQuestion === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedQuestion === 2 && (
                <div className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                  Setting up your Smart Naira Wallet account is simple! Download the app from your app store, enter your phone number, verify with OTP, add your basic information, and link your bank account or card. The entire process takes less than 5 minutes, and you'll be ready to start banking with AI-powered features.
                </div>
              )}
            </div>

            {/* Question 03 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(3)}
              >
                <div className="flex items-center space-x-4">
                  <span className={`text-sm md:text-base font-mono ${expandedQuestion === 3 ? 'text-blue-400' : 'text-gray-400'}`}>03</span>
                  <h3 className="text-white font-semibold text-base md:text-lg">How does the AI Finance Coach work?</h3>
                </div>
                <svg className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 ${expandedQuestion === 3 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedQuestion === 3 && (
                <div className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                  Our AI Finance Coach is a multilingual voice chatbot that supports both Pidgin and English. It provides personalized financial advice, helps you create budgets, tracks your spending patterns, and offers gamified learning with NFT achievements. The AI analyzes your transaction history to give you customized money management tips.
                </div>
              )}
            </div>

            {/* Question 04 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(4)}
              >
                <div className="flex items-center space-x-4">
                  <span className={`text-sm md:text-base font-mono ${expandedQuestion === 4 ? 'text-blue-400' : 'text-gray-400'}`}>04</span>
                  <h3 className="text-white font-semibold text-base md:text-lg">How to build credit with blockchain?</h3>
                </div>
                <svg className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 ${expandedQuestion === 4 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedQuestion === 4 && (
                <div className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                  Our Blockchain Credit System creates alternative credit scoring using your verifiable on-chain financial activity. Every transaction, investment, and financial milestone is recorded as non-transferable Soulbound Tokens, creating a tamper-proof financial reputation. This credit score is recognized by local financial institutions and helps you access better financial products.
                </div>
              )}
            </div>

            {/* Question 05 */}
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(5)}
              >
                <div className="flex items-center space-x-4">
                  <span className={`text-sm md:text-base font-mono ${expandedQuestion === 5 ? 'text-blue-400' : 'text-gray-400'}`}>05</span>
                  <h3 className="text-white font-semibold text-base md:text-lg">How to start investing with ₦500?</h3>
                </div>
                <svg className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 transition-transform duration-300 ${expandedQuestion === 5 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {expandedQuestion === 5 && (
                <div className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed">
                  Our Web3 Investment Gateway makes investing accessible to everyone! You can start with as little as ₦500 and own fractional shares of assets. Our AI generates personalized investment portfolios based on your risk appetite and financial goals. We offer fractional ownership of stocks, real estate, and even eNaira integration for seamless digital currency transactions.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-4 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white font-bold text-lg md:text-xl hover:scale-105 transition-transform duration-300">Genz Wallet</div>
            <div className="text-gray-400 text-xs md:text-sm">
              © 2024 Smart Naira Wallet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
