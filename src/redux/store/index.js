import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
    currentUser: userReducer,
    // selectedChat: chatReducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store