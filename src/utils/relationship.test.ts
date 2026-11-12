import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateLoveDuration,
  getDefaultAnniversaryDate,
  calculateMilestoneStats,
  sanitizeCoupleNames,
} from './relationship';

test('getDefaultAnniversaryDate returns a valid YYYY-MM-DD 5 months prior', () => {
  const ref = new Date('2026-11-12T12:00:00Z');
  const result = getDefaultAnniversaryDate(ref);
  assert.equal(result, '2026-06-13');
});

test('calculateLoveDuration accurately computes 5 months difference', () => {
  const start = new Date('2026-06-12T00:00:00Z');
  const now = new Date('2026-11-12T00:00:00Z');
  const duration = calculateLoveDuration(start, now);

  assert.equal(duration.months, 5);
  assert.ok(duration.totalDays >= 152 && duration.totalDays <= 154, 'Should be around 153 days');
  assert.ok(duration.totalHours > 3600);
  assert.equal(duration.daysIntoMonth, 0);
  assert.equal(duration.progressToNextMonthPct, 0);
});

test('calculateLoveDuration computes partial progress toward month 6', () => {
  const start = new Date('2026-06-12T00:00:00Z');
  const now = new Date('2026-11-27T00:00:00Z'); // 15 days into 5th month
  const duration = calculateLoveDuration(start, now);

  assert.equal(duration.months, 5);
  assert.equal(duration.daysIntoMonth, 15);
  assert.ok(duration.progressToNextMonthPct > 40 && duration.progressToNextMonthPct < 60);
});

test('calculateMilestoneStats returns formatted heartbeats and memory hours', () => {
  const stats = calculateMilestoneStats(153);
  assert.equal(stats.sunrisesTogether, 153);
  assert.equal(stats.hoursOfMemories, 153 * 24);
  assert.ok(typeof stats.estimatedHeartbeats === 'string');
  assert.ok(typeof stats.estimatedSmiles === 'string');
});

test('sanitizeCoupleNames falls back gracefully to romantic terms of endearment', () => {
  const fallback = sanitizeCoupleNames('', '   ');
  assert.equal(fallback.partner, 'My Dearest Love');
  assert.equal(fallback.sender, 'Yours Always');

  const custom = sanitizeCoupleNames('Maya', 'Alex');
  assert.equal(custom.partner, 'Maya');
  assert.equal(custom.sender, 'Alex');
});
