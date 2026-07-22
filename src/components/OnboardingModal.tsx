import React, { useState } from 'react';
import { UserFinancialProfile } from '../types';

interface OnboardingModalProps {
  profile: UserFinancialProfile;
  onUpdateProfile: (updated: Partial<UserFinancialProfile>) => void;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ profile, onUpdateProfile, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  const [income, setIncome] = useState<number | string>(profile.monthlyIncome || 8500);
  const [expenses, setExpenses] = useState<number | string>(profile.fixedExpenses || 3200);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(profile.selectedGoals || ["Emergency Fund", "Retirement", "Build Wealth"]);
  const [riskVal, setRiskVal] = useState<number>(profile.riskTolerance || 3);
  const [isFinished, setIsFinished] = useState(false);

  const riskData: Record<number, { label: string; desc: string }> = {
    1: { label: "Very Conservative", desc: "Capital preservation is my top priority." },
    2: { label: "Conservative", desc: "I prefer steady growth with minimal risk to my principal." },
    3: { label: "Moderate", desc: "A balanced approach of growth and stability." },
    4: { label: "Aggressive", desc: "I'm willing to accept volatility for higher long-term returns." },
    5: { label: "Very Aggressive", desc: "Maximizing long-term wealth is my only goal." }
  };

  const goalOptions = [
    { title: "Save for a house", icon: "home", color: "bg-[#beead1] text-[#3f6653]" },
    { title: "Retirement", icon: "spa", color: "bg-[#ffe088]/40 text-[#735c00]" },
    { title: "Emergency Fund", icon: "emergency", color: "bg-[#d6e3ff] text-[#39475f]" },
    { title: "Pay off debt", icon: "credit_card_off", color: "bg-[#ffdad6]/60 text-[#ba1a1a]" },
    { title: "Build Wealth", icon: "trending_up", color: "bg-[#a5d0b9]/30 text-[#3f6653]" },
  ];

