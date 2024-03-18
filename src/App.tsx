// Reactour (https://github.com/elrumordelaluz/reactour)
// MIT License
// Copyright (c) 2022 Lionel Tzatzkin
// [MIT License Text](https://github.com/elrumordelaluz/reactour/blob/master/LICENSE and in the root of my project in 'THIRD-PARTY-LICENCES')

import React, { useCallback, useState, useRef } from 'react';
import Tour from 'reactour';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
import PrivateRoute from './PrivateRoute';
import './Tour.modules.scss';

type Step = {
  selector: string;
  content: string;
  stepInteraction: boolean;
  action: (node: HTMLElement) => void;
};

const App: React.FC = () => {
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState<Step[]>([]);

    const cleanupRef = useRef<() => void>(() => {});

    const closeTour = () => {
        setIsTourOpen(false);
        if (cleanupRef.current) {
          cleanupRef.current(); // Call the cleanup function if defined
      }
    };

    const openTour = () => {
        const habitCompletedBtnExists = !!document.querySelector(
            '.habit-completed-btn'
        );

        const dynamicSteps = [
            {
                selector: '.habits-today',
                content: 'Here you can see your habits for today!',
                stepInteraction: false,
                action: (node: HTMLElement) => {
                    if (node) {
                        node.addEventListener('click', nextStep);
                    }
                },
            },
            ...(habitCompletedBtnExists
                ? [
                      {
                          selector: '.habit-completed-btn',
                          content: 'Click here to mark the habit as completed!',
                          stepInteraction: false,
                          action: (node: HTMLElement) => {
                              if (node) {
                                  node.addEventListener('click', nextStep);
                              }
                          },
                      },
                  ]
                : []),
            {
                selector: '.headline_week_plan',
                content: 'Here you can see your week plan!',
                stepInteraction: true,
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
                content: 'Under this headline you can see your statistics!',
                stepInteraction: false,
                action: (node: HTMLElement) => {
                    if (node) {
                        node.addEventListener('click', nextStep);
                    }
                },
            },
            {
                selector: '.react-datepicker__month',
                content:
                    'You can choose the range of days to view the habits completion.',
                stepInteraction: false,
                action: (node: HTMLElement) => {
                    if (node) {
                        node.addEventListener('click', nextStep);
                    }
                },
            },
            {
                selector: '.heatmap',
                content: 'Click on the day to see the score',
                stepInteraction: false,
                action: (node: HTMLElement) => {
                    if (node) {
                        node.addEventListener('click', nextStep);
                    }
                },
            },
        ];

        setSteps(dynamicSteps);
        setIsTourOpen(true);
    };

    const nextStep = useCallback(() => {
        setCurrentStep((prevStep) => prevStep + 1);
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route
                            path='/habits'
                            element={<HabitsPage openTour={openTour}/>}
                           
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
