import React, { useCallback } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BookingCard from '../../components/BookingCard';
import { useBookingStore } from '../../state/bookingsStore';

export default function BookingScreen() {
  const { bookings, fetchBookings } = useBookingStore();

  useFocusEffect(
    useCallback(() => {
      fetchBookings(); // Fetch bookings when the screen is focused
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={({ item }) => <BookingCard booking={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
});
