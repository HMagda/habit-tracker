import React, {useEffect, useState} from 'react';
import {HiX, HiCheck} from 'react-icons/hi';
import {FiCircle} from 'react-icons/fi';
import './HabitsCompletion.modules.scss';
import {Habit, daysOfWeek} from '../../utils';

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

  useEffect(() => {
    console.log('completedDays:', completedDays);
  });

  const today = new Date().toLocaleString('en-GB', {
    weekday: 'long',
  });
  const todayIndex = daysOfWeek.indexOf(today);

  const handleMarkCompleted = (id: string, day: string) => {
    if (new Date().toLocaleString('en-GB', {weekday: 'long'}) !== day) {
      const confirmed = window.confirm(
        'The chosen day is not today, are you sure you want to change the habit status?'
      );
      if (!confirmed) {
        return;
      }
    }
    setCompletedDays((prev) => {
      const prevHabit = prev[id] || {};
      return {
        ...prev,
        [id]: {...prevHabit, [day]: !prevHabit[day]},
      };
    });
  };

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
              {habit.days.map((day: string) => {
                const dayIndex = daysOfWeek.indexOf(day);
                const isUpcoming = dayIndex > todayIndex;
                return (
                  <div className='single-btn-container' key={day}>
                    <button
                      key={day}
                      onClick={() => handleMarkCompleted(habit.habitName, day)}
                      className={
                        completedDays[habit.habitName]?.[day]
                          ? 'completed'
                          : isUpcoming
                          ? 'upcoming'
                          : 'uncompleted'
                      }
                    >
                      {day}
                    </button>
                    {completedDays[habit.habitName]?.[day] ? (
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
        )
      )}
    </div>
  );
};

export default HabitsCompletion;
