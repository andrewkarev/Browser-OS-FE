import { configureStore } from '@reduxjs/toolkit';
import contextMenuSlice from './reducers/contextMenuSlice';
import desktopSlice from './reducers/desktopSlice';

export const store = configureStore({
  reducer: {
    desktop: desktopSlice,
    contextMenu: contextMenuSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
