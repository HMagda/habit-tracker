import React, {useEffect, useState, useRef} from 'react';
import DatePicker from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import {format} from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponent.modules.scss';
import {baseUrl, HabitData} from '../../utils';

const DatePickerComponent: React.FC<{
  statistics: HabitData[];
  setStatistics: React.Dispatch<React.SetStateAction<HabitData[]>>;
}> = ({statistics, setStatistics}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');

      fetch(baseUrl + '/habits/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setStatistics(data.habits);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [startDate, endDate]);

  function handleDateSelect() {
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    //to be changed
  }

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
        <table className='statistics'>
          <thead>
            <tr>
              <th>Habit Name</th>
              <th>Score</th>
              <th>Percentage completion</th>
            </tr>
          </thead>
          <tbody>
            {statistics.map((stat, index) => {
              const percentage = (stat.score / stat.maxScore) * 100;
              return (
                <tr key={index}>
                  <td>{stat.habitName}</td>
                  <td>
                    {stat.score}/{stat.maxScore}
                  </td>
                  <td>{percentage.toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className='date-picker'>
      <h1>Pick a day or a range of days</h1>
      <div className='date-picker-container'>
        <DatePicker
          selected={startDate}
          onSelect={handleDateSelect}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          locale={enGB}
          showWeekNumbers
        />
      </div>

      <div className='statistics-container'>{renderStatistics()}</div>
    </div>
  );
};

export default DatePickerComponent;
