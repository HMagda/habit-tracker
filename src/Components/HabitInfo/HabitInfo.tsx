import React, {useState} from 'react';
import './HabitInfo.modules.scss';
import {
  baseUrl,
  getToken,
  Habit,
  HabitDay,
  HabitForToday,
  normalizeDayIndex,
} from '../../utils';
import HabitEditForm from '../HabitEditForm/HabitEditForm';
import HabitsCompletion from '../HabitsCompletion/HabitsCompletion';
import HabitForm from '../HabitForm/HabitForm';
import {FiToggleLeft, FiToggleRight} from 'react-icons/fi';
import {useAuth0} from "@auth0/auth0-react";

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
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
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
  setShowEditForm,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [editHabitId, setEditHabitId] = useState<string>('');
  const [showLeftButton, setShowLeftButton] = useState<boolean>(true);
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [confirmPopupData, setConfirmPopupData] = useState<{
    id: string;
    day: number;
    callback: () => void;
  } | null>(null);

  const toggleButtons = () => {
    setShowLeftButton(!showLeftButton);
  };

  const handleConfirm = (confirmed: boolean) => {
    if (confirmed && confirmPopupData) {
      confirmPopupData.callback();
    }
    setShowConfirmPopup(false);
    setConfirmPopupData(null);
  };

  const handleMarkCompleted = (id: string, day: number) => {
    const localDayIndex = normalizeDayIndex(new Date().getDay());

    const continueExecution = async () => {
      const habitToEdit = habitsArr.find((habit) => habit.id === id)!!;
      const editedHabit = {
        ...habitToEdit,
        days: habitToEdit.days.map((habitDay) =>
          habitDay.dayOfWeek === day
            ? {...habitDay, completed: !habitDay.completed}
            : habitDay
        ),
      };

      getToken(getAccessTokenSilently).then((token) => {
        fetch(baseUrl + `/habits/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedHabit),
          credentials: 'include',
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
            })
            .catch((error) => {
              console.error('Error adding new habit: ', error);
            });

        setEditHabitId('');
      });
    };
    if (localDayIndex !== day) {
      setShowConfirmPopup(true);
      setConfirmPopupData({id, day, callback: continueExecution});
    } else {
      continueExecution();
    }
  };

  return (
    <div className='habit-info-wrapper'>
      {showConfirmPopup && (
        <>
          <div className='overlay' onClick={() => handleConfirm(false)}></div>
          <div className='confirm-popup'>
            <p>
              The chosen day is not today, are you sure you want to change the
              habit status?
            </p>
            <button className='btn-confirm' onClick={() => handleConfirm(true)}>
              Yes
            </button>
            <button
              className='btn-confirm'
              onClick={() => handleConfirm(false)}
            >
              No
            </button>
          </div>
        </>
      )}

      {habitsArr.length > 0 && (
        <div className='formatting-option'>
          <h3 className={`${showLeftButton ? '' : 'show'}`}>Show dates</h3>
          {showLeftButton ? (
            <button className='btn-left' onClick={toggleButtons}>
              <FiToggleLeft />
            </button>
          ) : (
            <button className='btn-right' onClick={toggleButtons}>
              <FiToggleRight />
            </button>
          )}
        </div>
      )}

      {showHabitForm && (
        <>
          <div className='overlay' onClick={toggleHabitForm}></div>
          <div className='habit-form-popup'>
            <HabitForm
              addNewHabit={(habit: Habit) => {
                setHabitsArr([...habitsArr, habit]);
                const today: HabitDay = habit.days.find(
                  (day: HabitDay) => day.dayOfWeek === todayIndex
                )!!;

                if (today !== undefined) {
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
                }

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
                  showLeftButton={showLeftButton}
                  setShowEditForm={setShowEditForm}
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
                  setShowEditForm={setShowEditForm}
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
