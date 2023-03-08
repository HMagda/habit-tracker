import React from 'react';
import DatePicker from '../../Components/DatePicker/DatePicker';
import Heatmap from '../../Components/Heatmap/Heatmap';
import './HabitsPage.modules.scss';

const HabitsPage = () => {
  return (
    <div className='habits-page'>
      <Heatmap />
      <DatePicker/>
    </div>
  );
};

export default HabitsPage;
