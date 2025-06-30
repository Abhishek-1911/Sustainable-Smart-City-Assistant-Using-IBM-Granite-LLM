import React, { useState } from 'react';
import { TrendingUp, Upload, Calendar, BarChart3, Target } from 'lucide-react';

interface ForecastData {
  id: string;
  metric: string;
  currentValue: number;
  forecastValue: number;
  period: string;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  historicalData: number[];
  forecastData: number[];
}

const mockForecasts: ForecastData[] = [
  {
    id: '1',
    metric: 'Energy Consumption (MW)',
    currentValue: 2847,
    forecastValue: 3125,
    period: '2025 Q2',
    confidence: 87,
    trend: 'increasing',
    historicalData: [2200, 2350, 2500, 2650, 2847],
    forecastData: [2950, 3025, 3125, 3200, 3275]
  },
  {
    id: '2',
    metric: 'Water Usage (Million Gal)',
    currentValue: 1.2,
    forecastValue: 1.35,
    period: '2025 Q2',
    confidence: 92,
    trend: 'increasing',
    historicalData: [0.95, 1.02, 1.08, 1.15, 1.2],
    forecastData: [1.25, 1.28, 1.35, 1.42, 1.48]
  },
  {
    id: '3',
    metric: 'Waste Generation (Tons)',
    currentValue: 890,
    forecastValue: 825,
    period: '2025 Q2',
    confidence: 78,
    trend: 'decreasing',
    historicalData: [1100, 1050, 980, 920, 890],
    forecastData: [870, 850, 825, 810, 795]
  },
  {
    id: '4',
    metric: 'Air Quality Index',
    currentValue: 42,
    forecastValue: 38,
    period: '2025 Q2',
    confidence: 84,
    trend: 'decreasing',
    historicalData: [65, 58, 52, 47, 42],
    forecastData: [40, 39, 38, 37, 36]
  }
];

export default function KPIForecasting() {
  const [forecasts] = useState<ForecastData[]>(mockForecasts);
  const [selectedMetric, setSelectedMetric] = useState<ForecastData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (files: FileList) => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, this would trigger ML forecasting on the uploaded data
    }, 3000);
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-orange-600';
      case 'decreasing': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      case 'stable': return <BarChart3 className="h-4 w-4 text-blue-500" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">KPI Forecasting</h2>
        <p className="text-slate-600">Predict future city metrics using machine learning algorithms</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Upload Historical Data</h3>
        
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 mb-2">Upload CSV files with historical KPI data for forecasting</p>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            id="forecast-upload"
          />
          <label
            htmlFor="forecast-upload"
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 inline-block"
          >
            Choose File
          </label>
          <p className="text-sm text-slate-500 mt-2">Supports CSV and Excel files with time-series data</p>
        </div>
        
        {isProcessing && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <p className="text-blue-700 font-medium">Processing data and generating forecasts...</p>
            </div>
          </div>
        )}
      </div>

      {/* Forecasts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {forecasts.map((forecast) => (
          <div
            key={forecast.id}
            className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedMetric(forecast)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-slate-800">{forecast.metric}</h3>
              </div>
              {getTrendIcon(forecast.trend)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-slate-500">Current</p>
                <p className="text-2xl font-bold text-slate-800">{forecast.currentValue}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Forecast ({forecast.period})</p>
                <p className={`text-2xl font-bold ${getTrendColor(forecast.trend)}`}>
                  {forecast.forecastValue}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">
                  {forecast.confidence}% confidence
                </span>
              </div>
              <span className={`text-sm font-medium capitalize ${getTrendColor(forecast.trend)}`}>
                {forecast.trend}
              </span>
            </div>
            
            {/* Mini Chart */}
            <div className="mt-4 h-16 flex items-end space-x-1">
              {[...forecast.historicalData, ...forecast.forecastData.slice(0, 3)].map((value, index) => {
                const maxValue = Math.max(...forecast.historicalData, ...forecast.forecastData);
                const height = (value / maxValue) * 100;
                const isHistorical = index < forecast.historicalData.length;
                
                return (
                  <div
                    key={index}
                    className={`flex-1 rounded-t ${
                      isHistorical 
                        ? 'bg-emerald-400' 
                        : 'bg-blue-400 opacity-70'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800">{selectedMetric.metric}</h3>
                <button
                  onClick={() => setSelectedMetric(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-600 mb-1">Current Value</p>
                  <p className="text-2xl font-bold text-slate-800">{selectedMetric.currentValue}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-sm text-emerald-600 mb-1">Forecast Value</p>
                  <p className="text-2xl font-bold text-emerald-700">{selectedMetric.forecastValue}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-blue-600 mb-1">Confidence Level</p>
                  <p className="text-2xl font-bold text-blue-700">{selectedMetric.confidence}%</p>
                </div>
              </div>
              
              {/* Large Chart */}
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-800">Historical vs Forecast Trend</h4>
                  <div className="flex space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-400 rounded"></div>
                      <span>Historical</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded"></div>
                      <span>Forecast</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-48 flex items-end space-x-2">
                  {[...selectedMetric.historicalData, ...selectedMetric.forecastData].map((value, index) => {
                    const maxValue = Math.max(...selectedMetric.historicalData, ...selectedMetric.forecastData);
                    const height = (value / maxValue) * 100;
                    const isHistorical = index < selectedMetric.historicalData.length;
                    
                    return (
                      <div
                        key={index}
                        className={`flex-1 rounded-t transition-all duration-500 ${
                          isHistorical 
                            ? 'bg-emerald-400' 
                            : 'bg-blue-400'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm text-emerald-700">
                  <strong>Forecast Methodology:</strong> This prediction uses Linear Regression analysis 
                  on historical data patterns. The confidence level indicates the statistical reliability 
                  of the forecast based on data quality and trend consistency.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}