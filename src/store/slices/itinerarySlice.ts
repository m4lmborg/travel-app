import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Activity {
  id: string;
  groupId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  createdBy: string;
  participants: string[];
}

interface ItineraryState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

const initialState: ItineraryState = {
  activities: [],
  loading: false,
  error: null,
};

// Async thunks for itinerary management
export const fetchGroupActivities = createAsyncThunk(
  'itinerary/fetchGroupActivities',
  async (groupId: string) => {
    // TODO: Implement actual API call
    return Promise.resolve([
      {
        id: '1',
        groupId,
        title: 'City Tour',
        description: 'Guided tour of the city\'s main attractions',
        date: '2024-06-15',
        time: '09:00',
        location: 'City Center',
        category: 'Group Activity',
        createdBy: '1',
        participants: ['1'],
      },
    ] as Activity[]);
  }
);

export const createActivity = createAsyncThunk(
  'itinerary/createActivity',
  async (activityData: Omit<Activity, 'id'>) => {
    // TODO: Implement actual API call
    return Promise.resolve({
      ...activityData,
      id: Math.random().toString(),
    } as Activity);
  }
);

export const updateActivity = createAsyncThunk(
  'itinerary/updateActivity',
  async (activityData: Activity) => {
    // TODO: Implement actual API call
    return Promise.resolve(activityData);
  }
);

export const deleteActivity = createAsyncThunk(
  'itinerary/deleteActivity',
  async (activityId: string) => {
    // TODO: Implement actual API call
    return Promise.resolve(activityId);
  }
);

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    clearItineraryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch activities
      .addCase(fetchGroupActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchGroupActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch activities';
      })
      // Create activity
      .addCase(createActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activities.push(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create activity';
      })
      // Update activity
      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.activities.findIndex(
          (activity) => activity.id === action.payload.id
        );
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update activity';
      })
      // Delete activity
      .addCase(deleteActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = state.activities.filter(
          (activity) => activity.id !== action.payload
        );
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete activity';
      });
  },
});

export const { clearItineraryError } = itinerarySlice.actions;
export default itinerarySlice.reducer;
