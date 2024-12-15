import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';  
import SearchBar from '../../components/SearchBar';
import PropertyCard from '../../components/PropertyCard';
import { usePropertiesStore } from '../../state/propertiesStore';

export default function HomeScreen() {
  const { properties, fetchProperties } = usePropertiesStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch properties when the screen loads
  useEffect(() => {
    fetchProperties();
  }, []);

  // Filter properties based on search query
  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search properties..."
      />

      {/* Property List */}
      {filteredProperties.length > 0 ? (
        <FlatList 
          data={filteredProperties}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: '/propertyDetails',
                params: { property: JSON.stringify(item) },
              }}
            >
              <View style = {styles.list}>
              <PropertyCard property={item} />
              </View>
            </Link>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No properties found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  list: {
    // paddingVertical: 10,
    width: '100%'
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#888',
  },
});
