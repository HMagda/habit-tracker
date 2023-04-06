import React, {useState} from 'react';
import './HabitInfo.modules.scss';
import {
  baseUrl,
  Habit,
  HabitDay,
  HabitForToday,
  normalizeDayIndex,
} from '../../utils';
import HabitEditForm from '../HabitEditForm/HabitEditForm';
import HabitsCompletion from '../HabitsCompletion/HabitsCompletion';
import HabitForm from '../HabitForm/HabitForm';
import {FiPlus, FiToggleLeft, FiToggleRight} from 'react-icons/fi';

const HabitInfo: React.FC<{
  habitsArr: Habit[];
  setHabitsArr: React.Dispatch<React.SetStateAction<Habit[]>>;
  habitsForTodayArr: HabitForToday[];
  setHabitsForTodayArr: React.Dispatch<React.SetStateAction<HabitForToday[]>>;
  deleteHabit: (habitId: string) => void;

  showHabitForm: boolean;
  setShowHabitForm: React.Dispatch<React.SetStateAction<boolean>>;

  toggleHabitForm: () => void;

  todayIndex: number;
  setTodayIndex: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  habitsArr,
  setHabitsArr,
  deleteHabit,
  habitsForTodayArr,
  setHabitsForTodayArr,

  showHabitForm,
  setShowHabitForm,

  toggleHabitForm,

  todayIndex,
  setTodayIndex,
}) => {
  const [editHabitId, setEditHabitId] = useState<string>('');
  // const [showHabitForm, setShowHabitForm] = useState<boolean>(false);

  // const toggleHabitForm = () => {
  //   console.log(habitsArr.length);
  //   setShowHabitForm(!showHabitForm);
  // };

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

        if (todayIndex === day) {
          const isTodaysHabitCompleted = receivedHabit.days.filter(
            (habitDay: HabitDay) => habitDay.dayOfWeek === day
          )[0].completed;
          const updatedHabitsForTodayArr = habitsForTodayArr.map((habit) =>
            habit.id === receivedHabit.id
              ? {...habit, completed: isTodaysHabitCompleted}
              : habit
          );
          setHabitsForTodayArr(updatedHabitsForTodayArr);
        }

        // //making sure to update only today-habit task
        // if (habitsForTodayArr.length > 0) {
        //   const today = habitsForTodayArr[0].day;
        //   if (today === day) {

        //   }
        // }
      })
      .catch((error) => {
        console.error('Error adding new habit: ', error);
      });

    setEditHabitId('');
  };

  return (
    <div className='habit-info-wrapper'>
      {/* <div className='headline'>
        <h1>My week plan</h1>
        <button className='habit-form-toggle-btn' onClick={toggleHabitForm}>
          <FiPlus />
        </button>
      </div> */}

      <div className='formatting-option'>
        <h3>Show dates</h3>
        <button className='formatting-option-toggle-btn'>
          <FiToggleLeft />
        </button>
        <button>
          <FiToggleRight />
        </button>
      </div>

      {showHabitForm && (
        <>
          <div className='overlay' onClick={toggleHabitForm}></div>
          <div className='habit-form-popup'>
            <HabitForm
              addNewHabit={(habit: Habit) => {
                setHabitsArr([...habitsArr, habit]);
                const today: HabitDay = habit.days.find((day: HabitDay) => day.dayOfWeek === todayIndex)!!
                const newHabitForToday: HabitForToday = {
                  id: habit.id,
                  day: todayIndex,
                  habitName: habit.habitName,
                  completed: today.completed,
                };

                setHabitsForTodayArr((prevHabitsForTodayArr) => [
                  ...prevHabitsForTodayArr,
                  newHabitForToday,
                ]);
        
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
                  habitsForTodayArr={habitsForTodayArr}
                  setHabitsForTodayArr={setHabitsForTodayArr}
                  todayIndex={todayIndex}
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
