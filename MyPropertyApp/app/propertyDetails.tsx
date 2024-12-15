import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function PropertyDetailsScreen() {
  const params = useLocalSearchParams();
  const propertyData = JSON.parse(params.property as string);

  const handleBooking = async () => {
    try {
      const newBooking = {
        id: Date.now().toString(),
        propertyId: propertyData.id,
        userId: 'user1', // Replace with the logged-in user ID
        checkIn: '2024-02-01', // Example check-in date
        checkOut: '2024-02-05', // Example check-out date
        status: 'confirmed',
      };

      // Send a POST request to add the booking
      await axios.post('https://675ef6701f7ad24269972f71.mockapi.io/raft/bookings', newBooking);

      Alert.alert('Success', 'Property booked successfully!');
    } catch (error) {
      console.error('Error booking property:', error);
      Alert.alert('Error', 'Failed to book property. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{propertyData.title}</Text>
      <FlatList
        data={propertyData.images}
        horizontal
        renderItem={({ item }: { item: string }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      {/* Property Details */}
      <Text style={styles.details}>Price: ${propertyData.price}</Text>
      <Text style={styles.details}>
        Location: {propertyData.location.city}, {propertyData.location.state}
      </Text>
      <Text style={styles.featuresTitle}>Features:</Text>
      {propertyData.features.map((feature: string, index: number) => (
        <Text key={index} style={styles.feature}>
          - {feature}
        </Text>
      ))}

      {/* Map View */}
      <Text style={styles.mapTitle}>Map Location:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: propertyData.location.coordinates.latitude,
          longitude: propertyData.location.coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: propertyData.location.coordinates.latitude,
            longitude: propertyData.location.coordinates.longitude,
          }}
          title={propertyData.title}
        />
      </MapView>

      {/* Book Property Button */}
      <View style={styles.buttonContainer}>
        <Button title="Book Property" onPress={handleBooking} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    marginRight: 10,
    borderRadius: 8,
  },
  details: {
    fontSize: 18,
    marginVertical: 5,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  feature: {
    fontSize: 16,
    marginVertical: 2,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  map: {
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 50
  },
});
