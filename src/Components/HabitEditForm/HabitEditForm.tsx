import React, {useState} from 'react';
import {daysOfWeek, Habit} from '../../utils';
import './HabitEditForm.modules.scss';

const HabitEditForm: React.FC<{
  habitsArr: Habit[];
  setHabitsArr: React.Dispatch<React.SetStateAction<Habit[]>>;
  editHabitId: number | null;
  setEditHabitId: React.Dispatch<React.SetStateAction<number | null>>;
  editHabitName: string;
  editHabitDays: string[];
}> = ({
  habitsArr,
  setHabitsArr,
  editHabitId,
  setEditHabitId,
  editHabitName,
  editHabitDays,
}) => {
  const [habitName, setHabitName] = useState<string>(editHabitName);
  const [days, setDays] = useState<string[]>(editHabitDays);
  const [warning, setWarning] = useState<boolean>(false);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = e.target.value;
    setDays((days) => {
      if (days.includes(day)) {
        return days.filter((d) => d !== day);
      } else {
        return [...days, day];
      }
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   let newHabitName =  e.target.value;
   
   if (newHabitName !== editHabitName) {
    const habitExists = habitsArr
      .filter((habit) => habit.id !== editHabitId)
      .map((habit) => habit.habitName.toLowerCase());

    setWarning(habitExists.includes(newHabitName.toLowerCase()));
  } else {
    setWarning(false);
  }

  setHabitName(newHabitName);

  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const habit = {habitName, days};

    fetch(`http://localhost:8000/habits/${editHabitId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(habit),
    })
      .then(() => {
        console.log('habit edited');
        const updatedHabitsArr = habitsArr.map((habit) =>
          habit.id === editHabitId ? {...habit, habitName, days} : habit
        );
        setHabitsArr(updatedHabitsArr);
      })
      .catch((error) => {
        console.error('Error adding new habit: ', error);
      });

    setEditHabitId(null);
  };

  return (
    <form onSubmit={handleEdit} className='habit-edit-form'>
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
      <div className='days-label-container'>
        {daysOfWeek.map((day) => (
          <label key={day} htmlFor={day} className='days-label'>
            <input
              type='checkbox'
              id={day}
              value={day}
              checked={days.includes(day)}
              onChange={handleDayChange}
            />
            <div className='days-checkbox'></div>
            <div className='day'> {day}</div>
          </label>
        ))}
      </div>
      <button type='submit' disabled={warning}>
        Edit Habit
      </button>
    </form>
  );
};

export default HabitEditForm;
