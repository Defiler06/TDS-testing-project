import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {ICountry, IState} from "../interfaces/interfaces";

const initialState: IState = {
    countries: [],
    filterCountries: [],
    isLoading: false,
    error: null,
}

export const fetchCountries = createAsyncThunk(
    'countries.get',
    async () => {
        const res = await axios.get<AxiosRequestConfig, AxiosResponse>("https://restcountries.com/v3.1/all");
        if (res !== null) {
            const data = res.data.map((element: any) => {
                return {
                    name: element.name.common,
                    independent: element.independent,
                    flag: element.flags.svg,
                    population: element.population
                }
            });
            return data;
        } else {
            return [];
        }
    }
);

const infoSlices = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        changeCountries: (state, action: PayloadAction<ICountry[]>) => {
            state.countries = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countries = action.payload;
                state.filterCountries = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error as Error;
            })
    }
});

export const {
    changeCountries,
} = infoSlices.actions;
export default infoSlices.reducer;
