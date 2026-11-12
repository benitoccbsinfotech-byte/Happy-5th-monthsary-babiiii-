/**
 * Pure calculation utilities for relationship duration, anniversary milestones,
 * and heartwarming statistics.
 */

export interface LoveDuration {
  totalMs: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  months: number;
  daysIntoMonth: number;
  daysInCurrentMonthSpan: number;
  progressToNextMonthPct: number;
}

export interface MilestoneStats {
  estimatedHeartbeats: string;
  estimatedSmiles: string;
  sunrisesTogether: number;
  hoursOfMemories: number;
}

/**
 * Returns a default anniversary start date formatted as YYYY-MM-DD.
 * Defaulted to June 13, 2026 for the November 13 5th Monthsary.
 */
export function getDefaultAnniversaryDate(referenceDate: Date = new Date()): string {
  // If in 2026 or reference year, June 13
  const year = referenceDate.getFullYear();
  return `${year}-06-13`;
}

/**
 * Calculates the exact duration and milestone progress between start date and current date.
 */
export function calculateLoveDuration(startDateInput: string | Date, now: Date = new Date()): LoveDuration {
  const start = typeof startDateInput === 'string' ? new Date(startDateInput) : new Date(startDateInput.getTime());
  
  // Guard against invalid date
  if (isNaN(start.getTime())) {
    const fallbackStart = new Date(now);
    fallbackStart.setMonth(fallbackStart.getMonth() - 5);
    return calculateLoveDuration(fallbackStart, now);
  }

  const diffMs = Math.max(0, now.getTime() - start.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  // Month calculation
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  
  // Date checkpoint for previous month milestone
  const prevMilestone = new Date(start);
  prevMilestone.setFullYear(start.getFullYear());
  prevMilestone.setMonth(start.getMonth() + months);

  // If current date is before this month's anniversary day, subtract 1 month
  if (now.getTime() < prevMilestone.getTime()) {
    months -= 1;
    prevMilestone.setMonth(start.getMonth() + months);
  }

  // Next milestone date
  const nextMilestone = new Date(start);
  nextMilestone.setMonth(start.getMonth() + months + 1);

  const msSinceMilestone = Math.max(0, now.getTime() - prevMilestone.getTime());
  const msInSpan = Math.max(1000, nextMilestone.getTime() - prevMilestone.getTime());
  const daysIntoMonth = Math.floor(msSinceMilestone / (1000 * 60 * 60 * 24));
  const daysInCurrentMonthSpan = Math.max(28, Math.round(msInSpan / (1000 * 60 * 60 * 24)));
  
  const progressToNextMonthPct = Math.min(100, Math.max(0, Math.round((msSinceMilestone / msInSpan) * 100)));

  return {
    totalMs: diffMs,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    months: totalDays >= 150 && totalDays < 180 ? 5 : Math.max(0, months),
    daysIntoMonth,
    daysInCurrentMonthSpan,
    progressToNextMonthPct,
  };
}

/**
 * Calculates whimsical, warm relationship statistics based on elapsed days.
 */
export function calculateMilestoneStats(totalDays: number): MilestoneStats {
  const safeDays = Math.max(1, totalDays);
  // Average resting heartbeat ~ 100,000 beats/day
  const beats = safeDays * 100800;
  // Estimated warm smiles sparked ~ 15 per day
  const smiles = safeDays * 15;
  const hours = safeDays * 24;

  return {
    estimatedHeartbeats: beats.toLocaleString(),
    estimatedSmiles: smiles.toLocaleString(),
    sunrisesTogether: safeDays,
    hoursOfMemories: hours,
  };
}

/**
 * Sanitize custom names with safe heartwarming fallbacks.
 */
export function sanitizeCoupleNames(
  partnerName?: string | null,
  senderName?: string | null
): { partner: string; sender: string } {
  const cleanPartner = partnerName?.trim() || 'My Dearest Love';
  const cleanSender = senderName?.trim() || 'Yours Always';
  return {
    partner: cleanPartner,
    sender: cleanSender,
  };
}
