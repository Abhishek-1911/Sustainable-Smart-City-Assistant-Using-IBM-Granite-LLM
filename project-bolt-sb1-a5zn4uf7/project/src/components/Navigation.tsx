import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Module } from '../App';

interface NavigationProps {
  modules: Array<{
    id: Module;
    name: string;
    icon: LucideIcon;
  }>;
  activeModule: Module;
  onModuleChange: (module: Module) => void;
}

export default function Navigation({ modules, activeModule, onModuleChange }: NavigationProps) {
  return (
    <nav className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Modules</h2>
      <div className="space-y-2">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg'
                  : 'hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span className="font-medium">{module.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}