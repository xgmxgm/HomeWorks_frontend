import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

import { IHomeWork } from "@/interfaces"
import axios from "@/axios"

interface IFetchData {
    lesson: string,
    group: string,
}

export const FetchHomeWorks = createAsyncThunk("homeWorks/fetch", async ({lesson, group}: IFetchData) => {
    try {
        const requestData = {
            lesson,
            group
        }
        const response = await axios.post("/getLessonHomeWork", requestData);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err)
    }
});

export const CreateNewHomework = createAsyncThunk("homeWork/create", async({ title, info, group, lesson }: IHomeWork) => {
    try {
        const requestData: IHomeWork = {
            title,
            info,
            group,
            lesson
        }
        const response = await axios.post("/createHomeWork", requestData);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err)
    }
})

interface IDeleteData {
    title: string,
    info: string,
}

export const DeleteHomeWork = createAsyncThunk("homeWork/delete", async({ info, title }: IDeleteData) => {
    try {
        const requestData: IDeleteData = {
            title,
            info
        }
        const response = await axios.post("/deleteHomeWork", requestData);
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err)
    }
})
interface Homework {
    homeWork: IHomeWork[]
}

const HomeWorksSlice = createSlice({
    name: 'homeWorks',
    initialState: {
        homeWork: [],
    } as Homework,
    reducers: {
        setHomeWorks(state, action: PayloadAction<IHomeWork[]>) {
            state.homeWork = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(FetchHomeWorks.fulfilled, (state, action) => {
            return {
                ...state,
                homeWork: action.payload
            }
        })
    },
})

export const { setHomeWorks } = HomeWorksSlice.actions;
export default HomeWorksSlice.reducer;