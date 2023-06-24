import React, {useCallback, useState} from 'react';
import Tour from 'reactour';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const closeTour = () => {
    setIsTourOpen(false);
  };

  const openTour = () => {
    setIsTourOpen(true);
  };

  const nextStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);

  const steps = [
    {
      selector: '.habits_today',
      content: 'Here you can see your habits for today!',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        node.addEventListener('click', nextStep);
      },
    },
    {
      selector: '.habit-completed-btn',
      content: 'Click here to mark the habit as completed!',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        node.addEventListener('click', nextStep);
      },
    },
    {
      selector: '.headline_week_plan',
      content: 'Click here to see your week plan!',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        if (node) {
          node.addEventListener('click', nextStep);
        }
      },
    },
    {
      selector: '.formatting-option ',
      content: 'Click here to see the exact dates.',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        if (node) {
          node.addEventListener('click', nextStep);
        }
      },
    },
    {
      selector: '.edit-icon ',
      content: 'Click here to edit your habit.',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        if (node) {
          node.addEventListener('click', nextStep);
        }
      },
    },
    {
      selector: '.delete-icon ',
      content: 'Click here to delete your habit.',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        if (node) {
          node.addEventListener('click', nextStep);
        }
      },
    },
    {
      selector: '.single-btn-container ',
      content: 'Click here to change the habit completion status.',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        if (node) {
          node.addEventListener('click', nextStep);
        }
      },
    },
    {
      selector: '.headline_statistics',
      content: 'Click here to see your statistics!',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        node.addEventListener('click', nextStep);
      },
    },
    {
      selector: '.react-datepicker__month',
      content: 'You can choose the range of days to view completion.',
      stepInteraction: false,
      action: (node: HTMLElement) => {
        node.addEventListener('click', nextStep);
      },
    },
  ];

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route element={<PrivateRoute />}>
            <Route
              path='/habits'
              element={<HabitsPage openTour={openTour} />}
            />
          </Route>
        </Routes>
      </Router>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={closeTour}
        getCurrentStep={setCurrentStep}
        goToStep={currentStep}
      />
    </>
  );
};

export default App;
