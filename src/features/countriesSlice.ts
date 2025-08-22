import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Country {
  name: string;
  region: string;
  flag: string;
}

const API =
  "https://restcountries.com/v2/all?fields=name,region,flag";

export const fetchCountries = createAsyncThunk<Country[]>(
  "countries/fetch",
  async () => {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch countries");
    return (await res.json()) as Country[];
  }
);

interface CountriesState {
  items: Country[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filterRegion: string; // "All" or specific region
  visibleCount: number; // for load-more
}

const initialState: CountriesState = {
  items: [],
  status: "idle",
  error: null,
  filterRegion: "All",
  visibleCount: 12
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string>) {
      state.filterRegion = action.payload;
      state.visibleCount = 12; // reset pagination on filter change
    },
    loadMore(state) {
      state.visibleCount += 12;
    },
    resetList(state) {
      state.visibleCount = 12;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error";
      });
  }
});

export const { setRegion, loadMore, resetList } = countriesSlice.actions;
export default countriesSlice.reducer;
