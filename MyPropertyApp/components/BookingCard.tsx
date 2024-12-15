import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useBookingStore } from '../state/bookingsStore';

interface Booking {
  id: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const { deleteBooking } = useBookingStore();

  const handleDelete = () => {
    deleteBooking(booking.id);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Property ID: {booking.propertyId}</Text>
      <Text style={styles.status}>Status: {booking.status}</Text>
      <Text style={styles.date}>
        Check-In: {booking.checkIn} - Check-Out: {booking.checkOut}
      </Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  status: { fontSize: 16, color: 'gray', marginBottom: 5 },
  date: { fontSize: 14, color: 'darkgray', marginBottom: 10 },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
