import React, {useEffect, useState} from 'react';
import HabitForm from '../../Components/HabitForm/HabitForm';
import DatePicker from '../../Components/DatePicker/DatePicker';
import Heatmap from '../../Components/Heatmap/Heatmap';
import HabitInfo from '../../Components/HabitInfo/HabitInfo';
import './HabitsPage.modules.scss';
import {Habit} from '../../utils';

const HabitsPage = () => {
  const [habitsArr, setHabitsArr] = useState<Habit[]>([]);

  useEffect(() => {
    let fetchedHabitsArr = [];

    fetch('http://localhost:8000/habits')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetchedHabitsArr = data;
        if (JSON.stringify(fetchedHabitsArr) !== JSON.stringify(habitsArr)) {
          setHabitsArr(fetchedHabitsArr);
        }
      });
  }, [habitsArr]);

  const handleHabitAdded = (habit: Habit) => {
    setHabitsArr([...habitsArr, habit]);
  };

  const handleHabitDeleted = (habitId: number) => {
    setHabitsArr(habitsArr.filter((habit) => habit.id !== habitId));
  };

  return (
    <div className='habits-page'>
      {habitsArr && (
        <HabitForm habitsArr={habitsArr} addNewHabit={handleHabitAdded} />
      )}
      {habitsArr && (
        <HabitInfo
          habitsArr={habitsArr}
          setHabitsArr={setHabitsArr}
          deleteHabit={handleHabitDeleted}
        />
      )}
      <Heatmap />
      <DatePicker />
    </div>
  );
};

export default HabitsPage;