import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:null
  },
  reducers: {
    setUserDetails: (state, action) => {
        console.log('setting user', action.payload);
        state.user=action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer