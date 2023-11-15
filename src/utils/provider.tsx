"use client"
import { Provider } from "react-redux";
import store from "../store/index";
export function ReduxProvider({ children }: any) {
  return <Provider store={store}>{children}</Provider>;
}
