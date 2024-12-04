import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface GroupMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'member';
}

interface TravelGroup {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  members: GroupMember[];
  createdBy: string;
  createdAt: string;
}

interface GroupState {
  groups: TravelGroup[];
  currentGroup: TravelGroup | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null,
  loading: false,
  error: null,
};

// Async thunks for group management
export const fetchUserGroups = createAsyncThunk(
  'groups/fetchUserGroups',
  async () => {
    // TODO: Implement actual API call
    return Promise.resolve([
      {
        id: '1',
        name: 'Europe Summer Trip',
        description: 'Exploring European cities',
        startDate: '2024-06-15',
        endDate: '2024-06-30',
        members: [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            role: 'admin',
          },
        ],
        createdBy: '1',
        createdAt: new Date().toISOString(),
      },
    ] as TravelGroup[]);
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData: Omit<TravelGroup, 'id' | 'members' | 'createdAt'>) => {
    // TODO: Implement actual API call
    return Promise.resolve({
      ...groupData,
      id: Math.random().toString(),
      members: [],
      createdAt: new Date().toISOString(),
    } as TravelGroup);
  }
);

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },
    clearGroupError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch groups
      .addCase(fetchUserGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchUserGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch groups';
      })
      // Create group
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload);
        state.currentGroup = action.payload;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create group';
      });
  },
});

export const { setCurrentGroup, clearGroupError } = groupSlice.actions;
export default groupSlice.reducer;
