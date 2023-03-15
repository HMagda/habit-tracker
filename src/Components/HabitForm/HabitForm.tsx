import React, {useEffect, useState} from 'react';
import {daysOfWeek, Habit} from '../../utils';
import './HabitForm.modules.scss';

const HabitForm: React.FC<{
  addNewHabit: (habit: Habit) => void;
  habitsArr: Habit[];
}> = ({addNewHabit, habitsArr}) => {
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [days, setDays] = useState<string[]>([]);
  const [warning, setWarning] = useState<boolean>(false);

  useEffect(() => {
    if (frequency === 'daily') {
      setDays(daysOfWeek);
    } else {
      setDays([]);
    }
  }, [frequency, habitName]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const habitExists = habitsArr.map((habit, i) => habitsArr[i].habitName.toLowerCase());

    habitExists.includes(event.target.value.toLowerCase())
      ? setWarning(true)
      : setWarning(false);

    setHabitName(event.target.value);
  };

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFrequency(event.target.value);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const day = event.target.value;
    setDays((days) => {
      if (days.includes(day)) {
        return days.filter((d) => d !== day);
      } else {
        return [...days, day];
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      {warning && <p className='warning-text'>This habit name already exists</p>}

      <label htmlFor='frequency'>Frequency:</label>
      <select id='frequency' value={frequency} onChange={handleFrequencyChange}>
        <option value='daily'>Daily</option>
        <option value='weekly'>Weekly</option>
      </select>

      {frequency === 'weekly' && (
        <>
          <p>Choose the days:</p>
          {daysOfWeek.map((day) => (
            <label key={day} htmlFor={day} className='days-label'>
              <input
                type='checkbox'
                id={day}
                value={day}
                checked={days.includes(day)}
                onChange={handleDayChange}
              />
              <span className='days-checkbox'></span>
              {day}
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
