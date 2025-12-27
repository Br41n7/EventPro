
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';
import { Event, EventStatus } from '../types';

const data = [
  { name: 'Jan', revenue: 4000, bookings: 24 },
  { name: 'Feb', revenue: 3000, bookings: 13 },
  { name: 'Mar', revenue: 2000, bookings: 98 },
  { name: 'Apr', revenue: 2780, bookings: 39 },
  { name: 'May', revenue: 1890, bookings: 48 },
  { name: 'Jun', revenue: 2390, bookings: 38 },
  { name: 'Jul', revenue: 3490, bookings: 43 },
];

interface DashboardProps {
  events: Event[];
}

const Dashboard: React.FC<DashboardProps> = ({ events }) => {
  const stats = [
    { label: 'Total Events', value: events.length, icon: Calendar, color: 'bg-blue-500', trend: '+12%' },
    { label: 'Active Clients', value: '48', icon: Users, color: 'bg-purple-500', trend: '+5%' },
    { label: 'Total Revenue', value: '$128,430', icon: DollarSign, color: 'bg-emerald-500', trend: '+18%' },
    { label: 'Growth Rate', value: '24.8%', icon: TrendingUp, color: 'bg-orange-500', trend: '+2%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back, Alex</h1>
          <p className="text-slate-500">Here's what's happening with your events today.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                {stat.trend} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Upcoming Schedule</h3>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {events.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="bg-indigo-50 text-indigo-600 w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold">
                  <span className="text-xs uppercase leading-none">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-lg">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{event.name}</h4>
                  <p className="text-sm text-slate-500">{event.venue}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    event.status === EventStatus.CONFIRMED ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {event.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">4:00 PM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
