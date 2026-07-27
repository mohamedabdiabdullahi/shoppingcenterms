import React, { useState } from 'react';
import { LedgerTransaction } from '../types';
import { 
  PlusCircle, 
  CircleDollarSign, 
  Wallet, 
  Receipt, 
  Filter, 
  Download, 
  Search, 
  Headphones, 
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface LedgerViewProps {
  transactions: LedgerTransaction[];
  onOpenRecordModal: () => void;
  onOpenContactAdminModal: () => void;
}

export const LedgerView: React.FC<LedgerViewProps> = ({
  transactions,
  onOpenRecordModal,
  onOpenContactAdminModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [smsSending, setSmsSending] = useState(false);
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  // Currency helper
  const totalDebts = transactions
    .filter((t) => t.type === 'Store Credit +')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalCashPaid = transactions
    .filter((t) => t.type === 'Cash Payment -')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalDebts - totalCashPaid;

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.breakdown.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSendReminders = () => {
    setSmsSending(true);
    setTimeout(() => {
      setSmsSending(false);
      setSmsSentNotice(true);
      setTimeout(() => setSmsSentNotice(false), 4000);
    }, 1200);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Date,Customer,Breakdown,Type,Amount\n';
    const rows = filtered.map(t => `"${t.id}","${t.date}","${t.customerName}","${t.breakdown}","${t.type}","${t.currency}${t.amount}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Credit_Debt_Ledger_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header & Main CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#131b2e] dark:text-white tracking-tight">
            Credit & Debt Ledger
          </h1>
          <p className="text-xs md:text-sm text-[#3d4a42] dark:text-slate-400">
            Manage customer accounts, record store credits, and reconcile tab balances.
          </p>
        </div>

        <button
          onClick={onOpenRecordModal}
          className="bg-[#006948] hover:bg-[#00855d] text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95 text-xs md:text-sm shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Record New Transaction
        </button>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Debts */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-[#ffdada] dark:bg-rose-950/40 text-[#40000c] dark:text-rose-200 p-6 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs uppercase tracking-wider opacity-80">Total Debts Issued</span>
            <div className="p-2 bg-white/40 dark:bg-black/30 rounded-full">
              <CircleDollarSign className="w-5 h-5 text-rose-700 dark:text-rose-300" />
            </div>
          </div>
          <div className="font-black text-2xl md:text-3xl tracking-tight">
            ₦{totalDebts.toLocaleString('en-US')}.00
          </div>
          <div className="mt-2 text-xs opacity-80">
            Increase of 12% since last month
          </div>
        </motion.div>

        {/* Total Cash Paid */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-[#85f8c4] dark:bg-emerald-950/50 text-[#002114] dark:text-emerald-200 p-6 rounded-2xl border border-emerald-300/60 dark:border-emerald-900/40 shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs uppercase tracking-wider opacity-80">Total Cash Paid</span>
            <div className="p-2 bg-white/40 dark:bg-black/30 rounded-full">
              <Receipt className="w-5 h-5 text-emerald-800 dark:text-emerald-300" />
            </div>
          </div>
          <div className="font-black text-2xl md:text-3xl tracking-tight">
            ₦{totalCashPaid.toLocaleString('en-US')}.00
          </div>
          <div className="mt-2 text-xs opacity-80">
            {transactions.filter(t => t.type === 'Cash Payment -').length} payments reconciled
          </div>
        </motion.div>

        {/* Net Balance Owed */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-[#ba0035] text-white p-6 rounded-2xl shadow-md border border-rose-800"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs uppercase tracking-wider opacity-90">Net Outstanding Balance</span>
            <div className="p-2 bg-white/20 rounded-full">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="font-black text-2xl md:text-3xl tracking-tight">
            ₦{netBalance.toLocaleString('en-US')}.00
          </div>
          <div className="mt-2 text-xs opacity-90">
            To be collected by month-end
          </div>
        </motion.div>
      </div>

      {/* Activity Log Table Section */}
      <div className="bg-white dark:bg-[#1e293b] border border-[#bccac0]/50 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        
        {/* Table Filter Header */}
        <div className="p-4 md:p-5 border-b border-[#bccac0]/30 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f2f3ff]/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-base md:text-lg text-[#131b2e] dark:text-white">
              Recent Transaction Activity
            </h3>
            <span className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full font-bold">
              {filtered.length} entries
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search customer or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#006948]"
              />
            </div>

            {/* Type filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-xl shadow-xs focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Store Credit +">Store Credit +</option>
              <option value="Cash Payment -">Cash Payment -</option>
            </select>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="p-2 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Export CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e2e7ff]/60 dark:bg-slate-900 border-b border-[#bccac0]/30 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Customer Name</th>
                <th className="px-6 py-3.5">Purchase / Payment Breakdown</th>
                <th className="px-6 py-3.5">Type Badge</th>
                <th className="px-6 py-3.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs md:text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400 font-medium">
                    No transaction records match your search query.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => {
                  const isCredit = tx.type === 'Store Credit +';
                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-[#006948]/5 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="px-6 py-4 font-bold text-[#131b2e] dark:text-white whitespace-nowrap">
                        {tx.customerName}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {tx.breakdown}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            isCredit
                              ? 'bg-[#ffdada] text-[#40000c] dark:bg-rose-950/80 dark:text-rose-200'
                              : 'bg-[#85f8c4] text-[#002114] dark:bg-emerald-950/80 dark:text-emerald-200'
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right font-bold text-sm md:text-base whitespace-nowrap ${
                        isCredit ? 'text-[#ba0035] dark:text-rose-400' : 'text-[#006948] dark:text-[#68dba9]'
                      }`}>
                        {tx.currency}{tx.amount.toLocaleString('en-US')}.00
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#f2f3ff]/40 dark:bg-slate-900/40 border-t border-[#bccac0]/30 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Showing {filtered.length} of {transactions.length} total transactions</span>
          <div className="flex gap-2 font-semibold">
            <button className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Previous
            </button>
            <button className="px-3 py-1.5 border border-[#006948] text-[#006948] dark:text-[#68dba9] rounded-lg hover:bg-[#006948]/10">
              Next Page
            </button>
          </div>
        </div>
      </div>

      {/* Asymmetric Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Reconciliation Support Box */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1e293b] p-6 rounded-2xl border border-[#bccac0]/50 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 bg-[#85f8c4] dark:bg-emerald-950/80 text-[#006948] dark:text-[#68dba9] rounded-full flex items-center justify-center shrink-0">
            <Headphones className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-base text-[#131b2e] dark:text-white">
              Need Help with Ledger Reconciliation?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Our admin support team can help you resolve disputed credit entries, customer receipt queries, or tab mismatches within 24 hours.
            </p>
          </div>
          <button
            onClick={onOpenContactAdminModal}
            className="text-xs font-bold text-[#006948] dark:text-[#68dba9] hover:underline shrink-0"
          >
            Contact Admin
          </button>
        </div>

        {/* Quick Action Box */}
        <div className="lg:col-span-4 bg-[#283044] dark:bg-[#0f172a] text-white p-6 rounded-2xl flex flex-col justify-between gap-4 border border-slate-700">
          <div>
            <div className="font-bold text-base mb-1">Quick Manager Action</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Send automated SMS payment reminders to all customer accounts with pending store tabs (12 accounts pending).
            </p>
          </div>

          {smsSentNotice ? (
            <div className="bg-emerald-900/60 text-emerald-200 border border-emerald-700 p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SMS reminders sent to 12 overdue accounts!</span>
            </div>
          ) : (
            <button
              disabled={smsSending}
              onClick={handleSendReminders}
              className="w-full bg-[#fe932c] hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {smsSending ? 'Sending SMS...' : 'Send SMS Reminders'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
