import {GetTokenSilentlyOptions, useAuth0} from "@auth0/auth0-react";

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

export interface HabitForToday {
  id: string;
  day: number;
  habitName: string;
  completed: boolean;
}

export interface HabitDay {
  dayOfWeek: number;
  dateOfWeek: string;
  completed: boolean;
  isBeforeCreationDate: boolean;
}

export interface HabitData {
  habitName: string;
  score: number;
  maxScore: number;
}

export function normalizeDayIndex(usDayIndex: number) {
  return usDayIndex === 0 ? 6 : usDayIndex - 1;
}

export const getToken = async (tokenFetcher: (options: GetTokenSilentlyOptions) => Promise<string>) => {
  try {
    const options: GetTokenSilentlyOptions = {
      authorizationParams: {
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      },
    };

    return await tokenFetcher(options);
  } catch (error) {
    console.error('Error getting access token:', error);
  }
};
