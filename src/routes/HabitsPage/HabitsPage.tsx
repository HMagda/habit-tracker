import React, {useEffect, useState} from 'react';
import HabitForm from '../../Components/HabitForm/HabitForm';
import DatePicker from '../../Components/DatePicker/DatePicker';
import Heatmap from '../../Components/Heatmap/Heatmap';
import HabitInfo from '../../Components/HabitInfo/HabitInfo';
import './HabitsPage.modules.scss';
import {baseUrl, Habit} from '../../utils';


const HabitsPage = () => {
    const [habitsArr, setHabitsArr] = useState<Habit[]>([]);

    useEffect(() => {
        fetch(baseUrl +'/habits', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json(); // Read the response as JSON directly
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
    });

  const handleHabitAdded = (habit: Habit) => {
    setHabitsArr([...habitsArr, habit]);
  };

  const handleHabitDeleted = (habitId: string) => {
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