import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, CalendarHeart } from 'lucide-react';
import { calculateLoveDuration, calculateMilestoneStats, LoveDuration } from '../utils/relationship';
import { triggerHeartBurst } from '../utils/heartBurst';

interface HeroMilestoneProps {
  partnerName: string;
  senderName: string;
  startDate: string;
  onOpenLetter: () => void;
}

export const HeroMilestone: React.FC<HeroMilestoneProps> = ({
  partnerName,
  senderName,
  startDate,
  onOpenLetter,
}) => {
  const [duration, setDuration] = useState<LoveDuration>(() =>
    calculateLoveDuration(startDate, new Date())
  );
  const [heartsCount, setHeartsCount] = useState<number>(555);

  useEffect(() => {
    // Live ticker update every second
    const timer = setInterval(() => {
      setDuration(calculateLoveDuration(startDate, new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const stats = calculateMilestoneStats(duration.totalDays);

  const handleSendHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);
    setHeartsCount((prev) => prev + 1);
  };

  return (
    <section id="top" className="relative pt-12 pb-16 md:pt-18 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Split container: Left Editorial Text + Right Keepsake Polaroid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Elegant unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-rose-700">
              <CalendarHeart className="w-4 h-4 text-rose-600" />
              <span>Chapter Five Milestone</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>November 13</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.12] tracking-tight text-balance">
              Happy 5th Monthsary, <br className="hidden sm:inline" />
              <span className="italic font-normal text-rose-800">{partnerName}</span>.
            </h1>

            {/* Warm Lead Copy */}
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Five months ago, you walked into my world and made everything softer, brighter, and deeply comforting. 
              From quiet midnight talks to effortless laughter, every single day with you feels like home.
            </p>

            {/* Live Relationship Counter Strip */}
            <div className="w-full bg-white/80 border border-stone-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-600" />
                  Our Time Together
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  Since {startDate}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="p-2 sm:p-3 bg-[#FAF7F2] rounded-xl border border-stone-100">
                  <div className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                    {duration.months}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium mt-0.5">Months</div>
                </div>

                <div className="p-2 sm:p-3 bg-[#FAF7F2] rounded-xl border border-stone-100">
                  <div className="font-serif-title text-2xl sm:text-3xl font-bold text-rose-800 tabular-nums">
                    {duration.totalDays}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium mt-0.5">Total Days</div>
                </div>

                <div className="p-2 sm:p-3 bg-[#FAF7F2] rounded-xl border border-stone-100">
                  <div className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                    {duration.totalHours}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium mt-0.5">Hours</div>
                </div>

                <div className="p-2 sm:p-3 bg-[#FAF7F2] rounded-xl border border-stone-100">
                  <div className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                    {String(duration.totalSeconds % 60).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium mt-0.5">Seconds</div>
                </div>
              </div>

              {/* Progress to Month 6 */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
                  <span className="font-medium">Journey to Month 6</span>
                  <span className="tabular-nums font-semibold text-rose-700">
                    Day {duration.daysIntoMonth} of {duration.daysInCurrentMonthSpan} ({duration.progressToNextMonthPct}%)
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(4, duration.progressToNextMonthPct)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenLetter}
                className="px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white font-medium text-sm rounded-xl shadow-sm transition-all hover:shadow-md flex items-center gap-2"
              >
                <span>Read Your Anniversary Letter</span>
                <span className="text-rose-200">✉</span>
              </button>

              <button
                type="button"
                onClick={handleSendHeart}
                className="px-5 py-3 bg-white hover:bg-rose-50 text-stone-800 hover:text-rose-700 border border-stone-200 text-sm font-medium rounded-xl transition-all shadow-xs flex items-center gap-2 group"
              >
                <Heart className="w-4 h-4 text-rose-600 group-hover:scale-125 transition-transform fill-rose-100" />
                <span>Send Love</span>
                <span className="text-xs text-stone-600 font-mono tabular-nums">
                  ({heartsCount.toLocaleString()})
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Keepsake Polaroid Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Decorative vintage postage stamp note */}
              <div className="absolute -top-4 -right-2 z-10 bg-rose-100/90 text-rose-900 border border-rose-200/80 rounded-md px-2.5 py-1 text-[11px] font-medium shadow-xs transform rotate-3">
                Milestone · 5 Months
              </div>

              {/* Polaroid card */}
              <div className="polaroid-frame rounded-2xl p-4 pb-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-0 rotate-1 border border-stone-200/50">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 mb-4 shadow-inner relative">
                  <img
                    src="/assets/aistudio/image_f2657d36.png"
                    alt="Isa and Benito 5th monthsary keepsake photo"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="px-2 text-center">
                  <p className="font-script text-2xl text-stone-800 leading-tight">
                    "Five months together, and I choose you every single day."
                  </p>
                  <p className="text-xs text-stone-600 mt-1 font-medium">
                    With all my heart, {senderName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Claim-to-Proof Metric Strip */}
        <div className="mt-14 pt-8 border-t border-stone-200/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-700">
          <div>
            <div className="text-xs text-stone-600 font-medium">Sunrises As Yours</div>
            <div className="font-serif-title text-2xl text-stone-900 mt-1 font-semibold tabular-nums">
              {stats.sunrisesTogether} Mornings
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-600 font-medium">Shared Hours</div>
            <div className="font-serif-title text-2xl text-stone-900 mt-1 font-semibold tabular-nums">
              {stats.hoursOfMemories.toLocaleString()} Hours
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-600 font-medium">Heartbeats For You</div>
            <div className="font-serif-title text-2xl text-stone-900 mt-1 font-semibold tabular-nums">
              ~{stats.estimatedHeartbeats}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-600 font-medium">Favorite Decision</div>
            <div className="font-serif-title text-2xl text-rose-800 mt-1 font-semibold">
              Saying Yes To Us
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
