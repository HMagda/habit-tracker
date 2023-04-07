import React, {useState, useEffect} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Heatmap.modules.scss';
import 'react-calendar-heatmap/dist/styles.css';

function getColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;

  return percentage > 80 ? 'color-scale-5' :
         percentage > 60 ? 'color-scale-4' :
         percentage > 40 ? 'color-scale-3' :
         percentage > 20 ? 'color-scale-2' :
                            'color-scale-1';
}

type DayData = {
  date: string;
  score: number;
  maxScore: number;
};

type HeatmapData = {
  startDate: string;
  endDate: string;
  days: DayData[];
};

const Heatmap = () => {
  const [data, setData] = useState<HeatmapData[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/heatmap', {
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
        setData(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className='heatmap'>
      {data.length > 0 && (
        <CalendarHeatmap
          startDate={new Date(data[0].startDate)}
          endDate={new Date(data[0].endDate)}
          values={data[0].days}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return getColor(value.score, value.maxScore);
          }}
          // horizontal={false}
          gutterSize={5}
          onClick={(value) => console.log('clicked date', value, value.count)}
          showWeekdayLabels={false}
        />
      )}
    </div>
  );
};

export default Heatmap;
