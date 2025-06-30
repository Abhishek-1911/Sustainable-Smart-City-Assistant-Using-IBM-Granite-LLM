import React from 'react';

interface ProgressChartProps {
  name: string;
  current: number;
  target: number;
}

export default function ProgressChart({ name, current, target }: ProgressChartProps) {
  const percentage = (current / target) * 100;
  const isOnTrack = current >= target * 0.8;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-sm text-slate-500">{current}% / {target}%</span>
      </div>
      
      <div className="w-full bg-slate-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-500 ${
            isOnTrack ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-slate-500">
        <span>Progress: {current}%</span>
        <span className={isOnTrack ? 'text-green-600' : 'text-orange-600'}>
          {isOnTrack ? 'On Track' : 'Needs Attention'}
        </span>
      </div>
    </div>
  );
}