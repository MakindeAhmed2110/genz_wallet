import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - Smart Naira Wallet" },
    { name: "description", content: "Manage your digital assets with Smart Naira Wallet" },
  ];
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [balance] = useState("₦45,230.50");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { type: "bot", message: "Hey Gen Z! 👋 I'm your AI Finance Coach, specialized in Web3 investments and crypto opportunities. I can help you with:\n\n• Web3 investment strategies (crypto, DeFi, NFTs)\n• Saving goals tailored for your lifestyle\n• Investment plans starting from ₦500\n• Portfolio diversification advice\n\nWhat would you like to explore today? 🚀" }
  ]);
  const [swapAmount, setSwapAmount] = useState("");
  const [swapFrom, setSwapFrom] = useState("NGN");
  const [swapTo, setSwapTo] = useState("ETH");
  const [swapReceiveAmount, setSwapReceiveAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [swapError, setSwapError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (!user) {
        window.location.href = "/signin";
      }
    });

    return () => unsubscribe();
  }, []);

  // Calculate swap amount when swapFrom or swapTo changes
  useEffect(() => {
    if (swapAmount) {
      calculateSwapAmount(swapAmount, swapFrom, swapTo);
    }
  }, [swapFrom, swapTo]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/signin";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSendMoney = () => {
    console.log("Send money clicked");
  };

  const handleReceiveMoney = () => {
    console.log("Receive money clicked");
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Check if API key is available
    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      setChatHistory(prev => [...prev, { 
        type: "bot", 
        message: "Configuration error: API key not found. Please check your environment variables." 
      }]);
      return;
    }

    // Add user message
    setChatHistory(prev => [...prev, { type: "user", message: chatMessage }]);

    // Show typing indicator
    setChatHistory(prev => [...prev, { type: "bot", message: "🤔 Thinking..." }]);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
                 headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
           'HTTP-Referer': window.location.origin,
           'X-Title': 'Genz Wallet AI Coach'
         },
        body: JSON.stringify({
          model: 'openai/gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an AI Finance Coach specialized in Web3 investments and financial planning for Gen Z users in Nigeria. Your role is to:

1. Provide personalized investment advice focusing on Web3 opportunities (crypto, DeFi, NFTs)
2. Help create realistic saving goals tailored for Gen Z lifestyle
3. Suggest investment strategies that start with small amounts (₦500-₦50,000)
4. Explain complex financial concepts in simple, relatable terms
5. Consider Nigerian economic context and Naira currency
6. Recommend diversified portfolios including traditional and Web3 assets
7. Provide actionable steps and specific investment recommendations
8. Be encouraging and supportive while being realistic about risks

LANGUAGE SUPPORT:
- Understand and respond in both English and Nigerian Pidgin English
- If user writes in Pidgin, respond in Pidgin
- If user writes in English, respond in English
- Use common Pidgin expressions like "Omo", "Abeg", "Wetin", "How far", "No wahala", "E go better"
- Make financial advice relatable using Nigerian cultural context and everyday examples
- Use Nigerian slang and expressions that Gen Z users understand

Always respond in a friendly, conversational tone. Keep responses concise but informative. Use Nigerian context and Naira currency in examples.`
            },
            {
              role: 'user',
              content: chatMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Remove asterisks from AI response
      const cleanedResponse = aiResponse.replace(/\*/g, '');

      // Remove typing indicator and add AI response
      setChatHistory(prev => {
        const newHistory = prev.slice(0, -1); // Remove typing indicator
        return [...newHistory, { type: "bot", message: cleanedResponse }];
      });

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Remove typing indicator and add error message
      setChatHistory(prev => {
        const newHistory = prev.slice(0, -1); // Remove typing indicator
        return [...newHistory, { 
          type: "bot", 
          message: "Sorry, I'm having trouble connecting right now. Please try again in a moment or ask me about Web3 investment strategies, saving goals, or crypto opportunities for Gen Z!" 
        }];
      });
    }

    setChatMessage("");
  };

  // Crypto price data (simulated real-time prices)
  const cryptoPrices = {
    NGN: 1,
    BTC: 46200000, // ₦46.2M per BTC
    ETH: 400000,   // ₦400K per ETH
    OP: 1500,      // ₦1.5K per OP
    ARB: 1750,     // ₦1.75K per ARB
    HYPE: 250,     // ₦250 per HYPE
    SUI: 800,      // ₦800 per SUI
    TON: 1200,     // ₦1.2K per TON
    ADA: 450       // ₦450 per ADA
  };

  // Calculate swap receive amount
  const calculateSwapAmount = (amount: string, from: string, to: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      setSwapReceiveAmount("");
      return;
    }

    const fromPrice = cryptoPrices[from as keyof typeof cryptoPrices] || 0;
    const toPrice = cryptoPrices[to as keyof typeof cryptoPrices] || 0;
    
    if (fromPrice === 0 || toPrice === 0) {
      setSwapReceiveAmount("");
      return;
    }

    const fromValue = parseFloat(amount) * fromPrice;
    const toAmount = fromValue / toPrice;
    
    setSwapReceiveAmount(toAmount.toFixed(6));
  };

  // Handle swap amount change
  const handleSwapAmountChange = (value: string) => {
    setSwapAmount(value);
    calculateSwapAmount(value, swapFrom, swapTo);
  };

  // Handle swap direction change
  const handleSwapDirectionChange = () => {
    const tempFrom = swapFrom;
    const tempTo = swapTo;
    setSwapFrom(tempTo);
    setSwapTo(tempFrom);
    calculateSwapAmount(swapAmount, tempTo, tempFrom);
  };

  // Handle currency change
  const handleCurrencyChange = (type: 'from' | 'to', value: string) => {
    if (type === 'from') {
      setSwapFrom(value);
      calculateSwapAmount(swapAmount, value, swapTo);
    } else {
      setSwapTo(value);
      calculateSwapAmount(swapAmount, swapFrom, value);
    }
  };

  const handleSwap = async () => {
    if (!swapAmount || parseFloat(swapAmount) <= 0) {
      setSwapError("Please enter a valid amount");
      return;
    }

    if (parseFloat(swapAmount) < 500 && swapFrom === "NGN") {
      setSwapError("Minimum swap amount is ₦500");
      return;
    }

    setIsSwapping(true);
    setSwapError("");
    setSwapSuccess(false);

    // Simulate swap processing
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      setSwapAmount("");
      setSwapReceiveAmount("");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSwapSuccess(false);
      }, 3000);
    }, 2000);
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
                 {chat.type === 'bot' ? (
                   <div className="whitespace-pre-line">
                     {chat.message}
                   </div>
                 ) : (
                   chat.message
                 )}
               </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleChatSubmit} className="flex space-x-2">
                      <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask about Web3 investments, saving goals, or crypto strategies... (You fit talk Pidgin or English)"
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
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Swap Section */}
      <div className="flex-1 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Swap Tokens</h2>
        
        {/* Swap Interface */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-6">
            {/* Error Message */}
            {swapError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{swapError}</p>
              </div>
            )}

            {/* Success Message */}
            {swapSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">✅ Swap completed successfully!</p>
              </div>
            )}

            {/* You Pay Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">You Pay</label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={swapAmount}
                  onChange={(e) => handleSwapAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                <select
                  value={swapFrom}
                  onChange={(e) => handleCurrencyChange('from', e.target.value)}
                  className="px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg min-w-[120px]"
                >
                  <option value="NGN">NGN</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="OP">OP</option>
                  <option value="ARB">ARB</option>
                  <option value="HYPE">HYPE</option>
                  <option value="SUI">SUI</option>
                  <option value="TON">TON</option>
                  <option value="ADA">ADA</option>
                </select>
              </div>
            </div>

            {/* Swap Arrow */}
            <div className="flex justify-center">
              <button 
                onClick={handleSwapDirectionChange}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* You Receive Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">You Receive</label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={swapReceiveAmount}
                  placeholder="0.00"
                  className="flex-1 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg bg-gray-50"
                  readOnly
                />
                <select
                  value={swapTo}
                  onChange={(e) => handleCurrencyChange('to', e.target.value)}
                  className="px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg min-w-[120px]"
                >
                  <option value="ETH">ETH</option>
                  <option value="BTC">BTC</option>
                  <option value="OP">OP</option>
                  <option value="ARB">ARB</option>
                  <option value="HYPE">HYPE</option>
                  <option value="SUI">SUI</option>
                  <option value="TON">TON</option>
                  <option value="ADA">ADA</option>
                  <option value="NGN">NGN</option>
                </select>
              </div>
            </div>

            {/* Exchange Rate Info */}
            {swapAmount && swapReceiveAmount && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-600 text-sm">
                  💱 Exchange Rate: 1 {swapFrom} = {(cryptoPrices[swapFrom as keyof typeof cryptoPrices] / cryptoPrices[swapTo as keyof typeof cryptoPrices]).toFixed(6)} {swapTo}
                </p>
              </div>
            )}

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              disabled={isSwapping || !swapAmount || parseFloat(swapAmount) <= 0}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSwapping ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Swap...</span>
                </div>
              ) : (
                "Swap Tokens"
              )}
            </button>

            {/* Minimum Amount Notice */}
            <div className="text-center text-sm text-gray-500">
              Minimum swap amount: ₦500
            </div>
          </div>
        </div>

        {/* Available Coins Grid */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Coins</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { symbol: 'BTC', name: 'Bitcoin', color: 'bg-yellow-100', textColor: 'text-yellow-600', price: '₦46.2M' },
              { symbol: 'ETH', name: 'Ethereum', color: 'bg-blue-100', textColor: 'text-blue-600', price: '₦400K' },
              { symbol: 'OP', name: 'Optimism', color: 'bg-red-100', textColor: 'text-red-600', price: '₦1.5K' },
              { symbol: 'ARB', name: 'Arbitrum', color: 'bg-blue-100', textColor: 'text-blue-600', price: '₦1.75K' },
              { symbol: 'HYPE', name: 'Hype', color: 'bg-purple-100', textColor: 'text-purple-600', price: '₦250' },
              { symbol: 'SUI', name: 'Sui', color: 'bg-green-100', textColor: 'text-green-600', price: '₦800' },
              { symbol: 'TON', name: 'Toncoin', color: 'bg-blue-100', textColor: 'text-blue-600', price: '₦1.2K' },
              { symbol: 'ADA', name: 'Cardano', color: 'bg-blue-100', textColor: 'text-blue-600', price: '₦450' }
            ].map((coin) => (
              <div 
                key={coin.symbol} 
                onClick={() => handleCurrencyChange('to', coin.symbol)}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border-2 border-transparent hover:border-blue-300"
              >
                <div className={`w-8 h-8 ${coin.color} rounded-full flex items-center justify-center`}>
                  <span className={`font-bold text-sm ${coin.textColor}`}>{coin.symbol}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{coin.name}</p>
                  <p className="text-xs text-gray-500">{coin.price}</p>
                </div>
                {swapTo === coin.symbol && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crypto Balances Sidebar */}
      <div className="lg:w-80 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Portfolio</h2>
        
        {/* Total Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Balance</h3>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">₦2,450,320</div>
          <div className="text-blue-100 text-sm">+12.5% this week</div>
        </div>

        {/* Individual Crypto Balances */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Crypto Balances</h3>
          <div className="space-y-4">
            {[
              { symbol: 'BTC', name: 'Bitcoin', balance: '0.0234', value: '₦1,080,000', change: '+5.2%', color: 'bg-yellow-100', textColor: 'text-yellow-600' },
              { symbol: 'ETH', name: 'Ethereum', balance: '2.45', value: '₦980,000', change: '+3.8%', color: 'bg-blue-100', textColor: 'text-blue-600' },
              { symbol: 'OP', name: 'Optimism', balance: '156.7', value: '₦234,000', change: '+12.1%', color: 'bg-red-100', textColor: 'text-red-600' },
              { symbol: 'ARB', name: 'Arbitrum', balance: '89.2', value: '₦156,320', change: '+8.7%', color: 'bg-blue-100', textColor: 'text-blue-600' },
              { symbol: 'SUI', name: 'Sui', balance: '1,234', value: '₦0', change: '0%', color: 'bg-green-100', textColor: 'text-green-600' }
            ].map((crypto) => (
              <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${crypto.color} rounded-full flex items-center justify-center`}>
                    <span className={`font-bold text-sm ${crypto.textColor}`}>{crypto.symbol}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{crypto.name}</p>
                    <p className="text-xs text-gray-500">{crypto.balance} {crypto.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-sm">{crypto.value}</p>
                  <p className={`text-xs ${crypto.change.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>
                    {crypto.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Buy Crypto
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              Send Crypto
            </button>
            <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
                  <span className="text-white font-bold text-sm">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </span>
                </div>
                <span className="text-gray-700 hidden sm:block">
                  {user?.displayName || user?.email || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
              >
                Logout
              </button>
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