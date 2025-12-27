
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EventList from './components/EventList';
import EventPlannerAI from './components/EventPlannerAI';
import PaymentModal from './components/PaymentModal';
import MarketingView from './components/MarketingView';
import LandingPage from './components/LandingPage';
import EventDetails from './components/EventDetails';
import { Event, EventStatus } from './types';

const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Met Gala 2024 Afterparty',
    clientName: 'Vogue Global',
    clientPhone: '1234567890',
    date: '2024-05-15',
    venue: 'The Met Museum, NY',
    status: EventStatus.CONFIRMED,
    budget: 850000,
    tasks: [
      { id: 't1', title: 'Confirm guest list security', isCompleted: true, dueDate: '2024-05-10' },
      { id: 't2', title: 'Set up light installations', isCompleted: false, dueDate: '2024-05-14' }
    ],
    description: 'High-profile fashion event afterparty.',
    categories: []
  },
  {
    id: '2',
    name: 'Silicon Valley Founders Summit',
    clientName: 'Y Combinator',
    clientPhone: '0987654321',
    date: '2024-08-20',
    venue: 'Palace of Fine Arts, SF',
    status: EventStatus.PLANNING,
    budget: 450000,
    tasks: [],
    description: 'Networking summit for tech founders.',
    categories: []
  },
  {
    id: '3',
    name: 'Neo-Tokyo Wedding',
    clientName: 'Hiroshi & Kiko',
    clientPhone: '1122334455',
    date: '2024-11-12',
    venue: 'Park Hyatt, Shinjuku',
    status: EventStatus.CONFIRMED,
    budget: 120000,
    tasks: [],
    description: 'Cyberpunk themed wedding experience.',
    categories: []
  },
  {
    id: '4',
    name: 'Summer Arts Festival',
    clientName: 'Miami Arts Council',
    clientPhone: '5544332211',
    date: '2024-07-01',
    venue: 'Wynwood Walls',
    status: EventStatus.IN_PROGRESS,
    budget: 95000,
    tasks: [],
    description: 'Street art and music celebration.',
    categories: []
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [selectedEventForPayment, setSelectedEventForPayment] = useState<Event | null>(null);
  const [focusedEvent, setFocusedEvent] = useState<Event | null>(null);

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setFocusedEvent(updatedEvent);
  };

  const renderContent = () => {
    if (focusedEvent) {
      return (
        <EventDetails 
          event={focusedEvent} 
          onBack={() => setFocusedEvent(null)} 
          onUpdateEvent={handleUpdateEvent} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard events={events} />;
      case 'events':
        return (
          <EventList 
            events={events} 
            onPay={setSelectedEventForPayment} 
            onSelectEvent={setFocusedEvent}
          />
        );
      case 'ai-tools':
        return <EventPlannerAI />;
      case 'marketing':
        return <MarketingView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <h2 className="text-xl font-medium">Coming Soon</h2>
            <p>This module is under development.</p>
          </div>
        );
    }
  };

  if (view === 'landing') {
    return <LandingPage onEnterApp={() => setView('app')} />;
  }

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setFocusedEvent(null);
      }}>
        {renderContent()}
      </Layout>

      {selectedEventForPayment && (
        <PaymentModal 
          event={selectedEventForPayment} 
          onClose={() => setSelectedEventForPayment(null)} 
        />
      )}
    </>
  );
};

export default App;
