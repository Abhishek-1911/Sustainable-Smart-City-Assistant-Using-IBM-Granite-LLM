import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const sampleQuestions = [
  "How can my city reduce carbon emissions?",
  "What are the best practices for waste management?",
  "How to improve public transportation efficiency?",
  "What renewable energy options work for urban areas?",
  "How to engage citizens in sustainability initiatives?"
];

const mockResponses: { [key: string]: string } = {
  "carbon": "To reduce carbon emissions, cities can implement several strategies: 1) Expand renewable energy infrastructure like solar panels on public buildings, 2) Improve public transportation and promote electric vehicles, 3) Implement green building standards and energy efficiency programs, 4) Create urban forests and green spaces, 5) Support local food systems to reduce transportation emissions.",
  
  "waste": "Effective waste management involves: 1) Implementing comprehensive recycling programs with clear citizen guidelines, 2) Establishing composting facilities for organic waste, 3) Promoting circular economy principles and waste reduction at source, 4) Using smart waste collection systems with sensors, 5) Creating waste-to-energy facilities for non-recyclable materials.",
  
  "transportation": "To improve public transportation: 1) Invest in electric buses and rail systems, 2) Create dedicated bus lanes and optimize route planning, 3) Implement smart traffic management systems, 4) Develop integrated payment systems across all transport modes, 5) Encourage bike-sharing and walking infrastructure.",
  
  "energy": "Renewable energy options for cities include: 1) Solar installations on rooftops and public spaces, 2) Small-scale wind turbines in appropriate locations, 3) Geothermal systems for heating and cooling, 4) Hydroelectric power where water resources allow, 5) Community energy storage systems and smart grid technology.",
  
  "engagement": "To engage citizens in sustainability: 1) Create educational campaigns and workshops, 2) Develop mobile apps for reporting environmental issues, 3) Organize community sustainability challenges and competitions, 4) Establish citizen advisory committees for environmental policy, 5) Provide incentives for eco-friendly behaviors like rebates for solar installations."
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your Smart City Assistant powered by IBM Granite LLM. I can help you with sustainability strategies, urban planning questions, and city governance insights. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const keywords = inputMessage.toLowerCase();
      let response = "I understand your question about city sustainability. Based on best practices and current research, I recommend focusing on integrated approaches that combine technology, policy, and community engagement. Would you like me to elaborate on any specific aspect?";

      // Check for keywords and provide relevant responses
      for (const [keyword, answer] of Object.entries(mockResponses)) {
        if (keywords.includes(keyword)) {
          response = answer;
          break;
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSampleQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Chat Assistant</h2>
        <p className="text-slate-600">Ask questions about city sustainability and governance</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Smart City Assistant</h3>
              <p className="text-emerald-100 text-sm">Powered by IBM Granite LLM</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-emerald-100' : 'text-slate-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="p-2 bg-blue-500 rounded-full">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="p-3 bg-slate-100 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about city sustainability, policies, or governance..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sample Questions */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-emerald-500" />
          <h3 className="text-lg font-semibold text-slate-800">Sample Questions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSampleQuestion(question)}
              className="text-left p-3 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 text-sm"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}