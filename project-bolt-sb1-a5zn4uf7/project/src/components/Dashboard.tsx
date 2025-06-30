import React from 'react';
import { 
  Zap, 
  Droplets, 
  Wind, 
  Recycle, 
  Users, 
  Car,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import MetricCard from './ui/MetricCard';
import ProgressChart from './ui/ProgressChart';

const kpiData = [
  {
    title: 'Energy Consumption',
    value: '2,847 MW',
    change: -12,
    trend: 'down',
    icon: Zap,
    color: 'yellow'
  },
  {
    title: 'Water Usage',
    value: '1.2M Gal',
    change: -8,
    trend: 'down', 
    icon: Droplets,
    color: 'blue'
  },
  {
    title: 'Air Quality Index',
    value: '42 AQI',
    change: 15,
    trend: 'up',
    icon: Wind,
    color: 'green'
  },
  {
    title: 'Waste Recycled',
    value: '78%',
    change: 23,
    trend: 'up',
    icon: Recycle,
    color: 'emerald'
  },
  {
    title: 'Population',
    value: '2.4M',
    change: 3,
    trend: 'up',
    icon: Users,
    color: 'purple'
  },
  {
    title: 'EV Adoption',
    value: '34%',
    change: 18,
    trend: 'up',
    icon: Car,
    color: 'indigo'
  }
];

const chartData = [
  { name: 'Energy', current: 85, target: 70 },
  { name: 'Water', current: 72, target: 80 },
  { name: 'Waste', current: 78, target: 85 },
  { name: 'Transport', current: 34, target: 50 },
  { name: 'Air Quality', current: 82, target: 90 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">City Health Dashboard</h2>
        <p className="text-slate-600">Real-time insights into city sustainability metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Sustainability Progress</h3>
          <div className="space-y-4">
            {chartData.map((item, index) => (
              <ProgressChart key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl border border-red-200">
              <TrendingUp className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Energy Spike Detected</p>
                <p className="text-sm text-red-600">Sector 12 showing 40% increase</p>
                <p className="text-xs text-red-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <Droplets className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Water Pressure Low</p>
                <p className="text-sm text-yellow-600">North District below threshold</p>
                <p className="text-xs text-yellow-500 mt-1">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
              <TrendingDown className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Waste Reduction Goal Met</p>
                <p className="text-sm text-green-600">Monthly target achieved early</p>
                <p className="text-xs text-green-500 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}