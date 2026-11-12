import React, { useState } from 'react';
import { X, Heart, SlidersHorizontal, RotateCcw, Calendar, User } from 'lucide-react';
import { triggerHeartBurst } from '../utils/heartBurst';

interface PersonalizeModalProps {
  partnerName: string;
  senderName: string;
  startDate: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (partner: string, sender: string, date: string) => void;
  onReset: () => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  partnerName,
  senderName,
  startDate,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [partner, setPartner] = useState(partnerName);
  const [sender, setSender] = useState(senderName);
  const [date, setDate] = useState(startDate);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHeartBurst(undefined, undefined, 25);
    onSave(partner.trim() || 'My Dearest Love', sender.trim() || 'Yours Always', date);
    onClose();
  };

  const handleResetDefaults = () => {
    onReset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold text-stone-900">
                Personalize This Celebration
              </h3>
              <p className="text-xs text-stone-600">Tailor names and anniversary date</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-600 hover:text-stone-700 rounded-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="partner-name-input" className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-600" />
              <span>Partner's Name or Pet Name</span>
            </label>
            <input
              id="partner-name-input"
              type="text"
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              placeholder="e.g. Isa, babii, My Dearest"
              className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2]"
              required
            />
          </div>

          <div>
            <label htmlFor="sender-name-input" className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>Your Name / Signature</span>
            </label>
            <input
              id="sender-name-input"
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="e.g. Benito, Yours Always"
              className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2]"
              required
            />
          </div>

          <div>
            <label htmlFor="start-date-input" className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-600" />
              <span>Relationship Start Date</span>
            </label>
            <input
              id="start-date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2]"
              required
            />
            <span className="text-[11px] text-stone-600 mt-1 block">
              Default is June 13, 2026 for the November 13 5th Monthsary.
            </span>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-xs text-stone-600 hover:text-stone-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-colors shadow-xs"
              >
                Save Keepsake
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
