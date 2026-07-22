import React, { useState } from 'react';
import { UserFinancialProfile } from '../types';

interface HeaderProps {
  profile: UserFinancialProfile;
  subTitle?: string;
  onOpenOnboarding: () => void;
}

export const Header: React.FC<HeaderProps> = ({ profile, subTitle, onOpenOnboarding }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-[#f8f9fa]/90 backdrop-blur-md sticky top-0 z-40 w-full border-b border-[#e1e3e4]/40">
      <div className="flex justify-between items-center w-full px-5 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div 
            onClick={onOpenOnboarding}
            className="w-10 h-10 rounded-full overflow-hidden bg-[#edeeef] border-2 border-[#beead1] shadow-sm cursor-pointer hover:scale-105 transition-transform"
            title="Click to restart Financial Ritual Onboarding"
          >
            <img 
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2zHMsIt7be4UPDMUKrOXmoa4LWqnc0Wpq6A_pgLIuzrQkwOZF6JGI5jir3mInCq3CSvILbIa4zRHl3MAirvCCKRqdYUAFyxxSkkEY8lsw395RsybPl05lzNcyCC8Kg_8RfWIu3rGKaRmU-VNzjJeFYU1GbVMFsUu-pJp3s-9a_ui-Y89t8G7DGeyssNGtX4m-frY5BB-3vW0GrXw6YL7BOyF1Cbi3fL8qn7wLgv55HUv47W9JbdPI2w" 
              alt="Julian Sterling"
            />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-[#000000] leading-snug">
              Good morning, {profile.name.split(' ')[0]}
            </h1>
            {subTitle && (
              <p className="text-[12px] font-medium text-[#44474d]">{subTitle}</p>
            )}
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#000000] hover:bg-[#edeeef] rounded-full transition-colors active:scale-95 relative"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3f6653] rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-[#c5c6cd]/30 p-4 z-50 animate-fade-in">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#e1e3e4]">
                <h3 className="font-bold text-[#191c1d] text-sm">Notifications</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#75777e] hover:text-[#000000]"
                >
                  Close
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-[#beead1]/20 border border-[#beead1]/40 flex gap-2.5 items-start">
                  <span className="material-symbols-outlined text-[#3f6653] text-[20px]">task_alt</span>
                  <div>
                    <p className="text-xs font-semibold text-[#191c1d]">Dividend Reinvested</p>
                    <p className="text-[11px] text-[#44474d] mt-0.5">$420.00 from Global Tech Fund was automatically allocated.</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#ffdad6]/40 border border-[#ba1a1a]/20 flex gap-2.5 items-start">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">warning</span>
                  <div>
                    <p className="text-xs font-semibold text-[#ba1a1a]">Leisure Budget Notice</p>
                    <p className="text-[11px] text-[#44474d] mt-0.5">Dining spending reached 85% of weekly allocation.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
