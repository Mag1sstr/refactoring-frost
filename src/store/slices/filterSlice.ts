import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";
import { IItems } from "../../interfaces/interfaces";

export interface IFilter {
  brandData: IItems[];
  modelsData: IItems[];
  generationData: IItems[];
}

const initialState: IFilter = {
  brandData: [],
  modelsData: [],
  generationData: [],
};

export const filterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setBrandData(state, action) {
      state.brandData = action.payload;
    },
    setModelsData(state, action) {
      state.modelsData = action.payload;
    },
    setGenerationData(state, action) {
      state.generationData = action.payload;
    },
  },
});

export function getBrandData() {
  return function (dispatch: AppDispatch) {
    axios.get("https://frost.runtime.kz/api/brands").then((resp) => {
      dispatch(setBrandData(resp.data));
    });
  };
}

export function handleBrandChange(id: number | string) {
  return function (dispatch: AppDispatch) {
    if (id === "all") {
      dispatch(setModelsData([]));
      dispatch(setGenerationData([]));
    } else {
      axios
        .get(`https://frost.runtime.kz/api/models?brandId=${id}`)
        .then((resp) => {
          dispatch(setModelsData(resp.data));
        });
    }
  };
}

export function handleModelChange(id: number | string) {
  return function (dispatch: AppDispatch) {
    if (id === "all") {
      dispatch(setGenerationData([]));
    } else {
      axios
        .get(`https://frost.runtime.kz/api/generations?modelId=${id}`)
        .then((resp) => {
          dispatch(setGenerationData(resp.data));
        });
    }
  };
}

export const { setBrandData, setModelsData, setGenerationData } =
  filterSlice.actions;

export default filterSlice.reducer;
