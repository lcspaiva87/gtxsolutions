import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
  name: "modalContainer",
  initialState: false,
  reducers: {
    openModal: () => {
      return true
    },
    closeModal: () => {
      return false
    },
  },

});
export const { closeModal, openModal } = ModalSlice.actions;
