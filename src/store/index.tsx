import { configureStore, createSlice } from "@reduxjs/toolkit";
import {useSelector,TypedUseSelectorHook} from "react-redux"
import { ModalSlice } from "./slices/modalContainer.slice";


export const store = configureStore({
  reducer: {
    modalContainer: ModalSlice.reducer,
  },
});

export type RootState = ReturnType <typeof store.getState>
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
