import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'budget', label: 'Budget', icon: 'account_balance_wallet' },
    { id: 'invest', label: 'Invest', icon: 'trending_up' },
    { id: 'goals', label: 'Goals', icon: 'target' },
    { id: 'coach', label: 'Coach', icon: 'person' },
    { id: 'profile', label: 'Profile', icon: 'shield_with_heart' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe pt-2 bg-white/95 backdrop-blur-lg border-t border-[#c5c6cd]/30 shadow-lg rounded-t-2xl max-w-7xl mx-auto left-0 right-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center px-3 py-1.5 transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-[#beead1] text-[#436b58] rounded-full scale-100 font-semibold shadow-sm px-4'
                : 'text-[#44474d] hover:text-[#3f6653] opacity-80'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-[22px] ${isActive ? 'fill-1' : ''}`}
            >
              {tab.icon}
            </span>
            <span className="text-[11px] font-medium leading-none mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
