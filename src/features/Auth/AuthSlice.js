import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchcheckUser, fetchCreateUser,fetchloginUser,fetchSignOutUser,fetchresetPasswordRequest, fetchresetPasswordConfirm} from './AuthAPI';

const initialState = {
  LoggedInUser:null,
  Error:null,
  status: 'idle',
  checkUser:false,
  resetReqStatus:null,
  resetConfirmStatus:null
};

export const fetchCreateUserAsync = createAsyncThunk(
  'Auth/fetchCreateUser',
  async (userData) => {
    const response = await fetchCreateUser(userData)
    return response.data
  }
)
export const fetchloginUserAsync = createAsyncThunk(
  'Auth/fetchloginUser',
  async (userData,{rejectWithValue}) => {
    try{
    const response = await fetchloginUser(userData)
    return response.data
    }
    catch(error)
    {
        return rejectWithValue(error)
    }
  }
)
export const fetchSignOutUserAsync = createAsyncThunk(
  'Auth/fetchSignOutUser',
  async () => {
    const response = await fetchSignOutUser()

    return response.data
  }
)

export const fetchcheckUserAsync = createAsyncThunk(
  'Auth/fetchcheckUser',
  async () => {
   
    const response = await fetchcheckUser()

    return response.data
    
  }
)
export const fetchresetPasswordRequestAsync = createAsyncThunk(
  'Auth/fetchrequestPasswordRequest',
  async (data,{rejectWithValue}) => {
    try{
    const response = await fetchresetPasswordRequest(data)
    return response.data
    }
    catch(error)
    {
        return rejectWithValue(error)
    }
  }
   
  
)

export const fetchresetPasswordConfirmAsync = createAsyncThunk(
  'Auth/fetchrequestPasswordConfirm',
  async (data,{rejectWithValue}) => {
    try{
    const response = await fetchresetPasswordConfirm(data)
    return response.data
    }
    catch(error)
    {
        return rejectWithValue(error)
    }
  }
   
  
)
export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    increment: (state) => {
      
      
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.LoggedInUser = action.payload;
      })
      .addCase(fetchloginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchloginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.LoggedInUser = action.payload;
        state.Error = null;
        
      })
      .addCase(fetchloginUserAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.Error = action.payload;      
      })
      .addCase(fetchSignOutUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchSignOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.LoggedInUser=null;
       
      })
      .addCase(fetchcheckUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchcheckUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.LoggedInUser=action.payload;
        state.checkUser=true;
       
      })
      .addCase(fetchcheckUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.Error=action.payload
        state.checkUser=true;
       
      })
      .addCase(fetchresetPasswordRequestAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchresetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.resetReqStatus=action.payload;
      })
      .addCase(fetchresetPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.resetReqStatus=action.payload;
       
      })
      .addCase(fetchresetPasswordConfirmAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchresetPasswordConfirmAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.resetConfirmStatus=action.payload;
      })
      .addCase(fetchresetPasswordConfirmAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.resetConfirmStatus=action.payload;
       
      })
  },
});

export const { increment} = AuthSlice.actions;


export const selectLoggedInUser = (state) => state.Auth.LoggedInUser;
export const selectcheckUser = (state) => state.Auth.checkUser;
export const selectError = (state) => state.Auth.Error;
export const selectresetReqStatus = (state) => state.Auth.resetReqStatus;
export const selectresetConfirmStatus = (state) => state.Auth.resetConfirmStatus;
export default AuthSlice.reducer;
