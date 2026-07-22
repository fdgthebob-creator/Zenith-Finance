export type TabType = 'home' | 'budget' | 'invest' | 'goals' | 'coach' | 'profile';

export interface Transaction {
  id: string;
  merchant: string;
  category: 'Needs' | 'Wants' | 'Savings';
  subCategory: string;
  amount: number;
  date: string;
  time: string;
  paymentMethod: string;
  icon: string;
}

export interface Goal {
  id: string;
  title: string;
  subtitle: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  category: string;
  icon: string;
  colorBg: string;
  colorText: string;
  momentum?: string;
  progressPercent: number;
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: 'Liquid' | 'Fixed';
  icon: string;
}

export interface Liability {
  id: string;
  name: string;
  description: string;
  amount: number;
  term: 'Short-term' | 'Mid-term' | 'Long-term';
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp?: string;
  card?: {
    title: string;
    subtitle: string;
    type: 'dividend' | 'goal_progress';
    amount?: number;
    targetAmount?: number;
    achievedPercent?: number;
  };
}

export interface UserFinancialProfile {
  name: string;
  monthlyIncome: number;
  fixedExpenses: number;
  selectedGoals: string[];
  riskTolerance: number;
  riskLabel: string;
  availableToSpend: number;
  savedThisMonth: number;
  investedThisMonth: number;
  netWorth: number;
  monthlySpent: number;
  diningLimit: number;
  groceriesLimit: number;
  travelLimit: number;
  pushNotifications: boolean;
  biometricSignIn: boolean;
}
