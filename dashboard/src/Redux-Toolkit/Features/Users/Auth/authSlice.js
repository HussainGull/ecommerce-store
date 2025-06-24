import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
        hydrate(state, action) {
            // Useful for rehydrating after refresh using refresh token
            const { user, accessToken } = action.payload;
            state.user = user || null;
            state.accessToken = accessToken || null;
            state.isAuthenticated = !!accessToken;
        },
    },
});

export const { login, logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
