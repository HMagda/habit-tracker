import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Heatmap.modules.scss';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = () => {
  return (
    <div className='heatmap'>
      <CalendarHeatmap
        startDate={new Date('2023-02-20')}
        endDate={new Date('2023-06-06')}
        values={[
          {date: '2023-02-21', count: 4},
          {date: '2023-02-24', count: 5},
          {date: '2023-03-01', count: 1},
          {date: '2023-03-03', count: 2},
          {date: '2023-03-04', count: 3},
          // ...and so on
        ]}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        // horizontal={false}
        gutterSize={5}
        onClick={(value) => console.log('clicked date', value, value.count)}
        showWeekdayLabels={false}
      />
    </div>
  );
};

export default Heatmap;
