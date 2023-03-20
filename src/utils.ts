export const daysOfWeek: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export interface Habit {
  id?: number;
  habitName: string;
  days: number[];
}

export function normalizeDayIndex(usDayIndex: number) {
  return usDayIndex === 0 ? 6 : usDayIndex - 1;
}
