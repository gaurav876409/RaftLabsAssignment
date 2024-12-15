import { create } from 'zustand';
import axios from 'axios';

interface Booking {
  id: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

interface BookingStore {
  bookings: Booking[];
  fetchBookings: () => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  fetchBookings: async () => {
    try {
      const response = await axios.get('https://675ef6701f7ad24269972f71.mockapi.io/raft/bookings');
      set({ bookings: response.data });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  },
  deleteBooking: async (id: string) => {
    try {
      await axios.delete(`https://675ef6701f7ad24269972f71.mockapi.io/raft/bookings/${id}`);
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  },
}));

