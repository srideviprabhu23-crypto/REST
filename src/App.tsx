import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Star, Globe, Utensils, Calendar, Users, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Restaurant, Food, Language, translations } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', date: '', guests: 2 });
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    fetch('/api/restaurants').then(res => res.json()).then(setRestaurants);
    fetch('/api/foods').then(res => res.json()).then(setFoods);
  }, []);

  const toggleLang = () => setLang(lang === 'en' ? 'ta' : 'en');

  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRestaurant) return;

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurant_id: selectedRestaurant.id,
        user_name: bookingForm.name,
        booking_date: bookingForm.date,
        guests: bookingForm.guests
      })
    });

    if (res.ok) {
      setIsBookingSuccess(true);
      setTimeout(() => {
        setIsBookingSuccess(false);
        setSelectedRestaurant(null);
        setBookingForm({ name: '', date: '', guests: 2 });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="text-emerald-600 w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">{t.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-100 transition-colors text-sm font-medium"
            >
              <Globe className="w-4 h-4" />
              {t.language}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {t.subtitle}
          </motion.h2>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Restaurants Grid */}
        <section>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <MapPin className="text-emerald-600" />
            {t.restaurants}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <motion.div 
                key={restaurant.id}
                layoutId={`restaurant-${restaurant.id}`}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={restaurant.image_url} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {restaurant.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{restaurant.name}</h4>
                  <p className="text-stone-500 text-sm mb-4 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    {restaurant.location}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <a 
                      href={restaurant.map_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 text-sm font-bold hover:underline flex items-center gap-1"
                    >
                      {t.location}
                    </a>
                    <button 
                      onClick={() => setSelectedRestaurant(restaurant)}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                    >
                      {t.bookNow}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Foods */}
        <section className="bg-emerald-900 -mx-4 px-4 py-16 rounded-[3rem] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center">{t.foods}</h3>
            <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
              {foods.map((food) => (
                <div key={food.id} className="min-w-[280px] bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/10">
                  <img 
                    src={food.image_url} 
                    alt={food.name_en}
                    className="w-full h-40 object-cover rounded-2xl mb-4"
                    referrerPolicy="no-referrer"
                  />
                  <h5 className="text-lg font-bold">{lang === 'en' ? food.name_en : food.name_ta}</h5>
                  <span className="text-white/60 text-sm">{food.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedRestaurant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRestaurant(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedRestaurant(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                {isBookingSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block p-4 bg-emerald-100 rounded-full text-emerald-600"
                    >
                      <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">{t.successBooking}</h3>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-2">{t.bookingTitle}</h3>
                    <p className="text-stone-500 mb-8">{selectedRestaurant.name}</p>

                    <form onSubmit={handleBooking} className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold mb-2">{t.nameLabel}</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                          value={bookingForm.name}
                          onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold mb-2">{t.dateLabel}</label>
                          <input 
                            required
                            type="datetime-local" 
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={bookingForm.date}
                            onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">{t.guestsLabel}</label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input 
                              required
                              type="number" 
                              min="1"
                              max="20"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                              value={bookingForm.guests}
                              onChange={e => setBookingForm({...bookingForm, guests: parseInt(e.target.value)})}
                            />
                          </div>
                        </div>
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                      >
                        {t.confirmBooking}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Utensils className="text-emerald-500 w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">{t.title}</span>
          </div>
          <p className="text-stone-400 text-sm">© 2026 Kavin Unavagam. All rights reserved.</p>
          <div className="mt-8 flex justify-center gap-6 text-stone-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
