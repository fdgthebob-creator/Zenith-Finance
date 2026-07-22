import React, { useState } from 'react';
import { UserFinancialProfile, Asset, Liability } from '../types';

interface ProfileScreenProps {
  profile: UserFinancialProfile;
  assets: Asset[];
  liabilities: Liability[];
  onUpdateProfile: (updated: Partial<UserFinancialProfile>) => void;
  onAddAsset: (newAsset: Omit<Asset, 'id'>) => void;
  onAddLiability: (newLiability: Omit<Liability, 'id'>) => void;
  onRestartOnboarding: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  assets,
  liabilities,
  onUpdateProfile,
  onAddAsset,
  onAddLiability,
  onRestartOnboarding,
}) => {
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showLiabilityModal, setShowLiabilityModal] = useState(false);
  const [sessionScheduled, setSessionScheduled] = useState(false);

  // Asset Form
  const [assetName, setAssetName] = useState('');
  const [assetDesc, setAssetDesc] = useState('');
  const [assetAmount, setAssetAmount] = useState<number | string>(10000);
  const [assetType, setAssetType] = useState<'Liquid' | 'Fixed'>('Liquid');

  // Liability Form
  const [liabName, setLiabName] = useState('');
  const [liabDesc, setLiabDesc] = useState('');
  const [liabAmount, setLiabAmount] = useState<number | string>(5000);
  const [liabTerm, setLiabTerm] = useState<'Short-term' | 'Mid-term' | 'Long-term'>('Mid-term');

  const handleAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName) return;
    const amt = typeof assetAmount === 'number' ? assetAmount : parseFloat(assetAmount) || 0;
    onAddAsset({
      name: assetName,
      description: assetDesc || 'Personal Holding',
      amount: amt,
      type: assetType,
      icon: assetType === 'Liquid' ? 'payments' : 'home',
    });
    setAssetName('');
    setAssetDesc('');
    setShowAssetModal(false);
  };

  const handleLiabilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liabName) return;
    const amt = typeof liabAmount === 'number' ? liabAmount : parseFloat(liabAmount) || 0;
    onAddLiability({
      name: liabName,
      description: liabDesc || 'Obligation',
      amount: amt,
      term: liabTerm,
      icon: liabTerm === 'Long-term' ? 'real_estate_agent' : 'directions_car',
    });
    setLiabName('');
    setLiabDesc('');
    setShowLiabilityModal(false);
  };

  const totalAssetVal = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabVal = liabilities.reduce((sum, l) => sum + l.amount, 0);
  const debtToAssetRatio = totalAssetVal > 0 ? Math.round((totalLiabVal / totalAssetVal) * 100) : 20;

  return (
    <div className="space-y-6 pb-28 animate-fade-in max-w-7xl mx-auto px-4 pt-4">
      {/* User Header Card */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#e1e3e4] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#3f6653]/30 shadow-sm">
            <img 
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEN1JMXxUj-FYsKTVah8K_3z7jp2AT_hugG_g0ULo545T_JKqdZlNSnBaMUWx_kF5AYCrQO57OS5YXn9HEdFnj4QOvN9KAyUR1A6mIeRRSJUBDJMxKqRpaI5CATsSaVMsbApMzrnNZb3ihaKMVMCY1620fglYM0Wjs6o-qrUekJS14FlkDMiRJHwoZxanHW2kMtvKFk-GvRkThdfnfLllPix12HER6Xn4V1HX6kwpxjcByMQczHwiXng"
              alt="Julian Sterling"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#000000]">{profile.name}</h2>
            <p className="text-xs text-[#44474d]">Private Wealth Client • Member since 2022</p>
          </div>
        </div>

        <button 
          onClick={onRestartOnboarding}
          className="text-xs font-bold text-[#3f6653] bg-[#beead1]/40 px-3 py-1.5 rounded-full hover:bg-[#beead1] transition-colors"
        >
          Re-run Ritual
        </button>
      </section>

      {/* Trajectory & Mentor Insight Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* User Stats Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-[#e1e3e4]">
          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="text-xs font-semibold text-[#44474d] uppercase tracking-wider">Net Worth Trajectory</p>
              <h2 className="text-3xl font-extrabold text-[#3f6653] mt-0.5">${profile.netWorth.toLocaleString()}</h2>
            </div>
            <span className="bg-[#beead1] text-[#436b58] text-xs font-bold px-3 py-1 rounded-full">+12.4% YoY</span>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-[#191c1d]">Active Goals Summary</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Retirement Fund</span>
                <span className="text-[#3f6653] font-bold">68%</span>
              </div>
              <div className="h-2 w-full bg-[#edeeef] rounded-full overflow-hidden">
                <div className="h-full bg-[#3f6653] rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Estate Acquisition</span>
                <span className="text-[#735c00] font-bold">42%</span>
              </div>
              <div className="h-2 w-full bg-[#edeeef] rounded-full overflow-hidden">
                <div className="h-full bg-[#cba72f] rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Insight Card */}
        <div className="bg-[#3f6653] p-6 rounded-2xl shadow-md flex flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <span className="material-symbols-outlined text-[#a5d0b9] text-3xl mb-3 fill-1">
              psychology
            </span>
            <h3 className="text-base font-bold mb-2">Mentor Insight</h3>
            <p className="text-xs opacity-90 italic leading-relaxed">
              "Wealth is not just what you earn, but what you keep and how it serves your peace of mind."
            </p>
          </div>
          <button 
            onClick={() => setSessionScheduled(true)}
            className="mt-5 bg-white text-[#3f6653] font-bold text-xs py-3 rounded-xl hover:bg-[#beead1] transition-colors relative z-10 shadow-sm"
          >
            {sessionScheduled ? "Session Scheduled ✓" : "Schedule Session"}
          </button>
          <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[130px]">spa</span>
          </div>
        </div>
      </section>

      {/* Debt-to-Asset Ratio */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-[#e1e3e4] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#000000] mb-1">Debt-to-Asset Balance</h3>
          <p className="text-xs text-[#44474d] leading-relaxed">
            <span className="font-bold text-[#3f6653]">Healthy structure:</span> Your total liabilities equal only {debtToAssetRatio}% of your total assets.
          </p>
        </div>

        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="56" cy="56" r="46" fill="transparent" stroke="#edeeef" strokeWidth="10" />
            <circle 
              cx="56" cy="56" r="46" fill="transparent" stroke="#beead1" 
              strokeWidth="10" strokeDasharray="289" strokeDashoffset={289 - (289 * debtToAssetRatio) / 100}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-lg font-bold text-[#000000]">{debtToAssetRatio}%</span>
            <span className="text-[10px] text-[#44474d]">Ratio</span>
          </div>
        </div>
      </section>

      {/* Assets & Liabilities Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Assets Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3f6653]">account_balance</span>
              <h3 className="text-base font-bold text-[#000000]">Assets</h3>
            </div>
            <button 
              onClick={() => setShowAssetModal(true)}
              className="text-xs font-bold text-[#3f6653] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span> Add Asset
            </button>
          </div>

          <div className="space-y-2.5">
            {assets.map((ast) => (
              <div key={ast.id} className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#e1e3e4] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#beead1] flex items-center justify-center text-[#3f6653]">
                    <span className="material-symbols-outlined text-[20px]">{ast.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#191c1d]">{ast.name}</p>
                    <p className="text-[11px] text-[#44474d]">{ast.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#000000]">${ast.amount.toLocaleString()}</p>
                  <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    ast.type === 'Liquid' ? 'bg-[#beead1] text-[#3f6653]' : 'bg-[#ffe088] text-[#574500]'
                  }`}>
                    {ast.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ba1a1a]">account_balance_wallet</span>
              <h3 className="text-base font-bold text-[#000000]">Liabilities</h3>
            </div>
            <button 
              onClick={() => setShowLiabilityModal(true)}
              className="text-xs font-bold text-[#ba1a1a] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span> Add Liability
            </button>
          </div>

          <div className="space-y-2.5">
            {liabilities.map((liab) => (
              <div key={liab.id} className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#e1e3e4] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdad6]/50 flex items-center justify-center text-[#ba1a1a]">
                    <span className="material-symbols-outlined text-[20px]">{liab.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#191c1d]">{liab.name}</p>
                    <p className="text-[11px] text-[#44474d]">{liab.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#000000]">${liab.amount.toLocaleString()}</p>
                  <span className="text-[9px] uppercase font-bold text-[#44474d] bg-[#edeeef] px-1.5 py-0.5 rounded">
                    {liab.term}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Settings List */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-[#000000] px-1">Settings & Security</h3>
        <div className="bg-white rounded-2xl border border-[#e1e3e4] overflow-hidden shadow-sm">
          {/* Push Notifications Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-[#e1e3e4]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#edeeef] flex items-center justify-center text-[#39475f]">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#191c1d]">Push Notifications</p>
                <p className="text-[11px] text-[#44474d]">Alerts for transactions & insights</p>
              </div>
            </div>
            <button 
              onClick={() => onUpdateProfile({ pushNotifications: !profile.pushNotifications })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                profile.pushNotifications ? 'bg-[#3f6653]' : 'bg-[#c5c6cd]'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                profile.pushNotifications ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Biometric Security */}
          <div className="flex items-center justify-between p-4 border-b border-[#e1e3e4]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#edeeef] flex items-center justify-center text-[#39475f]">
                <span className="material-symbols-outlined text-[20px]">fingerprint</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#191c1d]">Biometric Sign-in</p>
                <p className="text-[11px] text-[#44474d]">Use FaceID or TouchID</p>
              </div>
            </div>
            <button 
              onClick={() => onUpdateProfile({ biometricSignIn: !profile.biometricSignIn })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                profile.biometricSignIn ? 'bg-[#3f6653]' : 'bg-[#c5c6cd]'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                profile.biometricSignIn ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* PIN Manager */}
          <div className="w-full flex items-center justify-between p-4 hover:bg-[#f8f9fa] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#edeeef] flex items-center justify-center text-[#39475f]">
                <span className="material-symbols-outlined text-[20px]">lock_reset</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#191c1d]">Transaction PIN</p>
                <p className="text-[11px] text-[#44474d]">Manage your 6-digit security code</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#75777e] text-[18px]">chevron_right</span>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="pt-2">
        <button 
          onClick={() => alert('Signed out securely.')}
          className="w-full py-3.5 border border-[#ba1a1a]/30 text-[#ba1a1a] font-bold text-xs rounded-2xl hover:bg-[#ffdad6]/20 transition-colors"
        >
          Sign Out from All Devices
        </button>
      </section>

      {/* Asset Modal */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e1e3e4]">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#e1e3e4]">
              <h3 className="font-bold text-sm text-[#191c1d]">Add New Asset</h3>
              <button onClick={() => setShowAssetModal(false)} className="text-[#75777e] hover:text-black">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAssetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191c1d] mb-1">Asset Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. High Yield Savings, Commercial Unit"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191c1d] mb-1">Description / Institution</label>
                <input 
                  type="text"
                  placeholder="e.g. Chase Bank, Fidelity"
                  value={assetDesc}
                  onChange={(e) => setAssetDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#191c1d] mb-1">Valuation ($)</label>
                  <input 
                    type="number"
                    required
                    value={assetAmount}
                    onChange={(e) => setAssetAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191c1d] mb-1">Liquidity</label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as 'Liquid' | 'Fixed')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                  >
                    <option value="Liquid">Liquid</option>
                    <option value="Fixed">Fixed</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#3f6653] text-white rounded-xl font-bold text-xs hover:bg-[#274e3d] transition-colors mt-2"
              >
                Save Asset
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Liability Modal */}
      {showLiabilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e1e3e4]">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#e1e3e4]">
              <h3 className="font-bold text-sm text-[#191c1d]">Add New Liability</h3>
              <button onClick={() => setShowLiabilityModal(false)} className="text-[#75777e] hover:text-black">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleLiabilitySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191c1d] mb-1">Liability Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Student Loan, Personal Credit"
                  value={liabName}
                  onChange={(e) => setLiabName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191c1d] mb-1">Description / Rate</label>
                <input 
                  type="text"
                  placeholder="e.g. 4.5% APR"
                  value={liabDesc}
                  onChange={(e) => setLiabDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#191c1d] mb-1">Amount ($)</label>
                  <input 
                    type="number"
                    required
                    value={liabAmount}
                    onChange={(e) => setLiabAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191c1d] mb-1">Term</label>
                  <select
                    value={liabTerm}
                    onChange={(e) => setLiabTerm(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
                  >
                    <option value="Short-term">Short-term</option>
                    <option value="Mid-term">Mid-term</option>
                    <option value="Long-term">Long-term</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#ba1a1a] text-white rounded-xl font-bold text-xs hover:bg-[#93000a] transition-colors mt-2"
              >
                Save Liability
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
