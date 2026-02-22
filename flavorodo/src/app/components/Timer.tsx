"use client";

import { useState } from 'react';
import { useTimer } from '../../hooks/useTimer';
import TodoList from './TodoList';

export default function Timer() {
    const {
        currentTime,
        isRunning,
        isBreak,
        sessionsCompleted,
        startTimer,
        pauseTimer,
        resetTimer,
        formatTime,
        updateDurations,
        workDuration,
        shortBreakDuration,
        longBreakDuration
    } = useTimer();

    // Local UI States
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Calculate progress based on the current session type
    const totalTime = isBreak
        ? (sessionsCompleted > 0 && sessionsCompleted % 4 === 0 ? longBreakDuration : shortBreakDuration)
        : workDuration;
    const progress = ((totalTime - currentTime) / totalTime) * 100;

    return (
        <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center relative overflow-hidden p-6 md:p-12 gap-8 lg:gap-16">
            {/* Backgrounds (Controlled by isDarkMode) */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{
                    backgroundImage: isDarkMode ? 'url(/moonlit.png)' : 'url(/sunny.png)',
                }}
            >
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'bg-black/40' : 'bg-white/10'}`}></div>
            </div>

            {/* Menu Card Todo List (Left Side) */}
            <TodoList isDarkMode={isDarkMode} />

            {/* Main Timer Content */}
            <main className={`relative z-10 p-12 md:p-16 max-w-lg w-full flex flex-col items-center rounded-[3rem] transition-all duration-1000 ${isDarkMode
                ? 'bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl text-white'
                : 'bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl text-cafe-mocha'
                }`}>

                {/* Settings Toggle (Top Left) */}
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`absolute top-8 left-8 p-3 rounded-full border transition-all hover:scale-110 active:scale-95 z-20 ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-cafe-mocha/20 text-cafe-mocha hover:bg-cafe-mocha/5'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>

                {/* Theme Toggle Button (Top Right) */}
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`absolute top-8 right-8 p-3 rounded-full border transition-all hover:scale-110 active:scale-95 ${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-cafe-mocha/20 text-cafe-mocha hover:bg-cafe-mocha/5'
                        }`}
                >
                    {isDarkMode ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                    )}
                </button>

                {/* Settings Menu Overlay */}
                {showSettings && (
                    <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-8 transition-all animate-in fade-in zoom-in duration-300 rounded-[3rem] ${isDarkMode ? 'bg-black/90 backdrop-blur-md text-white' : 'bg-white/95 backdrop-blur-md text-cafe-mocha'
                        }`}>
                        <h2 className="font-sans text-xl font-bold mb-8 uppercase tracking-[0.2em] opacity-80 text-center">Timer Settings</h2>
                        <div className="space-y-6 w-full max-w-xs">
                            {[
                                { label: 'Focus', val: workDuration / 60, key: 'work' },
                                { label: 'Short Break', val: shortBreakDuration / 60, key: 'short' },
                                { label: 'Long Break', val: longBreakDuration / 60, key: 'long' }
                            ].map(item => (
                                <div key={item.key} className="flex items-center justify-between">
                                    <span className="font-sans text-sm font-medium uppercase tracking-wider opacity-60">{item.label}</span>
                                    <input
                                        type="number"
                                        defaultValue={item.val}
                                        onBlur={(e) => {
                                            const newVals = {
                                                work: workDuration / 60,
                                                short: shortBreakDuration / 60,
                                                long: longBreakDuration / 60,
                                                [item.key]: parseInt(e.target.value) || 1
                                            };
                                            updateDurations(newVals.work, newVals.short, newVals.long);
                                        }}
                                        className="w-16 bg-transparent border-b-2 border-current text-center font-sans font-bold text-lg focus:outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowSettings(false)}
                            className="mt-12 px-8 py-2 rounded-full border border-current font-sans text-xs uppercase tracking-widest hover:bg-current hover:text-white transition-all focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* Coffee Cup Icon */}
                <div className="mb-10 relative">
                    <div className={`w-14 h-12 border-[3px] rounded-b-2xl relative transition-colors duration-1000 ${isDarkMode ? 'border-cafe-latte' : 'border-cafe-mocha'
                        }`}>
                        <div className={`absolute -right-4 top-2 w-4 h-7 border-[3px] border-l-0 rounded-r-xl ${isDarkMode ? 'border-cafe-latte' : 'border-cafe-mocha'
                            }`}></div>
                        {isRunning && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex space-x-1.5 focus:outline-none pointer-events-none">
                                <div className={`w-1.5 h-4 rounded-full animate-steam ${isDarkMode ? 'bg-cafe-latte' : 'bg-cafe-mocha'}`}></div>
                                <div className={`w-1.5 h-4 rounded-full animate-steam ${isDarkMode ? 'bg-cafe-latte' : 'bg-cafe-mocha'}`} style={{ animationDelay: '0.5s' }}></div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Session Status Label */}
                <div className="mb-4 text-center">
                    <span className={`font-sans text-xs uppercase tracking-[0.3em] font-bold opacity-40 transition-all duration-1000 ${isDarkMode ? 'text-white' : 'text-cafe-mocha'}`}>
                        {isBreak
                            ? (sessionsCompleted > 0 && sessionsCompleted % 4 === 0 ? "Long Break" : "Short Break") : "Focus Work"}
                    </span>
                </div>

                {/* Circular Timer */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 mb-12">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="130"
                            stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(78,52,46,0.05)"}
                            strokeWidth="12"
                            fill="none"
                        />
                        <circle
                            cx="50%"
                            cy="50%"
                            r="130"
                            stroke={isDarkMode ? "#ffffff" : "#4e342e"}
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={2 * Math.PI * 130}
                            strokeDashoffset={2 * Math.PI * 130 - (progress / 100) * (2 * Math.PI * 130)}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-in-out"
                        />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className={`text-7xl md:text-8xl font-timer font-bold tracking-tighter transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-cafe-mocha'
                            }`}>
                            {formatTime(currentTime)}
                        </div>
                    </div>
                </div>

                {/* Progress Dots */}
                <div className="flex space-x-4 mb-12">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 shadow-sm ${i < sessionsCompleted
                                ? (isDarkMode ? 'bg-white scale-110' : 'bg-cafe-mocha scale-110')
                                : (isDarkMode ? 'bg-white/20' : 'bg-cafe-mocha/20')
                                }`}
                        />
                    ))}
                </div>

                {/* Icon Controls */}
                <div className="flex items-center space-x-10">
                    <button
                        onClick={isRunning ? pauseTimer : startTimer}
                        className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg ${isDarkMode
                            ? 'border-white text-white hover:bg-white/10'
                            : 'border-cafe-mocha text-cafe-mocha hover:bg-cafe-mocha/5'
                            }`}
                    >
                        {isRunning ? (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '4px' }}>
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    <button
                        onClick={resetTimer}
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all opacity-60 hover:opacity-100 hover:scale-105 shadow-md ${isDarkMode ? 'border-white/50 text-white' : 'border-cafe-mocha/50 text-cafe-mocha'
                            }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </main>
        </div>
    );
}
