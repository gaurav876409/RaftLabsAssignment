import { create } from 'zustand';
import axios from 'axios';

// Define the Property interface
interface Property {
  id: string;
  title: string;
  price: number;
  location: { city: string; state: string };
  features: string[];
  images: string[];
}

// Define the store interface
interface PropertiesStore {
  properties: Property[];
  fetchProperties: () => Promise<void>;
}

export const usePropertiesStore = create<PropertiesStore>((set) => ({
  properties: [],
  fetchProperties: async () => {
    try {
      const response = await axios.get('https://675ef6701f7ad24269972f71.mockapi.io/raft/properties');
      set({ properties: response.data });
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  },
}));
