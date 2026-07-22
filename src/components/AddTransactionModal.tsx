import React, { useState } from 'react';
import { Transaction } from '../types';

interface AddTransactionModalProps {
  onAddTransaction: (newTx: Omit<Transaction, 'id'>) => void;
  onClose: () => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onAddTransaction, onClose }) => {
  const [merchant, setMerchant] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [amount, setAmount] = useState<number | string>(50.0);
  const [category, setCategory] = useState<'Needs' | 'Wants' | 'Savings'>('Needs');
  const [paymentMethod, setPaymentMethod] = useState('Visa');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant) return;
    const amt = typeof amount === 'number' ? amount : parseFloat(amount) || 0;

    onAddTransaction({
      merchant,
      category,
      subCategory: subCategory || (category === 'Needs' ? 'Essentials' : category === 'Wants' ? 'Leisure' : 'Investments'),
      amount: amt,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethod,
      icon: category === 'Needs' ? 'shopping_cart' : category === 'Wants' ? 'coffee' : 'account_balance',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e1e3e4]">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#e1e3e4]">
          <h3 className="font-bold text-sm text-[#191c1d]">Log New Transaction</h3>
          <button onClick={onClose} className="text-[#75777e] hover:text-black">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#191c1d] mb-1">Merchant / Payee</label>
            <input 
              type="text"
              required
              placeholder="e.g. Whole Foods, Apple, Delta Air"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#191c1d] mb-1">Amount ($)</label>
              <input 
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191c1d] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
              >
                <option value="Needs">Needs (50%)</option>
                <option value="Wants">Wants (30%)</option>
                <option value="Savings">Savings (20%)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191c1d] mb-1">Subcategory</label>
            <input 
              type="text"
              placeholder="e.g. Groceries, Dining, Apparel"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191c1d] mb-1">Payment Method</label>
            <input 
              type="text"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#f3f4f5] border border-[#c5c6cd] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3f6653]"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#3f6653] text-white rounded-xl font-bold text-xs hover:bg-[#274e3d] transition-colors mt-2"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};
