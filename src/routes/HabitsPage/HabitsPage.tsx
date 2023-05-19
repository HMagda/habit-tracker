import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {FiPlus, FiChevronRight} from 'react-icons/fi';
import {baseUrl, Habit, HabitForToday, HabitData, getToken} from '../../utils';
import DatePickerComponent from '../../Components/DatePickerComponent/DatePickerComponent';
import Heatmap from '../../Components/Heatmap/Heatmap';
import HabitInfo from '../../Components/HabitInfo/HabitInfo';
import HabitsForToday from '../../Components/HabitsForToday/HabitsForToday';
import './HabitsPage.modules.scss';
import Navbar from '../../Components/Navbar/Navbar';
import {useAuth0} from "@auth0/auth0-react";

const today = new Date();
const formattedDate = today.toLocaleDateString('en-GB');

const HabitsPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const todayHabitsRef = useRef<HTMLDivElement | null>(null);
  const weekPlanRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const [habitsArr, setHabitsArr] = useState<Habit[]>([]);
  const [statistics, setStatistics] = useState<HabitData[]>([]);
  const [habitsForTodayArr, setHabitsForTodayArr] = useState<HabitForToday[]>(
    []
  );

  const [showHabitForm, setShowHabitForm] = useState<boolean>(false);
  const [openTodayHabits, setOpenTodayHabits] = useState<boolean>(true);
  const [openWeekPlan, setOpenWeekPlan] = useState<boolean>(false);
  const [openStats, setOpenStats] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const [todayHabitsContentHeight, setTodayHabitsContentHeight] =
    useState<number>(0);
  const [weekPlanContentHeight, setWeekPlanContentHeight] = useState<number>(0);
  const [statsContentHeight, setStatsContentHeight] = useState<number>(0);
  const [todayIndex, setTodayIndex] = useState<number>(0);

  const fetchAll = () => {
    getToken(getAccessTokenSilently).then((token) => {
      fetch(baseUrl + '/habits/today', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
            const today = data.todayIndex;
            setTodayIndex(today);
          })

          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    getToken(getAccessTokenSilently).then((token) => {
      fetch(baseUrl + '/habits', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
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
    });
  }, []);

  useEffect(() => {
    const handleResize = debounce(() => {
      if (
        todayHabitsRef.current !== null &&
        weekPlanRef.current !== null &&
        statsRef.current !== null
      ) {
        if (openTodayHabits) {
          setTodayHabitsContentHeight(todayHabitsRef.current.scrollHeight);
        }
        if (openWeekPlan || showEditForm) {
          setWeekPlanContentHeight(weekPlanRef.current.scrollHeight);
        }
        if (openStats) {
          setStatsContentHeight(statsRef.current.scrollHeight);
        }
      }
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [
    openTodayHabits,
    openWeekPlan,
    openStats,
    habitsArr,
    habitsForTodayArr,
    statistics,
    showEditForm,
    setShowEditForm,
  ]);

  useLayoutEffect(() => {
    if (
      todayHabitsRef.current !== null &&
      weekPlanRef.current !== null &&
      statsRef.current !== null
    ) {
      if (openTodayHabits) {
        setTodayHabitsContentHeight(todayHabitsRef.current.scrollHeight);
      }
      if (openWeekPlan || showEditForm) {
        setWeekPlanContentHeight(weekPlanRef.current.scrollHeight);
      }
      if (openStats) {
        setStatsContentHeight(statsRef.current.scrollHeight);
      }
    }
  }, [
    openTodayHabits,
    openWeekPlan,
    openStats,
    habitsArr,
    statistics,
    showEditForm,
  ]);

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

  // @ts-ignore
  function debounce(fn, delay) {
    // @ts-ignore
    let timeout;
    // @ts-ignore
    return function (...args) {
      // @ts-ignore
      const context = this;
      // @ts-ignore
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(context, args), delay);
    };
  }

  return (
    <>
      <Navbar></Navbar>
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
                  habitsArr={habitsArr}
                  setHabitsArr={setHabitsArr}
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
              {habitsArr.length <= 0 && (
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
                  setShowEditForm={setShowEditForm}
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
              <div className='statistics-section'>
                <Heatmap
                  habitsArr={habitsArr}
                  habitsForTodayArr={habitsForTodayArr}
                />
                <DatePickerComponent
                  statistics={statistics}
                  setStatistics={setStatistics}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HabitsPage;
