import React, { useState } from 'react';
import { AlertTriangle, Upload, TrendingUp, TrendingDown, Activity, Shield } from 'lucide-react';

interface Anomaly {
  id: string;
  metric: string;
  value: number;
  expected: number;
  deviation: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  location: string;
  description: string;
}

const mockAnomalies: Anomaly[] = [
  {
    id: '1',
    metric: 'Energy Consumption',
    value: 3420,
    expected: 2450,
    deviation: 39.6,
    severity: 'critical',
    timestamp: '2025-01-08 14:30',
    location: 'Sector 12',
    description: 'Unexpected 40% surge in energy consumption detected. Investigation reveals unauthorized construction activity consuming electricity outside permitted levels.'
  },
  {
    id: '2',
    metric: 'Water Pressure',
    value: 35,
    expected: 50,
    deviation: -30,
    severity: 'high',
    timestamp: '2025-01-08 12:15',
    location: 'North District',
    description: 'Water pressure dropped significantly below normal thresholds. Potential pipe damage or excessive demand detected in the distribution network.'
  },
  {
    id: '3',
    metric: 'Air Quality Index',
    value: 85,
    expected: 45,
    deviation: 88.9,
    severity: 'medium',
    timestamp: '2025-01-08 09:45',
    location: 'Industrial Zone',
    description: 'Air quality measurements show elevated particulate matter levels. Likely related to increased industrial activity during morning shift changes.'
  },
  {
    id: '4',
    metric: 'Waste Collection',
    value: 12,
    expected: 20,
    deviation: -40,
    severity: 'low',
    timestamp: '2025-01-07 16:20',
    location: 'Residential Area B',
    description: 'Lower than expected waste collection volumes. Holiday schedules or route optimization may have affected normal collection patterns.'
  }
];

const metrics = [
  'Energy Consumption',
  'Water Usage',
  'Air Quality',
  'Waste Generation',
  'Traffic Flow',
  'Temperature',
  'Noise Levels',
  'Water Pressure'
];

export default function AnomalyDetection() {
  const [anomalies] = useState<Anomaly[]>(mockAnomalies);
  const [selectedMetric, setSelectedMetric] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'high': return <TrendingUp className="h-5 w-5 text-orange-600" />;
      case 'medium': return <Activity className="h-5 w-5 text-yellow-600" />;
      case 'low': return <Shield className="h-5 w-5 text-blue-600" />;
      default: return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleFileUpload = (files: FileList) => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // In a real app, this would trigger anomaly detection on the uploaded data
    }, 3000);
  };

  const filteredAnomalies = selectedMetric 
    ? anomalies.filter(anomaly => anomaly.metric === selectedMetric)
    : anomalies;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Anomaly Detection</h2>
        <p className="text-slate-600">Monitor city KPIs and detect unusual patterns in real-time</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Critical</p>
              <p className="text-3xl font-bold text-red-700">
                {anomalies.filter(a => a.severity === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">High</p>
              <p className="text-3xl font-bold text-orange-700">
                {anomalies.filter(a => a.severity === 'high').length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-yellow-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Medium</p>
              <p className="text-3xl font-bold text-yellow-700">
                {anomalies.filter(a => a.severity === 'medium').length}
              </p>
            </div>
            <Activity className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Low</p>
              <p className="text-3xl font-bold text-blue-700">
                {anomalies.filter(a => a.severity === 'low').length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Upload and Filter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Upload KPI Data</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200">
            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-2">Upload CSV files with KPI data for analysis</p>
            <input
              type="file"
              accept=".csv,.xlsx,.json"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
              id="kpi-upload"
            />
            <label
              htmlFor="kpi-upload"
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 inline-block"
            >
              Choose File
            </label>
          </div>
          
          {isAnalyzing && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <p className="text-blue-700 font-medium">Analyzing data for anomalies...</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Filter by Metric</h3>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">All Metrics</option>
            {metrics.map((metric) => (
              <option key={metric} value={metric}>{metric}</option>
            ))}
          </select>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <p className="text-2xl font-bold text-emerald-600">{filteredAnomalies.length}</p>
              <p className="text-sm text-emerald-700">Active Anomalies</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-600">24/7</p>
              <p className="text-sm text-slate-700">Monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Anomalies List */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Detected Anomalies</h3>
        
        <div className="space-y-4">
          {filteredAnomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getSeverityIcon(anomaly.severity)}
                  <div>
                    <h4 className="font-semibold text-slate-800">{anomaly.metric}</h4>
                    <p className="text-sm text-slate-500">{anomaly.location} • {anomaly.timestamp}</p>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(anomaly.severity)}`}>
                  {anomaly.severity}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Current Value</p>
                  <p className="text-lg font-bold text-slate-800">{anomaly.value}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Expected Value</p>
                  <p className="text-lg font-bold text-slate-600">{anomaly.expected}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">Deviation</p>
                  <div className="flex items-center space-x-1">
                    {anomaly.deviation > 0 ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-blue-500" />
                    )}
                    <p className={`text-lg font-bold ${anomaly.deviation > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                      {Math.abs(anomaly.deviation)}%
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-700 leading-relaxed">{anomaly.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}