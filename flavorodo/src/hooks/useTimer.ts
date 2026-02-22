//src/hooks/useTimer.ts

import { useState, useEffect, useCallback } from 'react';
import { TimeState, TimerControls } from '../types/timer'


export const useTimer = () => {
    const [state, setState] = useState<TimeState>({
        isRunning: false,
        isBreak: false,
        currentTime: 25 * 60, // 25 minutes in seconds
        sessionsCompleted: 0,
        workDuration: 25 * 60,
        shortBreakDuration: 5 * 60,
        longBreakDuration: 15 * 60,
    });

    const startTimer = useCallback(() => {
        setState(prev => ({ ...prev, isRunning: true }));
    }, []);

    const pauseTimer = useCallback(() => {
        setState(prev => ({ ...prev, isRunning: false }));
    }, []);
    /*
        const resetTimer = useCallback(() => {
            setState({
                isRunning: false,
                isBreak: false,
                currentTime: 25 * 60,
                sessionsCompleted: 0,
                workDuration: 25 * 60,
                shortBreakDuration: 5 * 60,
                longBreakDuration: 15 * 60,
            });
        }, []);
    */
    const resetTimer = useCallback(() => {
        setState(prev => ({
            ...prev,
            isRunning: false,
            isBreak: false,
            currentTime: prev.workDuration,
            sessionsCompleted: 0,
        }));
    }, []);

    const updateDurations = useCallback((work: number, short: number, long: number) => {
        setState(prev => ({
            ...prev,
            workDuration: work * 60,
            shortBreakDuration: short * 60,
            longBreakDuration: long * 60,
            currentTime: prev.isRunning ? prev.currentTime : (!prev.isBreak ? work * 60 : (prev.sessionsCompleted % 4 === 0 ? long * 60 : short * 60))
        }));
    }, []);
    const switchSession = useCallback(() => {
        setState(prev => {
            const newSessionsCompleted = prev.isBreak ? prev.sessionsCompleted + 1 : prev.sessionsCompleted;
            const shouldTakeLongBreak = newSessionsCompleted > 0 && newSessionsCompleted % 4 === 0;

            return {
                ...prev,
                isBreak: !prev.isBreak,
                currentTime: !prev.isBreak
                    ? (shouldTakeLongBreak ? prev.longBreakDuration : prev.shortBreakDuration)
                    : prev.workDuration,
                sessionsCompleted: newSessionsCompleted,
                isRunning: true,
            };
        });
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (state.isRunning && state.currentTime > 0) {
            interval = setInterval(() => {
                setState(prev => {
                    if (prev.currentTime <= 1) {
                        return { ...prev, currentTime: 0, isRunning: false };
                    }
                    return { ...prev, currentTime: prev.currentTime - 1 };
                });
            }, 1000);
        }

        return () => clearInterval(interval);

    }, [state.isRunning, state.currentTime]);

    useEffect(() => {
        if (state.currentTime === 0 && !state.isRunning) {
            switchSession();
        }

    }, [state.currentTime, state.isRunning, switchSession]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        ...state,
        startTimer,
        pauseTimer,
        resetTimer,
        switchSession,
        formatTime,
        updateDurations,
    };
};
