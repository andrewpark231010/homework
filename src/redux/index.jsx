// src/redux/index.js
import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./member";

const rootReducer = {
  member: memberReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
