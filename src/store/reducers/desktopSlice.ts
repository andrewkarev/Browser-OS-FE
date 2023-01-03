import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DESKTOP_ICON_TITLE } from 'common/constants';
import WindowOperation from 'common/windowOperation';
import { IMediaFile } from 'types/IMediaFile';
import ITaskBarItem from 'types/ITaskBarItem';
import { IWindow } from 'types/IWindow';
import {
  addFile,
  addFolder,
  copyItem,
  cutItem,
  deleteFile,
  getItems,
  getTextFile,
  removeFolder,
  renameItem,
  updateTextFile,
  updateWindow,
} from './thunks';

interface DesktopState {
  openedWindows: IWindow[];
  openedPlayers: IMediaFile[];
  taskBarItems: ITaskBarItem[];
  isConfirmFormOpened: boolean;
  confirmModalOperation: string;
  myPCIconTitle: string;
  isFullScreenMode: boolean;
  wallpaperId: number;
  isWarningModalDisplayed: boolean;
  selectedFileName: string | null;
  activeWindow: IWindow | IMediaFile | null;
}

const initialState: DesktopState = {
  openedWindows: [],
  openedPlayers: [],
  taskBarItems: [],
  isConfirmFormOpened: false,
  confirmModalOperation: '',
  myPCIconTitle: DESKTOP_ICON_TITLE,
  isFullScreenMode: false,
  wallpaperId: 2,
  isWarningModalDisplayed: false,
  selectedFileName: null,
  activeWindow: null,
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

      state.taskBarItems.forEach((item) => {
        if (item.id === action.payload.id) {
          item.isMaximized = action.payload.isWindowMaximized;
        }
      });
    },
    setOpenedWindows(state, action: PayloadAction<string>) {
      state.openedWindows = state.openedWindows.filter((window) => window.id !== action.payload);
      state.taskBarItems = state.taskBarItems.filter((window) => window.id !== action.payload);
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
    setActiveWindow(state, action: PayloadAction<IWindow | IMediaFile | null>) {
      state.activeWindow = action.payload;
    },
    setOpenedPlayers(state, action: PayloadAction<string>) {
      state.openedPlayers = state.openedPlayers.filter((player) => player.id !== action.payload);
      state.taskBarItems = state.taskBarItems.filter((player) => player.id !== action.payload);
    },
    updateOpenedPlayers(state, action: PayloadAction<IMediaFile>) {
      state.openedPlayers.forEach((player) => {
        if (player.id === action.payload.id) {
          player.isPlayerMaximized = action.payload.isPlayerMaximized;
        }
      });

      state.taskBarItems.forEach((item) => {
        if (item.id === action.payload.id) {
          item.isMaximized = action.payload.isPlayerMaximized;
        }
      });
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

      state.taskBarItems.push({
        id: action.payload.id,
        title: action.payload.folderTitle,
        isMaximized: false,
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

      state.taskBarItems.forEach((item) => {
        if (item.id === action.payload.windowId) {
          item.title = action.payload.windowItems.folderTitle;
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

    // builder.addCase(getMediaFile.pending, (state) => {});
    builder.addCase(getTextFile.fulfilled, (state, action) => {
      state.openedPlayers.push({
        ...action.payload,
        isPlayerMaximized: false,
      });

      state.taskBarItems.push({
        id: action.payload.id,
        title: action.payload.fileTitle,
        isMaximized: false,
      });
    });
    // builder.addCase(getMediaFile.rejected, (state, action) => {});

    // builder.addCase(updateTextFile.pending, (state) => {});
    builder.addCase(updateTextFile.fulfilled, (state, action) => {
      state.openedPlayers.forEach((player) => {
        if (player.id === action.payload.id) {
          player.data = action.payload.data;
        }
      });
    });
    // builder.addCase(updateTextFile.rejected, (state, action) => {});
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
  setActiveWindow,
  setOpenedPlayers,
  updateOpenedPlayers,
} = desktopSlice.actions;
export default desktopSlice.reducer;
