import React, {useState} from 'react';
import {baseUrl, daysOfWeek, Habit, HabitDay, HabitForToday} from '../../utils';
import './HabitEditForm.modules.scss';

const HabitEditForm: React.FC<{
  habitsArr: Habit[];
  setHabitsArr: React.Dispatch<React.SetStateAction<Habit[]>>;
  habitsForTodayArr: HabitForToday[];
  setHabitsForTodayArr: React.Dispatch<React.SetStateAction<HabitForToday[]>>;
  todayIndex: number;
  editHabitId: string;
  setEditHabitId: React.Dispatch<React.SetStateAction<string>>;
  editHabitName: string;
  editHabitDays: HabitDay[];
}> = ({
  habitsArr,
  setHabitsArr,
  habitsForTodayArr,
  setHabitsForTodayArr,
  todayIndex,
  editHabitId,
  setEditHabitId,
  editHabitName,
  editHabitDays,
}) => {
  const [habitName, setHabitName] = useState<string>(editHabitName);
  const [days, setDays] = useState<HabitDay[]>(editHabitDays);
  const [warning, setWarning] = useState<boolean>(false);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = Number(e.target.id);

    setDays((days) => {
      const dayIndex = days.findIndex((d) => d.dayOfWeek === day);

      if (dayIndex !== -1) {
        return days.filter((d) => d.dayOfWeek !== day);
      } else {
        const newDay: HabitDay = {
          dayOfWeek: day,
          dateOfWeek: '',
          completed: false,
        };

        return [...days, newDay];
      }
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHabitName = e.target.value;

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

    fetch(baseUrl + `/habits/${editHabitId}`, {
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

        if(!days.map((day) => day.dayOfWeek).includes(todayIndex)
              && habitsForTodayArr.map((todayHabit: HabitForToday) => todayHabit.id).includes(editHabitId)
        ){
          //this means that the habit edit removed today's habit
            console.log('habit edit removed today habit')
          setHabitsForTodayArr(habitsForTodayArr.filter((habit: HabitForToday) => habit.id !== editHabitId))
        } else if(habitsForTodayArr.map((todayHabit: HabitForToday) => todayHabit.id).includes(editHabitId)) {
             console.log('habit edit updated today habit')
            const updatedHabitsForTodayArr = habitsForTodayArr.map((habit) =>
              habit.id === editHabitId ? {...habit, habitName} : habit
            );
            setHabitsForTodayArr(updatedHabitsForTodayArr);
        } else {
            console.log('habit edit added today habit')
            setHabitsForTodayArr([...habitsForTodayArr, {
                id: editHabitId,
                day: todayIndex,
                habitName: habitName,
                completed: false
            }])

        }
      })
      .catch((error) => {
        console.error('Error adding new habit: ', error);
      });

    setEditHabitId('');
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
        {daysOfWeek.map((day, i) => (
          <label key={day} htmlFor={i.toString()} className='days-label'>
            <input
              type='checkbox'
              id={i.toString()}
              value={day}
              checked={days.some((d) => d.dayOfWeek === i)}
              onChange={handleDayChange}
            />
            <div className='days-checkbox'></div>
            <div className='day'>{day}</div>
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
