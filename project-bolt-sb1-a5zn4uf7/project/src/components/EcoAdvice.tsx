import React, { useState } from 'react';
import { Leaf, Lightbulb, Search, Sparkles } from 'lucide-react';

interface EcoTip {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  category: string;
  savings?: string;
}

const categories = [
  'Energy', 'Water', 'Transportation', 'Waste', 'Food', 'Home', 'Community'
];

const mockTips: EcoTip[] = [
  {
    id: '1',
    title: 'Switch to LED Bulbs',
    description: 'Replace incandescent bulbs with LED alternatives to reduce energy consumption by up to 75%. LEDs last 25 times longer and produce less heat, making them ideal for both residential and commercial use.',
    impact: 'medium',
    category: 'Energy',
    savings: '$75/year'
  },
  {
    id: '2',
    title: 'Install Smart Thermostats',
    description: 'Smart thermostats learn your schedule and preferences, automatically adjusting temperature to optimize energy usage. They can reduce heating and cooling costs by 10-23% annually.',
    impact: 'high',
    category: 'Energy',
    savings: '$180/year'
  },
  {
    id: '3',
    title: 'Start Composting',
    description: 'Create nutrient-rich compost from kitchen scraps and yard waste. Composting reduces landfill waste by 30% and provides natural fertilizer for gardens and plants.',
    impact: 'medium',
    category: 'Waste',
    savings: '$50/year'
  },
  {
    id: '4',
    title: 'Use Public Transportation',
    description: 'Choose buses, trains, or bike-sharing programs over personal vehicles. Public transit reduces carbon emissions by 45% per mile compared to driving alone.',
    impact: 'high',
    category: 'Transportation',
    savings: '$300/month'
  },
  {
    id: '5',
    title: 'Install Low-Flow Fixtures',
    description: 'Replace old faucets and showerheads with low-flow alternatives. These fixtures can reduce water usage by 30-50% without compromising performance.',
    impact: 'medium',
    category: 'Water',
    savings: '$120/year'
  },
  {
    id: '6',
    title: 'Choose Renewable Energy',
    description: 'Switch to renewable energy sources like solar or wind power through your utility provider. Solar panels can reduce electricity bills by 70-90% over their lifetime.',
    impact: 'high',
    category: 'Energy',
    savings: '$1200/year'
  }
];

export default function EcoAdvice() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tips, setTips] = useState<EcoTip[]>(mockTips);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const generateCustomTip = async () => {
    if (!searchTerm.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newTip: EcoTip = {
        id: Date.now().toString(),
        title: `Custom Eco Tip for "${searchTerm}"`,
        description: `Based on your search for "${searchTerm}", here's a personalized sustainability recommendation: Consider implementing energy-efficient practices, reducing waste through mindful consumption, and exploring renewable alternatives. Small daily changes in your ${searchTerm.toLowerCase()} habits can lead to significant environmental benefits over time.`,
        impact: 'medium',
        category: selectedCategory || 'General',
        savings: '$' + Math.floor(Math.random() * 200 + 50) + '/year'
      };
      
      setTips(prev => [newTip, ...prev]);
      setIsGenerating(false);
    }, 2000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Eco Advice Generator</h2>
        <p className="text-slate-600">Get personalized sustainability tips powered by AI</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for eco tips or enter keywords..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <button
            onClick={generateCustomTip}
            disabled={!searchTerm.trim() || isGenerating}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Custom Tip'}</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getImpactColor(tip.impact)}`}>
                  {tip.impact} Impact
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  {tip.category}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{tip.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{tip.description}</p>
            
            {tip.savings && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl border border-green-200">
                <Lightbulb className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Potential savings: {tip.savings}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <Leaf className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No tips found</h3>
          <p className="text-slate-600">Try adjusting your search terms or generate a custom tip</p>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Ready to Make a Difference?</h3>
        <p className="text-emerald-100 mb-4">
          Small changes lead to big impacts. Start implementing these eco-friendly tips today!
        </p>
        <button className="px-6 py-3 bg-white text-emerald-600 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
          Track My Progress
        </button>
      </div>
    </div>
  );
}