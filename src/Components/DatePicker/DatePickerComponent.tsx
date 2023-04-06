import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerComponent.modules.scss';

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  function handleDateSelect() {
    console.log('handleDateSelect');
    //to be changed
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

export default DatePickerComponent;
