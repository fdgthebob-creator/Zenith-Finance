import React, { useState } from 'react';
import { UserFinancialProfile, Transaction } from '../types';

interface BudgetScreenProps {
  profile: UserFinancialProfile;
  transactions: Transaction[];
  onUpdateLimits: (dining: number, groceries: number, travel: number) => void;
}

export const BudgetScreen: React.FC<BudgetScreenProps> = ({ profile, transactions, onUpdateLimits }) => {
  const [diningLimit, setDiningLimit] = useState(profile.diningLimit || 600);
  const [groceriesLimit, setGroceriesLimit] = useState(profile.groceriesLimit || 850);
  const [travelLimit, setTravelLimit] = useState(profile.travelLimit || 1200);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const handleApplyLimits = () => {
    onUpdateLimits(diningLimit, groceriesLimit, travelLimit);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 pb-28 animate-fade-in max-w-7xl mx-auto px-4 pt-4">
      {/* Overspending Alert Banner */}
      <div className="bg-[#ffdad6] text-[#93000a] p-4 rounded-2xl flex items-start gap-3 shadow-sm border-l-4 border-[#ba1a1a]">
        <span className="material-symbols-outlined text-[#ba1a1a] text-[24px]">warning</span>
        <div>
          <h3 className="font-bold text-sm text-[#93000a]">Overspending Alert</h3>
          <p className="text-xs text-[#93000a]/90 mt-0.5 leading-relaxed">
            Your "Leisure" spending is 12% above your set limit for this month. Consider adjusting your remaining budget.
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Donut Chart & Legend Section (7 cols) */}
        <section className="md:col-span-7 bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-[#e1e3e4] flex flex-col items-center justify-center">
          <div className="flex justify-between w-full mb-6">
            <h2 className="text-lg font-bold text-[#000000]">Monthly Spending</h2>
            <span className="text-xs font-bold text-[#3f6653]">Details</span>
          </div>

          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Donut chart SVG representation */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#edeeef" strokeWidth="3" />
              {/* Needs 50% */}
              <circle 
                cx="18" cy="18" r="15.915" fill="transparent" stroke="#3f6653" 
                strokeWidth="3" strokeDasharray="50 100" strokeDashoffset="0"
              />
              {/* Wants 30% */}
              <circle 
                cx="18" cy="18" r="15.915" fill="transparent" stroke="#cba72f" 
                strokeWidth="3" strokeDasharray="30 100" strokeDashoffset="-50"
              />
              {/* Savings 20% */}
              <circle 
                cx="18" cy="18" r="15.915" fill="transparent" stroke="#75777e" 
                strokeWidth="3" strokeDasharray="20 100" strokeDashoffset="-80"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[11px] text-[#44474d] font-semibold uppercase tracking-wider">Total spent</p>
              <span className="text-3xl font-extrabold text-[#000000]">${profile.monthlySpent.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full mt-6 pt-2 border-t border-[#e1e3e4]/60">
            <div className="flex items-center gap-2 justify-center">
              <span className="w-3 h-3 rounded-full bg-[#3f6653]"></span>
              <span className="text-xs font-semibold text-[#191c1d]">Needs (50%)</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="w-3 h-3 rounded-full bg-[#cba72f]"></span>
              <span className="text-xs font-semibold text-[#191c1d]">Wants (30%)</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="w-3 h-3 rounded-full bg-[#75777e]"></span>
              <span className="text-xs font-semibold text-[#191c1d]">Savings (20%)</span>
            </div>
          </div>
        </section>

        {/* 50/30/20 Rule Guide (5 cols) */}
        <section className="md:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-[#e1e3e4] space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold text-[#000000]">Budget Guide</h2>
              <span className="bg-[#beead1] text-[#436b58] px-3 py-1 rounded-full text-xs font-bold">50/30/20 Rule</span>
            </div>
            <p className="text-xs text-[#44474d] mb-4">Tracking your journey toward ideal wealth allocation.</p>

            <div className="space-y-4">
              {/* Needs */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#191c1d] font-semibold">Needs (Target 50%)</span>
                  <span className="text-[#3f6653] font-bold">48% Actual</span>
                </div>
                <div className="h-2.5 w-full bg-[#edeeef] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3f6653] w-[48%] rounded-full"></div>
                </div>
              </div>

              {/* Wants */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#191c1d] font-semibold">Wants (Target 30%)</span>
                  <span className="text-[#ba1a1a] font-bold">38% Actual</span>
                </div>
                <div className="h-2.5 w-full bg-[#edeeef] rounded-full overflow-hidden">
                  <div className="h-full bg-[#cba72f] w-[38%] rounded-full"></div>
                </div>
              </div>

              {/* Savings */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#191c1d] font-semibold">Savings (Target 20%)</span>
                  <span className="text-[#44474d] font-bold">14% Actual</span>
                </div>
                <div className="h-2.5 w-full bg-[#edeeef] rounded-full overflow-hidden">
                  <div className="h-full bg-[#75777e] w-[14%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#f8f9fa] rounded-xl border border-[#c5c6cd]/50 flex gap-3 items-center">
            <span className="material-symbols-outlined text-[#3f6653] text-[20px] fill-1">lightbulb</span>
            <p className="text-xs text-[#44474d] italic leading-relaxed">
              "Transferring $200 from Leisure to Savings would align you with your quarterly goals."
            </p>
          </div>
        </section>

        {/* Set Budget Limits Sliders (5 cols) */}
        <section className="md:col-span-5 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-[#e1e3e4] space-y-5">
          <h2 className="text-lg font-bold text-[#000000]">Limits</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-[#191c1d]">Dining Out</label>
                <span className="text-[#3f6653] font-bold">${diningLimit}</span>
              </div>
              <input 
                type="range" min="0" max="2000" step="50"
                value={diningLimit} onChange={(e) => setDiningLimit(Number(e.target.value))}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-[#191c1d]">Groceries</label>
                <span className="text-[#3f6653] font-bold">${groceriesLimit}</span>
              </div>
              <input 
                type="range" min="0" max="2000" step="50"
                value={groceriesLimit} onChange={(e) => setGroceriesLimit(Number(e.target.value))}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-[#191c1d]">Travel</label>
                <span className="text-[#3f6653] font-bold">${travelLimit}</span>
              </div>
              <input 
                type="range" min="0" max="5000" step="100"
                value={travelLimit} onChange={(e) => setTravelLimit(Number(e.target.value))}
              />
            </div>
          </div>

          <button 
            onClick={handleApplyLimits}
            className="w-full py-3 bg-[#3f6653] text-white rounded-xl font-bold text-xs hover:bg-[#274e3d] transition-colors active:scale-95 duration-150 shadow-sm"
          >
            {appliedNotice ? "Limits Applied ✓" : "Apply New Limits"}
          </button>
        </section>

        {/* Expense List (7 cols) */}
        <section className="md:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-[#e1e3e4]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[#000000]">Recent Activity</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs border border-[#c5c6cd] rounded-full hover:bg-[#f3f4f5]">Filter</button>
              <button className="px-3 py-1 text-xs bg-[#edeeef] text-[#191c1d] rounded-full font-semibold">This Week</button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="py-1 text-[11px] font-bold text-[#44474d] uppercase tracking-widest border-b border-[#e1e3e4]">
              Wants — Oct 14
            </div>
            
            <div className="py-2.5 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors rounded-xl px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#beead1] flex items-center justify-center text-[#3f6653]">
                  <span className="material-symbols-outlined text-[20px]">restaurant</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#000000]">Artisan Bistro</h4>
                  <p className="text-[11px] text-[#44474d]">Dining & Social</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#000000]">-$124.50</span>
                <p className="text-[10px] text-[#44474d]">Visa • 14:32</p>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors rounded-xl px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#cba72f]/20 flex items-center justify-center text-[#735c00]">
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#000000]">Nordstrom</h4>
                  <p className="text-[11px] text-[#44474d]">Apparel</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#000000]">-$430.00</span>
                <p className="text-[10px] text-[#44474d]">Visa • 11:15</p>
              </div>
            </div>

            <div className="py-1 mt-3 text-[11px] font-bold text-[#44474d] uppercase tracking-widest border-b border-[#e1e3e4]">
              Needs — Oct 13
            </div>

            <div className="py-2.5 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors rounded-xl px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#b9c7e4]/40 flex items-center justify-center text-[#0d1c32]">
                  <span className="material-symbols-outlined text-[20px]">home</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#000000]">Metropolis Rental</h4>
                  <p className="text-[11px] text-[#44474d]">Housing</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#000000]">-$3,200.00</span>
                <p className="text-[10px] text-[#44474d]">ACH • Monthly</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
