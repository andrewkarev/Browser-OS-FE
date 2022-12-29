import ContextMenuOptions from 'common/contextMenuOptions';
import TransferOperation from 'common/transferOperation';
import WindowOperation from 'common/windowOperation';
import { setItemToTransfer, setTransferOperation } from 'store/reducers/contextMenuSlice';
import {
  setConfirmModalOperation,
  setIsConfirmFormOpened,
  setIsFullScreenMode,
  setOpenedWindows,
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
import { getCurrentWindowPath } from 'utils/getCurrentWindowPath';
import { useAppDispatch, useAppSelector } from './redux';

export const useContextMenuHandler = (closeContextMenu: () => void) => {
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector((state) => state.contextMenu.selectedItem);
  const currentWindowId = useAppSelector((state) => state.contextMenu.currentWindowId);
  const itemToTransfer = useAppSelector((state) => state.contextMenu.itemToTransfer);
  const openedWindows = useAppSelector((state) => state.desktop.openedWindows);
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
        if (!selectedItem || !currentWindowId) return;
        return () => {
          dispatch(
            updateWindow({
              itemPath: selectedItem?.path,
              windowId: currentWindowId,
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
        if (!selectedItem || !currentWindowId) return;
        return () => {
          dispatch(deleteFile({ itemPath: selectedItem.path, windowId: currentWindowId }));
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
        if (!currentWindowId || !selectedItem) return;
        return () => {
          dispatch(
            removeFolder({
              folderPath: selectedItem?.path,
              windowId: currentWindowId,
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
          if (!itemToTransfer || !currentWindowId) return;

          if (transferOperation === TransferOperation.copy) {
            dispatch(
              copyItem({
                sourcePath: itemToTransfer.path,
                destPath: getCurrentWindowPath(currentWindowId, openedWindows),
                windowId: currentWindowId,
              })
            );
          }

          if (transferOperation === TransferOperation.cut) {
            dispatch(
              cutItem({
                sourcePath: itemToTransfer.path,
                destPath: getCurrentWindowPath(currentWindowId, openedWindows),
                windowId: currentWindowId,
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
          // dispatch(setIsWindowMaximized(true));
          closeContextMenu();
        };
      case ContextMenuOptions.close:
        return () => {
          if (!currentWindowId) return;
          dispatch(setOpenedWindows(currentWindowId));
          closeContextMenu();
        };
      default:
        return () => {
          closeContextMenu();
        };
    }
  };
};
