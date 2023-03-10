import React, {useEffect, useState} from 'react';
import {daysOfWeek} from '../../utils';
import './HabitForm.modules.scss';

interface HabitFormProps {
  onAddHabit: (name: string, frequency: string, days: string[]) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({onAddHabit}) => {
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    if (frequency === 'daily') {
      setDays(daysOfWeek);
    } else {
      setDays([]);
    }
  }, [frequency, habitName]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHabitName(event.target.value);
  };

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFrequency(event.target.value);
    console.log('event.target.value', event.target.value);
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
    onAddHabit(habitName, frequency, days);

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

      <button type='submit'>Add Habit</button>
    </form>
  );
};

export default HabitForm;
