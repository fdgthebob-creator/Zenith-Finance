import { Transaction, Goal, Asset, Liability, ChatMessage, UserFinancialProfile } from '../types';

export const initialProfile: UserFinancialProfile = {
  name: "Julian Sterling",
  monthlyIncome: 8500,
  fixedExpenses: 3200,
  selectedGoals: ["Emergency Fund", "Retirement", "Build Wealth", "Save for a house"],
  riskTolerance: 3,
  riskLabel: "Moderate",
  availableToSpend: 4280.50,
  savedThisMonth: 1240,
  investedThisMonth: 850,
  netWorth: 1248500,
  monthlySpent: 4850,
  diningLimit: 600,
  groceriesLimit: 850,
  travelLimit: 1200,
  pushNotifications: true,
  biometricSignIn: true,
};

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    merchant: 'Artisan Bistro',
    category: 'Wants',
    subCategory: 'Dining & Social',
    amount: 124.50,
    date: 'Oct 14',
    time: '2:32 PM',
    paymentMethod: 'Visa',
    icon: 'restaurant',
  },
  {
    id: 'tx-2',
    merchant: 'Nordstrom',
    category: 'Wants',
    subCategory: 'Apparel',
    amount: 430.00,
    date: 'Oct 14',
    time: '11:15 AM',
    paymentMethod: 'Visa',
    icon: 'shopping_bag',
  },
  {
    id: 'tx-3',
    merchant: 'Whole Foods Market',
    category: 'Needs',
    subCategory: 'Groceries',
    amount: 84.20,
    date: 'Today',
    time: '2:15 PM',
    paymentMethod: 'Visa',
    icon: 'shopping_cart',
  },
  {
    id: 'tx-4',
    merchant: 'Blue Bottle Coffee',
    category: 'Wants',
    subCategory: 'Coffee & Snacks',
    amount: 6.50,
    date: 'Today',
    time: '9:30 AM',
    paymentMethod: 'Apple Pay',
    icon: 'coffee',
  },
  {
    id: 'tx-5',
    merchant: 'Vanguard Transfer',
    category: 'Savings',
    subCategory: 'Index Fund Investment',
    amount: 500.00,
    date: 'Yesterday',
    time: '4:00 PM',
    paymentMethod: 'ACH Direct',
    icon: 'account_balance',
  },
  {
    id: 'tx-6',
    merchant: 'Metropolis Rental',
    category: 'Needs',
    subCategory: 'Housing',
    amount: 3200.00,
    date: 'Oct 13',
    time: '9:00 AM',
    paymentMethod: 'ACH • Monthly',
    icon: 'home',
  }
];

export const initialGoals: Goal[] = [
  {
    id: 'g-1',
    title: 'Emergency Fund',
    subtitle: '6 months of stability',
    currentAmount: 25500,
    targetAmount: 30000,
    targetDate: 'Est. Aug 2024',
    category: 'Stability',
    icon: 'security',
    colorBg: 'bg-secondary-container',
    colorText: 'text-on-secondary-container',
    momentum: 'Moderate Momentum',
    progressPercent: 85,
  },
  {
    id: 'g-2',
    title: 'Bali Retreat',
    subtitle: 'Luxury wellness getaway',
    currentAmount: 4200,
    targetAmount: 7000,
    targetDate: 'Jan 2025',
    category: 'Travel',
    icon: 'flight',
    colorBg: 'bg-secondary-fixed',
    colorText: 'text-on-secondary-fixed',
    progressPercent: 60,
  },
  {
    id: 'g-3',
    title: 'New Home',
    subtitle: 'Primary residence downpayment',
    currentAmount: 54550,
    targetAmount: 200000,
    targetDate: 'June 2027',
    category: 'Real Estate',
    icon: 'home',
    colorBg: 'bg-tertiary-fixed',
    colorText: 'text-on-tertiary-fixed',
    progressPercent: 27,
  }
];

export const initialAssets: Asset[] = [
  {
    id: 'ast-1',
    name: 'Cash & Savings',
    description: 'Premium Savings Account',
    amount: 420000,
    type: 'Liquid',
    icon: 'payments',
  },
  {
    id: 'ast-2',
    name: 'Primary Residence',
    description: 'Market Valuation',
    amount: 850000,
    type: 'Fixed',
    icon: 'home',
  },
  {
    id: 'ast-3',
    name: 'Investment Portfolio',
    description: 'Global Diversified Fund',
    amount: 290000,
    type: 'Liquid',
    icon: 'show_chart',
  }
];

export const initialLiabilities: Liability[] = [
  {
    id: 'liab-1',
    name: 'Mortgage',
    description: 'Principal remaining',
    amount: 311500,
    term: 'Long-term',
    icon: 'real_estate_agent',
  },
  {
    id: 'liab-2',
    name: 'Auto Loan',
    description: '2.9% APR',
    amount: 18000,
    term: 'Mid-term',
    icon: 'directions_car',
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'model',
    text: 'Good morning! I noticed your dividends from the Global Tech Fund were reinvested yesterday. This small step alone increases your projected 2025 growth by 1.2%.',
    card: {
      title: 'Dividend Impact',
      subtitle: '+$420.00 Reinvested',
      type: 'dividend',
      amount: 420,
    }
  },
  {
    id: 'm-2',
    sender: 'user',
    text: "That's great news! How does this affect my goal of buying a vacation home by 2027?",
  },
  {
    id: 'm-3',
    sender: 'model',
    text: 'Based on current trends, you\'re ahead of schedule! Here\'s your revised "Coast Path" for the Sanctuary Beach House project:',
    card: {
      title: 'Sanctuary Beach House',
      subtitle: 'Target: $250,000 | 2027',
      type: 'goal_progress',
      amount: 155000,
      targetAmount: 250000,
      achievedPercent: 62,
    }
  }
];
