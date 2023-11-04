import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUpdateUser,fetchUser} from './UserAPI';

const initialState = {
  UserDetails:null,
  status: 'idle',
};

export const fetchUpdateUserAsync = createAsyncThunk(
  'User/fetchUpdateUser',
  async (UserData) => {
    const response = await fetchUpdateUser(UserData)
    return response.data
  }
)
export const fetchUserAsync = createAsyncThunk(
  'User/fetchUser',
  async () => {
    const response = await fetchUser()
    return response.data
  }
)


export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
     increment: (state) => {
      
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(fetchUpdateUserAsync.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(fetchUpdateUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.UserDetails  = action.payload; 
    })
    .addCase(fetchUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.UserDetails = action.payload;
    })
    ;
  },
});

export const {resetCurrentUser} = UserSlice.actions;


export const selectUserDetails = (state) => state.User.UserDetails;
export const selectUserStatus = (state) => state.User.status


export default UserSlice.reducer;
