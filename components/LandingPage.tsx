
import React from 'react';
import { Calendar, Sparkles, Shield, Zap, ArrowRight, Menu, X, Instagram, Twitter, Linkedin } from 'lucide-react';
import MarketingView from './MarketingView';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openContactWhatsApp = () => {
    const message = encodeURIComponent("Hello EventPro! I'm interested in learning more about your services.");
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Calendar className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">EventPro</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#services" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Services</a>
            <a href="#portfolio" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Portfolio</a>
            <button 
              onClick={onEnterApp}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
            >
              Enter Dashboard
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-6 space-y-4 animate-in slide-in-from-top duration-200">
            <a href="#features" className="block text-lg font-bold text-slate-900">Features</a>
            <a href="#services" className="block text-lg font-bold text-slate-900">Services</a>
            <button 
              onClick={onEnterApp}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold"
            >
              Enter Dashboard
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
          <div className="absolute top-20 left-0 w-72 h-72 bg-indigo-300 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Now powered by Gemini 2.5</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            Architecting <br /> <span className="text-indigo-600">Legendary</span> Moments.
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium">
            The world's most advanced management system for high-end event planners. 
            AI-driven ideation, seamless logistics, and ironclad security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={onEnterApp}
              className="group bg-indigo-600 text-white px-8 py-5 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-2xl shadow-indigo-200"
            >
              Launch Your Event <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={openContactWhatsApp}
              className="bg-white text-slate-900 border-2 border-slate-100 px-8 py-5 rounded-2xl text-lg font-bold hover:border-slate-200 transition-all"
            >
              Chat with an Expert
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-6xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden border-8 border-slate-900">
            <div className="bg-white rounded-[1.8rem] h-[500px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover" 
                alt="System Preview" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <Sparkles className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI Concept Creator</h3>
              <p className="text-slate-500 leading-relaxed">
                Describe a vibe and let our Gemini-powered engine generate complete themes, decor ideas, and budget breakdowns in seconds.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <Zap className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Instant Payments</h3>
              <p className="text-slate-500 leading-relaxed">
                Integrated with Paystack for seamless global transactions. Collect deposits and vendor payments with ironclad security.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <Shield className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Bank-Grade Security</h3>
              <p className="text-slate-500 leading-relaxed">
                Client data is protected with enterprise-level encryption and Django's robust security framework at every touchpoint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing View Sections (Services, Portfolio, Testimonials) */}
      <div className="max-w-7xl mx-auto px-6">
        <MarketingView />
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <Calendar className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase">EventPro</span>
              </div>
              <p className="text-slate-400 text-sm">
                Redefining event management with intelligence and elegance.
              </p>
              <div className="flex gap-4">
                <Instagram className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Product</h4>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li><a href="#" className="hover:text-white">AI Tools</a></li>
                <li><a href="#" className="hover:text-white">Budget Planner</a></li>
                <li><a href="#" className="hover:text-white">Vendor Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Company</h4>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><button onClick={openContactWhatsApp} className="hover:text-white text-left">Contact</button></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Stay Updated</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-slate-800 border-none rounded-xl px-4 py-2 text-sm flex-1 outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button className="bg-indigo-600 px-4 py-2 rounded-xl text-sm font-bold">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-800 text-center text-slate-500 text-xs">
            © 2024 EventPro Systems Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
