import React, {useEffect, useState} from 'react';
import HabitForm from '../../Components/HabitForm/HabitForm';
import DatePicker from '../../Components/DatePicker/DatePicker';
import Heatmap from '../../Components/Heatmap/Heatmap';
import HabitsCompletion from '../../Components/HabitsCompletion/HabitsCompletion';
import './HabitsPage.modules.scss';
import {Habit} from '../../utils';

const HabitsPage = () => {
  const [habitsArr, setHabitsArr] = useState<Habit[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/habits')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setHabitsArr(data);
      });
  }, []);

  const handleHabitAdded = (habit: Habit) => {
    setHabitsArr([...habitsArr, habit]);
  };

  return (
    <div className='habits-page'>
      {habitsArr && <HabitForm addNewHabit={handleHabitAdded} habitsArr={habitsArr}/>}
      {habitsArr && <HabitsCompletion habits={habitsArr} />}
      <Heatmap />
      <DatePicker />
    </div>
  );
};

export default HabitsPage;
