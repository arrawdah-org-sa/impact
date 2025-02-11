export function calculateProgress(weeks: boolean[][]): number {
  const totalDays = weeks.length * 7;
  const checkedDays = weeks.reduce(
    (acc, week) => acc + week.filter(day => day).length,
    0
  );
  return Math.round((checkedDays / totalDays) * 100);
}

export function calculateStreak(weeks: boolean[][]): number {
  let currentStreak = 0;
  let maxStreak = 0;

  // Flatten the weeks array
  const days = weeks.flat();

  for (const day of days) {
    if (day) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
}

export function calculateWeekProgress(week: boolean[]): number {
  const checkedDays = week.filter(day => day).length;
  return Math.round((checkedDays / 7) * 100);
}