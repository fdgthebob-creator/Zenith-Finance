import React, { useState } from 'react';
import { UserFinancialProfile } from '../types';

interface InvestScreenProps {
  profile: UserFinancialProfile;
}

export const InvestScreen: React.FC<InvestScreenProps> = ({ profile }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1M' | '6M' | '1Y' | 'ALL'>('1Y');
  const [selectedArticle, setSelectedArticle] = useState<{ title: string; category: string; content: string } | null>(null);
  const [selectedInvestment, setSelectedInvestment] = useState<{ name: string; risk: string; desc: string; returnRate: string } | null>(null);
  const [investAmount, setInvestAmount] = useState<number | string>(1000);
  const [investSuccess, setInvestSuccess] = useState(false);

  const articles = [
    {
      title: "The Magic of Compounding",
      category: "Foundation",
      badgeBg: "from-[#beead1] to-white",
      tagColor: "text-[#436b58]",
      desc: "How small, regular investments grow into a legacy over time.",
      content: "Compounding interest is often dubbed the eighth wonder of the world. By consistently reinvesting dividends and capital gains, your initial capital expands exponentially. The key is start early and remain disciplined through market cycles."
    },
    {
      title: "Why Index Funds?",
      category: "Strategy",
      badgeBg: "from-[#ffe088] to-white",
      tagColor: "text-[#574500]",
      desc: "Understanding why passive investing often beats active market pros.",
      content: "Broad-market index funds capture aggregate human productivity and market expansion with low management fees. Over 10+ year horizons, over 85% of active fund managers fail to outperform standard index benchmarks."
    },
    {
      title: "Risk vs. Reward",
      category: "Psychology",
      badgeBg: "from-[#d6e3ff] to-white",
      tagColor: "text-[#39475f]",
      desc: "Learning to balance your emotional comfort with your financial goals.",
      content: "Risk in investing isn't merely volatility—it's the risk of permanent capital loss or shortfall against inflation. Aligning asset allocation with your personal timeline preserves emotional peace."
    }
  ];

  const handleInvestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInvestSuccess(true);
    setTimeout(() => {
      setInvestSuccess(false);
      setSelectedInvestment(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-28 animate-fade-in max-w-7xl mx-auto px-4 pt-4">
      {/* Portfolio Overview Card */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#e1e3e4] relative overflow-hidden">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold text-[#44474d] uppercase tracking-wider">Total Portfolio Value</span>
            <h2 className="text-3xl font-extrabold text-[#000000] mt-1">${profile.netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
          </div>
          <span className="bg-[#beead1] text-[#436b58] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            +12.4%
          </span>
        </div>

        {/* Time Period Filter */}
        <div className="flex gap-2 my-2 z-10 relative">
          {(['1M', '6M', '1Y', 'ALL'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-[11px] font-bold rounded-full transition-colors ${
                selectedPeriod === period 
                  ? 'bg-[#3f6653] text-white' 
                  : 'bg-[#f3f4f5] text-[#44474d] hover:bg-[#edeeef]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Growth Trend Line SVG */}
        <div className="w-full h-28 mt-4 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
            <defs>
              <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(165, 208, 185, 0.4)" />
                <stop offset="100%" stopColor="rgba(165, 208, 185, 0)" />
              </linearGradient>
            </defs>
            <path d="M0,80 Q50,75 100,60 T200,55 T300,30 T400,10 L400,100 L0,100 Z" fill="url(#growthGradient)" />
            <path d="M0,80 Q50,75 100,60 T200,55 T300,30 T400,10" fill="none" stroke="#3f6653" strokeWidth="3" strokeLinecap="round" />
            <circle cx="400" cy="10" r="4" fill="#3f6653" className="animate-pulse" />
          </svg>
        </div>

        <div className="flex justify-between text-[11px] font-medium text-[#75777e] mt-2">
          <span>Jan</span>
          <span>Mar</span>
          <span>May</span>
          <span>Jul</span>
          <span>Sep</span>
          <span>Today</span>
        </div>
      </section>

      {/* Asset Allocation & Recommendations */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pie Chart Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e1e3e4] flex flex-col items-center justify-center">
          <h3 className="text-base font-bold text-[#000000] self-start mb-4">Asset Allocation</h3>
          
          <div className="relative w-44 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e1e3e4" strokeWidth="4" />
              {/* Indices 45% */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3f6653" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="0" />
              {/* Real Estate 30% */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#cba72f" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-45" />
              {/* Crypto/Alt 15% */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#515f78" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-75" />
              {/* Cash 10% */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e7e8e9" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="-90" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-bold text-[#000000]">Diversified</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 w-full pt-3 border-t border-[#e1e3e4]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3f6653]"></div>
              <span className="text-xs font-semibold text-[#44474d]">45% Indices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#cba72f]"></div>
              <span className="text-xs font-semibold text-[#44474d]">30% Real Estate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#515f78]"></div>
              <span className="text-xs font-semibold text-[#44474d]">15% Crypto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#e7e8e9]"></div>
              <span className="text-xs font-semibold text-[#44474d]">10% Cash</span>
            </div>
          </div>
        </div>

        {/* Recommended Investments */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#000000] px-1">Recommended for You</h3>

          {/* Card 1 */}
          <div 
            onClick={() => setSelectedInvestment({
              name: 'Global Growth Index',
              risk: 'Low Risk',
              desc: 'Steady growth through a diversified basket of top 500 global companies.',
              returnRate: '8-10%'
            })}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#e1e3e4] flex items-start gap-4 transition-transform duration-200 hover:border-[#3f6653] cursor-pointer active-scale"
          >
            <div className="w-11 h-11 rounded-xl bg-[#beead1] flex items-center justify-center text-[#3f6653] shrink-0">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-bold text-[#000000]">Global Growth Index</h4>
                <span className="bg-[#beead1] text-[#436b58] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Low Risk</span>
              </div>
              <p className="text-xs text-[#44474d] mb-2 leading-relaxed">Steady growth through a diversified basket of top 500 global companies.</p>
              <div className="flex justify-between items-center pt-1 border-t border-[#e1e3e4]/60">
                <span className="text-xs font-bold text-[#3f6653]">Est. Return: 8–10%</span>
                <span className="material-symbols-outlined text-[#75777e] text-lg">chevron_right</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => setSelectedInvestment({
              name: 'Urban REITS',
              risk: 'Med Risk',
              desc: 'Commercial property yields in high-demand metropolitan areas.',
              returnRate: '6-12%'
            })}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#e1e3e4] flex items-start gap-4 transition-transform duration-200 hover:border-[#cba72f] cursor-pointer active-scale"
          >
            <div className="w-11 h-11 rounded-xl bg-[#cba72f]/20 flex items-center justify-center text-[#735c00] shrink-0">
              <span className="material-symbols-outlined text-[22px]">real_estate_agent</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-bold text-[#000000]">Urban REITS</h4>
                <span className="bg-[#ffe088] text-[#574500] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Med Risk</span>
              </div>
              <p className="text-xs text-[#44474d] mb-2 leading-relaxed">Commercial property yields in high-demand metropolitan areas.</p>
              <div className="flex justify-between items-center pt-1 border-t border-[#e1e3e4]/60">
                <span className="text-xs font-bold text-[#735c00]">Est. Return: 6–12%</span>
                <span className="material-symbols-outlined text-[#75777e] text-lg">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Hub (Horizontal Scroll) */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-base font-bold text-[#000000]">Knowledge Hub</h3>
          <span className="text-xs font-semibold text-[#3f6653]">View all</span>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
          {articles.map((art, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedArticle(art)}
              className={`min-w-[260px] max-w-[280px] bg-gradient-to-br ${art.badgeBg} rounded-2xl p-5 shadow-sm border border-[#e1e3e4] flex flex-col justify-between h-44 cursor-pointer hover:scale-[1.01] transition-transform`}
            >
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-widest bg-white/70 px-2 py-0.5 rounded-full ${art.tagColor}`}>
                  {art.category}
                </span>
                <h4 className="text-sm font-bold text-[#000000] mt-2 leading-snug">{art.title}</h4>
              </div>
              <p className="text-xs text-[#44474d] line-clamp-2 leading-relaxed">{art.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-[#e1e3e4]">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#e1e3e4]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3f6653]">{selectedArticle.category}</span>
              <button onClick={() => setSelectedArticle(null)} className="text-[#75777e] hover:text-black">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <h3 className="text-lg font-bold text-[#191c1d] mb-3">{selectedArticle.title}</h3>
            <p className="text-xs text-[#44474d] leading-relaxed mb-6">{selectedArticle.content}</p>
            <button 
              onClick={() => setSelectedArticle(null)}
              className="w-full py-3 bg-[#3f6653] text-white rounded-xl font-bold text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Investment Action Modal */}
      {selectedInvestment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e1e3e4]">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#e1e3e4]">
              <h3 className="font-bold text-sm text-[#191c1d]">{selectedInvestment.name}</h3>
              <button onClick={() => setSelectedInvestment(null)} className="text-[#75777e] hover:text-black">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-[#44474d] mb-4 leading-relaxed">{selectedInvestment.desc}</p>

            <form onSubmit={handleInvestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191c1d] mb-1">Investment Amount ($)</label>
                <input 
                  type="number"
                  required
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                />
              </div>

              <div className="p-3 bg-[#f8f9fa] rounded-xl text-xs space-y-1 text-[#44474d]">
                <div className="flex justify-between">
                  <span>Risk Level:</span>
                  <span className="font-bold text-[#3f6653]">{selectedInvestment.risk}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Projected Return:</span>
                  <span className="font-bold text-[#191c1d]">{selectedInvestment.returnRate}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={investSuccess}
                className="w-full py-3 bg-[#3f6653] text-white rounded-xl font-bold text-xs hover:bg-[#274e3d] transition-colors"
              >
                {investSuccess ? "Allocation Executed ✓" : "Confirm Allocation"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
