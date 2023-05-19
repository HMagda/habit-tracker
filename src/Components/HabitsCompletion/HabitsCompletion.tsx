import React, {useState} from 'react';
import {HiX, HiCheck} from 'react-icons/hi';
import {FiCircle, FiEdit3, FiTrash} from 'react-icons/fi';
import './HabitsCompletion.modules.scss';
import {
  Habit,
  daysOfWeek,
  normalizeDayIndex,
  baseUrl,
  HabitDay,
} from '../../utils';

const HabitsCompletion: React.FC<{
  habit: Habit;
  index: number;
  habitsArr: Habit[];
  deleteHabit: (habitId: string) => void;
  setEditHabitId: React.Dispatch<React.SetStateAction<string>>;
  handleMarkCompleted: (id: string, day: number) => void;
  showLeftButton: boolean;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  habit,
  index,
  habitsArr,
  deleteHabit,
  setEditHabitId,
  handleMarkCompleted,
  showLeftButton,
  setShowEditForm,
}) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const todayIndex = normalizeDayIndex(new Date().getDay());

  const handleDeleteHabit = (habitId: string) => {
    const habitToDelete = habitsArr.find((habit) => habit.id === habitId);

    if (!habitToDelete) {
      console.log(`Habit with id ${habitId} not found!`);
      return;
    }

    setShowConfirmPopup(true);
  };

  const handleEditHabit = (habitId: string) => {
    setEditHabitId(habit.id ?? null);

    setShowEditForm(true);
  };

  const handleConfirm = (confirmed: boolean) => {
    if (confirmed) {
      fetch(baseUrl + `/habits/${habit.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(() => {
          habit.id && deleteHabit(habit.id);
        })
        .catch((error) => {
          console.error(`Failed to delete habit with id ${habit.id}: `, error);
        });
    }

    setShowConfirmPopup(false);
  };

  function sortArrayByProperty<T>(array: T[], property: keyof T): T[] {
    return array.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

  function formatDate(dateString: string) {
    const dateParts = dateString.split('/');
    const date = new Date(
      parseInt(dateParts[2], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[0], 10)
    );
    const dayOfWeek = date.toLocaleString('en-GB', {weekday: 'short'});

    return `${dayOfWeek} ${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
  }

  return (
    <div className='habit-completion-wrapper' key={index}>
      {showConfirmPopup && (
        <>
          <div className='overlay' onClick={() => handleConfirm(false)}></div>
          <div className='confirm-popup'>
            <p>Are you sure you want to delete this habit?</p>
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

      <div className='habit-header'>
        <h3>{habit.habitName}</h3>
        <div className='option-icons'>
          <FiEdit3
            className='edit-icon'
            onClick={() => handleEditHabit(habit.id)}
          />
          <FiTrash
            onClick={() => handleDeleteHabit(habit.id)}
            className='delete-icon'
          />
        </div>
      </div>
      <div className='btn-container'>
        {sortArrayByProperty(habit.days, 'dayOfWeek').map(
          (habitDay: HabitDay) => {
            const day = habitDay.dayOfWeek;
            const isUpcoming = day >= todayIndex;

            return (
              <div className='single-btn-container' key={day}  onClick={() => handleMarkCompleted(habit.id, day)}>
                <button
                  key={day}
                  className={`
                    day-btn
                    ${
                      habitDay.completed
                        ? 'completed'
                        : isUpcoming || habitDay.isBeforeCreationDate
                        ? 'upcoming'
                        : 'uncompleted'
                    }`}
                >
                  {showLeftButton
                    ? daysOfWeek[day]
                    : formatDate(habitDay.dateOfWeek)}
                </button>

                {habitDay.completed ? (
                  <HiCheck className='check-icon' />
                ) : isUpcoming || habitDay.isBeforeCreationDate ? (
                  <FiCircle className='circle-icon' />
                ) : (
                  <HiX className='x-icon' />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default HabitsCompletion;
