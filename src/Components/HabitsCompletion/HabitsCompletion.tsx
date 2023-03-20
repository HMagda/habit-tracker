import React from 'react';
import {HiX, HiCheck} from 'react-icons/hi';
import {FiCircle, FiEdit3, FiTrash} from 'react-icons/fi';
import './HabitsCompletion.modules.scss';
import {Habit, daysOfWeek, normalizeDayIndex} from '../../utils';

interface CompletedDays {
  [id: string]: {
    [day: string]: boolean;
  };
}

const HabitsCompletion: React.FC<{
  habit: Habit;
  index: number;
  habitsArr: Habit[];
  deleteHabit: (habitId: number) => void;
  setEditHabitId: React.Dispatch<React.SetStateAction<number | null>>;
  handleMarkCompleted: (id: string, day: number) => void;
  completedDays: CompletedDays;
}> = ({
  habit,
  index,
  habitsArr,
  deleteHabit,
  setEditHabitId,
  handleMarkCompleted,
  completedDays,
}) => {
  const todayIndex = normalizeDayIndex(new Date().getDay());

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
    <div className='habit-completion-wrapper' key={index}>
      <div className='habit-header'>
        <h3>{habit.habitName}</h3>
        <div className='option-icons'>
          <FiEdit3
            className='edit-icon'
            onClick={() => {
              setEditHabitId(habit.id ?? null);
            }}
          />
          <FiTrash
            onClick={() => handleDeleteHabit(habit.habitName)}
            className='delete-icon'
          />
        </div>
      </div>
      <div className='btns-container'>
        {habit.days.sort()
        .map((day: number) => {
          const isUpcoming = day >= todayIndex;
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
                {daysOfWeek[day]}
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
  );
};

export default HabitsCompletion;
