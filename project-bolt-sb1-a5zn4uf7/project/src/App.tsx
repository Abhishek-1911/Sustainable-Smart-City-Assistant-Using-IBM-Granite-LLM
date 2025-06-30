import React, { useState } from 'react';
import { 
  Building2, 
  MessageSquare, 
  FileText, 
  Leaf, 
  AlertTriangle, 
  TrendingUp, 
  Bot,
  BarChart3
} from 'lucide-react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CitizenFeedback from './components/CitizenFeedback';
import DocumentSummarization from './components/DocumentSummarization';
import EcoAdvice from './components/EcoAdvice';
import AnomalyDetection from './components/AnomalyDetection';
import KPIForecasting from './components/KPIForecasting';
import ChatAssistant from './components/ChatAssistant';

export type Module = 
  | 'dashboard' 
  | 'feedback' 
  | 'documents' 
  | 'eco-advice' 
  | 'anomaly' 
  | 'forecasting' 
  | 'chat';

const modules = [
  { id: 'dashboard' as Module, name: 'City Health Dashboard', icon: BarChart3 },
  { id: 'feedback' as Module, name: 'Citizen Feedback', icon: MessageSquare },
  { id: 'documents' as Module, name: 'Document Summarization', icon: FileText },
  { id: 'eco-advice' as Module, name: 'Eco Advice', icon: Leaf },
  { id: 'anomaly' as Module, name: 'Anomaly Detection', icon: AlertTriangle },
  { id: 'forecasting' as Module, name: 'KPI Forecasting', icon: TrendingUp },
  { id: 'chat' as Module, name: 'Chat Assistant', icon: Bot },
];

function App() {
  const [activeModule, setActiveModule] = useState<Module>('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'feedback':
        return <CitizenFeedback />;
      case 'documents':
        return <DocumentSummarization />;
      case 'eco-advice':
        return <EcoAdvice />;
      case 'anomaly':
        return <AnomalyDetection />;
      case 'forecasting':
        return <KPIForecasting />;
      case 'chat':
        return <ChatAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Smart City Assistant
                </h1>
                <p className="text-sm text-slate-600">Powered by IBM Granite LLM</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Navigation 
              modules={modules} 
              activeModule={activeModule} 
              onModuleChange={setActiveModule} 
            />
          </div>
          <div className="lg:col-span-3">
            <div className="animate-in slide-in-from-right-10 duration-500">
              {renderModule()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;