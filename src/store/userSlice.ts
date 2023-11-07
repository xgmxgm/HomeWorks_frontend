import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "@/axios"

import { ILoginData, IRegisterData, IUserData } from '@/interfaces'
import { setIsAuth } from "./authSlice";

export const AuthorizeUser = createAsyncThunk("user/fetch", async ({ email, password }: ILoginData, { dispatch }) => {
    const requestData: ILoginData = {
        email,
        password,
    };
    try {
        const response = await axios.post('/auth/login', requestData);
        const data = response.data;
        dispatch(setUsers(data));
        if (data.name) dispatch(setIsAuth());
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
    }
);

export const RegistrationUser = createAsyncThunk("user/registration", async ({name, lastName, email, password, passwordRepeat, group, isTeacher, lesson }: IRegisterData, { dispatch }) => {
    try {
        const requestData: IRegisterData = {
            name,
            lastName,
            email,
            password,
            passwordRepeat,
            group,
            isTeacher,
            lesson
        };
        const response = await axios.post('/auth/register', requestData);
        const data = response.data;
        dispatch(setUsers(data));
        console.log(data)
        if (data.name) dispatch(setIsAuth());
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
    }
);

interface IUser {
    user: IUserData,
}

const initialState: IUser = {
    user: {
        name: "",
        lastName: "",
        email: "",
        message: "",
        group: "",
        isTeacher: false,
        lesson: ""
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<IUserData>) {
            state.user = {
                name: action.payload.name,
                lastName: action.payload.lastName,
                email: action.payload.email,
                message: action.payload.message,
                group: action.payload.group,
                isAdmin: action.payload.isAdmin,
                isTeacher: action.payload.isTeacher,
                lesson: action.payload.lesson,
            }
        }
    }
})

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;