import React, {useEffect, useState} from 'react';
import {HiX, HiCheck} from 'react-icons/hi';
import './HabitsCompletion.modules.scss';
import {Habit} from '../../utils';

interface HabitsArray {
  habits: Habit[];
}

interface CompletedDays {
  [id: string]: {
    [day: string]: boolean;
  };
}

const HabitsCompletion: React.FC<HabitsArray> = ({habits}) => {
  const [completedDays, setCompletedDays] = useState<CompletedDays>({});

  const handleMarkCompleted = (id: string, day: string) => {
    setCompletedDays((prev) => {
      const prevHabit = prev[id] || {};
      return {
        ...prev,
        [id]: {...prevHabit, [day]: !prevHabit[day]},
      };
    });
  };

  useEffect(() => {
    console.log('completedDays:', completedDays);
  });

  return (
    <div className='habits-wrapper'>
      {habits.map(
        (
          habit: {
            habitName: string;
            days: string[];
          },
          index: number
        ) => (
          <div key={index} className='habit'>
            <h3>{habit.habitName}</h3>
            <div className='btns-container'>
              {habit.days.map((day: string) => (
                <div className='single-btn-container' key={day}>
                  <button
                    key={day}
                    onClick={() => handleMarkCompleted(habit.habitName, day)}
                    className={
                      completedDays[habit.habitName]?.[day]
                        ? 'completed'
                        : 'uncompleted'
                    }
                    disabled={
                      new Date().toLocaleString('en-GB', {
                        weekday: 'long',
                      }) !== day
                    }
                  >
                    {day}
                  </button>
                  {completedDays[habit.habitName]?.[day] ? (
                    <HiCheck className='check-icon' />
                  ) : (
                    <HiX className='x-icon' />
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default HabitsCompletion;
