import { useState } from "react";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Smart Naira Wallet" },
    { name: "description", content: "Manage your digital assets with Smart Naira Wallet" },
  ];
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [balance] = useState("₦45,230.50");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { type: "bot", message: "Hello! I'm your AI Finance Coach. How can I help you today?" }
  ]);
  const [swapAmount, setSwapAmount] = useState("");
  const [swapFrom, setSwapFrom] = useState("NGN");
  const [swapTo, setSwapTo] = useState("ETH");

  const handleSendMoney = () => {
    console.log("Send money clicked");
  };

  const handleReceiveMoney = () => {
    console.log("Receive money clicked");
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, { type: "user", message: chatMessage }]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your spending patterns, I recommend setting aside 20% of your income for savings.",
        "Consider diversifying your investments across different asset classes.",
        "Your current spending on entertainment is 15% higher than last month. Would you like to set a budget?",
        "I notice you haven't made any investments this month. Would you like to explore our Web3 investment options?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { type: "bot", message: randomResponse }]);
    }, 1000);

    setChatMessage("");
  };

  const handleSwap = () => {
    console.log(`Swapping ${swapAmount} ${swapFrom} to ${swapTo}`);
  };

  const renderDashboard = () => (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h2>
      
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 sm:p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-xs sm:text-sm">Available Balance</p>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2">{balance}</h3>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={handleSendMoney}
          className="bg-blue-600 text-white rounded-xl p-3 sm:p-4 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="font-semibold text-sm sm:text-base">Send Money</span>
          </div>
        </button>
        
        <button
          onClick={handleReceiveMoney}
          className="bg-green-600 text-white rounded-xl p-3 sm:p-4 hover:bg-green-700 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="font-semibold text-sm sm:text-base">Receive Money</span>
          </div>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm sm:text-base">Aisha Bello</p>
                <p className="text-xs sm:text-sm text-gray-500">Sent money</p>
              </div>
            </div>
            <span className="text-red-600 font-semibold text-sm sm:text-base">-₦5,000</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm sm:text-base">Salary</p>
                <p className="text-xs sm:text-sm text-gray-500">Received money</p>
              </div>
            </div>
            <span className="text-green-600 font-semibold text-sm sm:text-base">+₦25,000</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIFinanceCoach = () => (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">AI Finance Coach</h2>
      
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm h-80 sm:h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 rounded-2xl text-sm sm:text-base ${
                chat.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {chat.message}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleChatSubmit} className="flex space-x-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Ask your AI coach anything..."
            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );

  const renderBlockchainCredit = () => (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Blockchain Credit</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Credit Score</h3>
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 relative">
              <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray="75, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-gray-800">750</span>
              </div>
            </div>
            <p className="text-green-600 font-semibold text-sm sm:text-base">Good Credit</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Credit Limit</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Available Credit</span>
              <span className="font-semibold text-sm sm:text-base">₦150,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Used Credit</span>
              <span className="font-semibold text-sm sm:text-base">₦45,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Credit History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800 text-sm sm:text-base">On-time payments</p>
              <p className="text-xs sm:text-sm text-gray-500">Last 12 months</p>
            </div>
            <span className="text-green-600 font-semibold text-sm sm:text-base">100%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800 text-sm sm:text-base">Credit utilization</p>
              <p className="text-xs sm:text-sm text-gray-500">Current month</p>
            </div>
            <span className="text-blue-600 font-semibold text-sm sm:text-base">30%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWeb3Investment = () => (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Web3 Investment</h2>
      
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Swap Tokens</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">You Pay</label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="number"
                value={swapAmount}
                onChange={(e) => setSwapAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <select
                value={swapFrom}
                onChange={(e) => setSwapFrom(e.target.value)}
                className="px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="NGN">NGN</option>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">You Receive</label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="number"
                placeholder="0.00"
                className="flex-1 px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                readOnly
              />
              <select
                value={swapTo}
                onChange={(e) => setSwapTo(e.target.value)}
                className="px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="NGN">NGN</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSwap}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Swap Tokens
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Trending Coins</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-xs sm:text-sm">₿</span>
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm sm:text-base">Bitcoin</p>
                <p className="text-xs sm:text-sm text-gray-500">BTC</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">₦45,230,000</p>
              <p className="text-xs sm:text-sm text-green-600">+2.5%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs sm:text-sm">Ξ</span>
              </div>
              <div>
                <p className="font-medium text-gray-800 text-sm sm:text-base">Ethereum</p>
                <p className="text-xs sm:text-sm text-gray-500">ETH</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">₦2,450,000</p>
              <p className="text-xs sm:text-sm text-green-600">+1.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Genz Wallet</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <span className="text-gray-700 hidden sm:block">User</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile Navigation */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === "dashboard" 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("ai-coach")}
                className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === "ai-coach" 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>AI Coach</span>
              </button>

              <button
                onClick={() => setActiveTab("blockchain-credit")}
                className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === "blockchain-credit" 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Credit</span>
              </button>

              <button
                onClick={() => setActiveTab("web3-investment")}
                className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === "web3-investment" 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Investment</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === "dashboard" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                  </svg>
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab("ai-coach")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === "ai-coach" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>AI Finance Coach</span>
                </button>

                <button
                  onClick={() => setActiveTab("blockchain-credit")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === "blockchain-credit" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Blockchain Credit</span>
                </button>

                <button
                  onClick={() => setActiveTab("web3-investment")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === "web3-investment" 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Web3 Investment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "ai-coach" && renderAIFinanceCoach()}
            {activeTab === "blockchain-credit" && renderBlockchainCredit()}
            {activeTab === "web3-investment" && renderWeb3Investment()}
          </div>
        </div>
      </div>
    </div>
  );
} 