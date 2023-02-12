import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer,
  persistStore, PURGE,
  REGISTER, REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authen";
import profileReducer from "./profile";

const persistConfig = {
  key: "root3",
  version: 2,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    authentication: authReducer,
    profile: profileReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
