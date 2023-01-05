import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DESKTOP_ICON_TITLE } from 'common/constants';
import ContextMenuOptions from 'common/contextMenuOptions';
import WindowOperation from 'common/windowOperation';
import { IMediaFile } from 'types/IMediaFile';
import ITaskBarItem from 'types/ITaskBarItem';
import { IWindow } from 'types/IWindow';
import WindowSizeOperations from 'types/WindowSizeOperations';
import {
  addFile,
  addFolder,
  copyItem,
  cutItem,
  deleteFile,
  getItems,
  getMediaFile,
  getTextFile,
  removeFolder,
  renameItem,
  updateTextFile,
  updateWindow,
} from '../thunks';

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
  isPending: boolean;
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
  isPending: false,
};

export const desktopSlice = createSlice({
  name: 'desktop',
  initialState,
  reducers: {
    updateOpenedWindow(
      state,
      action: PayloadAction<{ id: string; operation: WindowSizeOperations }>
    ) {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.id) {
          if (action.payload.operation === ContextMenuOptions.maximize) {
            window.isMaximized = !window.isMaximized;
          }

          if (action.payload.operation === ContextMenuOptions.minimize) {
            window.isMinimized = !window.isMinimized;
          }

          if (action.payload.operation === ContextMenuOptions.restore) {
            if (window.isMaximized && !window.isMinimized) {
              window.isMaximized = false;
            } else {
              window.isMinimized = false;
            }
          }
        }
      });

      state.taskBarItems.forEach((item) => {
        if (item.id === action.payload.id) {
          item.isMaximized = !item.isMaximized;
          item.isMinimized = !item.isMinimized;
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
    updateOpenedPlayers(
      state,
      action: PayloadAction<{ id: string; operation: WindowSizeOperations }>
    ) {
      state.openedPlayers.forEach((player) => {
        if (player.id === action.payload.id) {
          if (player.id === action.payload.id) {
            if (action.payload.operation === ContextMenuOptions.maximize) {
              player.isMaximized = !player.isMaximized;
            }

            if (action.payload.operation === ContextMenuOptions.minimize) {
              player.isMinimized = !player.isMinimized;
            }

            if (action.payload.operation === ContextMenuOptions.restore) {
              if (player.isMaximized && !player.isMinimized) {
                player.isMaximized = false;
              } else {
                player.isMinimized = false;
              }
            }
          }
        }
      });

      state.taskBarItems.forEach((item) => {
        if (item.id === action.payload.id) {
          item.isMaximized = !item.isMaximized;
          item.isMinimized = !item.isMinimized;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.openedWindows.push({
        ...action.payload,
        history: [],
        currentPath: '',
        isMaximized: false,
        isMinimized: false,
      });

      state.taskBarItems.push({
        id: action.payload.id,
        title: action.payload.folderTitle,
        isMaximized: false,
        isMinimized: false,
      });

      state.isPending = false;
    });
    builder.addCase(getItems.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(updateWindow.pending, (state) => {
      state.isPending = true;
    });
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

      state.isPending = false;
    });
    builder.addCase(updateWindow.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(addFile.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(addFile.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });

      state.isPending = false;
    });
    builder.addCase(addFile.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(deleteFile.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });

      state.isPending = false;
    });
    builder.addCase(deleteFile.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(addFolder.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(addFolder.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });

      state.isPending = false;
    });
    builder.addCase(addFolder.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(removeFolder.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(removeFolder.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });

      state.isPending = false;
    });
    builder.addCase(removeFolder.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(renameItem.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(renameItem.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });

      state.isPending = false;
    });
    builder.addCase(renameItem.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(copyItem.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(copyItem.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });

      state.isPending = false;
    });
    builder.addCase(copyItem.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(cutItem.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(cutItem.fulfilled, (state, action) => {
      state.openedWindows.forEach((window) => {
        if (window.id === action.payload.windowId) {
          window.items = action.payload.windowItems.items;
        }
      });

      state.isPending = false;
    });
    builder.addCase(cutItem.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(getTextFile.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getTextFile.fulfilled, (state, action) => {
      state.openedPlayers.push({
        ...action.payload,
        isMaximized: false,
        isMinimized: false,
      });

      state.taskBarItems.push({
        id: action.payload.id,
        title: action.payload.fileTitle,
        isMaximized: false,
        isMinimized: false,
      });

      state.isPending = false;
    });
    builder.addCase(getTextFile.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(updateTextFile.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateTextFile.fulfilled, (state, action) => {
      state.openedPlayers.forEach((player) => {
        if (player.id === action.payload.id) {
          player.data = action.payload.data;
        }
      });

      state.isPending = false;
    });
    builder.addCase(updateTextFile.rejected, (state, action) => {
      state.isPending = false;
    });

    builder.addCase(getMediaFile.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getMediaFile.fulfilled, (state, action) => {
      state.openedPlayers.push({
        ...action.payload,
        isMaximized: false,
        isMinimized: false,
      });

      state.taskBarItems.push({
        id: action.payload.id,
        title: action.payload.fileTitle,
        isMaximized: false,
        isMinimized: false,
      });

      state.isPending = false;
    });
    builder.addCase(getMediaFile.rejected, (state, action) => {
      state.isPending = false;
    });
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
