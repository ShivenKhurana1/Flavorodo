import { Viaoda_Libre } from "next/font/google";

//src/types/timer.ts
export interface TimeState {
    isRunning: boolean;
    isBreak: boolean;
    currentTime: number;
    sessionsCompleted: number;
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
}

export interface TimerControls {
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    switchSession: () => void;
    formatTime: (seconds: number) => string;
    updateDurations: (work: number, short: number, long: number) => void;
}

export type TimerHook = TimeState & TimerControls;

export interface SessionsSettings {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    //all in minutes
}

export interface TimeTheme {
    isDarkMode: boolean;
    cafeTheme: 'sunny' | 'moonlight' | 'cozy';
}