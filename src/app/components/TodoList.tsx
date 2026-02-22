"use client";
import { useState } from 'react';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList({ isDarkMode }: { isDarkMode: boolean }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
        setInput('');
    };
    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <aside className={`w-full md:w-80 h-fit max-h-[80vh] flex flex-col rounded-[2.5rem] border-2 transition-all duration-1000 p-8 shadow-2xl overflow-hidden ${isDarkMode
            ? 'bg-black/30 backdrop-blur-xl border-white/10 text-white'
            : 'bg-white/40 backdrop-blur-xl border-white/20 text-cafe-mocha'
            }`}>
            {/* Menu Header */}
            <div className="text-center mb-8 border-b-2 border-dashed pb-6 opacity-80" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(78,52,46,0.1)' }}>
                <h2 className="font-timer text-3xl font-bold tracking-tight mb-1">Menu</h2>
                <p className="font-sans text-xs uppercase tracking-[0.2em] font-medium opacity-60">Daily Specials</p>
            </div>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-8 pr-2 custom scrollbar">
                {tasks.length === 0 && (
                    <p className="text-center font-sans italic opacity-40 text-sm py-4">No specials today...</p>
                )}
                {tasks.map(task => (
                    <div key={task.id} className="group flex items-center justify-between animate-in fade-in slide-in-from-left-4 duration-300">
                        <button
                            onClick={() => toggleTask(task.id)}
                            className="flex items-center space-x-3 text-left flex-1"
                        >
                            <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-all ${task.completed
                                ? (isDarkMode ? 'bg-white border-white' : 'bg-cafe-mocha border-cafe-mocha')
                                : 'border-current opacity-30 shadow-inner'
                                }`} />
                            <span className={`font-sans text-sm transition-all ${task.completed ? 'opacity-30 line-through' : 'opacity-80'}`}>
                                {task.text}
                            </span>
                        </button>
                        <button
                            onClick={() => removeTask(task.id)}
                            className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity p-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Input - "Order" Area */}
            <form onSubmit={addTask} className="mt-auto">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add to order..."
                    className={`w-full bg-transparent border-b-2 font-sans text-sm pb-2 focus:outline-none transition-all ${isDarkMode
                        ? 'border-while/10 focus:border-white/40 placeholder:text-white/20'
                        : 'border-cafe-mocha/10 focus:border-cafe-mocha/40 placeholder:text-cafe-mocha/20'
                        }`}
                />
            </form>
        </aside>
    );
}