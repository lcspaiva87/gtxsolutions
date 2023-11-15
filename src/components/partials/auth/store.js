import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { enqueueSnackbar } from "notistack";

const initialUsers = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("users");
    return item
      ? JSON.parse(item)
      : [
          {
            id: uuidv4(),
            name: "dashcode",
            email: "dashcode@gmail.com",
            password: "dashcode",
          },
        ];
  }
  return [
    {
      id: uuidv4(),
      name: "dashcode",
      email: "dashcode@gmail.com",
      password: "dashcode",
    },
  ];
};
// save users in local storage

const initialIsAuth = () => {
  if (typeof window !== "undefined") {
    const item = window?.localStorage.getItem("isAuth");
    return item ? JSON.parse(item) : false;
  }
  return false;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers(),
    isAuth: initialIsAuth(),
  },
  reducers: {
    handleRegister: (state, action) => {
      const { name, email, password } = action.payload;
      const user = state.users.find((user) => user.email === email);
      if (user) {

        enqueueSnackbar("User already exists", { variant: "success" });;
      } else {
        state.users.push({
          id: uuidv4(),
          name,
          email,
          password,
        });
        if (typeof window !== "undefined") {
          window?.localStorage.setItem("users", JSON.stringify(state.users));
        }

        enqueueSnackbar("User registered successfully", { variant: "success" });

      }
    },

    handleLogin: (state, action) => {
      state.isAuth = action.payload;
      // save isAuth in local storage
      if (typeof window !== "undefined") {
        window?.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
      }

      enqueueSnackbar("User logged in successfully", { variant: "success" });

    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      if (typeof window !== "undefined") {
        window?.localStorage.removeItem("isAuth");
      }
      enqueueSnackbar("User logged out successfully", { variant: "success" });

    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
