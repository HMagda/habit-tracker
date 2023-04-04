import React, {useEffect, useState} from 'react';
import HabitForm from '../../Components/HabitForm/HabitForm';
import DatePicker from '../../Components/DatePicker/DatePicker';
import Heatmap from '../../Components/Heatmap/Heatmap';
import HabitInfo from '../../Components/HabitInfo/HabitInfo';
import './HabitsPage.modules.scss';
import {baseUrl, Habit, HabitForToday} from '../../utils';
import HabitsForToday from '../../Components/HabitsForToday/HabitsForToday';

const HabitsPage = () => {
  const [habitsArr, setHabitsArr] = useState<Habit[]>([]);
  const [habitsForTodayArr, setHabitsForTodayArr] = useState<HabitForToday[]>(
    []
  );

  useEffect(() => {
    fetch(baseUrl + '/habits', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        const fetchedHabitsArr = data.habits; // Get the habits array from the response
        if (JSON.stringify(fetchedHabitsArr) !== JSON.stringify(habitsArr)) {
          setHabitsArr(fetchedHabitsArr);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  useEffect(() => {
    fetch(baseUrl + '/habits/today', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('data for today', data);
        const fetchedHabitsForTodayArr = data.habits; // Get the habits array from the response
        if (
          JSON.stringify(fetchedHabitsForTodayArr) !==
          JSON.stringify(habitsForTodayArr)
        ) {
          setHabitsForTodayArr(fetchedHabitsForTodayArr);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [habitsForTodayArr]);

  const handleHabitDeleted = (habitId: string) => {
    setHabitsArr(habitsArr.filter((habit) => habit.id !== habitId));
  };

  return (
    <div className='habits-page'>
      {habitsForTodayArr && (
        <HabitsForToday
          habitsForTodayArr={habitsForTodayArr}
          setHabitsForTodayArr={setHabitsForTodayArr}
        />
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
