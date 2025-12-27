
import React from 'react';
import { Check, Star, ArrowRight, Quote } from 'lucide-react';

const services = [
  {
    title: "Basic Planning",
    price: "$1,500",
    description: "Ideal for intimate naming ceremonies, promotion celebrations, and small social gatherings.",
    features: [
      "Initial concept development",
      "Digital task checklist",
      "Basic vendor recommendations",
      "Day-of timeline management",
      "Support for up to 50 guests"
    ],
    target: "Milestones & Small Socials",
    cta: "Get Started"
  },
  {
    title: "Full-Service Coordination",
    price: "$5,000+",
    popular: true,
    description: "Our comprehensive package for weddings, corporate galas, and respectful life celebrations.",
    features: [
      "End-to-end vendor management",
      "Budget tracking & negotiation",
      "On-site coordination team (3)",
      "Detailed floor plans & 3D renders",
      "Invitation & RSVP management"
    ],
    target: "Weddings & Large Events",
    cta: "Book a Consultation"
  },
  {
    title: "Luxury Bespoke Events",
    price: "Custom",
    description: "The gold standard for coronations, high-stakes brand launches, and elite gatherings.",
    features: [
      "24/7 dedicated concierge",
      "International destination scouting",
      "Bespoke decor & set builds",
      "Celebrity/Entertainment booking",
      "Total event branding & PR"
    ],
    target: "VIP Galas & Traditional Ceremonies",
    cta: "Contact Us for Pricing"
  }
];

const featuredEvents = [
  {
    title: "Royal Coronation Ceremony",
    type: "Coronation",
    location: "Heritage Hall, London",
    image: "https://images.unsplash.com/photo-1518131333469-653457116742?auto=format&fit=crop&w=800&q=80",
    description: "A breathtaking display of tradition and grandeur, featuring custom-woven tapestries and a full orchestral arrangement."
  },
  {
    title: "Zen Celebration of Life",
    type: "Burial / Memorial",
    location: "Kyoto Gardens",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    description: "A somber yet beautiful farewell designed around water features and floral tributes, providing a peaceful space for reflection."
  },
  {
    title: "New Horizons Naming",
    type: "Naming Ceremony",
    location: "Cape Town Coast",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    description: "A joyful family affair celebrating a new arrival with sustainable decor, coastal vibes, and intimate storytelling circles."
  }
];

const testimonials = [
  {
    name: "Dr. Alistair Vance",
    role: "Promotion Recipient",
    text: "My promotion party was the highlight of the decade. EventPro balanced professional prestige with an incredible atmosphere for my colleagues and family.",
    rating: 5
  },
  {
    name: "Lady Catherine",
    role: "Coronation Chair",
    text: "Handling a traditional coronation requires precision and deep respect for history. EventPro exceeded every expectation with their meticulous planning.",
    rating: 5
  },
  {
    name: "The Miller Family",
    role: "Memorial Clients",
    text: "In our time of grief, they handled everything with such grace. Our father's celebration of life was exactly as he would have wanted—dignified and beautiful.",
    rating: 5
  }
];

const MarketingView: React.FC = () => {
  const handleCtaClick = (cta: string, title: string) => {
    if (cta === "Contact Us for Pricing") {
      const message = encodeURIComponent(`Hello! I am interested in the ${title} package and would like to request pricing details.`);
      window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    } else {
      // Logic for other CTAs if needed
      console.log(`Action for: ${cta}`);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Services Section */}
      <section id="services" className="space-y-12 pt-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900">Expert Planning Packages</h2>
          <p className="text-lg text-slate-500">From intimate naming ceremonies to grand coronations, we have a coordination model tailored to your needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white p-8 rounded-3xl border ${service.popular ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-200'} shadow-sm transition-transform hover:-translate-y-1 duration-300`}
            >
              {service.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{service.target}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-black text-slate-900">{service.price}</span>
                {service.price !== 'Custom' && <span className="text-slate-400 font-medium">/base</span>}
              </div>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-4 mb-10">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                    <Check className={`w-5 h-5 ${service.popular ? 'text-indigo-600' : 'text-slate-400'} shrink-0`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleCtaClick(service.cta, service.title)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${service.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
              >
                {service.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events Section */}
      <section id="portfolio" className="space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Greatest Works</h2>
            <p className="text-slate-500">Explore the diverse experiences we've architected for our elite clientele.</p>
          </div>
          <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View Full Portfolio <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-64 overflow-hidden rounded-3xl mb-6 shadow-md bg-slate-100">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white text-sm font-bold bg-indigo-600/80 backdrop-blur-md px-4 py-2 rounded-full">
                    Explore Case Study
                  </span>
                </div>
              </div>
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    {event.type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{event.location}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{event.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-indigo-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Quote className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight">Voices of Success</h2>
            <p className="text-indigo-200 text-lg">Don't just take our word for it—listen to the diverse group of clients we've served.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, idx) => (
              <div key={idx} className="space-y-6 flex flex-col items-center text-center group">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-lg font-medium leading-relaxed italic text-indigo-50">
                  "{t.text}"
                </blockquote>
                <div className="pt-4">
                  <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mb-4 transition-all group-hover:w-24"></div>
                  <h4 className="text-xl font-bold">{t.name}</h4>
                  <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketingView;
