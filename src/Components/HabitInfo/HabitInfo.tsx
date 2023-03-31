import React, {useState} from 'react';
import './HabitInfo.modules.scss';
import {baseUrl, Habit, normalizeDayIndex} from '../../utils';
import HabitEditForm from '../HabitEditForm/HabitEditForm';
import HabitsCompletion from '../HabitsCompletion/HabitsCompletion';
import HabitForm from '../HabitForm/HabitForm';
import {FiPlus} from 'react-icons/fi';

const HabitInfo: React.FC<{
  habitsArr: Habit[];
  setHabitsArr: React.Dispatch<React.SetStateAction<Habit[]>>;
  deleteHabit: (habitId: string) => void;

}> = ({habitsArr, setHabitsArr, deleteHabit}) => {
  const [editHabitId, setEditHabitId] = useState<string>('');
  const [showHabitForm, setShowHabitForm] = useState<boolean>(false);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');

  const toggleHabitForm = () => {
    setShowHabitForm(!showHabitForm);
  };

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

    const habitToEdit = habitsArr.find((habit) => habit.id === id)!!;
    const editedHabit = {
      ...habitToEdit,
      days: habitToEdit.days.map((habitDay) =>
        habitDay.dayOfWeek === day
          ? {...habitDay, completed: !habitDay.completed}
          : habitDay
      ),
    };
    fetch(baseUrl + `/habits/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(editedHabit),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((receivedHabit) => {
        const updatedHabitsArr = habitsArr.map((habit) =>
          habit.id === receivedHabit.id
            ? {...habit, days: receivedHabit.days}
            : habit
        );
        setHabitsArr(updatedHabitsArr);
      })
      .catch((error) => {
        console.error('Error adding new habit: ', error);
      });

    setEditHabitId('');
  };

  return (
    <div className='habit-info-wrapper'>
      <div className='headline'>
        <h1>habits for today {formattedDate}</h1>
        <button className='habit-form-toggle-btn' onClick={toggleHabitForm}>
          <FiPlus />
        </button>
      </div>

      {showHabitForm && (
        <>
          <div className='overlay' onClick={toggleHabitForm}></div>
          <div className='habit-form-popup'>
            <HabitForm
              addNewHabit={(habit: Habit) => {
                setHabitsArr([...habitsArr, habit]);
                toggleHabitForm();
              }}
           
              habitsArr={habitsArr}
              setShowHabitForm={setShowHabitForm}
            />
          </div>
        </>
      )}

      <div className={`habits-wrapper ${showHabitForm ? 'show-form' : ''}`}>
        {habitsArr.map((habit: Habit, index: number) => (
          <div key={index} className='habit'>
            <div
              className={`habit-header ${
                editHabitId === habit.id
                  ? 'justify-end'
                  : 'justify-space-between'
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
    </div>
  );
};

export default HabitInfo;
