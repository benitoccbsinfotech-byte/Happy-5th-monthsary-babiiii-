import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X, Sun, Moon, Frown, Shield, Gift } from 'lucide-react';
import { triggerHeartBurst } from '../utils/heartBurst';

interface Capsule {
  id: string;
  trigger: string;
  subtitle: string;
  icon: React.ReactNode;
  content: string;
  accent: string;
}

const CAPSULES: Capsule[] = [
  {
    id: 'miss-me',
    trigger: 'Open when you miss me terribly',
    subtitle: 'When the distance or silence feels too loud',
    icon: <Heart className="w-5 h-5 text-rose-600" />,
    accent: 'border-rose-200 bg-rose-50/40',
    content: `Take a deep breath and close your eyes. Place your hand over your chest. That heartbeat? That's me living right there with you. 

Distance or time apart is only temporary, but what we've built over these 5 months is grounded in stone. I miss your smile, the cadence of your voice, and the comfort of your hand in mine. 

Send me a message whenever you read this, no matter what time it is. I am always thinking of you.`,
  },
  {
    id: 'rough-day',
    trigger: 'Open when you had an exhausting day',
    subtitle: 'When the world was heavy and unkind',
    icon: <Frown className="w-5 h-5 text-amber-600" />,
    accent: 'border-amber-200 bg-amber-50/40',
    content: `Put your burdens down, love. You don't have to carry the whole world on your shoulders tonight. 

You tried your absolute best today, and I am so, so proud of you. Drink some water, get cozy in your favorite clothes, and remember that a rough day does not make a rough life. 

You are safe with me. Sleep easy knowing that tomorrow is a fresh start and I'll be in your corner cheering you on.`,
  },
  {
    id: 'cant-sleep',
    trigger: 'Open when you cannot sleep at 2 AM',
    subtitle: 'When your mind is racing and restless',
    icon: <Moon className="w-5 h-5 text-indigo-600" />,
    accent: 'border-indigo-200 bg-indigo-50/40',
    content: `If you're reading this in the dark, let your shoulders drop and unclench your jaw. 

Picture our favorite memory together: that peaceful sunset walk, or cozying up with warm mugs of tea while the rain fell outside. You don't have to solve everything tonight. Right now, your only job is to rest. 

Close your eyes, feel my arms wrapped tightly around you, and let sleep come gently. Sweet dreams, my love.`,
  },
  {
    id: 'doubt-love',
    trigger: 'Open when you need reassurance',
    subtitle: 'When intrusive thoughts make you wonder',
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
    accent: 'border-emerald-200 bg-emerald-50/40',
    content: `If you ever wonder whether you are enough, whether I still look at you the same way, or whether our spark will fade: hear me clearly. 

I adore you. I appreciate you. I choose you on easy days, on hard days, and on all the quiet in-between days. You are not a burden; you are the brightest gift that ever stepped into my life. 

Five months of us have only made that promise stronger. You are irreplaceable to me.`,
  },
  {
    id: 'month-six',
    trigger: 'Open on our 6th Monthsary',
    subtitle: 'A sweet time-capsule note for next month',
    icon: <Gift className="w-5 h-5 text-rose-700" />,
    accent: 'border-rose-300 bg-rose-100/30',
    content: `Happy Half-Year Anniversary, My Soulmate! 

If you are reading this on our 6th Monthsary, look how far we've come. Six whole months of growing together, supporting one another's dreams, and learning how to love even deeper. 

Thank you for being my constant. The next six months will be even more magical. I love you with everything I have!`,
  },
];

export const OpenWhenCapsules: React.FC = () => {
  const [activeCapsule, setActiveCapsule] = useState<Capsule | null>(null);

  const handleOpen = (e: React.MouseEvent, capsule: Capsule) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
    setActiveCapsule(capsule);
  };

  return (
    <section id="capsules" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-700 mb-2">
          <Mail className="w-3.5 h-3.5" />
          <span>Little Virtual Notes</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl text-stone-900 tracking-tight">
          "Open When..." Love Capsules
        </h2>
        <p className="text-stone-500 text-sm mt-3 leading-relaxed">
          Little letters tucked away for the moments when you need my words the most.
        </p>
      </div>

      {/* Capsules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CAPSULES.map((cap) => (
          <button
            key={cap.id}
            type="button"
            onClick={(e) => handleOpen(e, cap)}
            className={`p-6 rounded-2xl border text-left transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-white cursor-pointer group flex flex-col justify-between ${cap.accent}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-white shadow-xs group-hover:scale-110 transition-transform">
                  {cap.icon}
                </div>
                <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                  Read Note →
                </span>
              </div>
              <h3 className="font-serif-title text-lg font-semibold text-stone-900 group-hover:text-rose-800 transition-colors mb-1.5">
                {cap.trigger}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {cap.subtitle}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-200/50 flex items-center justify-between text-xs text-rose-800 font-medium">
              <span>Touch to open</span>
              <Heart className="w-3.5 h-3.5 group-hover:fill-rose-500" />
            </div>
          </button>
        ))}
      </div>

      {/* Capsule Content Modal */}
      {activeCapsule && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveCapsule(null)}
        >
          <div
            className="bg-[#FFFDF9] border border-[#E8DEC8] rounded-2xl max-w-lg w-full p-7 sm:p-9 shadow-2xl relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-200/80 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-700">
                  {activeCapsule.icon}
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-rose-800 tracking-wider font-semibold">
                    Love Capsule
                  </div>
                  <h3 className="font-serif-title text-xl text-stone-900 font-bold">
                    {activeCapsule.trigger}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveCapsule(null)}
                className="p-1.5 text-stone-600 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                aria-label="Close note modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Note text */}
            <div className="font-serif text-stone-800 text-base leading-relaxed whitespace-pre-line space-y-4">
              {activeCapsule.content}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-5 border-t border-stone-200/60 flex items-center justify-between">
              <span className="text-xs text-stone-600 font-serif italic">
                Always here for you, no matter what.
              </span>
              <button
                type="button"
                onClick={() => {
                  triggerHeartBurst(undefined, undefined, 20);
                  setActiveCapsule(null);
                }}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Close with Love ❤
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
