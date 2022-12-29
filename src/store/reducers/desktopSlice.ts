import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { desktopIconTitle } from 'common/constants';
import WindowOperation from 'common/windowOperation';
import { IWindow } from 'types/IWindow';
import {
  addFile,
  addFolder,
  copyItem,
  cutItem,
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
  wallpaperId: number;
  isWarningModalDisplayed: boolean;
  selectedFileName: string | null;
  currentWindow: IWindow | null;
}

const initialState: DesktopState = {
  openedWindows: [],
  isConfirmFormOpened: false,
  confirmModalOperation: '',
  myPCIconTitle: desktopIconTitle,
  isFullScreenMode: false,
  wallpaperId: 2,
  isWarningModalDisplayed: false,
  selectedFileName: null,
  currentWindow: null,
};

export const desktopSlice = createSlice({
  name: 'desktop',
  initialState,
  reducers: {
    updateOpenedWindow(state, action: PayloadAction<IWindow>) {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.id) {
          window.isWindowMaximized = action.payload.isWindowMaximized;
        }
      });
    },
    setOpenedWindows(state, action: PayloadAction<string>) {
      const updatedWindows = state.openedWindows.filter((window) => window.id !== action.payload);
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
    setWallpaperId(state, action: PayloadAction<number>) {
      state.wallpaperId = action.payload;
    },
    setIsWarningModalDisplayed(state, action: PayloadAction<boolean>) {
      state.isWarningModalDisplayed = action.payload;
    },
    setSelectedFileName(state, action: PayloadAction<string | null>) {
      state.selectedFileName = action.payload;
    },
    setCurrentWindow(state, action: PayloadAction<IWindow | null>) {
      state.currentWindow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {});
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.openedWindows.push({
        ...action.payload,
        history: [],
        currentPath: '',
        isWindowMaximized: false,
      });
    });
    builder.addCase(getItems.rejected, (state, action) => {});

    builder.addCase(updateWindow.pending, (state) => {});
    builder.addCase(updateWindow.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          if (action.payload.operation === WindowOperation.update) {
            const basePathIdx = window.history.indexOf(window.currentPath) + 1;
            const baseHistory = window.history.slice(0, basePathIdx);
            window.history = baseHistory.concat(action.payload.itemPath);
          }

          window.items = action.payload.windowItems.items;
          window.folderTitle = action.payload.windowItems.folderTitle;
          window.currentPath = action.payload.itemPath;
        }
      });
    });
    builder.addCase(updateWindow.rejected, (state, action) => {});

    builder.addCase(addFile.pending, (state) => {});
    builder.addCase(addFile.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(addFile.rejected, (state, action) => {});

    builder.addCase(deleteFile.pending, (state) => {});
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(deleteFile.rejected, (state, action) => {});

    builder.addCase(addFolder.pending, (state) => {});
    builder.addCase(addFolder.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(addFolder.rejected, (state, action) => {});

    builder.addCase(removeFolder.pending, (state) => {});
    builder.addCase(removeFolder.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(removeFolder.rejected, (state, action) => {});

    builder.addCase(renameItem.pending, (state) => {});
    builder.addCase(renameItem.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(renameItem.rejected, (state, action) => {});

    builder.addCase(copyItem.pending, (state) => {});
    builder.addCase(copyItem.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(copyItem.rejected, (state, action) => {});

    builder.addCase(cutItem.pending, (state) => {});
    builder.addCase(cutItem.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });
    });
    builder.addCase(cutItem.rejected, (state, action) => {});
  },
});

export const {
  setOpenedWindows,
  setIsConfirmFormOpened,
  setConfirmModalOperation,
  setMyPCIconTitle,
  setIsFullScreenMode,
  setWallpaperId,
  setIsWarningModalDisplayed,
  setSelectedFileName,
  updateOpenedWindow,
  setCurrentWindow,
} = desktopSlice.actions;
export default desktopSlice.reducer;
