import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import DatePicker from '../../Components/DatePicker/DatePicker';
import Heatmap from '../../Components/Heatmap/Heatmap';
import HabitInfo from '../../Components/HabitInfo/HabitInfo';
import './HabitsPage.modules.scss';
import {baseUrl, Habit, HabitForToday} from '../../utils';
import HabitsForToday from '../../Components/HabitsForToday/HabitsForToday';
import {FiPlus} from 'react-icons/fi';

const HabitsPage = () => {
  // const [habitsArr, setHabitsArr] = useState<Habit[]>([]);
  // const [habitsForTodayArr, setHabitsForTodayArr] = useState<HabitForToday[]>([]);

  const location = useLocation();
  const {habits, habitsForToday, today} = location.state || {};

  const [habitsArr, setHabitsArr] = useState<Habit[]>(habits || []);
  const [habitsForTodayArr, setHabitsForTodayArr] = useState<HabitForToday[]>(
    habitsForToday || []
  );
  const [todayIndex, setTodayIndex] = useState<number>(today || 0);

  const [showHabitForm, setShowHabitForm] = useState<boolean>(false);

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
        const fetchedHabitsArr = data.habits;
        if (JSON.stringify(fetchedHabitsArr) !== JSON.stringify(habitsArr)) {
          setHabitsArr(fetchedHabitsArr);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [habitsForTodayArr]);

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
        const fetchedHabitsForTodayArr = data.habits;
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
  }, []);

  const handleHabitDeleted = (habitId: string) => {
    setHabitsArr(habitsArr.filter((habit) => habit.id !== habitId));
    setHabitsForTodayArr(
      habitsForTodayArr.filter((habit) => habit.id !== habitId)
    );
  };

  const toggleHabitForm = () => {
    console.log(habitsArr.length);
    setShowHabitForm(!showHabitForm);
  };

  return (
    <div className='habits-page'>
      {habitsForTodayArr.length > 0 && (
        <HabitsForToday
          habitsForTodayArr={habitsForTodayArr}
          setHabitsForTodayArr={setHabitsForTodayArr}
        />
      )}

      <div className='headline'>
        <h1>My week plan</h1>
        <button className='habit-form-toggle-btn' onClick={toggleHabitForm}>
          <FiPlus />
        </button>
      </div>

      {habitsArr.length > 0 && (
        <HabitInfo
          habitsArr={habitsArr}
          setHabitsArr={setHabitsArr}
          habitsForTodayArr={habitsForTodayArr}
          setHabitsForTodayArr={setHabitsForTodayArr}
          deleteHabit={handleHabitDeleted}
          setShowHabitForm={setShowHabitForm}
          showHabitForm={showHabitForm}
          toggleHabitForm={toggleHabitForm}
          todayIndex={todayIndex}
          setTodayIndex={setTodayIndex}
        />
      )}
      <Heatmap />
      <DatePicker />
    </div>
  );
};

export default HabitsPage;
