import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('restaurant.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    phone TEXT,
    rating REAL,
    map_url TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS foods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_en TEXT NOT NULL,
    name_ta TEXT NOT NULL,
    category TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_id INTEGER,
    user_name TEXT,
    booking_date TEXT,
    guests INTEGER,
    FOREIGN KEY(restaurant_id) REFERENCES restaurants(id)
  );
`);

// Seed Restaurants
const insertRestaurant = db.prepare('INSERT INTO restaurants (name, location, phone, rating, map_url, image_url) VALUES (?, ?, ?, ?, ?, ?)');

const restaurants = [
  ['Ahmedia Restaurant', 'Gandhi Road, Tirupattur (Since 1975)', 'N/A', 4.8, 'https://maps.google.com/?q=Ahmedia+Restaurant+Tirupattur', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1000'],
  ['Rahamaniya Biryani Hotel', 'Tirupattur (Since 1890)', 'N/A', 4.9, 'https://maps.google.com/?q=Rahamaniya+Biryani+Hotel+Tirupattur', 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=1000'],
  ['Hotel Aryaas', 'Tirupattur', 'N/A', 4.5, 'https://maps.google.com/?q=Hotel+Aryaas+Tirupattur', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000'],
  ['Vadamalai Bavan', 'Krishnagiri Road, Tirupattur', '098941 48006', 4.6, 'https://maps.google.com/?q=Vadamalai+Bavan+Tirupattur', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1000'],
  ['Erode Ganapathi Vilas', 'Tirupattur', 'N/A', 4.4, 'https://maps.google.com/?q=Erode+Ganapathi+Vilas+Tirupattur', 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=1000'],
  ['Meat and Eat', 'Tirupattur', 'N/A', 4.2, 'https://maps.google.com/?q=Meat+and+Eat+Tirupattur', 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=1000'],
  ['Sri Gokul Mess', 'Tirupattur', 'N/A', 4.3, 'https://maps.google.com/?q=Sri+Gokul+Mess+Tirupattur', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000'],
  ['PUBG Restaurant', 'Tirupattur', 'N/A', 4.1, 'https://maps.google.com/?q=PUBG+Restaurant+Tirupattur', 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=1000'],
  ['Ammikkal Restaurant', 'Tirupattur', 'N/A', 4.5, 'https://maps.google.com/?q=Ammikkal+Restaurant+Tirupattur', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000'],
  ['Aadhira Tiffin Center', 'Tirupattur', 'N/A', 4.7, 'https://maps.google.com/?q=Aadhira+Tiffin+Center+Tirupattur', 'https://images.unsplash.com/photo-1630406144797-821be1f35d65?auto=format&fit=crop&q=80&w=1000']
];

db.exec('DELETE FROM restaurants');
restaurants.forEach(r => insertRestaurant.run(...r));

// Seed Foods
const insertFood = db.prepare('INSERT INTO foods (name_en, name_ta, category, image_url) VALUES (?, ?, ?, ?)');

const foods = [
  ['Idli', 'இட்லி', 'Breakfast', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600'],
  ['Dosa', 'தோசை', 'Breakfast', 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=600'],
  ['Masala Dosa', 'மசாலா தோசை', 'Breakfast', 'https://images.unsplash.com/photo-1630406144797-821be1f35d65?auto=format&fit=crop&q=80&w=600'],
  ['Pongal', 'பொங்கல்', 'Breakfast', 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600'],
  ['Medu Vada', 'மெது வடை', 'Breakfast', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600'],
  ['Vegetable Biryani', 'காய்கறி பிரியாணி', 'Rice', 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=600'],
  ['Chicken Biryani', 'சிக்கன் பிரியாணி', 'Rice', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600'],
  ['Parotta', 'பரோட்டா', 'Main', 'https://images.unsplash.com/photo-1626132646529-5003375a954e?auto=format&fit=crop&q=80&w=600'],
  ['Filter Coffee', 'பில்டர் காபி', 'Drinks', 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=600'],
  ['Jigarthanda', 'ஜிகர்தண்டா', 'Drinks', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600']
];

const foodCount = db.prepare('SELECT COUNT(*) as count FROM foods').get().count;
if (foodCount === 0) {
  foods.forEach(f => insertFood.run(...f));
}

export default db;
