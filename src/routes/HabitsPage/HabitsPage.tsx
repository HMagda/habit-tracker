import React, {useEffect, useState} from 'react';
import HabitForm from '../../Components/HabitForm/HabitForm';
import DatePicker from '../../Components/DatePicker/DatePicker';
import Heatmap from '../../Components/Heatmap/Heatmap';
import HabitsCompletion from '../../Components/HabitsCompletion/HabitsCompletion';
import './HabitsPage.modules.scss';

interface Habit {
  name: string;
  frequency: string;
  days: string[];
}

const HabitsArr = [
  {id: 1, name: 'run', days: ['Wednesday', 'Saturday', 'Sunday']},
  {id: 2, name: 'learn to code', days: ['Monday', 'Friday']},
  {id: 3,
    name: 'reading',
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },
];

const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleAddHabit = (name: string, frequency: string, days: string[]) => {
    const newHabit: Habit = {name, frequency, days};
    setHabits([...habits, newHabit]);
  };

  useEffect(() => {
    console.log('habits:', habits);
  });

  return (
    <div className='habits-page'>
      <HabitForm onAddHabit={handleAddHabit} />
      <HabitsCompletion habits={HabitsArr} />
      <Heatmap />
      <DatePicker />
    </div>
  );
};

export default HabitsPage;
