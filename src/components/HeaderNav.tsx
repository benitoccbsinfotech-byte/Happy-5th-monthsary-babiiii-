import React from 'react';
import { Volume2, VolumeX, Sparkles, SlidersHorizontal } from 'lucide-react';
import { triggerHeartBurst } from '../utils/heartBurst';

interface HeaderNavProps {
  partnerName: string;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenPersonalize: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  partnerName,
  isAudioPlaying,
  onToggleAudio,
  onOpenPersonalize,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/60 px-6 py-4 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif-title text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-rose-700 transition-colors flex items-center gap-2"
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
          }}
        >
          <span>Five Months of Us</span>
        </a>

        {/* Zone 2: clean single-line text nav links */}
        <nav className="hidden sm:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#top" className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0">
            Happy 5th
          </a>
          <a href="#letter" className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0">
            Love Letter
          </a>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Pause soft music' : 'Play soft music'}
            aria-label={isAudioPlaying ? 'Pause soft music' : 'Play soft music'}
            className={`p-2 rounded-full border transition-colors ${
              isAudioPlaying
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-white border-stone-200 text-stone-600 hover:text-rose-600'
            }`}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenPersonalize}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-rose-800 transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Personalize</span>
          </button>
        </div>
      </div>
    </header>
  );
};
