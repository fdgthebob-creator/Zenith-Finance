import React, { useState } from 'react';
import { Goal } from '../types';

interface GoalsScreenProps {
  goals: Goal[];
  onAddGoal: (newGoal: Omit<Goal, 'id' | 'progressPercent'>) => void;
}

export const GoalsScreen: React.FC<GoalsScreenProps> = ({ goals, onAddGoal }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [targetAmount, setTargetAmount] = useState<number | string>(10000);
  const [targetDate, setTargetDate] = useState('Dec 2025');
  const [category, setCategory] = useState('Savings');
  const [acceptedSuggestion, setAcceptedSuggestion] = useState(false);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const amount = typeof targetAmount === 'number' ? targetAmount : parseFloat(targetAmount) || 5000;
    
    onAddGoal({
      title,
      subtitle: subtitle || 'Custom wealth target',
      currentAmount: 0,
      targetAmount: amount,
      targetDate,
      category,
      icon: category === 'Real Estate' ? 'home' : category === 'Travel' ? 'flight' : 'stars',
      colorBg: 'bg-[#beead1]',
      colorText: 'text-[#3f6653]',
    });

    setTitle('');
    setSubtitle('');
    setShowAddModal(false);
  };

  const totalGrowth = goals.reduce((acc, g) => acc + g.currentAmount, 0);

  return (
    <div className="space-y-6 pb-28 animate-fade-in max-w-7xl mx-auto px-4 pt-4">
      {/* Total Savings Growth Hero */}
      <section className="glass-card rounded-2xl p-6 shadow-sm relative overflow-hidden bg-white/85">
        <div className="relative z-10">
          <span className="text-xs font-bold text-[#3f6653] uppercase tracking-wider">Total Savings Growth</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-[#000000]">${totalGrowth.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span className="text-xs font-bold text-[#436b58] bg-[#beead1] px-2 py-0.5 rounded-full">+4.2%</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#3f6653] text-[20px] fill-1">stars</span>
              <span className="text-xs font-semibold text-[#191c1d]">{goals.length} Active Goals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#cba72f] text-[20px] fill-1">military_tech</span>
              <span className="text-xs font-semibold text-[#191c1d]">Elite Saver Status</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#beead1]/30 rounded-full blur-2xl pointer-events-none"></div>
      </section>

      {/* Goal Grid (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((g) => {
          const isMain = g.title === 'Emergency Fund';
          return (
            <div 
              key={g.id}
              className={`glass-card rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:scale-[0.99] transition-transform bg-white/80 ${
                isMain ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${g.colorBg} ${g.colorText}`}>
                    <span className="material-symbols-outlined text-[22px]">{g.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#191c1d]">{g.title}</h3>
                    <p className="text-xs text-[#75777e]">{g.subtitle}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#3f6653]">{g.progressPercent}% Complete</span>
              </div>

              <div className="mt-auto pt-2">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span>${g.currentAmount.toLocaleString()} Saved</span>
                  <span className="text-[#75777e]">${g.targetAmount.toLocaleString()} Target</span>
                </div>

                <div className="h-2.5 w-full bg-[#edeeef] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#3f6653] transition-all duration-700 ease-out"
                    style={{ width: `${Math.min(g.progressPercent, 100)}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-[#44474d] font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> {g.targetDate}
                  </span>
                  {g.momentum && (
                    <span className="bg-[#e7e8e9] px-2 py-0.5 rounded font-semibold text-[#191c1d]">{g.momentum}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Goal Template Card */}
        <div 
          onClick={() => setShowAddModal(true)}
          className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-dashed border-[#c5c6cd] hover:bg-[#f3f4f5] transition-colors cursor-pointer group min-h-[160px]"
        >
          <div className="w-12 h-12 rounded-full bg-[#e7e8e9] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[#3f6653] text-2xl">add</span>
          </div>
          <h3 className="mt-3 font-bold text-sm text-[#191c1d]">Add New Goal</h3>
          <p className="text-xs text-[#75777e] mt-0.5">Start from a template</p>
        </div>

        {/* Milestones Card */}
        <div className="glass-card rounded-2xl p-5 shadow-sm bg-white/80">
          <h3 className="text-xs font-bold text-[#3f6653] uppercase tracking-wider mb-3">Recent Milestones</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#beead1] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#436b58] text-[20px]">workspace_premium</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#191c1d]">First $1,000 saved!</p>
                <p className="text-[11px] text-[#75777e]">Unlocked 2 days ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 opacity-60">
              <div className="w-10 h-10 rounded-full bg-[#edeeef] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#75777e] text-[20px]">lock</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#191c1d]">Consistent Saver (3mo)</p>
                <p className="text-[11px] text-[#75777e]">Estimated 15 days away</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2 text-[#3f6653] text-xs font-bold hover:bg-[#beead1]/20 rounded-xl transition-colors">
            View All Badges
          </button>
        </div>
      </section>

      {/* Mentor Insight Section */}
      <section className="bg-[#beead1]/30 border border-[#beead1] rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="w-11 h-11 shrink-0 rounded-full bg-[#3f6653] flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-[24px]">spa</span>
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#436b58] uppercase tracking-wider">Serenity Insight</h4>
          <p className="text-xs text-[#274e3d] mt-1 leading-relaxed">
            Julian, you're 12% closer to your "Emergency Fund" than last month. At this pace, you could reach your goal 2 months earlier than projected. Consider a "Stretch Goal" of $200 extra this month to unlock the "Speed Demon" badge.
          </p>
          <button 
            onClick={() => setAcceptedSuggestion(true)}
            className="mt-3 text-xs font-extrabold text-[#3f6653] hover:underline"
          >
            {acceptedSuggestion ? "Suggestion Accepted ✓ ($200 allocated)" : "Accept Suggestion →"}
          </button>
        </div>
      </section>

      {/* Modal to create a new custom goal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e1e3e4]">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#e1e3e4]">
              <h3 className="font-bold text-base text-[#191c1d]">Add New Financial Goal</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#75777e] hover:text-black">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191c1d] mb-1">Goal Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Sabbatical Fund, New Tesla, Wedding"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191c1d] mb-1">Subtitle / Purpose</label>
                <input 
                  type="text"
                  placeholder="e.g. 3 months of freedom"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#191c1d] mb-1">Target Amount ($)</label>
                  <input 
                    type="number"
                    required
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191c1d] mb-1">Target Date</label>
                  <input 
                    type="text"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191c1d] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                >
                  <option value="Savings">General Savings</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Travel">Travel & Lifestyle</option>
                  <option value="Security">Emergency & Security</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#3f6653] text-white rounded-xl font-bold text-xs hover:bg-[#274e3d] transition-colors mt-2"
              >
                Create Goal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
