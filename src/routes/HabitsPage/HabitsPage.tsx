import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {FiPlus, FiChevronRight} from 'react-icons/fi';
import {baseUrl, Habit, HabitForToday} from '../../utils';
import DatePickerComponent from '../../Components/DatePickerComponent/DatePickerComponent';
import Heatmap from '../../Components/Heatmap/Heatmap';
import HabitInfo from '../../Components/HabitInfo/HabitInfo';
import HabitsForToday from '../../Components/HabitsForToday/HabitsForToday';
import './HabitsPage.modules.scss';

const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB');

const HabitsPage = () => {
  const todayHabitsRef = useRef<HTMLDivElement | null>(null);
  const weekPlanRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const {habits, habitsForToday, today} = location.state || {};

  const [habitsArr, setHabitsArr] = useState<Habit[]>(habits || []);
  const [habitsForTodayArr, setHabitsForTodayArr] = useState<HabitForToday[]>(
    habitsForToday || []
  );
  const [todayIndex, setTodayIndex] = useState<number>(today || 0);

  const [showHabitForm, setShowHabitForm] = useState<boolean>(false);
  const [openTodayHabits, setOpenTodayHabits] = useState<boolean>(true);
  const [openWeekPlan, setOpenWeekPlan] = useState<boolean>(false);
  const [openStats, setOpenStats] = useState<boolean>(false);

  const [todayHabitsContentHeight, setTodayHabitsContentHeight] =
    useState<number>(0);
  const [weekPlanContentHeight, setWeekPlanContentHeight] = useState<number>(0);
  const [statsContentHeight, setStatsContentHeight] = useState<number>(0);

  useEffect(() => {
    fetch(baseUrl + '/habits', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        const fetchedHabitsArr = data.habits;
        if (JSON.stringify(fetchedHabitsArr) !== JSON.stringify(habitsArr)) {
          setHabitsArr(fetchedHabitsArr);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [habitsForTodayArr]);

  useEffect(() => {
    fetch(baseUrl + '/habits/today', {
      headers: {
        'Content-Type': 'application/json',
      },
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
  }, []);

  const handleHabitDeleted = (habitId: string) => {
    setHabitsArr(habitsArr.filter((habit) => habit.id !== habitId));
    setHabitsForTodayArr(
      habitsForTodayArr.filter((habit) => habit.id !== habitId)
    );
  };

  const toggleHabitForm = () => {
    setShowHabitForm(!showHabitForm);
  };

  const toggleContent = (
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState(!state);
  };

  useLayoutEffect(() => {
    if (
      todayHabitsRef.current !== null &&
      weekPlanRef.current !== null &&
      statsRef.current !== null
    ) {
      if (openTodayHabits) {
        setTodayHabitsContentHeight(todayHabitsRef.current.scrollHeight);
      }
      if (openWeekPlan) {
        setWeekPlanContentHeight(weekPlanRef.current.scrollHeight);
      }
      if (openStats) {
        setStatsContentHeight(statsRef.current.scrollHeight);
      }
    }
  }, [openTodayHabits, openWeekPlan, openStats]);

  return (
    <>
      <div className='habits-page'>
        <div className='headline'>
          <div className={`arrow ${openTodayHabits ? 'down' : ''}`}>
            <FiChevronRight />
          </div>
          <h1
            onClick={() => toggleContent(openTodayHabits, setOpenTodayHabits)}
          >
            habits for today {formattedDate}
          </h1>
        </div>

        <div
          className='content-parent'
          style={
            openTodayHabits
              ? {maxHeight: todayHabitsContentHeight + 'px'}
              : {maxHeight: '0px'}
          }
        >
          <div ref={todayHabitsRef} className='content'>
            <>
              {habitsForTodayArr.length <= 0 && (
                <h1>You do not have any habits for today</h1>
              )}

              {habitsForTodayArr.length > 0 && (
                <HabitsForToday
                  habitsForTodayArr={habitsForTodayArr}
                  setHabitsForTodayArr={setHabitsForTodayArr}
                />
              )}
            </>
          </div>
        </div>

        <div className='headline'>
          <div className={`arrow ${openWeekPlan ? 'down' : ''}`}>
            <FiChevronRight />
          </div>
          <h1 onClick={() => toggleContent(openWeekPlan, setOpenWeekPlan)}>
            My week plan
          </h1>

          {openWeekPlan && (
            <button className='habit-form-toggle-btn' onClick={toggleHabitForm}>
              <FiPlus />
            </button>
          )}
        </div>

        <div
          className='content-parent'
          style={
            openWeekPlan
              ? {maxHeight: weekPlanContentHeight + 'px'}
              : {maxHeight: '0px'}
          }
        >
          <div ref={weekPlanRef} className='content'>
            <>
              {habitsForTodayArr.length <= 0 && (
                <h1>You do not have any habits for this week</h1>
              )}

              {habitsArr && (
                <HabitInfo
                  habitsArr={habitsArr}
                  setHabitsArr={setHabitsArr}
                  habitsForTodayArr={habitsForTodayArr}
                  setHabitsForTodayArr={setHabitsForTodayArr}
                  deleteHabit={handleHabitDeleted}
                  setShowHabitForm={setShowHabitForm}
                  showHabitForm={showHabitForm}
                  toggleHabitForm={toggleHabitForm}
                  todayIndex={todayIndex}
                />
              )}
            </>
          </div>
        </div>

        <div className='headline'>
          <div className={`arrow ${openStats ? 'down' : ''}`}>
            <FiChevronRight />
          </div>
          <h1 onClick={() => toggleContent(openStats, setOpenStats)}>
            Statistics
          </h1>
        </div>

        <div
          className='content-parent'
          style={
            openStats
              ? {maxHeight: statsContentHeight + 'px'}
              : {maxHeight: '0px'}
          }
        >
          <div ref={statsRef} className='content'>
            {habitsForTodayArr.length <= 0 && (
              <h1>You do not have any statistics yet</h1>
            )}

            {habitsArr.length > 0 && (
              <>
                <Heatmap habitsArr={habitsArr} />
                <DatePickerComponent />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitsPage;
