import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
}

const colorClasses = {
  yellow: 'from-yellow-400 to-orange-500',
  blue: 'from-blue-400 to-cyan-500',
  green: 'from-green-400 to-emerald-500',
  emerald: 'from-emerald-400 to-teal-500',
  purple: 'from-purple-400 to-violet-500',
  indigo: 'from-indigo-400 to-blue-500',
};

export default function MetricCard({ title, value, change, trend, icon: Icon, color }: MetricCardProps) {
  const gradientClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const trendBg = trend === 'up' ? 'bg-green-100' : 'bg-red-100';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${gradientClass}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${trendBg}`}>
          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
          <span className={`text-sm font-medium ${trendColor}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}