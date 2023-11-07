import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
}

const AuthSlice = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
        setIsAuth(state) {
            state.isAuth = !state.isAuth;
        }
    }
})

export const { setIsAuth } = AuthSlice.actions;
export default AuthSlice.reducer;