export interface Restaurant {
  id: number;
  name: string;
  location: string;
  phone: string;
  rating: number;
  map_url: string;
  image_url: string;
}

export interface Food {
  id: number;
  name_en: string;
  name_ta: string;
  category: string;
  image_url: string;
}

export type Language = 'en' | 'ta';

export const translations = {
  en: {
    title: 'Kavin Unavagam',
    subtitle: 'Taste of Tirupattur',
    searchPlaceholder: 'Search for restaurants or food...',
    restaurants: 'Restaurants',
    foods: 'Popular Dishes',
    bookNow: 'Book Now',
    location: 'Location',
    phone: 'Phone',
    rating: 'Rating',
    language: 'தமிழ்',
    bookingTitle: 'Table Reservation',
    nameLabel: 'Your Name',
    dateLabel: 'Date & Time',
    guestsLabel: 'Number of Guests',
    confirmBooking: 'Confirm Reservation',
    successBooking: 'Booking successful!',
    close: 'Close'
  },
  ta: {
    title: 'கவின் உணவகம்',
    subtitle: 'திருப்பத்தூரின் சுவை',
    searchPlaceholder: 'உணவகங்கள் அல்லது உணவைத் தேடுங்கள்...',
    restaurants: 'உணவகங்கள்',
    foods: 'பிரபலமான உணவுகள்',
    bookNow: 'இப்போதே முன்பதிவு செய்யுங்கள்',
    location: 'இருப்பிடம்',
    phone: 'தொலைபேசி',
    rating: 'மதிப்பீடு',
    language: 'English',
    bookingTitle: 'மேஜை முன்பதிவு',
    nameLabel: 'உங்கள் பெயர்',
    dateLabel: 'தேதி மற்றும் நேரம்',
    guestsLabel: 'விருந்தினர்களின் எண்ணிக்கை',
    confirmBooking: 'முன்பதிவை உறுதிப்படுத்தவும்',
    successBooking: 'முன்பதிவு வெற்றிகரமாக முடிந்தது!',
    close: 'மூடு'
  }
};
