import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';
import { useProfileStore } from '../../state/profileStore';

export default function ProfileScreen() {
  const { profile, fetchProfile } = useProfileStore();

  React.useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {/* Profile Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{profile.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profile.email}</Text>
      </View>

      {/* Bookings Section */}
      <Text style={styles.sectionTitle}>Bookings:</Text>
      {profile.bookings.length > 0 ? (
        <FlatList
          data={profile.bookings}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.bookingItem}>
              <Text style={styles.bookingText}>Booking ID: {item}</Text>
            </View>
          )}
          contentContainerStyle={styles.bookingList}
        />
      ) : (
        <Text style={styles.noBookings}>No bookings available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2f95dc',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  value: {
    fontSize: 18,
    color: '#555',
    flex: 2,
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f95dc',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  bookingList: {
    width: '100%',
    paddingHorizontal: 10,
  },
  bookingItem: {
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  bookingText: {
    fontSize: 16,
    color: '#00796b',
  },
  noBookings: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});
