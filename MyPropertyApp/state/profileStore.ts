import { create } from 'zustand';
import axios from 'axios';

interface Profile {
  id: string;
  name: string;
  email: string;
  bookings: string[];
}

interface ProfileStore {
  profile: Profile | null;
  fetchProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  fetchProfile: async () => {
    try {
      const response = await axios.get('https://675efb181f7ad24269973d0d.mockapi.io/raft/profile');
      const profileArray = response.data; 
      if (Array.isArray(profileArray) && profileArray.length > 0) {
        set({ profile: profileArray[0] }); 
      } else {
        console.error('Profile data is empty or invalid');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  },
}));
