import React, {useEffect, useState} from 'react';
import HabitForm from '../../Components/HabitForm/HabitForm';
import DatePicker from '../../Components/DatePicker/DatePicker';
import Heatmap from '../../Components/Heatmap/Heatmap';
import './HabitsPage.modules.scss';

interface Habit {
  name: string;
  frequency: string;
  days?: string[];
}

const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleAddHabit = (name: string, frequency: string, days?: string[]) => {
    const newHabit: Habit = {name, frequency, days};
    setHabits([...habits, newHabit]);
  };

  useEffect(() => {
    console.log('habits:', habits);
  });

  return (
    <div className='habits-page'>
      <HabitForm onAddHabit={handleAddHabit} />
      <Heatmap />
      <DatePicker />
    </div>
  );
};

export default HabitsPage;
