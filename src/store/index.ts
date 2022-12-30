import { configureStore } from '@reduxjs/toolkit';
import contextMenuSlice from './reducers/contextMenuSlice';
import desktopSlice from './reducers/desktopSlice';
import mediaSlice from './reducers/mediaSlice';
import windowSlice from './reducers/windowSlice';

export const store = configureStore({
  reducer: {
    desktop: desktopSlice,
    contextMenu: contextMenuSlice,
    window: windowSlice,
    media: mediaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
