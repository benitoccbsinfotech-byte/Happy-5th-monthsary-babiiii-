import React, { useState } from 'react';
import { Ticket, Heart, Check, Sparkles, Utensils, Film, Coffee, ShieldCheck, Smile } from 'lucide-react';
import { triggerHeartBurst } from '../utils/heartBurst';

interface Coupon {
  id: string;
  title: string;
  description: string;
  expiry: string;
  icon: React.ReactNode;
  reusable?: boolean;
}

const COUPONS_DATA: Coupon[] = [
  {
    id: 'kisses-unlimited',
    title: 'Unlimited Forehead Kisses & Warm Hugs',
    description: 'Redeemable anytime you need comfort, reassurance, or just extra warmth in your day. No limits, never expires.',
    expiry: 'Valid Forever & Everywhere',
    icon: <Heart className="w-5 h-5 text-rose-600" />,
    reusable: true,
  },
  {
    id: 'midnight-food-run',
    title: 'Late Night Food / Boba / Dessert Run',
    description: 'Craving something sweet or savory at 11 PM? You pick the spot; I will drive or order and cover the bill with a smile.',
    expiry: 'Valid For Our 5th & 6th Months',
    icon: <Coffee className="w-5 h-5 text-amber-600" />,
  },
  {
    id: 'movie-marathon',
    title: 'Cozy Movie Marathon with Zero Complaints',
    description: 'You pick whatever movie, show, or cheesy rom-com you want. I will make popcorn, bring warm drinks, and snuggle up.',
    expiry: 'Valid Anytime',
    icon: <Film className="w-5 h-5 text-indigo-600" />,
  },
  {
    id: 'relaxing-massage',
    title: '30-Minute Relaxing Shoulder & Back Massage',
    description: 'After a long tiring week. Essential oils, cozy lighting, and gentle pressure until all your tension melts away.',
    expiry: 'Valid On Any Exhausting Day',
    icon: <Sparkles className="w-5 h-5 text-rose-700" />,
  },
  {
    id: 'free-win-argument',
    title: 'One "You Are 100% Right" Free Pass',
    description: 'Playful debate or choosing where to eat? Present this ticket, and you instantly win the discussion with zero objections.',
    expiry: 'One-Time Golden Pass',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 'home-cooked-meal',
    title: 'A Romantic Home-Cooked Candlelit Dinner',
    description: 'I will prepare your favorite dishes, set up a candlelit table, and handle all the dishwashing afterward.',
    expiry: 'Valid For Date Night',
    icon: <Utensils className="w-5 h-5 text-rose-600" />,
  },
];

export const RomanticCoupons: React.FC = () => {
  const [redeemed, setRedeemed] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('monthsary_redeemed_coupons');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const handleRedeem = (e: React.MouseEvent, coupon: Coupon) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 26);

    const nowFormatted = new Date().toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updated = {
      ...redeemed,
      [coupon.id]: nowFormatted,
    };
    setRedeemed(updated);
    try {
      localStorage.setItem('monthsary_redeemed_coupons', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetCoupons = () => {
    setRedeemed({});
    try {
      localStorage.removeItem('monthsary_redeemed_coupons');
    } catch {
      // ignore
    }
  };

  return (
    <section id="coupons" className="py-16 md:py-24 px-6 bg-[#FDFBF7] border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-700 mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Redeemable Sweet Perks</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Our 5th Monthsary Coupon Book
          </h2>
          <p className="text-stone-500 text-sm mt-3 leading-relaxed">
            Little vouchers made especially for you. Click "Redeem" whenever you want to claim one!
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUPONS_DATA.map((coupon) => {
            const isRedeemed = Boolean(redeemed[coupon.id]);
            const redeemedDate = redeemed[coupon.id];

            return (
              <div
                key={coupon.id}
                className={`relative rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                  isRedeemed && !coupon.reusable
                    ? 'bg-stone-50/80 border-stone-200 opacity-90'
                    : 'bg-white border-stone-200/90 hover:-translate-y-1'
                }`}
              >
                {/* Decorative perforation cutouts on left and right */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FDFBF7] border-r border-stone-300" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FDFBF7] border-l border-stone-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-rose-700">
                      {coupon.icon}
                    </div>
                    <span className="text-[11px] font-mono text-stone-600 font-medium">
                      {coupon.expiry}
                    </span>
                  </div>

                  <h3 className="font-serif-title text-xl font-semibold text-stone-900 mb-2">
                    {coupon.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {coupon.description}
                  </p>
                </div>

                {/* Redeem Action area */}
                <div className="pt-4 border-t border-dashed border-stone-200 flex items-center justify-between">
                  {isRedeemed ? (
                    <div className="flex items-center justify-between w-full">
                      <div className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Redeemed {redeemedDate}</span>
                      </div>
                      {coupon.reusable && (
                        <button
                          type="button"
                          onClick={(e) => handleRedeem(e, coupon)}
                          className="px-3 py-1 text-[11px] font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-md transition-colors"
                        >
                          Redeem Again!
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleRedeem(e, coupon)}
                      className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-medium text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Redeem Voucher</span>
                      <Heart className="w-3.5 h-3.5 fill-rose-200 text-rose-200" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer options */}
        {Object.keys(redeemed).length > 0 && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={handleResetCoupons}
              className="text-xs text-stone-600 hover:text-stone-700 underline font-medium"
            >
              Reset all coupon claims
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
