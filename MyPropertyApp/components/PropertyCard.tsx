import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Property {
  id: string;
  title: string;
  price: number;
  images: string[];
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: property.images[0] }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.price}>${property.price}/month</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 20, // Adds space between cards
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5, // Adds shadow for Android devices
    shadowColor: '#000', // Shadow for iOS devices
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    
  },
  image: {
    width: '100%',
    height: 180, // Adjusted image height for better display
    borderRadius: 8,
    resizeMode: 'cover', // Ensures the image covers the available space without stretching
  },
  details: {
    paddingTop: 10, // Adds space between image and text
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark text color for readability
  },
  price: {
    fontSize: 16,
    color: '#2f95dc', // Color for the price
    marginTop: 5,
  },
});
