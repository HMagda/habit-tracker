import React, {useEffect, useState} from 'react';
import {HiX, HiCheck} from 'react-icons/hi';
import './HabitsCompletion.modules.scss';

interface Habit {
  id: number;
  name: string;
  days: string[];
}

interface HabitsArray {
  habits: Habit[];
}

const HabitsCompletion: React.FC<HabitsArray> = ({habits}) => {
  const [completedDays, setCompletedDays] = useState<{
    [id: string]: {[day: string]: boolean};
  }>({});

  const handleMarkCompleted = (id: number, day: string) => {
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
        (habit: {id: number; name: string; days: string[]}, index: number) => (
          <div key={index} className='habit'>
            <h3>{habit.name}</h3>
            <div className='btns-container'>
              {habit.days.map((day: string) => (
                <div className='single-btn-container' key={day}>
                  <button
                    key={day}
                    onClick={() => handleMarkCompleted(habit.id, day)}
                    className={
                      completedDays[habit.id]?.[day]
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
                  {completedDays[habit.id]?.[day] ? (
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
