import ContextMenuOptions from 'common/contextMenuOptions';
import TransferOperation from 'common/transferOperation';
import WindowOperation from 'common/windowOperation';
import { setItemToTransfer, setTransferOperation } from 'store/reducers/contextMenuSlice';
import {
  setConfirmModalOperation,
  setIsConfirmFormOpened,
  setIsFullScreenMode,
  setOpenedWindows,
  updateOpenedWindow,
} from 'store/reducers/desktopSlice';
import {
  copyItem,
  cutItem,
  deleteFile,
  getItems,
  removeFolder,
  updateWindow,
} from 'store/reducers/thunks';
import { IMenuItem } from 'types/IMenuItem';
import { useAppDispatch, useAppSelector } from './redux';

export const useContextMenuHandler = (closeContextMenu: () => void) => {
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);
  const currentWindow = useAppSelector((state) => state.window.currentWindow);
  const itemToTransfer = useAppSelector((state) => state.contextMenu.itemToTransfer);
  const transferOperation = useAppSelector((state) => state.contextMenu.transferOperation);

  return (menuItem: IMenuItem) => {
    switch (menuItem.option) {
      case ContextMenuOptions.openRootFolder:
        return () => {
          dispatch(getItems(''));
          closeContextMenu();
        };
      case ContextMenuOptions.renamePCIcon:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.renamePCIcon));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.openDirectory: {
        if (!selectedItem || !currentWindow) return;
        return () => {
          dispatch(
            updateWindow({
              itemPath: selectedItem.path,
              windowId: currentWindow.id,
              operation: WindowOperation.update,
            })
          );
          closeContextMenu();
        };
      }
      case ContextMenuOptions.addFile:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.addFile));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.deleteFile: {
        if (!selectedItem || !currentWindow) return;
        return () => {
          dispatch(deleteFile({ itemPath: selectedItem.path, windowId: currentWindow.id }));
          closeContextMenu();
        };
      }
      case ContextMenuOptions.addFolder:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.addFolder));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.deleteDirectory:
        if (!currentWindow || !selectedItem) return;
        return () => {
          dispatch(
            removeFolder({
              folderPath: selectedItem?.path,
              windowId: currentWindow.id,
            })
          );
          closeContextMenu();
        };
      case ContextMenuOptions.rename:
        return () => {
          dispatch(setConfirmModalOperation(ContextMenuOptions.rename));
          dispatch(setIsConfirmFormOpened(true));
          closeContextMenu();
        };
      case ContextMenuOptions.copy:
        return () => {
          dispatch(setItemToTransfer(selectedItem));
          dispatch(setTransferOperation(TransferOperation.copy));
          closeContextMenu();
        };
      case ContextMenuOptions.cut:
        return () => {
          dispatch(setItemToTransfer(selectedItem));
          dispatch(setTransferOperation(TransferOperation.cut));
          closeContextMenu();
        };
      case ContextMenuOptions.paste:
        return () => {
          if (!itemToTransfer || !currentWindow) return;

          if (transferOperation === TransferOperation.copy) {
            dispatch(
              copyItem({
                sourcePath: itemToTransfer.path,
                destPath: currentWindow.currentPath,
                windowId: currentWindow.id,
              })
            );
          }

          if (transferOperation === TransferOperation.cut) {
            dispatch(
              cutItem({
                sourcePath: itemToTransfer.path,
                destPath: currentWindow.currentPath,
                windowId: currentWindow.id,
                itemType: itemToTransfer.type,
              })
            );
          }

          dispatch(setItemToTransfer(null));
          dispatch(setTransferOperation(null));
          closeContextMenu();
        };
      case ContextMenuOptions.enterFullScreen:
        return () => {
          document.body.requestFullscreen();
          dispatch(setIsFullScreenMode(true));
          closeContextMenu();
        };
      case ContextMenuOptions.exitFullScreen:
        return () => {
          document.exitFullscreen();
          dispatch(setIsFullScreenMode(false));
          closeContextMenu();
        };
      case ContextMenuOptions.maximize:
        return () => {
          if (!currentWindow) return;

          const updatedWindow = { ...currentWindow };
          updatedWindow.isWindowMaximized = !currentWindow.isWindowMaximized;

          dispatch(updateOpenedWindow(updatedWindow));
          closeContextMenu();
        };
      case ContextMenuOptions.close:
        return () => {
          if (!currentWindow) return;
          dispatch(setOpenedWindows(currentWindow.id));
          closeContextMenu();
        };
      default:
        return () => {
          closeContextMenu();
        };
    }
  };
};
