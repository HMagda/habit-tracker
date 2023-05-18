import React from 'react';
import './HabitsForToday.modules.scss';
import {baseUrl, getToken, Habit, HabitDay, HabitForToday} from '../../utils';
import {FiCircle, FiCheckCircle} from 'react-icons/fi';
import {useAuth0} from "@auth0/auth0-react";

const HabitsForToday: React.FC<{
  habitsForTodayArr: HabitForToday[];
  setHabitsForTodayArr: React.Dispatch<React.SetStateAction<HabitForToday[]>>;
  habitsArr: Habit[];
  setHabitsArr: React.Dispatch<React.SetStateAction<Habit[]>>;
}> = ({habitsForTodayArr, setHabitsForTodayArr, habitsArr, setHabitsArr}) => {

  const { getAccessTokenSilently } = useAuth0();
  const handleMarkCompleted = async (id: string) => {
    const habitToEdit = habitsForTodayArr.find((habit) => habit.id === id)!!;
    const isDone: boolean = !habitToEdit.completed;

      getToken(getAccessTokenSilently).then((token) => {
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
                setHabitsForTodayArr(fetchedHabitsForTodayArr);

                const changedTodayHabit: HabitForToday = fetchedHabitsForTodayArr.find((habit: HabitForToday) => habit.id === id);
                const completionStatus = changedTodayHabit?.completed != null ? changedTodayHabit.completed : isDone;

                const updatedHabitsArr: Habit[] = habitsArr.map((habit) =>
                    habit.id === id ? {
                        ...habit,
                        days: habit.days.map((day: HabitDay) =>
                            day.dayOfWeek === data.todayIndex ? { ...day, completed: completionStatus } : day
                        ),
                    } : habit
                );
                setHabitsArr(updatedHabitsArr);

            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
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
