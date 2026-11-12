import React, { useState } from 'react';
import { Mail, Heart, Check, Copy, Edit3, X } from 'lucide-react';
import { triggerHeartBurst } from '../utils/heartBurst';

interface AnniversaryLetterProps {
  partnerName: string;
  senderName: string;
  customLetterContent?: string;
  onUpdateLetterContent: (newText: string) => void;
  isOpenExternal?: boolean;
}

export const AnniversaryLetter: React.FC<AnniversaryLetterProps> = ({
  partnerName,
  senderName,
  customLetterContent,
  onUpdateLetterContent,
  isOpenExternal = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenExternal);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>('');

  const defaultLetter = `Hi, babii! Happy monthsary!

Sobrang thank you sa lahat-lahat. I appreciate everything you do for me, kahit minsan sobrang hindi ko na maintindihan sarili ko or minsan makulit ako. Lagi ka pa rin nandiyan. Thank you for always being there for me, especially sa mga times na sobrang hina ko. Salamat kasi lagi mo akong sinusuportahan and for always making me feel loved.

I know na sometimes busy talaga tayo and minsan hindi ako nakaka-reply agad, pero sana hindi ka magsawa sa akin. Ang bilis ng panahon, no? Parang kailan lang, nagkakahiyaan pa tayo, pero look at us now.

I hope na mas tumagal pa tayo and mas kayanin natin lahat ng challenges na darating sa buhay natin, together. Ganoon din ako sa'yo, babii. If ever you need someone, nandito lang ako palagi. I will always be your number one supporter in life. Hindi kita iiwan sa mga times na nahihirapan ka, and of course, I will also be there during your happiest moments.

Always remember na whatever you want to achieve in life, I will always support you. Lagi kong pinagpe-pray na makamit mo lahat ng dreams and goals mo. Sobrang dami kong gustong sabihin sa'yo, pero minsan hindi ko talaga kayang i-turn into words lahat ng nararamdaman ko.

I'm also really thankful kasi nakilala kita. You became such a special part of my life, and I'm so lucky to have you. Thank you for loving me, understanding me, and choosing to stay with me.

I love you so much, my one and only Isa. Happy monthsary, babii! Here's to more monthsaries, more memories, more happiness, and more years together. I love you always, babiiii kooo! Mwaamwaaaa!`;

  const letterText = customLetterContent || defaultLetter;

  const handleOpenEnvelope = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 32);
    setIsOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartEdit = () => {
    setEditText(letterText);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onUpdateLetterContent(editText);
    setIsEditing(false);
  };

  return (
    <section id="letter" className="py-16 md:py-24 px-6 bg-[#F5EFE6]/50 border-y border-stone-200/50">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-700 mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Sealed With Love</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-stone-900 tracking-tight">
            A Letter for Our 5th Monthsary
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            Click the wax seal below to open your keepsake message.
          </p>
        </div>

        {/* Envelope Container */}
        {!isOpen ? (
          <div className="flex flex-col items-center">
            {/* Sealed Envelope Graphic */}
            <button
              type="button"
              onClick={handleOpenEnvelope}
              className="relative w-full max-w-md aspect-[16/10] bg-[#EFE8DC] border-2 border-[#D7CABA] rounded-2xl shadow-md p-6 flex flex-col justify-between items-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-rose-300 group focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              aria-label="Click to break the wax seal and open the anniversary letter"
            >
              {/* Envelope flap folds styling */}
              <div className="absolute inset-x-0 top-0 h-1/2 border-b-2 border-[#D7CABA]/80 bg-gradient-to-b from-[#E7DC run/60] to-[#E3D7C5] rounded-t-2xl pointer-events-none" />
              
              <div className="w-full text-right relative z-10 text-[11px] font-mono text-stone-500">
                To: {partnerName}
              </div>

              {/* Crimson Wax Seal Button */}
              <div className="relative z-20 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 text-rose-100 flex items-center justify-center shadow-lg border-2 border-rose-900/60 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full border border-dashed border-rose-300/40 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-200 fill-rose-200" />
                  </div>
                </div>
                <span className="text-[11px] font-serif-title tracking-wider uppercase text-rose-900 font-semibold mt-2 group-hover:text-rose-700">
                  Tap to Break Seal
                </span>
              </div>

              <div className="w-full text-left relative z-10 text-[11px] font-mono text-stone-500">
                From: {senderName}
              </div>
            </button>
            <p className="text-xs text-stone-600 mt-4 italic font-serif">
              "Words meant only for your eyes and heart."
            </p>
          </div>
        ) : (
          /* Opened Parchment Letter */
          <div className="bg-[#FFFDF9] border border-[#E8DEC8] rounded-2xl p-7 sm:p-10 shadow-lg relative transition-all duration-500 animate-fadeIn">
            
            {/* Top letter controls */}
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 mb-6">
              <div className="text-xs font-serif italic text-stone-500">
                Five Months of Forever · Marked with Devotion
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 rounded-md hover:bg-stone-200 transition-colors flex items-center gap-1"
                  title="Personalize or edit this letter"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Note</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 rounded-md hover:bg-stone-200 transition-colors flex items-center gap-1"
                  title="Copy letter text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-stone-600 hover:text-stone-700 rounded-md transition-colors"
                  title="Fold letter back into envelope"
                  aria-label="Fold letter back into envelope"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <label htmlFor="custom-letter-input" className="block text-xs font-medium text-stone-700">
                  Customize Your Anniversary Letter:
                </label>
                <textarea
                  id="custom-letter-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={10}
                  className="w-full p-4 border border-stone-300 rounded-xl font-serif text-sm text-stone-800 leading-relaxed focus:ring-2 focus:ring-rose-500 focus:outline-none bg-[#FAF7F2]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="px-4 py-2 text-xs font-medium text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-colors shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* Letter Body with Beautiful Typography */
              <div className="space-y-5 font-serif text-stone-800 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {letterText}

                <div className="pt-8 border-t border-stone-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-sans text-stone-500 uppercase tracking-wider">
                      Always & Truly,
                    </div>
                    <div className="font-script text-3xl sm:text-4xl text-rose-900 mt-1">
                      {senderName}
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-full border border-rose-300/60 bg-rose-50 flex items-center justify-center text-rose-800">
                    <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
