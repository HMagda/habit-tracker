import React, {useState, useEffect} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Heatmap.modules.scss';
import 'react-calendar-heatmap/dist/styles.css';
import { Habit, baseUrl } from '../../utils';

function getColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;

  return percentage > 80 ? 'color-scale-5' :
         percentage > 60 ? 'color-scale-4' :
         percentage > 40 ? 'color-scale-3' :
         percentage > 20 ? 'color-scale-2' :
         percentage > 0 ? 'color-scale-1' :
                            'color-empty';
}

type DayData = {
  date: string;
  score: number;
  maxScore: number;
};

type HeatmapData = {
  startDate: string;
  endDate: string;
  metrics: DayData[];
};

const Heatmap: React.FC<{habitsArr: Habit[]}> = ({habitsArr}) => {
  const [data, setData] = useState<HeatmapData>();

  useEffect(() => {
    fetch(baseUrl + '/habits/completion-metrics', {
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
  }, [habitsArr]);

  return (
    <div className='heatmap'>
      {data && (
        <CalendarHeatmap
          startDate={data.startDate}
          endDate={data.endDate}
          values={data.metrics}
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
