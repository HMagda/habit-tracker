import React, { useContext } from 'react';
import './HabitsForToday.modules.scss';
import {baseUrl, HabitForToday} from '../../utils';
import {FiCircle, FiCheckCircle} from 'react-icons/fi';
import TokenContext from '../../TokenContext';

const HabitsForToday: React.FC<{
  habitsForTodayArr: HabitForToday[];
  setHabitsForTodayArr: React.Dispatch<React.SetStateAction<HabitForToday[]>>;
}> = ({habitsForTodayArr, setHabitsForTodayArr}) => {
  const {token} = useContext(TokenContext);

  const handleMarkCompleted = (id: string) => {
    const habitToEdit = habitsForTodayArr.find((habit) => habit.id === id)!!;
    const isDone: boolean = !habitToEdit.completed;

    fetch(baseUrl + `/habits/today/${id}/complete/${isDone}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        const fetchedHabitsForTodayArr = data.habits;
        if (
          JSON.stringify(fetchedHabitsForTodayArr) !==
          JSON.stringify(habitsForTodayArr)
        ) {
          setHabitsForTodayArr(fetchedHabitsForTodayArr);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const sortedHabitsForTodayArr = habitsForTodayArr.sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  return (
    <div className='habit-info-wrapper'>
      <div className='habits-wrapper habits-today-wrapper'>
        {sortedHabitsForTodayArr.map((habit: HabitForToday, index: number) => (
          <div
            key={index}
            className={`habit habit-today ${
              habit.completed ? 'habit-completed' : ''
            }`}
          >
            <h3 className={habit.completed ? 'strikethrough' : ''}>
              {habit.habitName}
            </h3>
            <button
              className='habit-completed-btn'
              onClick={() => handleMarkCompleted(habit.id)}
            >
              {habit.completed ? <FiCheckCircle /> : <FiCircle />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitsForToday;
