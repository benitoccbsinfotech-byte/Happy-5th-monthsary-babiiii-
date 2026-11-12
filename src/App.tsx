import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroMilestone } from './components/HeroMilestone';
import { AnniversaryLetter } from './components/AnniversaryLetter';
import { PersonalizeModal } from './components/PersonalizeModal';
import { FooterLove } from './components/FooterLove';
import { FloatingHeartsBackground } from './components/FloatingHeartsBackground';
import { getDefaultAnniversaryDate, sanitizeCoupleNames } from './utils/relationship';
import { ambiance } from './utils/audio';

export default function App() {
  const [partnerName, setPartnerName] = useState<string>(() => {
    return localStorage.getItem('monthsary_partner_name') || 'Isa';
  });

  const [senderName, setSenderName] = useState<string>(() => {
    return localStorage.getItem('monthsary_sender_name') || 'Benito';
  });

  const [startDate, setStartDate] = useState<string>(() => {
    return localStorage.getItem('monthsary_start_date') || getDefaultAnniversaryDate();
  });

  const [customLetter, setCustomLetter] = useState<string>(() => {
    return localStorage.getItem('monthsary_custom_letter') || '';
  });

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState<boolean>(false);

  // Toggle ambient acoustic piano chord progression
  const handleToggleAudio = () => {
    const playing = ambiance.toggle();
    setIsAudioPlaying(playing);
  };

  const handleSavePersonalization = (partner: string, sender: string, date: string) => {
    const clean = sanitizeCoupleNames(partner, sender);
    setPartnerName(clean.partner);
    setSenderName(clean.sender);
    setStartDate(date);

    try {
      localStorage.setItem('monthsary_partner_name', clean.partner);
      localStorage.setItem('monthsary_sender_name', clean.sender);
      localStorage.setItem('monthsary_start_date', date);
    } catch {
      // ignore
    }
  };

  const handleResetPersonalization = () => {
    const defaultDate = getDefaultAnniversaryDate();
    setPartnerName('Isa');
    setSenderName('Benito');
    setStartDate(defaultDate);
    setCustomLetter('');

    try {
      localStorage.removeItem('monthsary_partner_name');
      localStorage.removeItem('monthsary_sender_name');
      localStorage.removeItem('monthsary_start_date');
      localStorage.removeItem('monthsary_custom_letter');
    } catch {
      // ignore
    }
  };

  const handleUpdateLetter = (text: string) => {
    setCustomLetter(text);
    try {
      localStorage.setItem('monthsary_custom_letter', text);
    } catch {
      // ignore
    }
  };

  const handleScrollToLetter = () => {
    const el = document.getElementById('letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative bg-[#FAF7F2] text-[#2D2424] overflow-x-hidden selection:bg-rose-200 selection:text-rose-900 flex flex-col justify-between">
      {/* Delicate floating hearts background */}
      <FloatingHeartsBackground />

      <div>
        {/* Navigation bar following Top Bar Contract */}
        <HeaderNav
          partnerName={partnerName}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
          onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        />

        {/* Main Content Area */}
        <main className="relative z-10">
          {/* Happy 5th Monthsary Hero Section with Live Milestone Timer & Keepsake Polaroid */}
          <HeroMilestone
            partnerName={partnerName}
            senderName={senderName}
            startDate={startDate}
            onOpenLetter={handleScrollToLetter}
          />

          {/* Sealed Wax Envelope & Keepsake Love Letter */}
          <AnniversaryLetter
            partnerName={partnerName}
            senderName={senderName}
            customLetterContent={customLetter}
            onUpdateLetterContent={handleUpdateLetter}
            isOpenExternal={false}
          />
        </main>
      </div>

      {/* Footer */}
      <FooterLove
        partnerName={partnerName}
        senderName={senderName}
      />

      {/* Personalization Modal */}
      <PersonalizeModal
        partnerName={partnerName}
        senderName={senderName}
        startDate={startDate}
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        onSave={handleSavePersonalization}
        onReset={handleResetPersonalization}
      />
    </div>
  );
}
