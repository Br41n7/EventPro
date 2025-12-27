
import React, { useState } from 'react';
import { ChevronLeft, Plus, Trash2, CheckCircle2, Circle, Clock, MapPin, DollarSign, Calendar as CalendarIcon, MessageCircle } from 'lucide-react';
import { Event, Task } from '../types';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onUpdateEvent: (updatedEvent: Event) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onUpdateEvent }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date().toISOString().split('T')[0]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      isCompleted: false,
      dueDate: newTaskDueDate
    };

    onUpdateEvent({
      ...event,
      tasks: [...(event.tasks || []), newTask]
    });
    setNewTaskTitle('');
    setNewTaskDueDate(new Date().toISOString().split('T')[0]);
  };

  const toggleTask = (taskId: string) => {
    onUpdateEvent({
      ...event,
      tasks: event.tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t)
    });
  };

  const deleteTask = (taskId: string) => {
    onUpdateEvent({
      ...event,
      tasks: event.tasks.filter(t => t.id !== taskId)
    });
  };

  const openWhatsApp = () => {
    const progressText = `${Math.round(progress)}% of tasks are completed`;
    const message = encodeURIComponent(`Hi ${event.clientName}, I'm updating you on "${event.name}". We are currently ${event.status} and ${progressText}.`);
    window.open(`https://wa.me/${event.clientPhone}?text=${message}`, '_blank');
  };

  const completedCount = event.tasks?.filter(t => t.isCompleted).length || 0;
  const progress = event.tasks?.length ? (completedCount / event.tasks.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
        </button>
        <button 
          onClick={openWhatsApp}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Client
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="bg-indigo-600 h-32 px-10 flex items-end relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Clock className="w-40 h-40 text-white" />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl translate-y-12 border border-slate-100 flex items-center justify-between w-full">
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">{event.name}</h1>
              <div className="flex items-center gap-4 text-slate-500 text-sm mt-1">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-indigo-500" /> {new Date(event.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-indigo-500" /> {event.venue}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-1">Total Budget</span>
              <span className="text-2xl font-black text-indigo-600">${event.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="pt-24 p-10 space-y-10">
          {/* Progress Section */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900">Task Completion</h3>
              <span className="text-indigo-600 font-black">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">
              {completedCount} of {event.tasks?.length || 0} essential tasks finished.
            </p>
          </div>

          {/* Task Manager */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <h3 className="text-xl font-bold text-slate-900">Checklist</h3>
              <form onSubmit={addTask} className="flex flex-wrap gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <input 
                    type="text" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Describe the task..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="relative">
                   <input 
                    type="date" 
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-600"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-all flex items-center gap-2 font-bold shadow-md shadow-indigo-100"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Task</span>
                </button>
              </form>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              {event.tasks?.length === 0 ? (
                <div className="p-16 text-center text-slate-400 bg-slate-50/30">
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-1">Your list is empty</h4>
                  <p className="text-sm">Start adding tasks with due dates to stay organized.</p>
                </div>
              ) : (
                event.tasks.map((task) => (
                  <div key={task.id} className={`group flex items-center justify-between p-5 transition-all ${task.isCompleted ? 'bg-slate-50/50' : 'bg-white hover:bg-slate-50/80'}`}>
                    <div className="flex items-center gap-4 flex-1">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className={`transition-all transform active:scale-90 ${task.isCompleted ? 'text-indigo-600' : 'text-slate-300 hover:text-slate-400'}`}
                      >
                        {task.isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
                      </button>
                      <div className="flex flex-col">
                        <span className={`text-sm font-semibold transition-all ${task.isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                          {task.title}
                        </span>
                        <span className={`text-[10px] flex items-center gap-1 mt-0.5 font-bold uppercase tracking-wider ${task.isCompleted ? 'text-slate-300' : 'text-slate-400'}`}>
                          <CalendarIcon className="w-3 h-3" /> Due: {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 group">
              <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <div className="bg-emerald-100 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                Financial Health
              </h4>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Client has paid the 20% deposit. Next installment due in 15 days. Budget remains within 5% of variance.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 group">
              <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <div className="bg-amber-100 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                Upcoming Milestone
              </h4>
              <p className="text-sm text-amber-700 leading-relaxed">
                Venue walkthrough scheduled for next Monday at 10:00 AM. Ensure vendor contracts are uploaded by Friday.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
