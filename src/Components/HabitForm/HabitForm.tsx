import React, {useEffect, useState} from 'react';
import {baseUrl, daysOfWeek, getToken, Habit} from '../../utils';
import './HabitForm.modules.scss';
import {FiX} from 'react-icons/fi';
import {useAuth0} from "@auth0/auth0-react";

const HabitForm: React.FC<{
  addNewHabit: (habit: Habit) => void;
  habitsArr: Habit[];
  setShowHabitForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({addNewHabit, habitsArr, setShowHabitForm}) => {
  const [habitName, setHabitName] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('daily');
  const [days, setDays] = useState<number[]>([]);
  const [warningHabitNameEmpty, setWarningHabitNameEmpty] = useState<boolean>(false);
  const [warningHabitNameExists, setWarningHabitNameExists] = useState<boolean>(false);
  const [warningChooseDay, setWarningChooseDay] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (frequency === 'daily') {
      setDays([0, 1, 2, 3, 4, 5, 6]);
    } else {
      setDays([]);
    }
  }, [frequency]);

  useEffect(() => {
    if (frequency === 'weekly' && days.length === 0) {
      setWarningChooseDay(true);
    } else {
      setWarningChooseDay(false);
    }
  }, [frequency, days]);

  useEffect(() => {
    if (habitName === '') {
      setWarningHabitNameEmpty(true);
    } else {
      setWarningHabitNameEmpty(false);
    }
  }, [habitName]);

  const toggleHabitForm = () => {
    setShowHabitForm(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const habitExists = habitsArr.map((habit, i) =>
      habitsArr[i].habitName.toLowerCase()
    );

    habitExists.includes(e.target.value.toLowerCase())
      ? setWarningHabitNameExists(true)
      : setWarningHabitNameExists(false);

      setHabitName(e.target.value);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(e.target.value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day: number = Number(e.target.id);

    setDays((days) => {
      if (days.includes(day)) {
        return days.filter((d) => d !== day);
      } else {
        return [...days, day];
      }
    });
  };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     const habit = {habitName, days};

     getToken(getAccessTokenSilently).then((token) => {
       fetch(baseUrl + '/habits', {
         method: 'POST',
         headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
         body: JSON.stringify(habit),
         credentials: "include"
       })
           .then((res) => {
             return res
           })
           .then((res) => {
             if (!res.ok) {
               throw new Error('Network response was not ok');
             }
             return res.json();
           })
           .then((createdHabit: Habit) => {
             addNewHabit(createdHabit);
           })
           .catch((error) => {
             console.error('There was a problem with the fetch operation:', error);
           });
     });

     return (
         <form className='habit-form'>PLEASE WAIT</form>
     )

     setHabitName('');
     setFrequency('daily');
     setDays([]);
   };

  return (
    <>
      <button className='habit-form-close-btn' onClick={toggleHabitForm}>
        <FiX />
      </button>
      <form onSubmit={handleSubmit} className='habit-form'>
        <label htmlFor='habitName'>Habit Name:</label>
        <input
          type='text'
          id='habitName'
          value={habitName}
          onChange={handleNameChange}
          required
        />

        {warningHabitNameExists && (
          <p className='warning-text'>This habit name already exists</p>
        )}

        {warningHabitNameEmpty && (
            <p className='warning-text'>You haven't named your habit</p>
        )}

        <label htmlFor='frequency'>Frequency:</label>
        <select
          id='frequency'
          value={frequency}
          onChange={handleFrequencyChange}
        >
          <option value='daily'>Daily</option>
          <option value='weekly'>Choose days</option>
        </select>
        {frequency === 'weekly' && (
          <>
            <p>Choose the days:</p>
            {daysOfWeek.map((day, i) => (
              <label key={day} htmlFor={i.toString()} className='days-label'>
                <input
                  type='checkbox'
                  id={i.toString()}
                  value={day}
                  checked={days.includes(i)}
                  onChange={handleDayChange}
                />
                <div className='days-checkbox'></div>
                <div className='day'>{day}</div>
              </label>
            ))}
          </>
        )}

        {warningChooseDay && (
          <p className='warning-text'>You haven't chosen any day yet</p>
        )}

        <button type='submit' disabled={warningHabitNameEmpty || warningHabitNameExists || warningChooseDay}>
          Add Habit
        </button>
      </form>
    </>
  );
};

export default HabitForm;
