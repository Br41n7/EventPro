
import React, { useState } from 'react';
import { CreditCard, CheckCircle2, X, Loader2 } from 'lucide-react';
import { Event } from '../types';

interface PaymentModalProps {
  event: Event;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ event, onClose }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  const handlePay = () => {
    setStep('processing');
    // Simulate payment delay
    setTimeout(() => {
      setStep('success');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-8">
          {step === 'details' && (
            <>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Collect Deposit</h3>
              <p className="text-slate-500 mb-8">Initiate payment via Paystack for <span className="font-semibold text-slate-900">{event.name}</span>.</p>
              
              <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500">Deposit Amount (20%)</span>
                  <span className="text-xl font-bold text-slate-900">${(event.budget * 0.2).toLocaleString()}</span>
                </div>
                <div className="text-xs text-slate-400">Total Project: ${event.budget.toLocaleString()}</div>
              </div>

              <button 
                onClick={handlePay}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
              >
                Proceed to Paystack
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Verifying with Paystack</h3>
              <p className="text-slate-500">Please do not close this window.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
              <p className="text-slate-500 mb-8">Transaction ID: 928374982. A receipt has been sent to the client.</p>
              <button 
                onClick={onClose}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
