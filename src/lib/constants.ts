export type BookingStatus = 'Na čekanju' | 'Završeno' | 'Otkazano/Propušteno';

export interface Service {
  id: number;
  name: string;
  duration: number; // minutes
  price: number; // KM
  image: string;
}

export interface Booking {
  id: string;
  client_name: string;
  phone: string;
  barber: string;
  service_name: string;
  service_duration: number;
  service_price: number;
  booked_date: string; // YYYY-MM-DD
  booked_time: string; // HH:MM
  status: BookingStatus;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  created_at: string;
}

export const BARBERS = ['Sulejman Turanović', 'Edvin Šahinović'] as const;
export type Barber = (typeof BARBERS)[number];

export const SERVICES: Service[] = [
  {
    id: 1,
    name: 'Šišanje',
    duration: 30,
    price: 15,
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    name: 'Uređivanje brade',
    duration: 20,
    price: 10,
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    name: 'Šišanje plus brada',
    duration: 30,
    price: 20,
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    name: 'Pranje kose',
    duration: 10,
    price: 5,
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 5,
    name: 'Masaža glave plus pranje kose',
    duration: 30,
    price: 15,
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 6,
    name: 'Full tretman',
    duration: 80,
    price: 60,
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 7,
    name: 'Farbanje brade',
    duration: 30,
    price: 10,
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 8,
    name: 'Šišanje djece do 7 godina',
    duration: 30,
    price: 10,
    image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const TIME_SLOTS: string[] = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30',
];

export const STATUS_TABS = [
  { key: 'all', label: 'Svi termini' },
  { key: 'Na čekanju', label: 'Na čekanju' },
  { key: 'Završeno', label: 'Završeno' },
  { key: 'Otkazano/Propušteno', label: 'Otkazano/Propušteno' },
] as const;

export const MAPS_LINK = 'https://maps.app.goo.gl/PdwqUobVbZmJ3PZx6';
export const FACEBOOK_LINK = 'https://www.facebook.com/profile.php?id=61578756117312';
export const PHONE_NUMBER = '062 123 456';
