import React, {useContext, useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import {format} from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponent.modules.scss';
import {baseUrl, getToken, HabitData} from '../../utils';
import {useAuth0} from "@auth0/auth0-react";

const DatePickerComponent: React.FC<{
  statistics: HabitData[];
  setStatistics: React.Dispatch<React.SetStateAction<HabitData[]>>;
}> = ({statistics, setStatistics}) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (startDate && endDate) {
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');

      getToken(getAccessTokenSilently).then((token) => {
        fetch(baseUrl + '/habits/stats', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          }),
          credentials: 'include',
        })
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then((data) => {
              setStatistics(data.habits);
            })
            .catch((error) => {
              console.error('There was a problem with the fetch operation:', error);
            });
      });
    }
  }, [startDate, endDate]);

  const onChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const renderStatistics = () => {
    let dateDisplayed: string;

    if (endDate !== null) {
      dateDisplayed = `${format(startDate, 'yyyy-MM-dd')} - ${format(
        endDate,
        'yyyy-MM-dd'
      )}`;
    } else {
      dateDisplayed = `${format(startDate, 'yyyy-MM-dd')}`;
    }

    return (
      <div>
        <h2>{dateDisplayed}</h2>

        {statistics.length <= 0 && (
          <h1>You do not have any statistics for the chosen range of days</h1>
        )}

        {statistics.length > 0 && (
          <table className='statistics'>
            <thead>
              <tr>
                <th>Habit</th>
                <th>Score</th>
                <th>Completion</th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat, index) => {
                const percentage = (stat.score / stat.maxScore) * 100;
                return (
                  <tr key={index}>
                    <td>
                      <div className='label'>Habit</div>
                      <div className='habit_name'>{stat.habitName}</div>
                    </td>
                    <td>
                      <div className='label'>Score</div>
                      <div>
                        {stat.score}/{stat.maxScore}
                      </div>
                    </td>
                    <td>
                      <div className='label'>Completion</div>
                      <div>{percentage.toFixed(2)}%</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className='date-picker-wrapper'>
      <div className='date-picker-container'>
        <h1>Pick a range of days</h1>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          locale={enGB}
          showWeekNumbers
        />
      </div>
      <div className='statistics-table'>{renderStatistics()}</div>
    </div>
  );
};

export default DatePickerComponent;
