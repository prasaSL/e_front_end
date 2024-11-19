import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    loading:false,
    error:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart : (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess : (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure : (state) => {
            state.loading = false;
           
        },
        updateFavorites: (state, action) => {
              state.currentUser.user.favorites = action.payload;
            
          },
 }
});

export const { signInStart, signInSuccess, signInFailure ,updateFavorites} = userSlice.actions;

export default userSlice.reducer;

