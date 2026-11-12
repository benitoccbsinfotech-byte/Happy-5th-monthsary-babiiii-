import React, { useState } from 'react';
import { Heart, Plus, Sparkles, Check, Smile, ShieldCheck, HeartHandshake, Eye, MessageCircleHeart } from 'lucide-react';
import { triggerHeartBurst } from '../utils/heartBurst';

interface Reason {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const INITIAL_REASONS: Reason[] = [
  {
    id: 1,
    number: '01',
    title: 'The Way Your Laugh Warms Any Room',
    description: 'It is utterly contagious. Whenever you laugh with your whole heart—the little snort, the crinkled eyes—it instantly melts away whatever stress I was carrying.',
    icon: <Smile className="w-5 h-5 text-rose-600" />,
  },
  {
    id: 2,
    number: '02',
    title: 'How Safe I Feel When I Am With You',
    description: 'The moment your arms wrap around me or your fingers interlace with mine, the chaos of the world outside goes silent. You are my calm and my safe haven.',
    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
  },
  {
    id: 3,
    number: '03',
    title: 'The Tender Way You Remember Details',
    description: 'How you remember my favorite treats, stories I told you in passing, or when I just need a quiet forehead kiss. You pay attention in a way that makes me feel deeply seen.',
    icon: <HeartHandshake className="w-5 h-5 text-rose-700" />,
  },
  {
    id: 4,
    number: '04',
    title: 'Our Unspoken Secret Language',
    description: 'A single look across a crowded room, a slight tilt of your head, and we both burst into giggles without saying a single word. Nobody gets me quite like you do.',
    icon: <Eye className="w-5 h-5 text-indigo-600" />,
  },
  {
    id: 5,
    number: '05',
    title: 'How You Inspire Me to Be Better',
    description: 'Watching your kindness, your determination, and how deeply you love makes me want to be the best version of myself for us and our future together.',
    icon: <MessageCircleHeart className="w-5 h-5 text-rose-600" />,
  },
];

export const FiveReasonsGrid: React.FC = () => {
  const [reasons, setReasons] = useState<Reason[]>(() => {
    try {
      const saved = localStorage.getItem('monthsary_custom_reasons');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REASONS;
  });

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');
  const [activeFlipped, setActiveFlipped] = useState<Record<number, boolean>>({});

  const handleToggleFlip = (e: React.MouseEvent, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
    setActiveFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const nextId = reasons.length + 1;
    const newReason: Reason = {
      id: nextId,
      number: String(nextId).padStart(2, '0'),
      title: newTitle.trim(),
      description: newDesc.trim() || 'Another one of the million reasons why my heart chose yours.',
      icon: <Heart className="w-5 h-5 text-rose-600" />,
    };

    const updated = [...reasons, newReason];
    setReasons(updated);
    try {
      localStorage.setItem('monthsary_custom_reasons', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  return (
    <section id="reasons" className="py-16 md:py-24 px-6 bg-[#FAF7F2] border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-700 mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-600" />
            <span>Honoring Our 5th Month</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-stone-900 tracking-tight">
            5 Things I Adore About You
          </h2>
          <p className="text-stone-500 text-sm mt-3">
            Out of an infinity of reasons, these five stand out like bright stars in my sky.
          </p>
        </div>

        {/* 3-Column Grid of Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              onClick={(e) => handleToggleFlip(e, reason.id)}
              className="bg-white border border-stone-200/90 rounded-2xl p-7 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif-title text-2xl font-bold text-rose-900/60 tabular-nums">
                    {reason.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] group-hover:bg-rose-50 transition-colors">
                    {reason.icon}
                  </div>
                </div>

                <h3 className="font-serif-title text-xl text-stone-900 font-semibold mb-3 group-hover:text-rose-800 transition-colors">
                  {reason.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 group-hover:text-rose-600 transition-colors">
                <span className="italic font-serif">Loved today and always</span>
                <Heart className="w-3.5 h-3.5 group-hover:fill-rose-500" />
              </div>
            </div>
          ))}

          {/* Add a Custom Reason Card */}
          <div className="border-2 border-dashed border-stone-300 hover:border-rose-300 rounded-2xl p-7 flex flex-col justify-center items-center text-center transition-colors bg-white/40 min-h-[220px]">
            {!isAdding ? (
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="flex flex-col items-center gap-2 text-stone-600 hover:text-rose-700 transition-colors focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="font-serif-title text-base font-semibold">Add Reason #{reasons.length + 1}</span>
                <span className="text-xs text-stone-600 max-w-[200px]">
                  Write in another sweet thing you love about them
                </span>
              </button>
            ) : (
              <form onSubmit={handleAddReason} className="w-full text-left space-y-3">
                <div className="text-xs font-semibold text-stone-700">Add Another Reason:</div>
                <input
                  type="text"
                  placeholder="e.g. Your forehead kisses..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                  required
                />
                <textarea
                  placeholder="Why this makes your heart flutter..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-medium bg-rose-700 text-white rounded-lg hover:bg-rose-800"
                  >
                    Save Reason
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
