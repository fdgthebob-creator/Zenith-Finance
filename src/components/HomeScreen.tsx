import React, { useState } from 'react';
import { UserFinancialProfile, Transaction, TabType } from '../types';

interface HomeScreenProps {
  profile: UserFinancialProfile;
  transactions: Transaction[];
  setActiveTab: (tab: TabType) => void;
  onOpenAddTransaction: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ profile, transactions, setActiveTab, onOpenAddTransaction }) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const displayedTransactions = showAllTransactions ? transactions : transactions.slice(0, 3);

  return (
    <div className="space-y-6 pb-28 animate-fade-in max-w-7xl mx-auto px-4 pt-4">
      {/* Hero Card: Available to Spend */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#e1e3e4] relative overflow-hidden active-scale">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-semibold text-[#44474d] uppercase tracking-wider">Available to Spend</p>
            <h2 className="text-4xl font-extrabold text-[#000000] tracking-tight">
              ${profile.availableToSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
            <p className="text-sm font-semibold text-[#3f6653] flex items-center justify-center md:justify-start gap-1 pt-1">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              8% more than last month
            </p>
          </div>

          {/* Circular Progress Ring (72% of budget) */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 md:w-36 md:h-36">
              <circle 
                className="text-[#edeeef]" 
                cx="64" 
                cy="64" 
                r="52" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="10" 
              />
              <circle 
                className="text-[#3f6653] transition-all duration-1000 ease-out" 
                cx="64" 
                cy="64" 
                r="52" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="10" 
                strokeLinecap="round" 
                style={{
                  strokeDasharray: '326.72',
                  strokeDashoffset: '91.48', // 72% filled
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%'
                }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold text-[#000000]">72%</span>
              <span className="text-[11px] font-medium text-[#44474d]">of budget</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary Row (Bento Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Saved Card */}
        <div 
          onClick={() => setActiveTab('budget')}
          className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-[#3f6653] border-t border-r border-b border-[#e1e3e4] active-scale cursor-pointer hover:shadow-md transition-shadow"
        >
          <p className="text-xs font-semibold text-[#44474d] mb-1">Saved This Month</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#000000]">${profile.savedThisMonth.toLocaleString()}</span>
            <span className="text-xs font-bold text-[#274e3d] bg-[#beead1] px-2 py-0.5 rounded-full">+12%</span>
          </div>
        </div>

        {/* Invested Card */}
        <div 
          onClick={() => setActiveTab('invest')}
          className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-[#cba72f] border-t border-r border-b border-[#e1e3e4] active-scale cursor-pointer hover:shadow-md transition-shadow"
        >
          <p className="text-xs font-semibold text-[#44474d] mb-1">Invested</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#000000]">${profile.investedThisMonth.toLocaleString()}</span>
            <span className="text-xs font-bold text-[#574500] bg-[#ffe088] px-2 py-0.5 rounded-full">Target hit</span>
          </div>
        </div>

        {/* Net Worth Card */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="bg-[#0d1c32] p-4 rounded-2xl shadow-sm text-white active-scale cursor-pointer hover:bg-[#132744] transition-colors"
        >
          <p className="text-xs font-semibold text-[#76849f] mb-1">Net Worth</p>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-white">${profile.netWorth.toLocaleString()}</span>
            <span className="material-symbols-outlined text-[#a5d0b9] text-[20px] fill-1">shield_with_heart</span>
          </div>
        </div>
      </section>

      {/* AI Coach Insight Chat Bubble */}
      <section className="bg-[#beead1]/30 border border-[#beead1] rounded-2xl p-5 flex gap-4 items-start shadow-sm active-scale">
        <div className="w-11 h-11 rounded-full bg-[#3f6653] flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-white text-[22px]">smart_toy</span>
        </div>
        <div className="space-y-1 flex-1">
          <p className="text-xs font-bold text-[#3f6653] uppercase tracking-wider">Wealth Mentor</p>
          <p className="text-sm font-normal text-[#436b58] leading-relaxed">
            "Julian, you've already hit 85% of your 'Wants' budget for this week. If you hold off on that luxury dinner, you could reach your 'Italy Trip' goal 2 weeks earlier."
          </p>
          <button 
            onClick={() => setActiveTab('coach')}
            className="text-xs font-bold text-[#3f6653] underline pt-1 inline-block hover:opacity-80 transition-opacity"
          >
            Ask Coach & Adjust goals →
          </button>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold text-[#000000]">Recent Transactions</h3>
          <div className="flex gap-2">
            <button 
              onClick={onOpenAddTransaction}
              className="text-xs font-bold text-white bg-[#3f6653] px-3 py-1 rounded-full hover:bg-[#274e3d] transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">add</span> Add
            </button>
            <button 
              onClick={() => setShowAllTransactions(!showAllTransactions)}
              className="text-xs font-semibold text-[#3f6653] hover:underline"
            >
              {showAllTransactions ? "Show less" : "View all"}
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {displayedTransactions.map((tx) => {
            const isNeeds = tx.category === 'Needs';
            const isWants = tx.category === 'Wants';

            return (
              <div 
                key={tx.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-[#e1e3e4]/60 flex items-center justify-between active-scale hover:border-[#a5d0b9] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f3f4f5] flex items-center justify-center text-[#44474d]">
                    <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#000000]">{tx.merchant}</p>
                    <p className="text-xs text-[#44474d]">{tx.date} • {tx.time}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-[#000000]">-${tx.amount.toFixed(2)}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isNeeds 
                      ? 'bg-[#beead1] text-[#3f6653]' 
                      : isWants 
                      ? 'bg-[#ffe088] text-[#574500]' 
                      : 'bg-[#d6e3ff] text-[#39475f]'
                  }`}>
                    {tx.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
