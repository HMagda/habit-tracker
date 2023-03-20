import React, {useEffect, useState} from 'react';
import {daysOfWeek, Habit} from '../../utils';
import './HabitForm.modules.scss';

const HabitForm: React.FC<{
  addNewHabit: (habit: Habit) => void;
  habitsArr: Habit[];
}> = ({addNewHabit, habitsArr}) => {
  const [habitName, setHabitName] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('daily');
  const [days, setDays] = useState<number[]>([]);
  const [warning, setWarning] = useState<boolean>(false);

  useEffect(() => {
    if (frequency === 'daily') {
      setDays([0, 1, 2, 3, 4, 5, 6]);
    } else {
      setDays([]);
    }
  }, [frequency, habitName]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const habitExists = habitsArr.map((habit, i) =>
      habitsArr[i].habitName.toLowerCase()
    );

    habitExists.includes(e.target.value.toLowerCase())
      ? setWarning(true)
      : setWarning(false);

    setHabitName(e.target.value);
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(e.target.value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day: number = Number(e.target.id);
    console.log(e.target.id);
    console.log('day: ' + day);

    setDays((days) => {
      console.log('setDays' + days);
      if (days.includes(day)) {
        return days.filter((d) => d !== day);
      } else {
        return [...days, day];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const habit = {habitName, days};

    fetch('http://localhost:8000/habits', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(habit),
    })
      .then(() => {
        console.log('new habit added');
        addNewHabit(habit);
      })
      .catch((error) => {
        console.error('Error adding new habit: ', error);
      });

    setHabitName('');
    setFrequency('daily');
    setDays([]);
  };

  return (
    <form onSubmit={handleSubmit} className='habit-form'>
      <label htmlFor='habitName'>Habit Name:</label>
      <input
        type='text'
        id='habitName'
        value={habitName}
        onChange={handleNameChange}
        required
      />
      {warning && (
        <p className='warning-text'>This habit name already exists</p>
      )}
      <label htmlFor='frequency'>Frequency:</label>
      <select id='frequency' value={frequency} onChange={handleFrequencyChange}>
        <option value='daily'>Daily</option>
        <option value='weekly'>Weekly</option>
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
      <button type='submit' disabled={warning}>
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;
