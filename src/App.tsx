import React, { useState } from 'react';
import { TabType, UserFinancialProfile, Transaction, Goal, Asset, Liability, ChatMessage } from './types';
import { 
  initialProfile, 
  initialTransactions, 
  initialGoals, 
  initialAssets, 
  initialLiabilities, 
  initialChatMessages 
} from './data/initialData';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OnboardingModal } from './components/OnboardingModal';
import { HomeScreen } from './components/HomeScreen';
import { BudgetScreen } from './components/BudgetScreen';
import { GoalsScreen } from './components/GoalsScreen';
import { InvestScreen } from './components/InvestScreen';
import { CoachScreen } from './components/CoachScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AddTransactionModal } from './components/AddTransactionModal';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // App Centralized State
  const [profile, setProfile] = useState<UserFinancialProfile>(initialProfile);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [liabilities, setLiabilities] = useState<Liability[]>(initialLiabilities);
  const [chatMessages] = useState<ChatMessage[]>(initialChatMessages);

  // Profile update handler
  const handleUpdateProfile = (updated: Partial<UserFinancialProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  // Add transaction handler
  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const created: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [created, ...prev]);

    // Deduct from available spend and update spent totals
    setProfile((prev) => ({
      ...prev,
      availableToSpend: Math.max(0, prev.availableToSpend - created.amount),
      monthlySpent: prev.monthlySpent + created.amount,
    }));
  };

  // Add Goal handler
  const handleAddGoal = (newGoal: Omit<Goal, 'id' | 'progressPercent'>) => {
    const created: Goal = {
      ...newGoal,
      id: `g-${Date.now()}`,
      progressPercent: Math.round((newGoal.currentAmount / newGoal.targetAmount) * 100),
    };
    setGoals((prev) => [...prev, created]);
  };

  // Add Asset handler
  const handleAddAsset = (newAsset: Omit<Asset, 'id'>) => {
    const created: Asset = {
      ...newAsset,
      id: `ast-${Date.now()}`,
    };
    setAssets((prev) => [...prev, created]);
    setProfile((prev) => ({
      ...prev,
      netWorth: prev.netWorth + created.amount,
    }));
  };

  // Add Liability handler
  const handleAddLiability = (newLiability: Omit<Liability, 'id'>) => {
    const created: Liability = {
      ...newLiability,
      id: `liab-${Date.now()}`,
    };
    setLiabilities((prev) => [...prev, created]);
    setProfile((prev) => ({
      ...prev,
      netWorth: Math.max(0, prev.netWorth - created.amount),
    }));
  };

  // Update budget limits handler
  const handleUpdateLimits = (dining: number, groceries: number, travel: number) => {
    setProfile((prev) => ({
      ...prev,
      diningLimit: dining,
      groceriesLimit: groceries,
      travelLimit: travel,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] selection:bg-[#beead1] selection:text-[#3f6653]">
      {/* Show header on non-Coach full screens for focused conversation */}
      {activeTab !== 'coach' && (
        <Header 
          profile={profile}
          subTitle={
            activeTab === 'home' ? 'Financial Serenity Dashboard' :
            activeTab === 'budget' ? '50/30/20 Allocation & Limits' :
            activeTab === 'invest' ? 'Portfolio & Knowledge Hub' :
            activeTab === 'goals' ? 'Milestones & Growth Targets' : 'Net Worth & Preferences'
          }
          onOpenOnboarding={() => setShowOnboarding(true)}
        />
      )}

      {/* Primary Tab View Router */}
      <main className="w-full">
        {activeTab === 'home' && (
          <HomeScreen 
            profile={profile}
            transactions={transactions}
            setActiveTab={setActiveTab}
            onOpenAddTransaction={() => setShowAddTransaction(true)}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetScreen 
            profile={profile}
            transactions={transactions}
            onUpdateLimits={handleUpdateLimits}
          />
        )}

        {activeTab === 'invest' && (
          <InvestScreen 
            profile={profile}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsScreen 
            goals={goals}
            onAddGoal={handleAddGoal}
          />
        )}

        {activeTab === 'coach' && (
          <CoachScreen 
            profile={profile}
            initialMessages={chatMessages}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen 
            profile={profile}
            assets={assets}
            liabilities={liabilities}
            onUpdateProfile={handleUpdateProfile}
            onAddAsset={handleAddAsset}
            onAddLiability={handleAddLiability}
            onRestartOnboarding={() => setShowOnboarding(true)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Onboarding Ritual Modal */}
      {showOnboarding && (
        <OnboardingModal 
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {/* Quick Add Transaction Modal */}
      {showAddTransaction && (
        <AddTransactionModal 
          onAddTransaction={handleAddTransaction}
          onClose={() => setShowAddTransaction(false)}
        />
      )}
    </div>
  );
}

export default App;
