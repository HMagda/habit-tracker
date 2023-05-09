import React, {useState, useEffect} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './Heatmap.modules.scss';
import 'react-calendar-heatmap/dist/styles.css';
import {Habit, HabitForToday, baseUrl, getToken} from '../../utils';
import {useAuth0} from "@auth0/auth0-react";

function getColor(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;

  return percentage > 80
    ? 'color-scale-5'
    : percentage > 60
    ? 'color-scale-4'
    : percentage > 40
    ? 'color-scale-3'
    : percentage > 20
    ? 'color-scale-2'
    : percentage > 0
    ? 'color-scale-1'
    : 'color-empty';
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  const dayWithSuffix =
    new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
      .formatToParts(dateObj)
      .find((part) => part.type === 'day')?.value ?? 'unknown';

  const monthName = dateObj.toLocaleDateString('en-GB', {month: 'short'});

  return `${dayWithSuffix} ${monthName} ${year}`;
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

const Heatmap: React.FC<{
  habitsArr: Habit[];
  habitsForTodayArr: HabitForToday[];
}> = ({habitsArr, habitsForTodayArr}) => {

  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState<HeatmapData>();
  const [tooltipDate, setTooltipDate] = useState<string>('');
  const [tooltipScore, setTooltipScore] = useState<number>(0);
  const [tooltipMaxScore, setTooltipMaxScore] = useState<number>(0);

  useEffect(() => {
    getToken(getAccessTokenSilently).then((token) => {
      fetch(baseUrl + '/habits/completion-metrics', {
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
            setData(data);
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
    });
  }, [habitsArr, habitsForTodayArr]);

  function handleMouseOver(e: React.MouseEvent, value: DayData) {
    if (value !== null) {
      setTooltipDate(value.date);
      setTooltipScore(value.score);
      setTooltipMaxScore(value.maxScore);
    }
  }

  function handleClick(value: DayData) {
    if (value !== null) {
      setTooltipDate(value.date);
      setTooltipScore(value.score);
      setTooltipMaxScore(value.maxScore);
    }
  }

  function handleMouseOut() {
    setTooltipDate('');
    setTooltipScore(0);
    setTooltipMaxScore(0);
  }

  const renderTooltip = () => {
    if (tooltipDate && tooltipScore !== null && tooltipMaxScore !== null) {
      return (
          <div className='tooltip'>
            {formatDate(tooltipDate)}, {tooltipScore}/{tooltipMaxScore}
          </div>
      );
    } else {
      return <div className='tooltip'>Click on the day to see the score</div>;
    }
  };

  return (
      <>
        <div className='heatmap-container'>
          {data && (
              <div className='heatmap' onMouseLeave={handleMouseOut}>
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
                    onMouseOver={(e, value) => handleMouseOver(e, value as DayData)}
                    onClick={(value) => handleClick(value as DayData)}
                    showWeekdayLabels={true}
                />
              </div>
          )}

          <div className='tooltip-container'>{renderTooltip()}</div>
        </div>
      </>
  );
};

export default Heatmap;
