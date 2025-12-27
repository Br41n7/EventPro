
import React, { useState } from 'react';
import { Sparkles, Loader2, Send, CheckCircle2, ChevronRight, DollarSign, MessageCircle } from 'lucide-react';
import { generateEventConcept, generateBudgetSuggestions } from '../services/gemini';

const EventPlannerAI: React.FC = () => {
  const [eventType, setEventType] = useState('Wedding');
  const [vibe, setVibe] = useState('Modern and Minimalist');
  const [guestCount, setGuestCount] = useState(150);
  const [budget, setBudget] = useState(50000);
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState<any>(null);
  const [budgetBreakdown, setBudgetBreakdown] = useState<any[]>([]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateEventConcept(eventType, guestCount, vibe);
      const budgetResult = await generateBudgetSuggestions(budget, eventType);
      setConcept(result);
      setBudgetBreakdown(budgetResult);
    } catch (error) {
      console.error(error);
      alert("Failed to generate concept. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    if (!concept) return;
    const text = `Hey! Check out this event concept: "${concept.themeName}". ${concept.description}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">AI Event Architect</h1>
        <p className="text-slate-500">Let Gemini brainstorm your next masterpiece based on your constraints.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Event Type</label>
              <select 
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <optgroup label="Classic Events">
                  <option>Wedding</option>
                  <option>Corporate Gala</option>
                  <option>Tech Product Launch</option>
                  <option>Art Exhibition</option>
                  <option>Charity Ball</option>
                </optgroup>
                <optgroup label="Life Milestones">
                  <option>Naming Ceremony</option>
                  <option>Promotion Party</option>
                  <option>Burial / Celebration of Life</option>
                </optgroup>
                <optgroup label="Formal & Traditional">
                  <option>Coronation Ceremony</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Desired Vibe</label>
              <input 
                type="text" 
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="e.g. Regal, Somber, High-Energy..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Guests</label>
                <input 
                  type="number" 
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Budget ($)</label>
                <input 
                  type="number" 
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200 group"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
            Architect My Event
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {!concept && !loading && (
            <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-3xl h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <Sparkles className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Ready to Innovate?</h3>
              <p className="text-indigo-600 max-w-xs">Enter your event details on the left and I'll generate a comprehensive concept and budget for you.</p>
            </div>
          )}

          {loading && (
            <div className="bg-white border border-slate-200 rounded-3xl h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="animate-pulse space-y-4 w-full">
                <div className="h-8 bg-slate-100 rounded w-1/3 mx-auto"></div>
                <div className="h-32 bg-slate-100 rounded w-full"></div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="h-40 bg-slate-100 rounded"></div>
                   <div className="h-40 bg-slate-100 rounded"></div>
                </div>
              </div>
              <p className="mt-8 text-slate-500 font-medium">Consulting Gemini for creative sparks...</p>
            </div>
          )}

          {concept && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Sparkles className="w-32 h-32 text-indigo-600" />
                </div>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                  AI Generated Concept
                </span>
                <h2 className="text-3xl font-black text-slate-900 mb-4">{concept.themeName}</h2>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {concept.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-indigo-600" /> Decor Inspiration
                    </h4>
                    <ul className="space-y-3">
                      {concept.decorIdeas.map((idea: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" /> Suggested Budget Breakdown
                    </h4>
                    <div className="space-y-4">
                      {budgetBreakdown.map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-700 font-medium">{item.name}</span>
                            <span className="text-slate-900 font-bold">${item.allocated.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                              style={{ width: `${(item.allocated / budget) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4">
                  <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                    Save to Projects
                  </button>
                  <button 
                    onClick={shareOnWhatsApp}
                    className="px-6 py-3 rounded-xl font-bold text-emerald-600 border border-emerald-200 hover:bg-emerald-50 transition-colors flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPlannerAI;
