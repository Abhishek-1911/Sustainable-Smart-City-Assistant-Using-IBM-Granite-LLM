import React, { useState } from 'react';
import { Send, MapPin, Calendar, User, Tag } from 'lucide-react';

interface FeedbackEntry {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved';
  date: string;
}

const categories = [
  'Water & Utilities',
  'Transportation',
  'Environment',
  'Safety & Security',
  'Parks & Recreation',
  'Waste Management',
  'Infrastructure',
  'Other'
];

const mockFeedback: FeedbackEntry[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    category: 'Water & Utilities',
    location: 'Main St & 5th Ave',
    description: 'Burst water pipe causing street flooding',
    priority: 'high',
    status: 'in-progress',
    date: '2025-01-08'
  },
  {
    id: '2', 
    name: 'Mike Chen',
    category: 'Transportation',
    location: 'Downtown Transit Hub',
    description: 'Bus stop lighting is not working properly',
    priority: 'medium',
    status: 'pending',
    date: '2025-01-07'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    category: 'Parks & Recreation',
    location: 'Central Park',
    description: 'Playground equipment needs maintenance',
    priority: 'low',
    status: 'resolved',
    date: '2025-01-06'
  }
];

export default function CitizenFeedback() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });
  const [feedback] = useState<FeedbackEntry[]>(mockFeedback);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log('Feedback submitted:', formData);
    setShowForm(false);
    setFormData({
      name: '',
      category: '',
      location: '',
      description: '',
      priority: 'medium'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Citizen Feedback</h2>
          <p className="text-slate-600">Report issues and track community concerns</p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
        >
          {showForm ? 'Cancel' : 'Submit Feedback'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Submit New Feedback</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Tag className="inline h-4 w-4 mr-1" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Street address or landmark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Describe the issue in detail..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
              <div className="flex space-x-4">
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <label key={priority} className="flex items-center">
                    <input
                      type="radio"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="mr-2"
                    />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getPriorityColor(priority)}`}>
                      {priority}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              <Send className="h-4 w-4" />
              <span>Submit Feedback</span>
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Recent Feedback</h3>
        
        <div className="space-y-4">
          {feedback.map((item) => (
            <div key={item.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="mb-2">
                <span className="text-sm font-medium text-emerald-600">{item.category}</span>
                <div className="flex items-center space-x-1 text-sm text-slate-500 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
              </div>
              
              <p className="text-slate-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}