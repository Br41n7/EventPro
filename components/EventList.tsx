
import React from 'react';
import { MoreHorizontal, ExternalLink, Calendar as CalendarIcon, MapPin, Users, Settings2, MessageCircle } from 'lucide-react';
import { Event, EventStatus } from '../types';

interface EventListProps {
  events: Event[];
  onPay: (event: Event) => void;
  onSelectEvent: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onPay, onSelectEvent }) => {
  const openWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Hello ${name}, I'm following up on your event with EventPro.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Event Portfolio</h1>
          <p className="text-slate-500">Manage all your past, present, and future bookings.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-200 font-medium hover:bg-slate-50">Filter</button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">+ New Event</button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Event & Client</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Location</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div>
                    <button 
                      onClick={() => onSelectEvent(event)}
                      className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors text-left"
                    >
                      {event.name}
                    </button>
                    <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <Users className="w-3 h-3" /> {event.clientName}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-700 flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4 text-slate-400" /> {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {event.venue}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  ${event.budget.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    event.status === EventStatus.CONFIRMED ? 'bg-emerald-100 text-emerald-700' :
                    event.status === EventStatus.PLANNING ? 'bg-blue-100 text-blue-700' :
                    event.status === EventStatus.IN_PROGRESS ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => openWhatsApp(event.clientPhone, event.clientName)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                      title="Contact on WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => onSelectEvent(event)}
                      className="flex items-center gap-1 text-xs font-bold bg-white text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                    >
                      <Settings2 className="w-3 h-3" /> Manage
                    </button>
                    <button 
                      onClick={() => onPay(event)}
                      className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100"
                    >
                      Payment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
