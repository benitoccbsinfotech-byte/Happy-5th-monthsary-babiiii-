import React, { useState } from 'react';
import { Sparkles, Heart, Compass, Coffee, Sun, Moon, Calendar } from 'lucide-react';
import { triggerHeartBurst } from '../utils/heartBurst';

interface MemoryItem {
  month: number;
  title: string;
  theme: string;
  dateLabel: string;
  story: string;
  highlight: string;
  image?: string;
  alt?: string;
  icon: React.ReactNode;
}

const MEMORIES: MemoryItem[] = [
  {
    month: 1,
    title: 'The Spark & Nervous Butterflies',
    theme: 'Month One',
    dateLabel: 'First 30 Days',
    story: 'Remember how our hearts beat a little faster every time we caught each other looking? Over warm mugs of coffee and stolen glances, the simplest conversations felt electric. That was the moment I knew you were going to be someone unforgettable.',
    highlight: 'The first time we lost track of time and talked for four hours straight.',
    image: '/src/assets/images/couple_memory_cozy_1794492372023.jpg',
    alt: 'Warm mugs of coffee and hands resting together on a rustic wooden table',
    icon: <Coffee className="w-4 h-4 text-rose-600" />,
  },
  {
    month: 2,
    title: 'Sunset Walks & Whispered Secrets',
    theme: 'Month Two',
    dateLabel: 'Day 31 - Day 60',
    story: 'Walking side by side along the shore as the sky turned shades of amber and rose. We shared childhood stories, silly fears, and playlists that felt like confessions. You gently took my hand, and everything in the universe suddenly felt aligned.',
    highlight: 'The sunset where we stopped walking just to look at each other and smile.',
    image: '/src/assets/images/couple_memory_sunset_1794492354100.jpg',
    alt: 'Couple holding hands walking along the seashore during golden hour sunset',
    icon: <Sun className="w-4 h-4 text-amber-600" />,
  },
  {
    month: 3,
    title: 'Effortless Comfort & Unapologetic Us',
    theme: 'Month Three',
    dateLabel: 'Day 61 - Day 90',
    story: 'No longer trying to appear perfect; just wrapped up in oversized blankets, sharing inside jokes that make zero sense to anyone else, and laughing until our stomachs hurt. You saw the real, tired, goofy version of me and made me feel completely cherished.',
    highlight: 'Realizing that doing nothing with you is better than doing anything with anyone else.',
    icon: <Heart className="w-4 h-4 text-rose-600" />,
  },
  {
    month: 4,
    title: 'Stargazing & Growing Deeper',
    theme: 'Month Four',
    dateLabel: 'Day 91 - Day 120',
    story: 'Under a blanket of twinkling stars, we talked about dreams, the future, and how much we have grown together. Every small challenge we tackled only proved that we make the sweetest, strongest team in the world.',
    highlight: 'Pointing at the night sky and whispering: "I choose you, every single time."',
    image: '/src/assets/images/couple_memory_stargazing_1794492355135.jpg',
    alt: 'Picnic blanket with fairy lights under a starry twilight night sky',
    icon: <Moon className="w-4 h-4 text-indigo-600" />,
  },
  {
    month: 5,
    title: 'Five Months Strong & Forever in Progress',
    theme: 'Month Five',
    dateLabel: 'Today · Milestone Five',
    story: 'Today we celebrate 150+ days of choosing each other. Five beautiful months of your hand in mine, your laugh warming up any cold day, and our little world getting richer by the hour. Five months is just the prologue to the great love story we are writing together.',
    highlight: 'Every morning waking up and being grateful that it is you.',
    image: '/src/assets/images/monthsary_hero_keepsake_1794492353261.jpg',
    alt: 'Wax sealed letter with dried rose and glowing fairy lights',
    icon: <Sparkles className="w-4 h-4 text-rose-700" />,
  },
];

export const TimelineJourney: React.FC = () => {
  const [lovedMonths, setLovedMonths] = useState<Record<number, boolean>>({});

  const toggleLove = (e: React.MouseEvent, month: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
    setLovedMonths((prev) => ({ ...prev, [month]: !prev[month] }));
  };

  return (
    <section id="timeline" className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-700 mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>The Journey So Far</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl text-stone-900 tracking-tight">
          Five Chapters, Infinite Love
        </h2>
        <p className="text-stone-500 text-sm mt-3 leading-relaxed">
          How each month unfolded into something deeper, gentler, and more precious.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-stone-200/80 ml-4 sm:ml-32 space-y-12">
        {MEMORIES.map((item) => {
          const isLoved = lovedMonths[item.month];
          return (
            <div key={item.month} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Marker Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-rose-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <span className="font-serif text-xs font-bold text-rose-800">
                  {item.month}
                </span>
              </div>

              {/* Month Label for Desktop alignment */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-24">
                <div className="text-xs font-serif font-bold text-stone-900">
                  {item.theme}
                </div>
                <div className="text-[11px] text-stone-600 font-mono">
                  {item.dateLabel}
                </div>
              </div>

              {/* Card Container */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
                
                {/* Mobile month tag */}
                <div className="sm:hidden flex items-center gap-2 text-xs font-serif text-rose-700 font-bold mb-1">
                  <span>{item.theme}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-stone-600 font-mono text-[11px] font-normal">{item.dateLabel}</span>
                </div>

                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-serif-title text-xl sm:text-2xl text-stone-900 font-semibold flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => toggleLove(e, item.month)}
                    className={`p-2 rounded-full border transition-all ${
                      isLoved
                        ? 'bg-rose-50 border-rose-300 text-rose-600 scale-105'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-rose-50'
                    }`}
                    title="Cherish this memory"
                    aria-label={`Cherish memory for Month ${item.month}`}
                  >
                    <Heart className={`w-4 h-4 ${isLoved ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-4">
                  {item.story}
                </p>

                {/* Optional Polaroid Image inside card */}
                {item.image && (
                  <div className="my-5 rounded-xl overflow-hidden border border-stone-200/60 bg-stone-100 max-w-lg shadow-inner">
                    <img
                      src={item.image}
                      alt={item.alt || item.title}
                      className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Heartwarming Highlight Callout (Zero pill, clean subtle border) */}
                <div className="pt-3 border-t border-stone-100 flex items-start gap-2.5 text-xs text-stone-600">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">Favorite Keepsake: </span>
                    <span className="italic">{item.highlight}</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
