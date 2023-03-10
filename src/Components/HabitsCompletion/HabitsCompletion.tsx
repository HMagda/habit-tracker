import React, {useState} from 'react';
import './HabitsCompletion.modules.scss';

type HabitsArray = {
  name: string;
  days: string[];
}[];

const HabitsCompletion: React.FC<{habits: HabitsArray}> = ({habits}) => {
  const [completedDays, setCompletedDays] = useState<{[day: string]: boolean}>({});

  const handleMarkCompleted = (day: string) => {
    setCompletedDays((prev) => ({...prev, [day]: !prev[day]}));
  };

  return (
    <>
      {habits.map((habit: {name: string; days: string[]}, index: number) => (
        <div key={index} className='habits'>
          <div key={index}>
            <h3>{habit.name}</h3>
            <div>
              {habit.days.map((day: string) => (
                <button
                  key={day}
                  onClick={() => handleMarkCompleted(day)}
                  className={completedDays[day] ? 'completed' : 'uncompleted'}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HabitsCompletion;
