import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWindow } from 'types/IWindow';
import { getItems, updateWindow } from './thunks';

interface DesktopState {
  openedWindows: IWindow[];
}

const initialState: DesktopState = {
  openedWindows: [],
};

export const desktopSlice = createSlice({
  name: 'desktop',
  initialState,
  reducers: {
    setOpenedWindows(state, action: PayloadAction<string>) {
      const updatedWindows = state.openedWindows.filter(
        (window) => window.window.id !== action.payload
      );
      state.openedWindows = updatedWindows;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {});
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.openedWindows.push({ window: action.payload, history: [], currentPath: '' });
    });
    builder.addCase(getItems.rejected, (state, action) => {});

    builder.addCase(updateWindow.pending, (state) => {});
    builder.addCase(updateWindow.fulfilled, (state, action) => {
      state.openedWindows.forEach((element) => {
        if (element.window.id === action.payload.windowId) {
          if (action.payload.operation === 'updating') {
            const basePathIdx = element.history.indexOf(element.currentPath) + 1;
            const baseHistory = element.history.slice(0, basePathIdx);
            element.history = baseHistory.concat(action.payload.itemPath);
          }

          element.window.items = action.payload.windowItems.items;
          element.window.folderTitle = action.payload.windowItems.folderTitle;
          element.currentPath = action.payload.itemPath;
        }
      });
    });
    builder.addCase(updateWindow.rejected, (state, action) => {});
  },
});

export const { setOpenedWindows } = desktopSlice.actions;
export default desktopSlice.reducer;
