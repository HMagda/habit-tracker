import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.modules.scss';
import enGB from 'date-fns/locale/en-GB';

const DatePickerDesktop = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  function handleDateSelect() {
    console.log('handleDateSelect');
  }

  const onChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className='date-picker'>
      <h1>Pick a day of a range of days</h1>
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
  );
};

export default DatePickerDesktop;
