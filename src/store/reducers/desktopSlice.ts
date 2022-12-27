import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { desktopIconTitle } from 'common/constants';
import WindowOperation from 'common/windowOperation';
import { IWindow } from 'types/IWindow';
import {
  addFile,
  addFolder,
  deleteFile,
  getItems,
  removeFolder,
  renameItem,
  updateWindow,
} from './thunks';

interface DesktopState {
  openedWindows: IWindow[];
  isConfirmFormOpened: boolean;
  confirmModalOperation: string;
  myPCIconTitle: string;
  isFullScreenMode: boolean;
  isWindowMaximized: boolean;
}

const initialState: DesktopState = {
  openedWindows: [],
  isConfirmFormOpened: false,
  confirmModalOperation: '',
  myPCIconTitle: desktopIconTitle,
  isFullScreenMode: false,
  isWindowMaximized: false,
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
    setIsConfirmFormOpened(state, action: PayloadAction<boolean>) {
      state.isConfirmFormOpened = action.payload;
    },
    setConfirmModalOperation(state, action: PayloadAction<string>) {
      state.confirmModalOperation = action.payload;
    },
    setMyPCIconTitle(state, action: PayloadAction<string>) {
      state.myPCIconTitle = action.payload;
    },
    setIsFullScreenMode(state, action: PayloadAction<boolean>) {
      state.isFullScreenMode = action.payload;
    },
    setIsWindowMaximized(state) {
      state.isWindowMaximized = !state.isWindowMaximized;
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
          if (action.payload.operation === WindowOperation.update) {
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

    builder.addCase(addFile.pending, (state) => {});
    builder.addCase(addFile.fulfilled, (state, action) => {
      state.openedWindows.forEach((element) => {
        if (element.window.id === action.payload.windowId) {
          element.window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(addFile.rejected, (state, action) => {});

    builder.addCase(deleteFile.pending, (state) => {});
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.openedWindows.forEach((element) => {
        if (element.window.id === action.payload.windowId) {
          element.window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(deleteFile.rejected, (state, action) => {});

    builder.addCase(addFolder.pending, (state) => {});
    builder.addCase(addFolder.fulfilled, (state, action) => {
      state.openedWindows.forEach((element) => {
        if (element.window.id === action.payload.windowId) {
          element.window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(addFolder.rejected, (state, action) => {});

    builder.addCase(removeFolder.pending, (state) => {});
    builder.addCase(removeFolder.fulfilled, (state, action) => {
      state.openedWindows.forEach((element) => {
        if (element.window.id === action.payload.windowId) {
          element.window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(removeFolder.rejected, (state, action) => {});

    builder.addCase(renameItem.pending, (state) => {});
    builder.addCase(renameItem.fulfilled, (state, action) => {
      state.openedWindows.forEach((element) => {
        if (element.window.id === action.payload.windowId) {
          element.window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(renameItem.rejected, (state, action) => {});
  },
});

export const {
  setOpenedWindows,
  setIsConfirmFormOpened,
  setConfirmModalOperation,
  setMyPCIconTitle,
  setIsFullScreenMode,
  setIsWindowMaximized,
} = desktopSlice.actions;
export default desktopSlice.reducer;
