import React, {useState} from 'react';
import './HabitsForToday.modules.scss';
import {baseUrl, Habit, normalizeDayIndex, HabitForToday} from '../../utils';
import HabitEditForm from '../HabitEditForm/HabitEditForm';
import HabitsCompletion from '../HabitsCompletion/HabitsCompletion';
import HabitForm from '../HabitForm/HabitForm';
import {FiCircle, FiCheckCircle} from 'react-icons/fi';

const HabitsForToday: React.FC<{
  habitsForTodayArr: HabitForToday[];
  setHabitsForTodayArr: React.Dispatch<React.SetStateAction<HabitForToday[]>>;
}> = ({habitsForTodayArr, setHabitsForTodayArr}) => {
  const [editHabitId, setEditHabitId] = useState<string>('');
  const [showHabitForm, setShowHabitForm] = useState<boolean>(false);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');

  const toggleHabitForm = () => {
    setShowHabitForm(!showHabitForm);
  };

  const handleMarkCompleted = (id: string) => {

    const habitToEdit = habitsForTodayArr.find((habit) => habit.id === id)!!;

console.log('habitToEdit', habitToEdit, habitToEdit.completed)
const isDone: boolean = !habitToEdit.completed;

    fetch(baseUrl + `/habits/today/${id}/complete/${isDone}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('data for today', data);
        const fetchedHabitsForTodayArr = data.habits;
        if (JSON.stringify(fetchedHabitsForTodayArr) !== JSON.stringify(habitsForTodayArr)) {
          setHabitsForTodayArr(fetchedHabitsForTodayArr);
        }
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
    setEditHabitId('');
  };


  return (
    <div className='habit-info-wrapper'>
      <div className='headline'>
        <h1>habits for today {formattedDate}</h1>
      </div>
      <div className='habits-wrapper habits-today-wrapper'>
        {habitsForTodayArr.map((habit: HabitForToday, index: number) => (
          <div key={index} className='habit habit-today'>
            <h3 className={habit.completed ? 'strikethrough' : ''}>
              {habit.habitName}
            </h3>

            <button
              className='habit-completed-btn'
              onClick={() => handleMarkCompleted(habit.id)}
            >
              {habit.completed ? ( <FiCheckCircle/>) : (<FiCircle />)}
              
             
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitsForToday;