  const handleGoalToggle = (title: string) => {
    if (selectedGoals.includes(title)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== title));
    } else {
      setSelectedGoals([...selectedGoals, title]);
    }
  };

  const handleAddExpense = (amt: number) => {
    const current = typeof expenses === 'number' ? expenses : parseFloat(expenses) || 0;
    setExpenses(current + amt);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save profile
      const numIncome = typeof income === 'number' ? income : parseFloat(income) || 8500;
      const numExpenses = typeof expenses === 'number' ? expenses : parseFloat(expenses) || 3200;
      onUpdateProfile({
        monthlyIncome: numIncome,
        fixedExpenses: numExpenses,
        selectedGoals,
        riskTolerance: riskVal,
        riskLabel: riskData[riskVal].label,
      });

      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#f8f9fa] rounded-3xl p-6 shadow-2xl relative min-h-[620px] flex flex-col justify-between border border-[#e1e3e4]">
        {/* Top Header / Close */}
        <div className="flex justify-between items-center pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3f6653]">
            Wealth Ritual Onboarding
          </span>
          <button 
            onClick={onClose}
            className="text-[#75777e] hover:text-[#000000] p-1 rounded-full hover:bg-[#edeeef]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {!isFinished ? (
          <>
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 my-3">
              {[0, 1, 2, 3, 4].map((stepIdx) => (
                <div
                  key={stepIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    stepIdx === currentStep
                      ? 'w-8 bg-[#3f6653]'
                      : stepIdx < currentStep
                      ? 'w-4 bg-[#a5d0b9]'
                      : 'w-4 bg-[#c5c6cd]'
                  }`}
                />
              ))}
            </div>

            {/* Step Content Area */}
            <div className="flex-1 flex flex-col justify-center my-2">
              {/* Step 0: Welcome */}
              {currentStep === 0 && (
                <div className="text-center animate-fade-in">
                  <div className="mb-6 relative">
                    <div className="w-56 h-56 mx-auto overflow-hidden rounded-full bg-gradient-to-b from-[#beead1] to-white flex items-center justify-center shadow-inner">
                      <img 
                        className="w-48 h-48 object-contain"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtzcgwn_v56YtqnUxoScnDwM30HUvj1XXEJtMmFZP8hsbKlSz2y17ZStjQ7L3i8z8V4_f5o0a7mM7w4i1pDbxZkGwNYcc2D4A5Av6bi_W8NNex9OeCiA_hM3GYSkh-mKIO9COvKXvjGY0DIkDePftHxrzmMw0xUtAUtIxWG8mUSCnPL33V52ynX9cXMIbq8txd00GZnmOk6FKcKIDFdpiCPdbfou6i_5ztlMsAtKkRtbl1mZtRcmlCWQ"
                        alt="Nurture Wealth Sapling" 
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-[#191c1d] mb-2">Nurture Your Wealth</h2>
                  <p className="text-sm text-[#44474d] px-4 leading-relaxed">
                    Welcome to a ritual of clarity. Together, we'll plant the seeds for your financial serenity.
                  </p>
                </div>
              )}

              {/* Step 1: Monthly Income */}
              {currentStep === 1 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e1e3e4] animate-fade-in">
                  <h2 className="text-lg font-bold text-[#191c1d] mb-1">Monthly Income</h2>
                  <p className="text-xs text-[#44474d] mb-5">How much do you typically receive after taxes?</p>
                  
                  <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#44474d] font-bold text-lg">$</span>
                    <input 
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] focus:ring-2 focus:ring-[#3f6653] focus:outline-none text-xl font-bold text-[#191c1d]"
                    />
                  </div>

                  <div className="flex items-center p-3 bg-[#beead1]/30 rounded-xl">
                    <span className="material-symbols-outlined text-[#3f6653] mr-2 text-[20px] fill-1">info</span>
                    <p className="text-xs text-[#274e3d] font-medium">This helps us baseline your potential savings power.</p>
                  </div>
                </div>
              )}

              {/* Step 2: Fixed Expenses */}
              {currentStep === 2 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e1e3e4] animate-fade-in">
                  <h2 className="text-lg font-bold text-[#191c1d] mb-1">Fixed Expenses</h2>
                  <p className="text-xs text-[#44474d] mb-5">Rent, mortgage, bills, and subscriptions.</p>

                  <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#44474d] font-bold text-lg">$</span>
                    <input 
                      type="number"
                      value={expenses}
                      onChange={(e) => setExpenses(e.target.value)}
                      placeholder="Estimated total"
                      className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] focus:ring-2 focus:ring-[#3f6653] focus:outline-none text-lg font-semibold text-[#191c1d]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => handleAddExpense(500)}
                      className="py-2.5 rounded-xl border border-[#c5c6cd] text-xs font-semibold hover:bg-[#beead1] active:scale-95 transition-all text-[#191c1d]"
                    >
                      + $500
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleAddExpense(1000)}
                      className="py-2.5 rounded-xl border border-[#c5c6cd] text-xs font-semibold hover:bg-[#beead1] active:scale-95 transition-all text-[#191c1d]"
                    >
                      + $1000
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Financial Goals */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-lg font-bold text-[#191c1d] mb-1 px-1">What are your priorities?</h2>
                  <p className="text-xs text-[#44474d] mb-4 px-1">Select all that apply to your current journey.</p>

                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                    {goalOptions.map((opt) => {
                      const isSelected = selectedGoals.includes(opt.title);
                      return (
                        <div
                          key={opt.title}
                          onClick={() => handleGoalToggle(opt.title)}
                          className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-white border-[#3f6653] shadow-sm' 
                              : 'bg-white border-transparent hover:border-[#c1ecd4]'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full ${opt.color} flex items-center justify-center mr-3`}>
                            <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                          </div>
                          <p className="flex-1 text-sm font-semibold text-[#191c1d]">{opt.title}</p>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'bg-[#3f6653] border-[#3f6653]' : 'border-[#c5c6cd]'
                          }`}>
                            {isSelected && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Risk Tolerance */}
              {currentStep === 4 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e1e3e4] animate-fade-in">
                  <h2 className="text-lg font-bold text-[#191c1d] mb-1">Risk Tolerance</h2>
                  <p className="text-xs text-[#44474d] mb-6">How comfortable are you with market fluctuations?</p>

                  <div className="px-1 mb-6">
                    <div className="flex justify-between text-xs text-[#44474d] mb-3">
                      <span>Conservative</span>
                      <span className="text-[#3f6653] font-bold">{riskData[riskVal].label}</span>
                      <span>Aggressive</span>
                    </div>
                    <input 
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={riskVal}
                      onChange={(e) => setRiskVal(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#c5c6cd]/50 italic text-xs text-[#44474d] text-center leading-relaxed">
                    "{riskData[riskVal].desc}"
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col gap-2">
              <button 
                onClick={handleNext}
                className="w-full bg-[#3f6653] text-white py-3.5 rounded-full font-bold text-sm shadow-md active:scale-95 transition-all hover:bg-[#274e3d]"
              >
                {currentStep === 0 ? "Begin Journey" : currentStep === totalSteps ? "Finish Setup" : "Continue"}
              </button>

              {currentStep > 0 && (
                <button 
                  onClick={handleBack}
                  className="w-full text-[#44474d] py-1.5 text-xs font-semibold hover:text-[#000000]"
                >
                  Go Back
                </button>
              )}
            </div>
          </>
        ) : (
          /* Finished State */
          <div className="flex flex-col items-center justify-center text-center py-10 animate-fade-in my-auto">
            <div className="w-24 h-24 mb-5 rounded-full bg-[#beead1] flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[52px] text-[#3f6653] fill-1">check_circle</span>
            </div>
            <h2 className="text-2xl font-bold text-[#3f6653] mb-2">Garden Planted</h2>
            <p className="text-sm text-[#44474d] max-w-xs leading-relaxed mb-8">
              We've personalized your dashboard based on your goals. Welcome home to your financial serenity.
            </p>
            <button 
              onClick={onClose}
              className="px-10 py-3.5 bg-[#3f6653] text-white rounded-full font-bold text-sm shadow-md active:scale-95 transition-all hover:bg-[#274e3d]"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
