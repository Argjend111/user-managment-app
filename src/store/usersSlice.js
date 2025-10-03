import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsersFromApi = createAsyncThunk(
  'users/fetchFromApi',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    console.log("Tdhana:", data);
    return data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addUser(state, action) {
      state.list.unshift(action.payload);
    },
    updateUser(state, action) {
      const idx = state.list.findIndex((u) => String(u.id) === String(action.payload.id));
      if (idx !== -1) {
        state.list[idx] = { ...state.list[idx], ...action.payload };
      }
    },
    deleteUser(state, action) {
      state.list = state.list.filter((u) => String(u.id) !== String(action.payload));
    },
    setUsers(state, action) {
      const newUsers = action.payload.filter(
        (newUser) => !state.list.some((existing) => String(existing.id) === String(newUser.id))
      );
      state.list = [...state.list, ...newUsers];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsersFromApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersFromApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newUsers = action.payload.filter(
          (newUser) => !state.list.some((existing) => String(existing.id) === String(newUser.id))
        );
        state.list = [...state.list, ...newUsers];
      })
      .addCase(fetchUsersFromApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addUser, updateUser, deleteUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer;