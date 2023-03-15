import React, {useState} from 'react';
import {HiX, HiCheck} from 'react-icons/hi';
import {FiCircle, FiEdit3, FiTrash} from 'react-icons/fi';
import './HabitsCompletion.modules.scss';
import {Habit, daysOfWeek} from '../../utils';

interface CompletedDays {
  [id: string]: {
    [day: string]: boolean;
  };
}

const HabitsCompletion: React.FC<{
  habitsArr: Habit[];
  deleteHabit: (habitId: number) => void;
}> = ({habitsArr, deleteHabit}) => {
  const [completedDays, setCompletedDays] = useState<CompletedDays>({});

  const today = new Date().toLocaleString('en-GB', {
    weekday: 'long',
  });
  const todayIndex = daysOfWeek.indexOf(today);

  const handleMarkCompleted = (id: string, day: string) => {
    if (
      new Date().toLocaleString('en-GB', {weekday: 'long'}) !== day &&
      !window.confirm(
        'The chosen day is not today, are you sure you want to change the habit status?'
      )
    ) {
      return;
    }

    setCompletedDays((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [day]: !(prev[id] && prev[id][day]),
      },
    }));
  };

  const handleDeleteHabit = (habitName: string) => {
    const habitToDelete = habitsArr.find(
      (habit) => habit.habitName === habitName
    );

    if (!habitToDelete) {
      console.log(`Habit with name ${habitName} not found!`);
      return;
    }
    const habitId = habitToDelete.id;

    if (!window.confirm('Are you sure you want to delete this habit?')) {
      return;
    }

    fetch(`http://localhost:8000/habits/${habitId}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log(`Habit with id ${habitId} deleted successfully!`);
        habitId && deleteHabit(habitId);
      })
      .catch((error) => {
        console.log(`Failed to delete habit with id ${habitId}: `, error);
      });
  };

  return (
    <div className='habits-wrapper'>
      {habitsArr.map((habit: Habit, index: number) => (
        <div key={index} className='habit'>
          <div className='habit-header'>
            <h3>{habit.habitName}</h3>
            <div className='option-icons'>
              <FiEdit3 className='edit-icon' />
              <FiTrash
                onClick={() => handleDeleteHabit(habit.habitName)}
                className='delete-icon'
              />
            </div>
          </div>
          <div className='btns-container'>
            {habit.days.map((day: string) => {
              const dayIndex = daysOfWeek.indexOf(day);
              const isUpcoming = dayIndex > todayIndex;
              const completed = completedDays[habit.habitName]?.[day];
              return (
                <div className='single-btn-container' key={day}>
                  <button
                    key={day}
                    onClick={() => handleMarkCompleted(habit.habitName, day)}
                    className={
                      completed
                        ? 'completed'
                        : isUpcoming
                        ? 'upcoming'
                        : 'uncompleted'
                    }
                  >
                    {day}
                  </button>
                  {completed ? (
                    <HiCheck className='check-icon' />
                  ) : isUpcoming ? (
                    <FiCircle className='circle-icon' />
                  ) : (
                    <HiX className='x-icon' />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitsCompletion;
