import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { triggerHeartBurst } from '../utils/heartBurst';

interface FooterLoveProps {
  partnerName: string;
  senderName: string;
}

export const FooterLove: React.FC<FooterLoveProps> = ({
  partnerName,
  senderName,
}) => {
  const handleHeartBurst = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
  };

  return (
    <footer className="py-14 px-6 bg-[#FAF7F2] border-t border-stone-200 text-stone-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand signature */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <div className="font-serif-title text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>5 Months Together</span>
            <span aria-hidden="true" className="text-rose-500">❤</span>
            <span>Forever Ahead</span>
          </div>
          <p className="text-xs text-stone-600 font-serif italic">
            Dedicated with all my heart to {partnerName}, from {senderName}.
          </p>
        </div>

        {/* Action & back to top */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleHeartBurst}
            className="px-4 py-2 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Shower Hearts</span>
          </button>

          <a
            href="#top"
            className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white transition-colors"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
};
