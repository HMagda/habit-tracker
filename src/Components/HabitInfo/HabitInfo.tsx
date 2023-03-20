import React, {useState} from 'react';
import './HabitInfo.modules.scss';
import {Habit, normalizeDayIndex} from '../../utils';
import HabitEditForm from '../HabitEditForm/HabitEditForm';
import HabitsCompletion from '../HabitsCompletion/HabitsCompletion';

interface CompletedDays {
  [id: string]: {
    [day: string]: boolean;
  };
}

const HabitInfo: React.FC<{
  habitsArr: Habit[];
  setHabitsArr: React.Dispatch<React.SetStateAction<Habit[]>>;
  deleteHabit: (habitId: number) => void;
}> = ({habitsArr, setHabitsArr, deleteHabit}) => {
  const [completedDays, setCompletedDays] = useState<CompletedDays>({});
  const [editHabitId, setEditHabitId] = useState<number | null>(null);

  const handleMarkCompleted = (id: string, day: number) => {
    const localDayIndex = normalizeDayIndex(new Date().getDay());
    if (
      localDayIndex !== day &&
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

  return (
    <div className='habits-wrapper'>
      {habitsArr.map((habit: Habit, index: number) => (
        <div key={index} className='habit'>
          <div
            className={`habit-header ${
              editHabitId === habit.id ? 'justify-end' : 'justify-space-between'
            }`}
          >
            {editHabitId !== habit.id ? (
              <HabitsCompletion
                habit={habit}
                index={index}
                habitsArr={habitsArr}
                deleteHabit={deleteHabit}
                setEditHabitId={setEditHabitId}
                handleMarkCompleted={handleMarkCompleted}
                completedDays={completedDays}
              />
            ) : (
              <HabitEditForm
                habitsArr={habitsArr}
                setHabitsArr={setHabitsArr}
                editHabitId={editHabitId}
                setEditHabitId={setEditHabitId}
                editHabitName={habit.habitName}
                editHabitDays={habit.days}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitInfo;
