
// export const baseUrl: string = 'http://localhost:8080';
export const baseUrl: string = 'https://shrouded-plains-88631.herokuapp.com';

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
  id: string;
  habitName: string;
  days: HabitDay[];
}

export interface HabitDay {
  dayOfWeek: number,
  completed: boolean
}

export function normalizeDayIndex(usDayIndex: number) {
  return usDayIndex === 0 ? 6 : usDayIndex - 1;
}
